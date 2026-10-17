import { redirect, fail } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { g as getDb } from "../../../../../../../chunks/db.js";
async function getExpenseContext(params, locals) {
  if (!locals.user) throw redirect(303, "/login");
  if (!ObjectId.isValid(params.groupId) || !ObjectId.isValid(params.expenseId)) throw redirect(303, "/dashboard");
  const db = await getDb();
  const groupId = new ObjectId(params.groupId);
  const userId = new ObjectId(locals.user.id);
  const group = await db.collection("groups").findOne({ _id: groupId, memberIds: userId });
  const expense = await db.collection("expenses").findOne({ _id: new ObjectId(params.expenseId), groupId, deletedAt: null });
  if (!group || !expense) throw redirect(303, `/groups/${params.groupId}`);
  const users = await db.collection("users").find({ _id: { $in: group.memberIds } }, { projection: { name: 1 } }).toArray();
  return { db, group, expense, members: group.memberIds.map((id) => ({ id: id.toString(), name: users.find((user) => user._id.equals(id))?.name || "Unknown member" })) };
}
async function load({ params, locals }) {
  const { group, expense, members } = await getExpenseContext(params, locals);
  return {
    group: { id: group._id.toString(), name: group.name, members },
    expense: { id: expense._id.toString(), description: expense.description, amount: expense.amountCents, date: expense.date, category: expense.category || "Other", splits: (expense.splits || []).map((split) => ({ userId: split.userId.toString(), paid: Boolean(split.paid) })) }
  };
}
const actions = { default: async ({ request, params, locals }) => {
  const form = await request.formData();
  if (String(form.get("intent") || "") === "remove") {
    const { db: db2, expense: expense2 } = await getExpenseContext(params, locals);
    await db2.collection("expenses").updateOne({ _id: expense2._id }, { $set: { deletedAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() } });
    throw redirect(303, `/groups/${params.groupId}`);
  }
  const description = String(form.get("description") || "").trim();
  const amount = Number(form.get("amount"));
  const date = String(form.get("date") || "");
  const memberIds = form.getAll("memberIds").map(String);
  if (!description || !Number.isFinite(amount) || amount <= 0 || !date || !memberIds.length) return fail(400, { error: "Enter a description, positive amount, date, and at least one member." });
  const { db, group, expense } = await getExpenseContext(params, locals);
  const validMemberIds = new Set(group.memberIds.map((id) => id.toString()));
  if (memberIds.some((id) => !ObjectId.isValid(id) || !validMemberIds.has(id))) return fail(400, { error: "Choose valid group members." });
  const amountCents = Math.round(amount * 100);
  const splitCents = Math.floor(amountCents / memberIds.length);
  const remainder = amountCents - splitCents * memberIds.length;
  const previousSplits = new Map((expense.splits || []).map((split) => [split.userId.toString(), split]));
  const splits = memberIds.map((userId, index) => ({ userId: new ObjectId(userId), shareCents: splitCents + (index === 0 ? remainder : 0), paid: Boolean(previousSplits.get(userId)?.paid) }));
  await db.collection("expenses").updateOne({ _id: expense._id }, { $set: { description, amountCents, date, category: String(form.get("category") || "Other"), splits, updatedAt: /* @__PURE__ */ new Date() } });
  throw redirect(303, `/groups/${params.groupId}`);
} };
export {
  actions,
  load
};
