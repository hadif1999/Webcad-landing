#!/usr/bin/env bash
set -Eeuo pipefail
trap 'echo "ERR at line $LINENO: $BASH_COMMAND (exit $?)" >&2' ERR
[[ "${CI:-}" = "true" ]] && set -x
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
tmp="$(mktemp -d)"
cleanup() {
  "$tmp/scripts/stop.sh" >/dev/null 2>&1 || true
  [[ -z "${stranger:-}" ]] || kill "$stranger" 2>/dev/null || true
  rm -rf "$tmp"
}
trap cleanup EXIT
mkdir -p "$tmp/scripts" "$tmp/node_modules/next/dist/bin" "$tmp/node_modules/.bin"
cp "$ROOT"/scripts/{start,stop,process}.sh "$tmp/scripts/"
cp "$ROOT"/{start,stop}.sh "$tmp/"
# Exercise the lifecycle with a minimal local process, no browser or dev server.
printf '#!/usr/bin/env node\nconsole.log("Ready in 1ms"); setInterval(() => {}, 1000);\n' > "$tmp/node_modules/next/dist/bin/next"
touch "$tmp/node_modules/.bin/next"
chmod +x "$tmp/node_modules/.bin/next"
(cd /; "$tmp/start.sh") >/dev/null
read -r first_pid first_stamp < "$tmp/.run/landing-dev.pid"
"$tmp/start.sh" >/dev/null
read -r second_pid second_stamp < "$tmp/.run/landing-dev.pid"
[[ "$first_pid $first_stamp" = "$second_pid $second_stamp" ]]
"$tmp/stop.sh" >/dev/null
[[ ! -f "$tmp/.run/landing-dev.pid" ]]
"$tmp/scripts/stop.sh" >/dev/null
# A foreign process in the same directory and process group cannot be stopped.
(cd "$tmp"; exec setsid sleep 120) &
stranger=$!
source "$tmp/scripts/process.sh"
printf '%s %s\n' "$stranger" "$(process_stamp "$stranger")" > "$tmp/.run/landing-dev.pid"
"$tmp/scripts/stop.sh" >/dev/null
kill -0 "$stranger"
# Invalid and stale PID records are also harmless.
printf 'invalid invalid\n' > "$tmp/.run/landing-dev.pid"
"$tmp/scripts/stop.sh" >/dev/null
[[ ! -f "$tmp/.run/landing-dev.pid" ]]
echo "Landing lifecycle ownership and repeatability OK"
