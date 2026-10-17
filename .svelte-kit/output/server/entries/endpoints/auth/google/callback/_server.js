import { redirect } from "@sveltejs/kit";
import { l as loginWithGoogle } from "../../../../../chunks/auth.js";
async function GET({ url, cookies }) {
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const savedState = cookies.get("google_oauth_state");
  cookies.delete("google_oauth_state", { path: "/" });
  if (!code || !returnedState || returnedState !== savedState) {
    throw redirect(303, "/login?error=oauth");
  }
  let result;
  try {
    result = await loginWithGoogle(code);
  } catch (error) {
    console.error("Google OAuth failed:", error);
    throw redirect(303, "/login?error=oauth");
  }
  cookies.set("session", result.sessionId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 14
  });
  throw redirect(303, "/dashboard");
}
export {
  GET
};
