import { getUserBySession } from '$lib/server/auth.js';
export async function handle({ event, resolve }) { const sessionId=event.cookies.get('session'); event.locals.user=sessionId?await getUserBySession(sessionId):null; return resolve(event); }
