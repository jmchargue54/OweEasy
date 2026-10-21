# OweEasy documentation and implementation plans

The active implementation is the SvelteKit app in `../sveltekit`. The Astro directory is a separate reserved implementation and is not the source of truth for the current MVP.

The plans below are now status documents as well as implementation guides. Their statuses were reconciled with the code in October 2026; “partial” means the implemented path is usable but the original plan still contains unfinished scope.

| Order | Feature ID | Plan | Depends on | Why this order |
|---:|---|---|---|---|
| 1 | F1 | Foundation and Authentication | none | Complete: local setup, email/Google identity, sessions, and protected routes. |
| 2 | F2 | Groups and Membership | F1 | Partial: group creation, discovery, join approval, and creator settings are implemented. |
| 3 | F3 | Expenses and Equal-split CRUD | F1, F2 | Complete for the current equal-split scope. |
| 4 | F4 | Balances and Settlements | F2, F3 | Partial: payment flags exist; computed balances and settlement records remain. |
| 5 | F5 | Dashboard and User Views | F1, F3, F4 | Partial: dashboard, group, add, and edit views exist; balance views remain. |
| 6 | F6 | Responsive UX, Accessibility, and Validation | F1–F5 | Partial: responsive/accessible states are present; automated QA remains. |
| 7 | F7 | API Documentation, README, and Release Readiness | F1–F6 | In progress: documentation and release checks are being reconciled. |

## Dependency map

- F1 → F2 and F3; F2 → F3 and F4.
- F3 → F4 and F5; F4 → F5.
- F1–F5 → F6; F1–F6 → F7.

## Current implementation path

The working path is: sign up or sign in → create or find a group → request membership when needed → approve a request as the group creator → add an equal-split expense → edit or soft-delete it → toggle member payment status → review notifications. The next product slice is F4 balance computation and settlement history.

The next UI/security refinement also includes three-second notification auto-read, clickable dashboard expense entries, payer-controlled payment marking, and session-only 20-minute inactivity expiration. These are planned requirements, not current behavior.

## Shared risks

- Balance calculations must be derived from active expenses and existing split/payment flags.
- Google OAuth requires environment configuration and a registered callback URL in each environment.
- The app currently uses form actions and server loads rather than a separate REST API; the API table in the project document is a target contract, not a list of existing endpoints.
- A build attempt is currently blocked by the local sandbox returning `spawn EPERM` from esbuild; `npm run check` completes with zero Svelte diagnostics.
