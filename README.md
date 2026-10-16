# Accretion Power

The frontend now contains a runnable homepage built with Next.js, TypeScript, and Tailwind CSS. The backend remains a directory scaffold; no services are connected.

- `frontend/` contains the public website, product catalog, customer account screens, and admin interface.
- `backend/` contains APIs, authentication integration, authorization, database access, pricing calculations, estimate processing, and integrations.
- `docs/` records the project brief, intended architecture, and future security requirements.

Run the homepage with `cd frontend` followed by `npm run dev`, then open http://localhost:3000. See `frontend/README.md` for setup and verification commands and `docs/design-system.md` for visual conventions and content awaiting confirmation.

The frontend will request application data through backend APIs in later development. The backend will enforce permissions and protect private data and privileged operations. The backend framework, database, and authentication provider will be selected later.
