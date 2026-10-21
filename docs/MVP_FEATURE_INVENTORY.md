# OweEasy MVP Feature Inventory (updated October 21, 2026)

The MVP is intentionally grouped into seven implementation plans. The status column reflects the current SvelteKit implementation, not the original proposal.

1. **F1 — Foundation and Authentication — complete** — local setup, MongoDB user persistence, email/Google sign-in, 14-day HTTP-only sessions, protected routes, and current-user navigation.
2. **F2 — Groups and Membership — partial** — group creation/listing/search, member display, join requests, creator approval/rejection, rename, and member removal. Manual add and auto-netting settings remain planned.
3. **F3 — Expenses and Equal-split CRUD — complete for current scope** — expense persistence, categories, create/list, equal cent allocation, edit, soft delete, and paid-share toggles.
4. **F4 — Balances and Settlements — partial/not complete** — payment flags are stored on expense splits, but calculated balances, auto-netting, settlement records, and settlement history are not implemented. The next payment authorization requirement is that only the expense creator may mark other members paid; other users may mark only themselves.
5. **F5 — Dashboard and User Views — partial** — dashboard, group page, add-expense preview, edit-expense page, group settings, join-group discovery, and notifications are implemented. Dedicated balance and user-summary views remain planned; dashboard recent expenses are planned to become clickable links to their expense views.
6. **F6 — Responsive UX, Accessibility, and Validation — partial** — responsive CSS, labeled forms, semantic headings, empty/error/success states, and delete confirmation are present. Automated Playwright/axe tests and shared validation modules remain planned. Notification screens should auto-mark unread notifications after three seconds.
7. **F7 — API Documentation, README, and Release Readiness — in progress** — setup and implementation notes are being updated here; a REST API does not yet exist because the app uses SvelteKit form actions and server loads.

## Current route inventory

| Area | Implemented routes |
|---|---|
| Public/auth | `/`, `/login`, `/signup`, `/logout`, `/auth/google`, `/auth/google/callback` |
| Dashboard | `/dashboard` |
| Groups | `/groups/new`, `/groups/join`, `/groups/[groupId]`, `/groups/[groupId]/settings` |
| Expenses | `/groups/[groupId]/expenses/new`, `/groups/[groupId]/expenses/[expenseId]/edit` |
| Notifications | `/notifications` |

All group-scoped loads and actions verify the authenticated user is a member; creator-only actions additionally verify `createdBy`.

## Pending session behavior

The requested session policy is a browser-session cookie that expires when the user leaves the site and a server-side inactivity timeout of 20 minutes. The current implementation still uses a 14-day session cookie/database expiration and must be changed in a future implementation pass.

