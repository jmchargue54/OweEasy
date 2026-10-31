import { deleteSession } from '../../../lib/server/auth.js';
export async function POST({ cookies, redirect }) { await deleteSession(cookies.get('session')?.value); cookies.delete('session', { path: '/' }); return redirect('/login', 303); }
