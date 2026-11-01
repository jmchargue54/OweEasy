import { getUserBySession } from './lib/server/auth.js';

export async function onRequest(context, next) {
  const sessionId = context.cookies.get('session')?.value;
  context.locals.user = null;
  if (sessionId) {
    try {
      context.locals.user = await getUserBySession(sessionId);
    } catch (error) {
      // A stale session or unavailable database must not crash public routes.
      console.error('Session lookup failed:', error);
      context.cookies.delete('session', { path: '/' });
    }
  }
  if (sessionId && context.locals.user) context.cookies.set('session', sessionId, { path: '/', httpOnly: true, sameSite: 'lax', secure: context.url.protocol === 'https:', maxAge: 1200 });
  const publicPaths = ['/','/login','/signup','/auth/google','/auth/google/callback'];
  if (!context.locals.user && !publicPaths.includes(context.url.pathname) && !context.url.pathname.startsWith('/api/auth') && !context.url.pathname.startsWith('/_')) return context.redirect('/login');
  return next();
}
