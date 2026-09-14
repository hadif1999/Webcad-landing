# Stages 1–2 — Implementation summary

## Brief

Stages 1–2 established WebCAD Landing as an independent static marketing
application and delivered its reusable design system with working page layouts.
The application is integrated into the workspace's development and deployment
workflows. Landing owns the base domain; Dashboard owns account access on its
subdomain. Production rollout remains a separate operator task.

The original [implementation guideline](PLAN.md) is preserved. The delivered
scope brings a working preview and Dashboard links into the first two stages;
it does not mark the remaining marketing stages complete.

## Stage 1 — Application foundation and workspace integration

### Landing application

- Initialized an independent Git repository with `main` and `dev`, its own pnpm
  lockfile, README, agent instructions and generated-file exclusions.
- Added Next.js App Router, TypeScript and Tailwind CSS with pinned dependencies
  and Node 24. Production uses `output: "export"`; Nginx serves the generated
  files without a Node application server.
- Implemented `/`, `/features/`, `/pricing/`, `/login/` and a custom 404 page.
  Pages contain useful exported HTML, route metadata and canonical URLs.
- Centralized `LANDING_SITE_URL` and `LANDING_DASHBOARD_BASE_URL` validation and
  derived sign-in, sign-up and subscription destinations. Production requires
  explicit public HTTPS origins.
- Kept authentication, account management, current plan selection and checkout
  in Dashboard. `/login/` is a sign-in handoff, not a second authentication flow.

### Development and deployment

- Added local development on `http://localhost:5557`, with Dashboard links to
  `http://localhost:5556`.
- Added repeatable start/stop scripts with PID and log files under `.run/`.
  Shutdown checks process identity, command and working directory before
  signalling the owned process group.
- Extended the workspace start/stop scripts to include Landing.
- Added a multistage Dockerfile using the existing unprivileged Nginx image
  pattern, port 8080, a health endpoint, relative directory redirects and true
  404 responses.
- Added Landing to local Compose, production overrides, image-based VPS and
  Swarm configurations. Direct port 5557 stays on loopback; production Compose
  serves Landing through the gateway.
- Added independent VPS rollback through `LANDING_IMAGE_TAG`, coordinated Swarm
  image builds and service readiness checks.
- Added SHA-pinned verification and deployment workflows. Deployment checks out
  the successful verification commit and retains the previous running image
  for rollback after a failed update.
- Extended workspace graph ownership, repository exclusions and navigation
  flows to include Landing and its Dashboard handoff.

### Host migration

| Address | Destination |
| --- | --- |
| Base domain and marketing routes | Landing |
| `dashboard.<domain>` | Dashboard |
| `studio.<domain>` | Session-protected Studio |
| `<domain>/api/` on the existing VPS | Backend, preserving callback addresses |
| `api.<domain>/api/` in the standard topology | Backend |

Temporary redirects preserve legacy apex authentication, account, Dashboard,
administration and billing links, including query strings. VPS API and storage
routes remain ahead of marketing routing.

The former apex Dashboard worker URLs serve migration cleanup code with
no-store headers. The worker clears the old origin's caches, unregisters itself
and reloads returning clients at their existing URLs. It does not intercept
subsequent requests.

Domain initialization, environment examples, Dashboard deployment probes,
Studio verification configuration and TLS hostname checks were updated for
the new ownership. The controlled parent-domain session cookie remains shared
between the applications and API.

## Stage 2 — Design system and working preview

- Established graphite surfaces, blue/cyan accents, restrained gradients and
  WebCAD identity with locally bundled Vazirmatn and system monospace labels.
- Defined Tailwind semantic tokens for surfaces, text, borders, actions, focus,
  status colors, spacing, typography, radius and shadows, plus motion settings.
- Established a 1200px content width, fluid gutters/headings, a 4px spacing scale
  and explicit mobile, tablet and desktop layouts.
- Built reusable navigation, button links, section headings, feature cards,
  pricing presentation, closing CTA and footer components.
- Composed the homepage from the hero, technical product illustration, feature
  overview, pricing introduction and closing CTA. Features and pricing pages
  reuse the same components.
- Added a lightweight SVG engineering illustration instead of an interactive
  CAD or cinematic 3D scene.
- Used factual provisional copy covering parametric modeling, cloud workbenches,
  revision history and AI-assisted editing. Pricing directs visitors to
  Dashboard for current terms; no prices, limits or testimonials were invented.
- Included semantic landmarks, a skip link, visible keyboard focus, native
  mobile navigation disclosure and reduced-motion support. Landing defaults
  to dark without reading or writing Dashboard/Studio preference cookies.

Component usage, tokens and responsive behavior are documented in
[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

## Verification performed

The implementation was verified locally on 2026-09-14. Automated verification
stayed within the 20-minute budget, with each command bounded to 400 seconds.

| Area | Result |
| --- | --- |
| Landing lint, TypeScript and production export | Passed |
| Exported content, canonical URLs and CTA destinations | Passed |
| Referenced JavaScript, CSS and local font assets | Passed |
| Public-origin validation and private-config sentinel exclusion | Passed |
| Cleanup-worker lifecycle check | Passed |
| Process ownership, repeated start/stop and real local Next startup | Passed |
| Full multistage Docker build | Passed |
| Local Nginx gateway/VPS routing, redirects and true 404s | Passed |
| Compose/Swarm rendering and standard/apex domain generation | Passed |
| Workflow structure, pinned Actions and verified-commit gate | Passed |
| Workspace graph refresh and repository redirects | Passed |

Responsive and accessibility behavior was inspected in source. No full browser
suite, assistive-technology session or release-level performance assessment ran.
Local proxy tests used stub Dashboard/Backend services; they do not establish
production session, OAuth or payment correctness. Existing root graph edits
were refreshed in the working tree but left uncommitted to preserve unrelated
work.

The detailed workspace [validation record](../../scripts/deploy/LANDING_VALIDATION.md)
documents the checks and their limits. This summary records those results;
writing this document did not rerun the application checks.

## Remaining work

- Stages 3–4 now complete the marketing content and frontend refinements described
  in [STAGE_3_4.md](STAGE_3_4.md), building on these layouts.
- [Stages 5–8](STAGE_5_8.md) now provide the interactive study, motion, Dashboard
  links and asset budgets; release-level browser/performance work remains later.
- Configure the independent Landing remote and production CI settings; complete
  DNS, certificates, Google origins and coordinated environment/image rollout.
- Verify real authentication, provider callbacks, old-browser worker migration
  and rollback during the approved production rollout.

Use the workspace [rollout and rollback guide](../../scripts/deploy/LANDING_ROLLOUT.md)
before deployment. See [README.md](../README.md) for current development and
build commands.
