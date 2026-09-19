# WebCAD Landing design system

The source of truth is src/app/globals.css. Tailwind v4 exposes semantic tokens
through @theme: canvas, surface, raised, ink, muted, line, action, action-hover,
on-action, accent, focus, success, warning and danger. Components consume these
names through utilities and CSS variables. Illustration pigments are confined to
the SVG and are not UI tokens. Dark/light themes and English/Persian/Russian use the existing shared
preference-cookie system. Landing never writes authentication/session cookies.

Vazirmatn 400, 500 and 700 ships locally through @fontsource (including its OFL
license). Use system monospace for short technical labels. The fluid display
scale is 2.75–5.75rem and headings 2–3rem. Body copy is at least 1rem, with a 1.65
line height; small technical labels are supplementary, never essential body copy.

Layout uses a 1200px maximum width, fluid 16–48px gutters, and a 4px spacing unit.
Below 768px, cards and pricing stack, product history is decorative and hidden,
and navigation uses a native details disclosure. From 768–1023px the layout uses
two card columns with a smaller illustration sidebar. Desktop uses two capability columns, three pricing guidance cards,
and a horizontal CTA.
Long labels wrap and buttons have at least 48px height.

Reusable components:

| Component | Usage |
| --- | --- |
| ButtonLink | primary action or secondary exploration; always a real anchor |
| Navigation / Brand | shared identity and navigation; native mobile disclosure |
| SectionHeading | short eyebrow, heading and optional supporting copy |
| Features | six factual capabilities, with overview and detailed variants |
| Workflow | four-step sketch, build, refine and revisit narrative |
| Pricing | entitlement categories and current-plan handoff to Dashboard |
| ProductIllustration | responsive SVG, accessible description and explicit illustrative label |
| ClosingCTA / Footer | consistent account entry and site navigation |

Use control/card radius tokens for interactive controls and surfaces. Reserve
panel shadows and subtle surface gradients for hierarchy; do not add blur behind
body copy. Motion uses 160ms control transitions, a 700ms staggered hero entrance
and finite scene reveals of at most 1.4 seconds, disabled for
prefers-reduced-motion. Focus is visible with a 2px light outline and 5px offset.
A skip link, semantic header/main/footer, native disclosure and text link labels
support keyboard use without hydration. Text on surfaces must retain WCAG AA
contrast. The existing decorative video hero is retained, with its reduced-motion fallback.
New cards add no animation, canvas or simulated product UI. Placeholder proof is
preview-only and disabled by default.

Marketing text is centralized in `src/lib/translations.ts`, with complete English,
Persian and Russian dictionaries. `src/lib/marketing.ts` owns typed key references,
IDs, icons and presentation order. The first four capability cards have a spotlight
style; cloud workbenches and portable data use compact supporting cards. Claims must describe
implemented product behavior: ordered parametric modeling, account-backed cloud
workbenches, durable changes and revisions, hosted AI assistance, authorized team
projects, and portable workbench data. Free / Pro / Team cards are labelled workspace guidance with qualitative
review checklists, not fixed feature inclusions. The editable backend catalogue
has AI/revision allowances on Free and no fixed Team SKU. Dashboard remains
authoritative for available names, features, prices, limits and checkout. Do not add testimonials,
customer logos, usage metrics, simulation, cloud geometry processing or real-time
co-editing claims without an approved source.


## Interactive assembly and motion (stages 5–6)

The optional `ProductExperience` component wraps a server-rendered
`ProductIllustration`; the current home composition uses the video hero instead. Its real button loads `AssemblyScene` only on request. Loading failures
keep the illustration and expose a retry; the same button returns to the static
view. Without JavaScript the button is hidden, leaving the useful illustration.
The features page keeps the lightweight SVG without loading the scene controller.

The scene uses CSS perspective and preserve-3d with twelve local SVG layers to
present a mounting base, bearing insert and retaining cover. Native labeled range
inputs rotate the camera and separate the parts; reset restores the initial view.
The viewport is 440px high on desktop and 380px on mobile, with controls beneath
it below 768px. Decorative grid, particles and axis are hidden from assistive
technology; the image description reflects the chosen rotation and separation.

Entrance effects finish within 1.4 seconds. There is no continuous render loop,
autoplay orbit, pointer tracking, scroll interception or hidden-until-JavaScript
content. Reduced motion removes interpolation while retaining direct control.
Unsupported scroll timelines fall back to static sections. Motion uses semantic
duration/easing tokens; colors use the existing palette. The study is explicitly
illustrative and does not simulate the authenticated CAD editor.

Fonts use local Latin WOFF2 weights 400/500/700 and Arabic-script 400/700
for Persian; Russian uses the system fallback for Cyrillic. Keep the exported
font total below 100 KiB and retain the OFL license from `@fontsource/vazirmatn`.

## Moderate refresh

`Features` renders six small decorative inline SVG glyphs; visible labels carry
all meaning. Pricing cards use semantic accent/success tokens, wrap long labels,
and stack below 768px. Logical spacing and inherited text direction support RTL
without a separate layout. The Pro guidance card has the accent border.

`PlaceholderProof` has one `SHOW_PLACEHOLDER_PROOF = false` switch. Its preview
includes a translated warning badge, three neutral quote slots and a logo
skeleton strip. Replace all placeholders with authorized material before any
publication. The export self-check rejects this section when enabled.

Home retains the video hero. The features page retains the static bracket SVG;
this refresh does not change the optional assembly implementation or preference
behavior. English content remains server-rendered; client components resolve the
same translation keys after language selection. Metadata stays canonical English.

Current verification and browser limitations are recorded in [README.md](../README.md).
