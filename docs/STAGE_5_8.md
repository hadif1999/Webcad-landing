# Stages 5–8 — Interactive presentation, integration and performance

## Plan analysis and scope

The supplied [PLAN.md](PLAN.md) describes an aspirational technology stack.
[Stages 1–2](STAGE_1_2.md), [stages 3–4](STAGE_3_4.md) and the repository
instructions establish the actual constraints: static export, semantic tokens,
local SVG/CSS, useful HTML without JavaScript, and Dashboard ownership of accounts
and commerce. PLAN.md is preserved unchanged.

This implementation adds the requested presentation and optimization features
within those boundaries. It does not introduce Three.js/R3F/Drei, a Blender/GLB
pipeline, GSAP or Framer Motion. The small illustrative assembly uses native CSS
3D transforms and local SVG layers. There is no external model to compress or
fetch. A future photorealistic imported model would require a separate asset and
renderer decision; this study does not claim to provide that pipeline.

## Stage 5 — Interactive engineering study

- The homepage wraps the existing server-rendered illustration in
  `ProductExperience`. The features page retains its static illustration.
- “Explore the 3D assembly” imports `AssemblyScene` only after activation. A
  failed import keeps the illustration visible, reports the failure and permits
  retry. Loading disables duplicate activation. Returning to the illustration
  unmounts the scene; reopening begins at its default view.
- The bearing-housing study contains a mounting base, bearing insert and retaining
  cover, with dimensional depth, a blueprint grid, assembly axis and decorative
  light points. It is explicitly an illustration rather than an editor.
- Native labeled sliders control camera rotation and part separation; reset
  restores −30° and 30%. Controls remain operable by keyboard and touch.
- Mobile and no-JavaScript visitors receive the static SVG by default. Mobile
  visitors can opt into the smaller scene, with controls beneath the viewport.
  No-JavaScript output hides the enhancement button and retains the illustration.

## Stage 6 — Motion

- Staggered hero entrance, finite model/camera reveal, subtle card hover effects
  and scroll-linked section/workflow translations share the existing palette.
- CSS view timelines are feature-detected; older browsers retain static sections.
  Content and CTAs never depend on JavaScript or an observer to become visible.
- `prefers-reduced-motion` disables animation and transitions, while direct slider
  changes still work. No looping animation, requestAnimationFrame loop, pointer
  tracking or scroll interception is used. Finite entrances finish within 1.4s.

## Stage 7 — Dashboard integration

The existing public configuration remains the single URL boundary. Navigation and
footer now expose a direct project link in addition to sign-in, registration and
the current-plan handoff. All remain real anchors in the exported HTML.

| Landing action | Dashboard destination | Owning behavior |
| --- | --- | --- |
| Sign in / login handoff | `/sign-in` | Dashboard email/provider authentication |
| Start designing / create account | `/sign-up` | Dashboard registration and verification |
| Dashboard / open projects | `/dashboard/projects` | Dashboard protected project route |
| See current plans | `/dashboard/subscription` | Dashboard authentication, catalogue and upgrade selection |

Destinations were checked against `Webcad_dashboard/src/app/App.jsx` and
`Webcad_dashboard/src/features/auth/Auth.jsx`. `RequireAuth` sends signed-out
visitors to sign-in with the originating pathname in router state; the email
sign-in flow uses that state to return to the requested route. Provider callbacks
and registration have their own Dashboard flows; no new cross-origin return URL
contract is assumed. Real provider, registration and payment flows were not run.

Landing neither reads nor writes application session cookies. Plan prices and
limits remain live in Dashboard. No sibling source, gateway, container, port or
deployment contract needs changing: the existing build exports these additions
into `out/`, served by the existing Nginx setup.

## Stage 8 — Performance and discovery

- Only the small study controller hydrates on the home route; scene code is split
  into a chunk requested on activation. The static site remains useful without it.
- English marketing copy ships three local Latin WOFF2 weights with font swapping,
  replacing the full multi-script WOFF/WOFF2 set. Add language subsets if localized
  copy is introduced. The pinned font package retains its OFL license.
- Static `robots.txt` and `sitemap.xml` derive from the allowlisted HTTPS site
  origin. The sitemap contains home, features and pricing. The account handoff
  has `noindex, follow`; canonical/Open Graph metadata remains, with Twitter
  summary metadata added to each page.
- The export self-check now enforces initial/deferred JavaScript, CSS and font
  budgets, verifies the static fallback and deferred chunk, and checks project
  destinations, social metadata, robots and sitemap output.

| Budget | Limit | Local production result |
| --- | --- | --- |
| Initial JavaScript per route, gzip | 225 KiB | Home 169.8 KiB; other routes 169.1 KiB |
| Deferred scene JavaScript, gzip | 12 KiB | Passed |
| All exported CSS, gzip | 30 KiB | 5.3 KiB |
| Local exported fonts | 100 KiB | 47.7 KiB |

These measurements are compressed asset sizes, not transfer traces, runtime
performance measurements or Lighthouse scores. The plan's performance >90,
SEO >95 and accessibility >90 targets remain unmeasured.

## Verification and remaining work

On 2026-09-14, `pnpm lint`, `pnpm check`, `pnpm typecheck`, `pnpm build`,
`pnpm check:export` and `scripts/dev-scripts.selfcheck.sh` passed. Production
commands used `https://webcad.space` and `https://dashboard.webcad.space`; a private
configuration sentinel was absent from exported files. These origins were build
inputs, not live external-service tests. Commands were bounded to 400 seconds and
the automated verification stayed below 20 minutes.

Source review covered responsive layout, native controls, import failure handling,
reduced-motion fallback, route ownership and cookie isolation. No live browser,
visual-regression, assistive-technology, real authentication/payment or release
performance assessment ran. Actual CSS 3D rendering and control interaction across
browsers remain stage 9 verification work. Workspace graph artifacts were refreshed
through the parent script and remain separate from the intended Landing commit.
