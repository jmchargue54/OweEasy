import { createUser, createSession } from '../../../lib/server/auth.js';
export async function POST({ request, cookies, redirect }) {
  try { const form = await request.formData(); const user = await createUser(form.get('name'), form.get('email'), form.get('password')); const result = await createSession({ _id: user.id, name: user.name, email: user.email }); cookies.set('session', result.sessionId, { path: '/', httpOnly: true, sameSite: 'lax', secure: import.meta.env.PROD, maxAge: 1200 }); return redirect('/dashboard', 303); }
  catch (error) { return redirect(`/signup?error=${encodeURIComponent(error.code === 11000 ? 'An account with that email already exists.' : error.message)}`, 303); }
}
