# WebCAD Landing

Independent Next.js App Router, TypeScript and Tailwind marketing application.
Stages 1–8 implement the foundation, shared design system, factual marketing
pages, opt-in 3D assembly, accessible motion, Dashboard handoff and static asset
budgets. The original guideline is preserved in docs/PLAN.md; implementation
decisions and remaining validation are recorded in docs/STAGE_5_8.md. Stage 9
remains future work.

## Development

Use Node 24 (see .nvmrc), corepack enable, and pnpm install --frozen-lockfile.
Run ./start.sh or pnpm dev at http://localhost:5557, with Dashboard at
http://localhost:5556. Next.js automatically reloads changes while developing;
no build or restart is needed for ordinary source edits. ./stop.sh stops only the recorded process group after
checking its kernel identity, command and working directory. Linux /proc, setsid and flock
are required for lifecycle scripts. pnpm dev works without those helpers.
PID and log files live in .run/. Both lifecycle scripts are safe to repeat.
The root scripts work from any working directory and delegate to scripts/,
preserving the workspace's existing start/stop integration.

```sh
./start.sh                     # Start in the background with automatic reload
./stop.sh                      # Stop the recorded development server
./build.sh --help              # Show static-build configuration
```

Follow server output with `tail -f .run/landing-dev.log`. To build locally, set
the HTTPS origins as shown below and run `./build.sh`; it runs the production
build and exported-content checks and writes `out/`. It does not start a server.

## Public build configuration

Set LANDING_SITE_URL and LANDING_DASHBOARD_BASE_URL to absolute HTTPS origins
for production. Missing values, HTTP, credentials, paths, query strings and
fragments fail the build. Development defaults are local HTTP. These are the
only public inputs, and links are derived in config/public.mjs. Authentication
is owned by Dashboard; subscription links target /dashboard/subscription.
Do not copy deployment secrets into this repository.

```sh
LANDING_SITE_URL=https://webcad.space \
LANDING_DASHBOARD_BASE_URL=https://dashboard.webcad.space ./build.sh
```

out/ contains static pages and local font assets. Serve it with the bundled
Nginx configuration, which supports deep routes and real 404 status codes.
Production runs Nginx on 8080, without a Node application server. The Dockerfile
accepts the same two public build arguments. For localhost HTTP links use next dev;
static production images intentionally require HTTPS public destinations.

## Verification and release

Run pnpm lint and pnpm check. Set the two production HTTPS origins for pnpm
typecheck (Next type generation loads production configuration), pnpm build and
pnpm check:export.
Run scripts/dev-scripts.selfcheck.sh for lifecycle ownership and repeatability.
GitHub Verify Landing runs on main pushes, PRs and manual requests. The deploy
workflow checks out exactly the verified commit, publishes immutable run tags,
and restores the previous pinned image if readiness or the public probe fails.
Configure LANDING_SITE_URL and LANDING_DASHBOARD_BASE_URL repository variables
and the same production SSH secrets as Dashboard. The GHCR image is
hadif1999/webcad-landing; create/connect its independent remote before enabling CI.
The parent workspace owns host routing, Compose, Swarm and coordinated migration.
See ../scripts/deploy/LANDING_ROLLOUT.md before the first production rollout.

See docs/DESIGN_SYSTEM.md for tokens, components, accessibility and breakpoints,
and docs/STAGE_3_4.md for the marketing content boundary and
docs/STAGE_5_8.md for the interactive study, motion and performance budgets. No browser or
release-level performance scores are claimed for these stages.

## Marketing content and presentation

`src/lib/translations.ts` owns English, Persian and Russian marketing copy.
`src/lib/marketing.ts` contains typed translation keys, stable IDs, icons and
presentation order. The four lead capabilities are browser parametric CAD,
AI assistance for parts, team projects and workbench revision history; cloud
workbenches and portable data form the supporting row. All four workflow steps,
page intros, tier guidance, entitlement descriptions and shared calls to action
use the same translation layer. English remains useful in exported HTML before
JavaScript; language switching uses the existing shared preference system.

Free / Pro / Team cards are explicitly workspace guidance, not a live catalogue
or a promise of fixed feature inclusions. The backend catalogue is editable and
already allows AI/revisions on Free; it does not define a fixed Team SKU. Each
card links to Dashboard, which owns current names, availability, prices, limits,
selection and checkout. No exact prices, unlimited allowances or named export
formats are published here.

`SHOW_PLACEHOLDER_PROOF` in `src/components/placeholder-proof.tsx` defaults to
`false`. Set it to `true` only for local layout preview. The warning badge, quote
slots and logo skeletons are explicitly placeholders; replace them with real,
authorized proof before publication. The export check rejects visible preview
proof. No testimonials, customer logos or metrics ship by default.

The existing video hero remains on home; `/features/` retains the static SVG
illustration. The optional assembly components remain available without changes.
The export check enforces 225 KiB gzip initial JavaScript per route, 30 KiB gzip
CSS and 100 KiB local fonts, along with static content, Dashboard destinations,
metadata, sitemap/robots and private-config exclusion. Latin and Persian font
subsets remain local; Russian uses the system fallback for Cyrillic.

The refresh was checked with lint, config/theme/localization self-checks,
TypeScript, production build and static export checks using explicit HTTPS
origins. The browser tool had no available browser, so live language/theme
switching and responsive visual inspection remain unverified. No browser suite
or new testing infrastructure was introduced. Historical stage measurements in
[STAGE_5_8.md](docs/STAGE_5_8.md) predate this refresh.
