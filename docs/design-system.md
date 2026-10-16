<!-- Shared navigation and surfaces update: 2026-10-08 -->
All active pages now use `components/layout/site-header.tsx`. Navigation starts white over the dark page and transitions to near-black when its white backing appears after 50px of scroll. The mobile menu uses dark text on its white panel. All page section backgrounds use the homepage surface, `--ink` (`#040411`); alternating warm and accent section backgrounds are removed. Supporting copy, table links, and labels use colors appropriate to dark surfaces. Product diagrams and light controls retain their existing light fields. This supersedes earlier alternating-surface and page-specific header notes below.

<!-- Current palette update: 2026-10-07 -->
The user reverted the lime experiment. Restore soft greyish blue `#91A9C9` accents, the derived blue section backgrounds, and pale blue product panels. No lime token or navy backing behind highlighted words. Keep the hero contrast overlay. Accent text on light backgrounds uses the darker derived blue for readability; on dark backgrounds it uses the original soft blue. This supersedes the earlier same-day text-color changes below.

# Accretion Power — black, white, and confident brand blue

The user's approved direction as of 2026-10-02: black, white, and the supplied blue (plus its derived shades) form the working palette, with blue now allowed to anchor whole sections and primary actions — not just small details. This supersedes the earlier "accents only, never flood a section" rule and all earlier themes (Eucalyptus Grove included). The palette, type system, and signature motif below are implemented in `frontend/src/styles/globals.css`, `frontend/src/app/layout.tsx`, `frontend/src/features/home/landing-page.tsx`, `frontend/src/features/products/products-page.tsx`, and `frontend/src/features/datasheets/datasheets-page.tsx`.

## Typography

- Display (`--font-display`, headings and the brand wordmark): **Big Shoulders** (variable, `opsz` axis), loaded via `next/font/google` in `layout.tsx`. Condensed, heavy, industrial — named for Chicago's "city of big shoulders" steel heritage; reads as fabricated rather than typed.
- Body (`--font-body`): **IBM Plex Sans** — a corporate/engineering-heritage grotesk, used for all running copy.
- Labels, nav, buttons, eyebrows, dimension callouts (`--font-mono`): **IBM Plex Mono**, upper-cased with wide tracking — reads like a drawing's title-block text.
- In CSS, always consume the `--ff-display` / `--ff-body` / `--ff-mono` aliases (defined in `:root`), not the raw `--font-*` custom properties — the raw ones are injected directly onto `<html>` by `next/font` and have no fallback stack of their own.

## Signature motif — "the drawing register"

Accretion's own cut sheets are precise, dimensioned CAD drawings in black line work with teal/blue dimension lines — `--color-blue` was chosen to sit close to that existing dimension-line tone, confirmed against the real assets in `frontend/public/images/` (`epoxy.png` especially). The site borrows that vocabulary instead of generic SaaS gradients or motion:
- `.arrow-badge` — a small filled blue circle carrying the arrow glyph, used inside every button and text-link (`<Arrow />` in both page files). Blue is a fill behind a dark icon here, never thin text/strokes directly on white, to keep contrast safe (`#91A9C9` on white fails text/graphic contrast; on `--color-black`/`--color-navy` it passes easily).
- `.dim-rule` / `.section-marker::before` — a hairline with perpendicular tick ends, styled after a CAD extension line, used as a quiet divider under the catalog search/nav and before section markers.
- `.section-marker` — numbered, monospace, bracket-free sheet labels (e.g. `01 / EPOXY COMPONENTS`) — justified here because the homepage sections and the product catalog's categories are a genuine, finite, ordered sequence (not a decorative default).
- `.photo--mono` + `.photo-caption` — real photography (not placeholders) desaturated with a neutral black multiply overlay and a small mono "Fig. 0N" caption, styled like a plate caption in a technical document.
- Product/category imagery (`.product-photo`) stays in natural color on a white field with a fine neutral border — per Composition below — because the epoxy CAD drawing's own dimension-line blue is part of the brand story and grayscaling it would lose that connection.

