import { redirect } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import { getGoogleAuthorizationUrl } from '$lib/server/auth.js';

export function GET({ cookies }) {
  const state = randomUUID();

  cookies.set('google_oauth_state', state, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10
  });

  throw redirect(303, getGoogleAuthorizationUrl(state));
}