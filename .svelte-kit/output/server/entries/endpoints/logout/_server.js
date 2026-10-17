import { redirect } from "@sveltejs/kit";
import { d as deleteSession } from "../../../chunks/auth.js";
async function POST({ cookies }) {
  await deleteSession(cookies.get("session"));
  cookies.delete("session", { path: "/" });
  throw redirect(303, "/");
}
export {
  POST
};
