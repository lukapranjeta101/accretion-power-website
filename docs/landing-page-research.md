# Landing page research and implementation

Researched September 23, 2026. Scope: one landing page only.

## Reference design

https://www.heimdallpower.com/

Inspected public HTML and stylesheets. Applied the reference's floating dark navigation, oversized sans-serif typography, gray surfaces, orange (#ff5c39) calls to action, charcoal (#212123) sections, monospace details, imagery, tabbed storytelling, and scrolling motion. Created an original Accretion composition and copy. No Heimdall product, performance, customer, or deployment claims are used.

## Company sources

- https://accretionpower.com/about — Pittsburgh headquarters; North American utility/global OEM customers; epoxy manufacturing in India; local warehousing; custom tooling; direct contact with Ben Vietmeier.
- https://accretionpower.com/epoxy-components — standoffs, LV/MV insulators, thru bushings, wall bushings, custom tooling.
- https://accretionpower.com/porcelain-products — standoffs, outdoor distribution, ceramics, transformer bushings.
- https://accretionpower.com/composite-insulators — outdoor composite insulators.
- https://accretionpower.com/copper — C110 copper; bare/tin/silver finishes; custom fabrication.
- https://accretionpower.com/bus-boots — product category.
- https://accretionpower.com/castings — permanent mold and die castings.
- https://accretionpower.com/contact — public email and telephone.

Copy is paraphrased. No fabricated metrics, certifications, customer logos, lead-time guarantees, or pricing are included.

## Assets

Product images and technical drawings downloaded from Accretion's public website (img1.wsimg.com, site ID 10fee937-1270-447d-a0fb-8af515ae9bf9). The hero and about image is electrical infrastructure photography from https://images.unsplash.com/photo-1473341304170-971dccb5ac1e . It is illustrative, not represented as an Accretion facility. The downloaded Heimdall hero was inspected for research but is not rendered because it depicts Heimdall equipment.

## Interaction scope

All navigation remains within the landing page. Product tabs support keyboard arrows, Home, and End. Contact actions open the visitor's email or telephone application; there is no submission server and no simulated success state. Scroll reveals and hero parallax respect reduced-motion preferences. Mobile navigation supports Escape.

Implementation: frontend/src/features/home/landing-page.tsx and frontend/src/styles/globals.css. Previous feature components remain unused. The earlier project brief describes broader future scope; this landing page implements only the latest requested scope.
