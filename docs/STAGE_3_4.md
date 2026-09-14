# Stages 3–4 — Content and frontend implementation

## Brief

Stages 3–4 turn the Stage 1–2 preview into the complete factual marketing
surface for the current product. The work stays inside the independent Landing
application and reuses its static-export, design-system, Dashboard handoff and
deployment boundaries. The supplied [PLAN.md](PLAN.md) remains a guideline;
this implementation follows the product that exists rather than its speculative
feature and technology lists.

The primary audience is professional CAD designers and teams. The story focuses
on a connected design process: create an ordered model, keep it in an authorized
cloud workbench, revisit durable history, use assisted editing, work through
project membership and retain a portable data path.

## Stage 3 — Product story

- Replaced the provisional hero with a browser-based parametric CAD proposition
  centered on work that keeps moving.
- Centralized six capability records and a four-step workflow in
  `src/lib/marketing.ts` so the home and features pages use the same claims.
- Grounded capability copy in implemented behavior: ordered modeling operations,
  cloud projects and workbenches, append-only changes, revision bookmarks,
  hosted AI turns, team-mode membership, external assets and portable export.
- Described plan differences through their stable entitlement categories:
  projects, workbenches per project, AI prompts, retained revisions and team
  mode.
- Kept current catalogue names, prices, limits, subscription state and checkout
  in Dashboard because administrators can change them independently of a static
  Landing release.
- Omitted testimonials, customer logos and numerical marketing claims because no
  approved source material exists. Simulation, cloud geometry processing and
  real-time co-editing are not presented as current capabilities.

## Stage 4 — Frontend composition

- The home route now presents hero, technical product illustration, capability
  overview, workflow, plan guidance and a closing account CTA in that order.
- The features route uses the detailed capability variant, followed by the
  product illustration and workflow. The pricing route explains entitlement
  categories before sending visitors to the live Dashboard catalogue.
- Navigation, sign-in, sign-up and subscription links still derive from the
  allowlisted public configuration. Login remains a handoff rather than an
  authentication implementation.
- Capability cards use three columns on wide screens, two on tablets and one on
  small screens. Detailed cards use two columns on wide screens. Workflow and
  entitlement layouts follow the same responsive system.
- Every page remains a Server Component with useful exported HTML. No runtime
  fetch, client component, new dependency, cookie, canvas, animation library or
  simulated product UI was introduced.

## Deployment and verification

The route set, development port, static `out/` contract, Nginx server, container
image and parent gateway topology are unchanged. Existing development and
deployment commands automatically consume the revised source.

`scripts/export.selfcheck.mjs` verifies the finalized route copy as well as
canonical URLs, Dashboard CTAs, generated assets, the 404 page and private-value
exclusion.

The completion run on 2026-09-14 passed Landing lint, the public-configuration
self-check, Next route type generation, strict TypeScript, the production static
build and the exported-content check. The production checks used explicit HTTPS
Landing and Dashboard origins. Responsive and accessibility behavior was
inspected in source; no full browser, visual-regression or release-level
performance suite ran.

## Later stages

The subsequent [stages 5–8 implementation](STAGE_5_8.md) adds the opt-in 3D
study, motion, direct project links and production asset budgets. Release-level
browser QA and measured performance scores remain stage 9 work. Landing does
not duplicate Dashboard authentication or checkout.
