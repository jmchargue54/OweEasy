# OweEasy Implementation Plan (updated October 21, 2026)

The current working prototype uses SvelteKit SSR and MongoDB. The implemented path is sign up/sign in → create or discover a group → request/approve membership → add an equal-split expense → edit or soft-delete it → mark member shares paid → review notifications. This is not a production accounting system.

## Technology decisions

- SvelteKit server `load` functions, form actions, and protected routes.
- MongoDB Atlas with the official `mongodb` driver and cached connection.
- Email/password sessions and Google OAuth are implemented; Google still requires local/provider environment configuration.
- Server validation and integer USD cents; no floating-point values are persisted.

## Sequence

1. F1 foundation/authentication — complete: email signup/login/logout, Google OAuth callback, sessions, and protected routes.
2. F2 groups/membership — partial: create/list/search groups, join requests, creator approval, rename, and member removal are implemented; auto-netting and manual member addition are not.
3. F3 expenses — complete for equal splits: create/list/edit/soft-delete, category/date, integer cents, exact remainder allocation, and paid flags.
4. F4 balances/settlements — next: calculate raw balances, explain obligations, and persist settlement history.
5. F5 dashboard views — partial: dashboard, group expense list, add-expense preview, and edit view are implemented; dedicated balances and user summary views are not.
6. F6 quality — partial: responsive layouts, labels, empty/error/success states, and destructive confirmation exist; automated Playwright/axe coverage is still planned.
7. F7 release — current: keep documentation aligned with the SvelteKit routes, environment variables, deployment target, and known verification limits.

## Student-owned feature: Google sign-in

Google sign-in is implemented in `sveltekit/src/routes/auth/google/+server.js`, `sveltekit/src/routes/auth/google/callback/+server.js`, and `sveltekit/src/lib/server/auth.js`. The flow stores a short-lived state cookie, validates the returned state, verifies the Google ID token, upserts the user, creates the existing session, and redirects to `/dashboard`. Provider keys remain in `.env` only.

## Acceptance checklist

- Unauthenticated users are redirected from protected routes.
- Invalid input returns an accessible error without partial writes.
- Groups and expenses are membership-protected.
- Stored expense cents and split cents total exactly.
- Desktop/mobile forms remain usable.
- `npm run check` passes with zero Svelte diagnostics. `npm run build` should be run in a normal local Node environment; the current Codex sandbox reports esbuild `spawn EPERM` before compilation begins.
