# CSS Audit Report — V12.1

## Stats
- Total CSS rules: ~138
- Inline styles: 86
- External CSS files: 0 (all inline)

## Active Rules
- Hero: bottom-left layout, gradient .4 opacity
- Duo: dynamic JS render with IntersectionObserver rebind
- HScroll: 280-650px clamp, scroll-snap
- Booking: 380px min-height, 4:3 aspect-ratio
- About: flex 1:1, object-fit cover

## Deprecated
- Full-img block: removed in V12
- Centered Hero: replaced by bottom-left in V12

## Duplicate Coverage
- .about-visual: 3 revisions (flex .85→1, aspect-ratio→removed, contain→cover)
- .hero .intro: 2 revisions (centered→left-aligned)
