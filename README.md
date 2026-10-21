# OweEasy

This repository contains multiple implementations of OweEasy:

- `sveltekit/` — the active SvelteKit + MongoDB application and current source of truth.
- `astro/` — a separate reserved Astro implementation; it is not part of the current MVP path.
- `docs/` — current implementation status, feature inventory, and focused plans.
- `project documentation/` — product proposal, data model, API target, and wireframes.

Run the active implementation from its own directory so its dependencies and configuration stay isolated:

```powershell
cd sveltekit
npm run dev
```

```powershell
cd astro
npm install
npm run dev
```

Each implementation should have its own `.env` file and may use a different local development port.

## Current MVP path

Sign up or sign in, create or discover a group, request and approve membership, add an equal-split expense, edit or soft-delete it, mark shares paid, and review notifications. Calculated balances and settlement history are the next implementation slice.

See [docs/README.md](docs/README.md), [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md), and [docs/MVP_FEATURE_INVENTORY.md](docs/MVP_FEATURE_INVENTORY.md) for the reconciled plan and status.
