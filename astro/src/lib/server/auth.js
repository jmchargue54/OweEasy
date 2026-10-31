import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import { OAuth2Client } from 'google-auth-library';
import { ObjectId } from 'mongodb';
import { getDb } from './db.js';

const env = (key) => process.env[key] || import.meta.env[key];
const googleClient = new OAuth2Client(env('GOOGLE_CLIENT_ID'), env('GOOGLE_CLIENT_SECRET'), env('GOOGLE_REDIRECT_URI'));

export async function createUser(name, email, password) {
  name = String(name || '').trim(); email = String(email || '').trim().toLowerCase();
  if (name.length < 2 || !email.includes('@') || password.length < 8) throw new Error('Enter a name, valid email, and password of at least 8 characters.');
  const db = await getDb();
  const user = { name, email, passwordHash: await bcrypt.hash(password, 12), googleSub: null, avatarUrl: null, createdAt: new Date(), updatedAt: new Date() };
  const result = await db.collection('users').insertOne(user);
  return { id: result.insertedId.toString(), name, email };
}

export async function login(email, password) {
  const db = await getDb(); const user = await db.collection('users').findOne({ email: String(email || '').trim().toLowerCase() });
  if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) throw new Error('Email or password is incorrect.');
  return createSession(user);
}

export function googleAuthorizationUrl(state) {
  if (!env('GOOGLE_CLIENT_ID') || !env('GOOGLE_CLIENT_SECRET') || !env('GOOGLE_REDIRECT_URI')) throw new Error('Google OAuth is not configured.');
  return googleClient.generateAuthUrl({ access_type: 'online', scope: ['openid', 'email', 'profile'], state, prompt: 'select_account' });
}

export async function loginWithGoogle(code) {
  const { tokens } = await googleClient.getToken(code);
  if (!tokens.id_token) throw new Error('Google did not return an identity token.');
  const ticket = await googleClient.verifyIdToken({ idToken: tokens.id_token, audience: env('GOOGLE_CLIENT_ID') });
  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email || !payload.email_verified) throw new Error('Google account information is incomplete.');
  const db = await getDb(); const email = payload.email.trim().toLowerCase();
  let user = await db.collection('users').findOne({ $or: [{ googleSub: payload.sub }, { email }] });
  if (!user) {
    const newUser = { name: payload.name || email.split('@')[0], email, googleSub: payload.sub, avatarUrl: payload.picture || null, passwordHash: null, createdAt: new Date(), updatedAt: new Date() };
    const result = await db.collection('users').insertOne(newUser); user = { _id: result.insertedId, ...newUser };
  } else if (user.googleSub && user.googleSub !== payload.sub) throw new Error('This email is linked to another Google account.');
  else if (!user.googleSub) await db.collection('users').updateOne({ _id: user._id }, { $set: { googleSub: payload.sub, avatarUrl: payload.picture || null, updatedAt: new Date() } });
  return createSession(user);
}

export async function createSession(user) {
  const db = await getDb(); const sessionId = randomUUID(); const userId = typeof user._id === 'string' ? new ObjectId(user._id) : user._id;
  await db.collection('sessions').insertOne({ _id: sessionId, userId, expiresAt: new Date(Date.now() + 20 * 60 * 1000), lastActivityAt: new Date() });
  return { sessionId, user: { id: user._id.toString(), name: user.name, email: user.email } };
}

export async function getUserBySession(sessionId) {
  if (!sessionId) return null;
  const db = await getDb(); const session = await db.collection('sessions').findOne({ _id: sessionId, expiresAt: { $gt: new Date() } });
  if (!session) return null;
  const now = new Date(); await db.collection('sessions').updateOne({ _id: sessionId }, { $set: { lastActivityAt: now, expiresAt: new Date(now.getTime() + 20 * 60 * 1000) } });
  const user = await db.collection('users').findOne({ _id: session.userId });
  return user ? { id: user._id.toString(), name: user.name, email: user.email } : null;
}

export async function deleteSession(sessionId) { if (sessionId) await (await getDb()).collection('sessions').deleteOne({ _id: sessionId }); }
