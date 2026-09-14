# Landing agent instructions

This independent repository owns the static marketing website only. Account,
authentication, plan selection and payment stay in Dashboard. Use Node 24 and
pnpm 9.13.2. Preserve docs/PLAN.md as the supplied future-stage guideline; the
implemented scope and verification live in README.md and docs/DESIGN_SYSTEM.md.

Work on dev and commit intended changes, leaving main unmerged. Follow the parent
workspace instructions for cross-repository work. Public configuration is
allowlisted in config/public.mjs; never pass private environment values to Next.
Use semantic tokens, native links and disclosures, local fonts and SVG/CSS.
Keep content useful in exported HTML without JavaScript and avoid unsupported
product or pricing claims. Landing must not write Dashboard/Studio cookies.

Run targeted checks: pnpm lint and pnpm check; run pnpm typecheck, pnpm build
and pnpm check:export with explicit production HTTPS origins. Lifecycle checks live
in scripts/dev-scripts.selfcheck.sh. Each command must finish within 400 seconds;
total automated verification stays below 20 minutes. No full browser suite.

Query graphify-out/graph.json for source ownership. Refresh through the parent
scripts/graphify-workspace.sh; generated graph artifacts are ignored here.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
