import { fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db.js';
import { notify } from '$lib/server/notifications.js';

function escapeRegex(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

export async function load({ locals, url }) {
  if (!locals.user) throw redirect(303, '/login');
  const query = url.searchParams.get('q')?.trim() || '';
  const db = await getDb();
  const filter = query ? { name: { $regex: escapeRegex(query), $options: 'i' } } : {};
  const groups = await db.collection('groups').find(filter).sort({ name: 1 }).limit(100).toArray();
  const userId = new ObjectId(locals.user.id);
  const creatorIds = groups.map((group) => group.createdBy).filter(Boolean);
  const creators = await db.collection('users').find({ _id: { $in: creatorIds } }, { projection: { name: 1 } }).toArray();
  const creatorNames = Object.fromEntries(creators.map((creator) => [creator._id.toString(), creator.name]));
  const requests = await db.collection('groupJoinRequests').find({ userId, groupId: { $in: groups.map((group) => group._id) } }).toArray();
  const requestStatuses = Object.fromEntries(requests.map((request) => [request.groupId.toString(), request.status]));
  return { query, groups: groups.map((group) => ({ id: group._id.toString(), name: group.name, memberCount: group.memberIds.length, creatorName: creatorNames[group.createdBy?.toString()] || 'Group creator', isMember: group.memberIds.some((id) => id.equals(userId)), requestStatus: requestStatuses[group._id.toString()] || null })) };
}

export const actions = {
  request: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    const form = await request.formData(); const groupId = String(form.get('groupId') || '');
    if (!ObjectId.isValid(groupId)) return fail(400, { error: 'That group could not be found.' });
    const db = await getDb(); const _id = new ObjectId(groupId); const userId = new ObjectId(locals.user.id);
    const group = await db.collection('groups').findOne({ _id });
    if (!group) return fail(404, { error: 'That group could not be found.' });
    if (group.memberIds.some((id) => id.equals(userId))) return fail(400, { error: 'You are already a member of that group.' });
    const existing = await db.collection('groupJoinRequests').findOne({ groupId: _id, userId });
    if (existing?.status === 'pending') return fail(400, { error: 'Your request is already waiting for approval.' });
    await db.collection('groupJoinRequests').updateOne({ groupId: _id, userId }, { $set: { status: 'pending', updatedAt: new Date() }, $setOnInsert: { groupId: _id, userId, createdAt: new Date() } }, { upsert: true });
    await notify(db, { userId: group.createdBy, type: 'join-request', title: 'New group join request', message: `${locals.user.name} requested to join ${group.name}.`, groupId: _id });
    return { success: 'Your request was sent to the group creator.' };
  }
};
