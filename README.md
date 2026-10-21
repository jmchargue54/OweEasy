# OweEasy

This repository contains multiple implementations of OweEasy:

- `sveltekit/` — the existing SvelteKit + MongoDB application.
- `astro/` — the separate Astro implementation.
- `docs/` — shared project planning and feature documentation.
- `project documentation/` — shared project and wireframe documentation.

Run an implementation from its own directory so its dependencies and configuration stay isolated:

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
