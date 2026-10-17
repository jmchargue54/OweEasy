import { g as getUserBySession } from "../chunks/auth.js";
async function handle({ event, resolve }) {
  const sessionId = event.cookies.get("session");
  event.locals.user = sessionId ? await getUserBySession(sessionId) : null;
  return resolve(event);
}
export {
  handle
};
