<!-- Motion update: 2026-10-07 -->
The user explicitly requested removing website reduced-motion overrides. Site animations, including the partner highlight, run regardless of the OS motion preference. Keep video visibility/hidden-tab pausing and normal document scrolling. This supersedes earlier reduced-motion requirements below.

<!-- Current palette update: 2026-10-07 -->
The user reverted the lime experiment. Restore soft greyish blue `#91A9C9` accents, the derived blue section backgrounds, and pale blue product panels. No lime token or navy backing behind highlighted words. Keep the hero contrast overlay. Accent text on light backgrounds uses the darker derived blue for readability; on dark backgrounds it uses the original soft blue. This supersedes the earlier same-day text-color changes below.

# Accretion Power project rules

## Required visual direction: confident black, white, and brand blue

2026-10-02 update: the earlier "black and white must dominate, use colors sparingly, do not turn whole sections blue or navy" restriction is superseded. The user asked for a bolder pass — noticeable pops of color, stronger contrast, and substantial brand-colored areas (a featured product panel, closing CTA sections) — while keeping the same palette. Black/white/near-black still carry most body copy and large surfaces; blue is now also allowed to anchor whole sections, not just small details.

Canonical values in `frontend/src/styles/globals.css`:

- `--color-black`: `#040411` — the supplied near-black; primary dark surface/text.
- `--color-white`: `#FFFFFF` — primary light surface/text.
- `--color-blue`: `#91A9C9` — soft blue accent; also the primary-button fill (paired with black text/arrow-badge).
- `--color-navy`: `#041128` — darkest blue, now mainly folded into the derived `--color-blue-deep` shade.
- `--color-slate`: `#848C9B` — slate accent/large muted headings.
- `--color-stone`: `#B2B4AB` — warm gray accent, secondary text on black, and the base of `--surface-warm`.

Derived tokens (same hues, tuned for larger surfaces or on-accent text): `--color-blue-deep`, `--surface-accent` (= blue-deep, used by `.section--accent` for full-color sections like the closing CTA), `--surface-tint` (pale blue wash for supporting panels, e.g. the product spotlight image), `--surface-warm` (warm off-white alternate section background, e.g. About), `--muted-on-accent` / `--line-on-accent` (readable secondary text/rules on the blue-deep surface). Preserve the six canonical hex values unless the user requests another palette; derive any new shade from them via `color-mix` rather than hand-picking a new hex, and verify contrast (aim ≥4.5:1 for body text, ≥3:1 for large text/UI) before using a new combination.

Keep photography treatment per-image as already set in the page (some are desaturated via `.photo--mono`/`.hero-media img` grayscale, some run in natural color — follow what's already on the element rather than assuming all hero photography must be mono). Product diagram imagery stays in natural color on a light field. No green/sand/orange palette should be reintroduced.

Maintain accessible contrast; recheck it after changes, especially white text over photography (verify against the gradient-darkened region, not the raw image) and any new color-on-color pairing. Preserve responsive layout, navigation, product tabs, motion, and reduced-motion behavior.

See `docs/design-system.md`. Active page: `frontend/src/features/home/landing-page.tsx`. Historical reference notes and unused legacy components are not the current visual specification.
