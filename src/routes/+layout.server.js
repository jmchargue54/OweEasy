import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db.js';

export async function load({ locals }) {
  if (!locals.user) return { user: null, unreadNotifications: 0 };
  const db = await getDb();
  const unreadNotifications = await db.collection('notifications').countDocuments({ userId: new ObjectId(locals.user.id), readAt: null });
  return { user: locals.user, unreadNotifications };
}
