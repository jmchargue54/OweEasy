import { fail, redirect } from "@sveltejs/kit";
import { b as login } from "../../../chunks/auth.js";
const actions = { default: async ({ request, cookies }) => {
  const form = await request.formData();
  try {
    const result = await login(String(form.get("email") || ""), String(form.get("password") || ""));
    cookies.set("session", result.sessionId, { path: "/", httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 1209600 });
  } catch (error) {
    return fail(400, { error: error.message });
  }
  throw redirect(303, "/dashboard");
} };
function load({ url }) {
  return {
    oauthError: url.searchParams.get("error") === "oauth" ? "Google sign-in failed. Please try again." : null
  };
}
export {
  actions,
  load
};
