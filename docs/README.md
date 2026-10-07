# Shared Expense Tracker Feature Plans

There are seven focused plans. The earlier 39-slice inventory was consolidated so each file represents one coherent implementation area while still naming the smaller slices it contains. Notifications are deferred to future improvements.

| Order | Feature ID | Plan | Depends on | Why this order |
|---:|---|---|---|---|
| 1 | F1 | Foundation and Authentication | none | Establishes local setup, identity, and protected routes. |
| 2 | F2 | Groups and Membership | F1 | Establishes the group boundary for private shared data. |
| 3 | F3 | Expenses and Equal-split CRUD | F1, F2 | Stores the source data needed for balances. |
| 4 | F4 | Balances and Settlements | F2, F3 | Calculates obligations and records payments. |
| 5 | F5 | Dashboard and User Views | F1, F3, F4 | Connects the core workflows into usable views. |
| 6 | F6 | Responsive UX, Accessibility, and Validation | F1–F5 | Hardens every MVP flow across devices and users. |
| 7 | F7 | API Documentation, README, and Release Readiness | F1–F6 | Makes the completed MVP runnable, reviewable, and handoff-ready. |

## Dependency map

- F1 → F2 and F3; F2 → F3 and F4.
- F3 → F4 and F5; F4 → F5.
- F1–F5 → F6; F1–F6 → F7.

## First feature to implement

Start with **F1 — Foundation and Authentication** because it removes uncertainty about setup, migrations, sessions, and protected routes for every later plan.

## Shared risks

- A late authentication-provider decision can delay F1 and every protected route.
- Inconsistent integer-cent or soft-delete rules can force rework in F3 and F4.
- Unclear membership authorization can invalidate group, expense, and balance behavior.
- Missing migration and test conventions can slow all parallel work.
