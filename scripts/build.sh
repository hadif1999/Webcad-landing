#!/usr/bin/env bash
set -Eeuo pipefail
case "$#:${1-}" in
  0:) ;;
  1:-h|1:--help)
    echo "usage: LANDING_SITE_URL=https://example.com LANDING_DASHBOARD_BASE_URL=https://dashboard.example.com ./build.sh"
    echo "Builds and checks the static export in out/. Use ./start.sh for local development with automatic reload."
    exit 0 ;;
  *) echo "Unexpected arguments; use --help for usage." >&2; exit 1 ;;
esac
cd "$(dirname "${BASH_SOURCE[0]}")/.."
# Validate before installing dependencies or starting an expensive build.
node --input-type=module -e 'import { publicConfig } from "./config/public.mjs"; publicConfig(process.env, true);'
[[ -x node_modules/.bin/next ]] || corepack pnpm install --frozen-lockfile
corepack pnpm build
corepack pnpm check:export
echo "Landing static export ready in out/."
