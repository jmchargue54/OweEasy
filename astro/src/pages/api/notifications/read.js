import { ObjectId } from 'mongodb';
import { getDb } from '../../../lib/server/db.js';
export async function POST({ request, locals, redirect }) { if (!locals.user) return redirect('/login', 303); const form = await request.formData(); const db = await getDb(); const filter = form.get('all') ? { userId: new ObjectId(locals.user.id), readAt: null } : { _id: new ObjectId(String(form.get('notificationId'))), userId: new ObjectId(locals.user.id) }; await db.collection('notifications').updateMany(filter, { $set: { readAt: new Date() } }); return redirect('/notifications', 303); }
