import { ObjectId } from 'mongodb';
import { getDb } from '../../../lib/server/db.js';
export async function POST({ request, locals, redirect }) {
  if (!locals.user) return redirect('/login', 303);
  const form = await request.formData(); const groupId = String(form.get('groupId') || ''); const expenseId = String(form.get('expenseId') || '');
  if (!ObjectId.isValid(groupId)) return redirect('/dashboard', 303);
  const db = await getDb(); const gid = new ObjectId(groupId); const uid = new ObjectId(locals.user.id); const group = await db.collection('groups').findOne({ _id: gid, memberIds: uid }); if (!group) return new Response('Forbidden', { status: 403 });
  const description = String(form.get('description') || '').trim(); const amount = Number(form.get('amount')); const date = String(form.get('date') || ''); const memberIds = form.getAll('memberIds').map(String).filter(ObjectId.isValid); const participants = memberIds.length ? memberIds : group.memberIds.map((id) => id.toString());
  if (!description || !Number.isFinite(amount) || amount <= 0 || !date) return redirect(`/groups/${groupId}/expenses/new?error=invalid`, 303);
  if (participants.some((id) => !group.memberIds.some((memberId) => memberId.toString() === id))) return new Response('Invalid member', { status: 400 });
  const amountCents = Math.round(amount * 100); const base = Math.floor(amountCents / participants.length); const remainder = amountCents - base * participants.length; const previous = expenseId && ObjectId.isValid(expenseId) ? await db.collection('expenses').findOne({ _id: new ObjectId(expenseId), groupId: gid, deletedAt: null }) : null;
  const previousPaid = new Map((previous?.splits || []).map((split) => [split.userId.toString(), Boolean(split.paid)])); const splits = participants.map((id, index) => ({ userId: new ObjectId(id), shareCents: base + (index === 0 ? remainder : 0), paid: previous ? Boolean(previousPaid.get(id)) : id === locals.user.id }));
  const values = { groupId: gid, payerId: uid, payerName: locals.user.name, description, amountCents, date, category: String(form.get('category') || 'Other'), splits, deletedAt: null, createdBy: uid, updatedAt: new Date() };
  if (previous) await db.collection('expenses').updateOne({ _id: previous._id }, { $set: values }); else await db.collection('expenses').insertOne({ ...values, createdAt: new Date() });
  return redirect(`/groups/${groupId}`, 303);
}
