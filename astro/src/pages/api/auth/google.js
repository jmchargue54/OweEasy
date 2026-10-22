import { randomUUID } from 'node:crypto';
import { googleAuthorizationUrl } from '../../../lib/server/auth.js';
export function GET({ cookies, redirect }) { const state = randomUUID(); cookies.set('google_oauth_state', state, { path: '/', httpOnly: true, sameSite: 'lax', secure: import.meta.env.PROD, maxAge: 600 }); return redirect(googleAuthorizationUrl(state), 303); }
