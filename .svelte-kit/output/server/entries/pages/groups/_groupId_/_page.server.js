import { redirect, fail, error } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { g as getDb } from "../../../../chunks/db.js";
import { n as notify } from "../../../../chunks/notifications.js";
async function getCreatorGroup(db, groupId, userId) {
  return db.collection("groups").findOne({ _id: groupId, memberIds: userId, createdBy: userId });
}
async function load({ params, locals }) {
  if (!locals.user) throw redirect(303, "/login");
  if (!ObjectId.isValid(params.groupId)) throw error(404, "Group not found");
  const db = await getDb();
  const groupId = new ObjectId(params.groupId);
  const userId = new ObjectId(locals.user.id);
  const group = await db.collection("groups").findOne({ _id: groupId, memberIds: userId });
  if (!group) throw error(404, "Group not found");
  const expenses = await db.collection("expenses").find({ groupId, deletedAt: null }).sort({ date: -1 }).toArray();
  const users = await db.collection("users").find({ _id: { $in: group.memberIds } }, { projection: { name: 1 } }).toArray();
  const userNames = Object.fromEntries(users.map((user) => [user._id.toString(), user.name]));
  const isCreator = group.createdBy?.equals(userId) || false;
  let joinRequests = [];
  if (isCreator) {
    const requests = await db.collection("groupJoinRequests").find({ groupId, status: "pending" }).sort({ createdAt: 1 }).toArray();
    const users2 = await db.collection("users").find({ _id: { $in: requests.map((request) => request.userId) } }, { projection: { name: 1, email: 1 } }).toArray();
    const userDetails = Object.fromEntries(users2.map((user) => [user._id.toString(), user]));
    joinRequests = requests.map((request) => ({ id: request._id.toString(), name: userDetails[request.userId.toString()]?.name || "Unknown user", email: userDetails[request.userId.toString()]?.email || "" }));
  }
  return {
    group: {
      id: group._id.toString(),
      name: group.name,
      memberCount: group.memberIds.length,
      isCreator,
      members: group.memberIds.map((id) => ({ id: id.toString(), name: userNames[id.toString()] || "Unknown member" }))
    },
    joinRequests,
    expenses: expenses.map((e) => ({
      id: e._id.toString(),
      description: e.description,
      amount: e.amountCents,
      date: e.date,
      payerName: e.payerName,
      splits: (e.splits || []).map((split) => ({ userId: split.userId.toString(), name: userNames[split.userId.toString()] || "Unknown member", shareCents: split.shareCents, paid: Boolean(split.paid) }))
    }))
  };
}
const actions = {
  approve: async ({ request, params, locals }) => updateRequest(request, params, locals, "approved"),
  decline: async ({ request, params, locals }) => updateRequest(request, params, locals, "declined"),
  togglePaid: async ({ request, params, locals }) => {
    if (!locals.user) throw redirect(303, "/login");
    if (!ObjectId.isValid(params.groupId)) return fail(404, { error: "Group not found." });
    const form = await request.formData();
    const expenseId = String(form.get("expenseId") || "");
    const memberId = String(form.get("memberId") || "");
    if (!ObjectId.isValid(expenseId) || !ObjectId.isValid(memberId)) return fail(400, { error: "That payment is invalid." });
    if (memberId !== locals.user.id) return fail(403, { error: "Only that member can mark their split as paid." });
    const db = await getDb();
    const groupId = new ObjectId(params.groupId);
    const userId = new ObjectId(locals.user.id);
    const group = await db.collection("groups").findOne({ _id: groupId, memberIds: userId });
    if (!group || !group.memberIds.some((id) => id.equals(new ObjectId(memberId)))) return fail(403, { error: "You are not a member of this group." });
    const expense = await db.collection("expenses").findOne({ _id: new ObjectId(expenseId), groupId, deletedAt: null });
    if (!expense || !expense.splits?.some((split2) => split2.userId.equals(new ObjectId(memberId)))) return fail(404, { error: "That expense or split was not found." });
    const split = expense.splits.find((item) => item.userId.equals(new ObjectId(memberId)));
    await db.collection("expenses").updateOne({ _id: expense._id }, { $set: { "splits.$[split].paid": !Boolean(split.paid), updatedAt: /* @__PURE__ */ new Date() } }, { arrayFilters: [{ "split.userId": new ObjectId(memberId) }] });
    return { success: "Payment updated." };
  }
};
async function updateRequest(request, params, locals, status) {
  if (!locals.user) throw redirect(303, "/login");
  if (!ObjectId.isValid(params.groupId)) return fail(404, { error: "Group not found." });
  const form = await request.formData();
  const requestId = String(form.get("requestId") || "");
  if (!ObjectId.isValid(requestId)) return fail(400, { error: "That join request is invalid." });
  const db = await getDb();
  const groupId = new ObjectId(params.groupId);
  const userId = new ObjectId(locals.user.id);
  const group = await getCreatorGroup(db, groupId, userId);
  if (!group) return fail(403, { error: "Only the group creator can manage join requests." });
  const joinRequest = await db.collection("groupJoinRequests").findOne({ _id: new ObjectId(requestId), groupId, status: "pending" });
  if (!joinRequest) return fail(404, { error: "That join request is no longer pending." });
  if (status === "approved") await db.collection("groups").updateOne({ _id: groupId }, { $addToSet: { memberIds: joinRequest.userId }, $set: { updatedAt: /* @__PURE__ */ new Date() } });
  await db.collection("groupJoinRequests").updateOne({ _id: joinRequest._id, status: "pending" }, { $set: { status, updatedAt: /* @__PURE__ */ new Date() } });
  await notify(db, { userId: joinRequest.userId, type: `join-${status}`, title: `Group join request ${status}`, message: `Your request to join ${group.name} was ${status}.`, groupId });
  return { success: status === "approved" ? "Member approved." : "Request declined." };
}
export {
  actions,
  load
};
