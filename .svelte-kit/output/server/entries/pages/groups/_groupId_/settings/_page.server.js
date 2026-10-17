import { fail, redirect, error } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { g as getDb } from "../../../../../chunks/db.js";
async function getSettingsContext(params, locals) {
  if (!locals.user) throw redirect(303, "/login");
  if (!ObjectId.isValid(params.groupId)) throw error(404, "Group not found");
  const db = await getDb();
  const groupId = new ObjectId(params.groupId);
  const userId = new ObjectId(locals.user.id);
  const group = await db.collection("groups").findOne({ _id: groupId, memberIds: userId, createdBy: userId });
  if (!group) throw error(403, "Only the group creator can manage group settings.");
  const users = await db.collection("users").find({ _id: { $in: group.memberIds } }, { projection: { name: 1 } }).toArray();
  const names = Object.fromEntries(users.map((user) => [user._id.toString(), user.name]));
  return { db, group, members: group.memberIds.map((id) => ({ id: id.toString(), name: names[id.toString()] || "Unknown member", isCreator: group.createdBy.equals(id) })) };
}
async function load({ params, locals }) {
  const { group, members } = await getSettingsContext(params, locals);
  return { group: { id: group._id.toString(), name: group.name, members } };
}
const actions = {
  rename: async ({ request, params, locals }) => {
    const form = await request.formData();
    const name = String(form.get("name") || "").trim();
    if (name.length < 2) return fail(400, { error: "Give your group a name with at least 2 characters." });
    const { db, group } = await getSettingsContext(params, locals);
    await db.collection("groups").updateOne({ _id: group._id }, { $set: { name, updatedAt: /* @__PURE__ */ new Date() } });
    return { success: "Group name updated." };
  },
  removeMember: async ({ request, params, locals }) => {
    const form = await request.formData();
    const memberId = String(form.get("memberId") || "");
    if (!ObjectId.isValid(memberId)) return fail(400, { error: "That member is invalid." });
    const { db, group } = await getSettingsContext(params, locals);
    const memberObjectId = new ObjectId(memberId);
    if (group.createdBy.equals(memberObjectId)) return fail(400, { error: "The group creator cannot be removed." });
    const result = await db.collection("groups").updateOne({ _id: group._id, memberIds: memberObjectId }, { $pull: { memberIds: memberObjectId }, $set: { updatedAt: /* @__PURE__ */ new Date() } });
    if (!result.modifiedCount) return fail(404, { error: "That member is no longer in the group." });
    return { success: "Member removed from the group." };
  }
};
export {
  actions,
  load
};
