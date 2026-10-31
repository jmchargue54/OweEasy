import { ObjectId } from 'mongodb';
import { getDb } from '../../../lib/server/db.js';

export async function POST({ request, locals, redirect }) {
  if (!locals.user) return redirect('/login', 303);
  const form = await request.formData();
  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim().toLowerCase();
  if (name.length < 2 || !email.includes('@')) return redirect('/profile?error=Enter+a+valid+name+and+email.', 303);
  const db = await getDb();
  const duplicate = await db.collection('users').findOne({ email, _id: { $ne: new ObjectId(locals.user.id) } });
  if (duplicate) return redirect('/profile?error=That+email+is+already+in+use.', 303);
  await db.collection('users').updateOne({ _id: new ObjectId(locals.user.id) }, { $set: { name, email, updatedAt: new Date() } });
  return redirect('/profile?success=1', 303);
}
