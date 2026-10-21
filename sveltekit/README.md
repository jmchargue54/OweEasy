# OweEasy

OweEasy is a SvelteKit + MongoDB prototype for shared group expenses. The current MVP supports email signup/login/logout, Google OAuth, protected routes, group discovery and join approval, creator settings, equal-split expense CRUD, paid-share tracking, and in-app notifications.

## Run locally

1. In MongoDB Atlas, create a free cluster and database user, allow your development IP, and copy the Node.js connection string.
2. Copy `.env.example` to `.env`; set `MONGODB_URI`, `MONGODB_DB`, and a long random `SESSION_SECRET`.
3. Run `npm install`, then `npm run dev -- --open`.
4. Visit `http://localhost:5173`, create an account, create or join a group, and add an expense.

The app creates indexes on first connection. Never commit `.env`.

## MongoDB connection walkthrough

`src/lib/server/db.js` caches one MongoClient and creates indexes for users, sessions, groups, join requests, expenses, settlements, and notifications. `src/hooks.server.js` reads the HTTP-only session cookie before each request. Groups store member ObjectIds; expenses store integer `amountCents` and explicit cent-based `splits`; notifications link join requests and expenses to users. The server, not just the browser, checks group membership and validates expenses.

## Assignment plan

See `../docs/IMPLEMENTATION_PLAN.md`. Google OAuth is implemented in `src/routes/auth/google/` and requires the Google variables in `.env`. The focused `../docs/plans` files describe what is complete, partial, and still planned for balances, settlements, quality, and release readiness.

## Commands

`npm run check` and `npm run build`

`npm run check` currently completes with zero Svelte diagnostics. If `npm run build` reports `spawn EPERM` from esbuild in a restricted environment, rerun it in a normal local Node environment.
