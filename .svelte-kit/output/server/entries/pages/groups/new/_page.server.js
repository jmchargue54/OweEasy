import { redirect, fail } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { g as getDb } from "../../../../chunks/db.js";
const actions = { default: async ({ request, locals }) => {
  if (!locals.user) throw redirect(303, "/login");
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  if (name.length < 2) return fail(400, { error: "Give your group a name with at least 2 characters." });
  const db = await getDb();
  const id = new ObjectId();
  await db.collection("groups").insertOne({ _id: id, name, memberIds: [new ObjectId(locals.user.id)], autoNettingEnabled: false, createdBy: new ObjectId(locals.user.id), createdAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() });
  throw redirect(303, `/groups/${id}`);
} };
export {
  actions
};
