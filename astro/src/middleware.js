import { getUserBySession } from './lib/server/auth.js';

export async function onRequest(context, next) {
  const sessionId = context.cookies.get('session')?.value;
  context.locals.user = sessionId ? await getUserBySession(sessionId) : null;
  if (sessionId && context.locals.user) context.cookies.set('session', sessionId, { path: '/', httpOnly: true, sameSite: 'lax', secure: import.meta.env.PROD, maxAge: 1200 });
  const publicPaths = ['/','/login','/signup','/auth/google','/auth/google/callback'];
  if (!context.locals.user && !publicPaths.includes(context.url.pathname) && !context.url.pathname.startsWith('/api/auth') && !context.url.pathname.startsWith('/_')) return context.redirect('/login');
  return next();
}
