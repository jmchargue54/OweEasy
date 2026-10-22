# OweEasy — Astro

An Astro SSR implementation of OweEasy's shared-expense MVP. It uses MongoDB, HTTP-only sessions, Google OAuth, and server-side membership authorization.

## Run locally

```powershell
npm install
npm run dev
```

Create `astro/.env` with `MONGODB_URI`, `MONGODB_DB`, `SESSION_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REDIRECT_URI` before starting the app. The Google callback must match the value registered in Google Cloud Console, for example `http://localhost:4321/auth/google/callback`.

The UI covers the product path: dashboard, group ledger, equal-split expense entry, explainable balances, settlement history, notifications, group join requests, and creator/member payment authorization.
