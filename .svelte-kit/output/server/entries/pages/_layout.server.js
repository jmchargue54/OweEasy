import { ObjectId } from "mongodb";
import { g as getDb } from "../../chunks/db.js";
async function load({ locals }) {
  if (!locals.user) return { user: null, unreadNotifications: 0 };
  const db = await getDb();
  const unreadNotifications = await db.collection("notifications").countDocuments({ userId: new ObjectId(locals.user.id), readAt: null });
  return { user: locals.user, unreadNotifications };
}
export {
  load
};
