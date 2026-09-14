# WebCAD Landing

Independent Next.js App Router, TypeScript and Tailwind marketing application.
Stages 1–4 implement the foundation, shared design system, factual product
story, home, detailed features, plan guidance, Dashboard sign-in handoff and
custom 404. The original guideline is preserved in docs/PLAN.md; stages 5–9
remain future work.

## Development

Use Node 24 (see .nvmrc), corepack enable, and pnpm install --frozen-lockfile.
Run scripts/start.sh or pnpm dev at http://localhost:5557, with Dashboard at
http://localhost:5556. scripts/stop.sh stops only the recorded process group after
checking its kernel identity, command and working directory. Linux /proc, setsid and flock
are required for lifecycle scripts. pnpm dev works without those helpers.
PID and log files live in .run/. Both lifecycle scripts are safe to repeat.

## Public build configuration

Set LANDING_SITE_URL and LANDING_DASHBOARD_BASE_URL to absolute HTTPS origins
for production. Missing values, HTTP, credentials, paths, query strings and
fragments fail the build. Development defaults are local HTTP. These are the
only public inputs, and links are derived in config/public.mjs. Authentication
is owned by Dashboard; subscription links target /dashboard/subscription.
Do not copy deployment secrets into this repository.

```sh
LANDING_SITE_URL=https://webcad.space \
LANDING_DASHBOARD_BASE_URL=https://dashboard.webcad.space pnpm build
LANDING_SITE_URL=https://webcad.space \
LANDING_DASHBOARD_BASE_URL=https://dashboard.webcad.space pnpm check:export
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
and docs/STAGE_3_4.md for the current marketing content boundary. No browser or
release-level performance scores are claimed for these stages.
