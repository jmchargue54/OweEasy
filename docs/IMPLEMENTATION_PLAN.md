# OweEasy Bakeoff 1 Implementation Plan

Build a working prototype in two weeks with SvelteKit SSR and MongoDB. Core path: sign up/log in → create a group → add an equal-split expense → inspect the group expense list. This is not a production accounting system.

## Technology decisions

- SvelteKit server `load` functions, form actions, and protected routes.
- MongoDB Atlas with the official `mongodb` driver and cached connection.
- Email/password sessions now; Google OAuth reserved as the student-owned feature.
- Server validation and integer USD cents; no floating-point values are persisted.

## Sequence

1. F1 foundation/authentication — complete.
2. F2 groups/membership — current-user group creation and server membership checks complete.
3. F3 expenses — equal split, category, date, payer, and explicit shares complete.
4. F4 balances/settlements — next: raw balances, traceable obligations, settlement history.
5. F5 dashboard views — richer cross-group totals and expense detail/edit.
6. F6 quality — reusable loading/error states, keyboard/mobile review, Playwright/axe tests.
7. F7 release — route, authorization, deployment, and known-issue documentation.

## Student-owned feature: Google sign-in

Implement this in `src/routes/login/+page.server.js` at the TODO. Use a maintained OAuth library, validate callback state/nonce, upsert the verified user, create the existing session record/cookie, and redirect to `/dashboard`. Keep provider keys in `.env` only.

## Acceptance checklist

- Unauthenticated users are redirected from protected routes.
- Invalid input returns an accessible error without partial writes.
- Groups and expenses are membership-protected.
- Stored expense cents and split cents total exactly.
- Desktop/mobile forms remain usable.
- `npm run check` and `npm run build` pass.
