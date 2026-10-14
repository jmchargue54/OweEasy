# OweEasy

OweEasy is a SvelteKit + MongoDB prototype for shared group expenses. The MVP supports email signup/login/logout, protected routes, group creation, and equal-split expense entry.

## Run locally

1. In MongoDB Atlas, create a free cluster and database user, allow your development IP, and copy the Node.js connection string.
2. Copy `.env.example` to `.env`; set `MONGODB_URI`, `MONGODB_DB`, and a long random `SESSION_SECRET`.
3. Run `npm install`, then `npm run dev -- --open`.
4. Visit `http://localhost:5173`, create an account, create a group, and add an expense.

The app creates indexes on first connection. Never commit `.env`.

## MongoDB connection walkthrough

`src/lib/server/db.js` caches one MongoClient and creates indexes for users, sessions, groups, expenses, and settlements. `src/hooks.server.js` reads the HTTP-only session cookie before each request. Groups store member ObjectIds; expenses store integer `amountCents` and explicit cent-based `splits`. The server, not just the browser, checks group membership and validates expenses.

## Assignment plan

See `docs/IMPLEMENTATION_PLAN.md`. Google OAuth is intentionally reserved for you in `src/routes/login/+page.server.js` with a TODO comment. Existing `docs/plans` files remain the source of truth for future balances, settlements, accessibility, and release documentation.

## Commands

`npm run check` and `npm run build`
