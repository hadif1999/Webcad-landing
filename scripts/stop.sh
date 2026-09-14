#!/usr/bin/env bash
set -Eeuo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/process.sh"
case "${1-}" in "") ;; -h|--help) echo "usage: scripts/stop.sh"; exit 0 ;; *) echo "unknown argument: $1" >&2; exit 1 ;; esac
mkdir -p "$RUN_DIR"
exec 9>"$RUN_DIR/lifecycle.lock"
flock -x 9
if [[ ! -f "$PID_FILE" ]]; then echo "Landing is not running"; exit 0; fi
read -r pid stamp < "$PID_FILE" || true
if ! is_owned; then rm -f "$PID_FILE"; echo "Removed stale or unowned Landing pid file"; exit 0; fi
kill -TERM -- "-$pid"
for _ in {1..20}; do is_owned || break; sleep 0.25; done
if is_owned; then kill -KILL -- "-$pid"; fi
rm -f "$PID_FILE"
echo "Landing stopped"
