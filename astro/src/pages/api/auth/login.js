import { login } from '../../../lib/server/auth.js';
export async function POST({ request, cookies, redirect }) {
  try { const form = await request.formData(); const result = await login(form.get('email'), form.get('password')); cookies.set('session', result.sessionId, { path: '/', httpOnly: true, sameSite: 'lax', secure: import.meta.env.PROD, maxAge: 1200 }); return redirect('/dashboard', 303); }
  catch { return redirect('/login?error=credentials', 303); }
}
