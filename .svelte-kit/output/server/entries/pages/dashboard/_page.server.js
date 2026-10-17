import { redirect } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { g as getDb } from "../../../chunks/db.js";
async function load({ locals }) {
  if (!locals.user) throw redirect(303, "/login");
  const db = await getDb();
  const uid = new ObjectId(locals.user.id);
  const groups = await db.collection("groups").find({ memberIds: uid }).sort({ createdAt: -1 }).toArray();
  const ids = groups.map((g) => g._id);
  const expenses = await db.collection("expenses").find({ groupId: { $in: ids }, deletedAt: null }).sort({ date: -1 }).limit(5).toArray();
  const names = Object.fromEntries(groups.map((g) => [g._id.toString(), g.name]));
  return { groups: groups.map((g) => ({ id: g._id.toString(), name: g.name, memberCount: g.memberIds.length })), expenses: expenses.map((e) => ({ id: e._id.toString(), description: e.description, amount: e.amountCents, date: e.date, groupName: names[e.groupId.toString()] })) };
}
export {
  load
};