## Canonical palette

| Token | Exact hex | Usage |
| --- | --- | --- |
| `--color-black` | `#040411` | Supplied near-black: primary text, navigation, feature section, footer |
| `--color-white` | `#FFFFFF` | Main surfaces, reversed text, buttons |
| `--color-blue` | `#91A9C9` | Hero action, contact arrow, selected-tab detail, small highlights |
| `--color-navy` | `#041128` | Subtle interaction states, small technical accents |
| `--color-slate` | `#848C9B` | Large muted heading text, decorative orbital lines |
| `--color-stone` | `#B2B4AB` | Secondary text on black, decorative detail |

Values are defined once in `frontend/src/styles/globals.css`. All styling references tokens. Derived neutral rules, text, pale surfaces, and transparent photo overlays use `color-mix` of these tokens. Do not add unrelated colors or flood major sections with the accent colors.

## Composition

Homepage sections span the full page width and have a minimum height of the viewport minus the sticky header. Content stays centered within the 1220px reading width; shorter sections center vertically. Taller mobile layouts and zoomed content expand naturally. The homepage header is 93px including its border at the top and 73px when scrolled; anchor offsets match the compact header.

White content sections alternate with a black feature section and footer. Photography uses grayscale and neutral black overlays. Oversized black/white typography carries the hierarchy. Blue is concentrated at a few meaningful interaction points; product diagrams sit in white fields with fine neutral borders. The closing contact section is white with a blue circular arrow and black action button.

## Accessibility and behavior

Homepage refinements (2026-10-02): the product spotlight uses a pale neutral drawing-sheet frame, black metadata, a family/sequence register, and a black selected tab with a blue underline. The closing contact heading is oversized, paired with a blue circular email arrow on desktop and a black primary action. The redundant circular action is hidden on small screens to preserve heading space. Focus outlines use black on light surfaces and blue on dark surfaces.

Black and white carry normal text. Blue and stone work as supporting text on black, not white. Slate is reserved for large text on white or decorative lines. Preserve visible contextual focus rings and test contrast. Preserve responsive layout, accessible product tabs, mobile navigation, scroll reveals, parallax, and reduced-motion support.

## Files

- Canonical styles: `frontend/src/styles/globals.css`
- Fonts: `frontend/src/app/layout.tsx`
- Landing page: `frontend/src/features/home/landing-page.tsx`
- Products catalog page: `frontend/src/features/products/products-page.tsx` and `frontend/src/features/products/content.ts`
- Persistent rules: root `AGENTS.md` and `frontend/AGENTS.md`
- Existing verification: `frontend/tests/homepage.spec.ts` (written for an earlier structural version — review before trusting it against the current markup)

Historical notes and unused legacy components (`frontend/src/components/`, `frontend/src/features/home/content.ts`, `.design-backup/`) are not current specifications. Change this palette only on explicit user instruction. Production build in this environment: `npm run build -- --webpack`.

## Navigation (current)

The header (`.site-header`) is a plain `position: sticky` bar, full width, fixed height — no scroll-driven resize. An earlier design iteration specified a navbar that shrinks width/padding over the first 160px of scroll; that behavior is not implemented in the current markup. Treat it as a possible future enhancement, not a current spec, unless the user asks for it specifically.

## Text contrast update — 2026-10-07

The user requested replacing the light blue font color throughout the website because it blended into the hero clouds. Accent text now uses `--accent-text`: near-black on light surfaces and white on dark surfaces, including the hero, footer, and dark-section link hover states. Soft blue remains available for non-text brand details. The hero video has a near-black overlay with at least 60% opacity, and hero secondary copy is white, ensuring contrast even over the brightest frames.

## Motion update — 2026-10-07

At the user’s explicit request, the site no longer disables animations in response to `prefers-reduced-motion`. The highlight entrance, page reveals, CSS transitions, and hero video remain enabled. Video still pauses offscreen and when the document is hidden. System accessibility preferences are not modified.
