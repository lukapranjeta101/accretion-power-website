# Intended architecture

The frontend homepage is implemented in Next.js (App Router), TypeScript, and Tailwind CSS. It is statically rendered; the mobile navigation is a small client component. No application API, authentication, database, or external business service is connected. The backend remains unchanged as a directory scaffold. The architecture below governs future application functionality.

The frontend will request data through backend APIs. It will provide the public website, catalog, cut-sheet search and downloads, customer account screens, estimate builder, and admin interface.

The backend will own privileged operations and private data, including internal pricing. It will enforce permissions, calculate public pricing using Ben's approved adjustment, recalculate estimate totals, preserve submitted prices, and process estimate submissions for stock checks.

Routes will map requests to feature modules. Modules will organize the auth, users, products, cut-sheets, pricing, estimates, and admin functionality. Middleware will handle shared request concerns such as session verification, authorization, validation, and abuse protection.

Services will contain integrations such as email and file storage. Database access, migrations, and seeds will live on the backend. Public cut sheets must be downloadable without login; private documents must be stored outside public directories and served only through authorized access.

The frontend framework is Next.js. The backend framework, database, and authentication provider will be selected in a later step. Next.js server rendering is a presentation concern here; it does not replace the planned backend ownership of permissions, private data, and business operations.
