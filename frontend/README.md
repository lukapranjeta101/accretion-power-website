# Accretion Power frontend

This folder contains the Accretion Power homepage and shared design components. Future scope includes the public product catalog, searchable cut-sheet downloads without login, customer account screens, and admin interface. Customer signup, login, and the estimate builder are not implemented.

- `public/images/` and `public/icons/`: publicly accessible visual assets. Never place private documents here.
- `src/app/`: application composition and page routing.
- `src/components/ui/` and `src/components/layout/`: shared interface and layout components.
- `src/features/`: products, cut sheets, estimates, authentication, accounts, and admin features.
- `src/lib/api/` and `src/lib/validation/`: API helpers and client-side validation for usability.
- `src/styles/` and `src/types/`: shared styles and types.

Backend APIs enforce permissions; frontend visibility is not access control. Browser-exposed configuration is public and must never contain secrets or internal pricing.

The homepage uses Next.js 16 (App Router), React 19, TypeScript 6, and Tailwind CSS 4. Manrope is loaded with `next/font/google` and served by Next.js. Network access is needed on a fresh build to download the font; visitors do not request it from Google.

## Run locally

Use Node.js 22 or 24 LTS (Next.js requires at least 20.9).

```sh
cd frontend
npm ci
npm run dev
```

Open http://localhost:3000. Dependencies are already installed in the current workspace. No environment variables or backend process are required for the homepage.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
```

Run browser checks against an already running local server:

```sh
npx playwright install chromium
npx playwright test
```

`PLAYWRIGHT_BASE_URL` optionally changes the tested origin, and `CHROMIUM_EXECUTABLE` optionally selects an existing Chromium executable. Browser tests cover 375, 768, 1440, and 1920px layouts, anchor destinations, keyboard/mobile navigation, runtime errors, and automated WCAG A/AA checks. Screenshots are saved under `/tmp/accretion-power-*.png`. Automated accessibility checks supplement manual visual and keyboard inspection.

TypeScript is kept on version 6 because the current TypeScript ESLint integration does not support version 7. ESLint is kept on version 9 because Next.js's bundled React lint plugin currently fails with ESLint 10. ESLint 9 emits an upstream deprecation warning; revisit these two tooling pins together when the integrations support newer majors. The application framework and styling dependencies use current stable releases recorded in `package-lock.json`.

## Edit the homepage

### Browser-injected hydration warnings

If React reports an extra body attribute such as `inject_newvt2_svd="true"`, that attribute is not emitted by this application. A browser extension or another injected script may be modifying the document before React hydrates it. Open `http://localhost:3000` in a clean browser profile or a private window with extensions disabled. If the warning disappears, disable the responsible extension for localhost and reload. Browser verification now checks React's hydration console errors as well as uncaught page errors. Avoid hiding this diagnostic globally with `suppressHydrationWarning`.

### Content and presentation files

- `src/features/home/content.ts`: main headings, descriptions, category names, estimate steps, and future verified contact details.
- `src/features/home/components/`: individual page sections, supporting interface copy, and original SVG illustrations.
- `src/styles/globals.css`: palette, spacing, typography, buttons, responsive layouts, and motion.
- `src/app/layout.tsx`: font loader and page metadata.
- `src/components/`: shared layout and interface primitives.

See `../docs/design-system.md` for the design specification and Ben's content checklist. The cut-sheet area is a noninteractive preview. Estimates describe a planned workflow. Contact details remain visibly pending. No backend routes, authentication, catalog, or estimate processing have been added.
