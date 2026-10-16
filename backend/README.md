# Accretion Power backend

This folder will contain API routes, authentication integration, authorization, database access, pricing calculations, estimate processing, and email/storage integrations.

- `src/config/`: server configuration.
- `src/routes/`: request routing into feature modules.
- `src/middleware/`: shared request concerns such as session verification, authorization, validation, and abuse protection.
- `src/modules/`: auth, users, products, cut sheets, pricing, estimates, and admin functionality.
- `src/services/email/` and `src/services/storage/`: email and file-storage integrations.
- `src/db/migrations/` and `src/db/seeds/`: database schema migrations and seed data.
- `src/lib/` and `src/types/`: shared backend utilities and types.
- `tests/integration/` and `tests/security/`: future integration and security tests.

The backend will own privileged operations and private data, enforce permissions and record ownership, calculate public prices using Ben's approved adjustment, and process estimate submissions for Ben to check stock. Internal prices must remain private. Submitted estimates are not orders or final quotes; final pricing is discussed privately between Ben and the customer.

This is a directory scaffold, not a runnable API. The framework, database, authentication provider, and integrations will be selected and implemented later.
