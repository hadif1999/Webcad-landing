# WebCAD Landing design system

The source of truth is src/app/globals.css. Tailwind v4 exposes semantic tokens
through @theme: canvas, surface, raised, ink, muted, line, action, action-hover,
on-action, accent, focus, success, warning and danger. Components consume these
names through utilities and CSS variables. Illustration pigments are confined to
the SVG and are not UI tokens. Dark is local to Landing; no preference cookies
are read or written.

Vazirmatn 400, 500 and 700 ships locally through @fontsource (including its OFL
license). Use system monospace for short technical labels. The fluid display
scale is 2.75–5.75rem and headings 2–3rem. Body copy is at least 1rem, with a 1.65
line height; small technical labels are supplementary, never essential body copy.

Layout uses a 1200px maximum width, fluid 16–48px gutters, and a 4px spacing unit.
Below 768px, cards and pricing stack, product history is decorative and hidden,
and navigation uses a native details disclosure. From 768–1023px the layout uses
two card columns with a smaller illustration sidebar; desktop retains two columns
and a horizontal CTA. Long labels wrap and buttons have at least 48px height.

Reusable components:

| Component | Usage |
| --- | --- |
| ButtonLink | primary action or secondary exploration; always a real anchor |
| Navigation / Brand | shared identity and navigation; native mobile disclosure |
| SectionHeading | short eyebrow, heading and optional supporting copy |
| Features | four factual feature cards, reused on home and features |
| Pricing | current-plan introduction, always linking to Dashboard subscription |
| ProductIllustration | responsive SVG, accessible description and explicit illustrative label |
| ClosingCTA / Footer | consistent account entry and site navigation |

Use control/card radius tokens for interactive controls and surfaces. Reserve
panel shadows and subtle surface gradients for hierarchy; do not add blur behind
body copy. Motion is limited to 160ms control transitions and disabled for
prefers-reduced-motion. Focus is visible with a 2px light outline and 5px offset.
A skip link, semantic header/main/footer, native disclosure and text link labels
support keyboard use without hydration. Text on surfaces must retain WCAG AA
contrast. No forced animation, canvas, pricing placeholders or simulated product UI.
