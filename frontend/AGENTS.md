<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Persistent brand requirement

Follow `../AGENTS.md` and `../docs/design-system.md`: black (`#040411`) and white (`#FFFFFF`) dominate, with accents `#91A9C9`, `#041128`, `#848C9B`, and `#B2B4AB`. Use the canonical CSS variables in `src/styles/globals.css`. This replaces Eucalyptus Grove. Preserve the exact values and restrained accent usage unless the user explicitly changes the direction.
