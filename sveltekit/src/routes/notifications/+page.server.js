import { fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db.js';

export async function load({ locals }) {
  if (!locals.user) throw redirect(303, '/login');
  const db = await getDb();
  const userId = new ObjectId(locals.user.id);
  const notifications = await db.collection('notifications').find({ userId }).sort({ createdAt: -1 }).limit(100).toArray();
  return { notifications: notifications.map((notification) => ({ id: notification._id.toString(), type: notification.type, title: notification.title, message: notification.message, read: Boolean(notification.readAt), createdAt: notification.createdAt, href: notification.expenseId ? `/groups/${notification.groupId}/expenses/${notification.expenseId}/edit` : notification.groupId ? `/groups/${notification.groupId}` : '/notifications' })) };
}

export const actions = {
  markRead: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    const form = await request.formData();
    const notificationId = String(form.get('notificationId') || '');
    if (!ObjectId.isValid(notificationId)) return fail(400, { error: 'That notification is invalid.' });
    const db = await getDb();
    await db.collection('notifications').updateOne({ _id: new ObjectId(notificationId), userId: new ObjectId(locals.user.id) }, { $set: { readAt: new Date() } });
    return { success: 'Notification marked as read.' };
  },
  markAllRead: async ({ locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    const db = await getDb();
    await db.collection('notifications').updateMany({ userId: new ObjectId(locals.user.id), readAt: null }, { $set: { readAt: new Date() } });
    return { success: 'All notifications marked as read.' };
  }
};
