import { randomUUID } from 'node:crypto';
import { googleAuthorizationUrl } from '../../../lib/server/auth.js';
export function GET({ cookies, redirect, url }) { const state = randomUUID(); cookies.set('google_oauth_state', state, { path: '/', httpOnly: true, sameSite: 'lax', secure: url.protocol === 'https:', maxAge: 600 }); return redirect(googleAuthorizationUrl(state), 303); }
