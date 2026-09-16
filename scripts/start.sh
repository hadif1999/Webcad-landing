#!/usr/bin/env bash
set -Eeuo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/process.sh"
case "${1-}" in "") ;; -h|--help) echo "usage: scripts/start.sh"; exit 0 ;; *) echo "unknown argument: $1" >&2; exit 1 ;; esac
mkdir -p "$RUN_DIR"
exec 9>"$RUN_DIR/lifecycle.lock"
flock -x 9
if [[ -f "$PID_FILE" ]]; then
  read -r pid stamp < "$PID_FILE" || true
  if is_owned; then echo "Landing already running as pid $pid"; exit 0; fi
  rm -f "$PID_FILE"
fi
cd "$ROOT"
[[ -x node_modules/.bin/next ]] || corepack pnpm install --frozen-lockfile
# setsid may fork when the shell is already a process group leader (common in
# CI containers), making $! the dead wrapper PID instead of the node PID.
# Use a FIFO to let the child report its own PID before exec-ing node.
_pid_fifo="$RUN_DIR/.start-pid-$$"
mkfifo "$_pid_fifo"
(
  setsid bash -c 'echo $$ >"'"$_pid_fifo"'"; exec node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 5557' >"$LOG_FILE" 2>&1 9>&-
) &
read -r pid < "$_pid_fifo"
rm -f "$_pid_fifo"
stamp="$(process_stamp "$pid")"
printf '%s %s\n' "$pid" "$stamp" > "$PID_FILE"
for _ in {1..30}; do
  if ! is_owned; then rm -f "$PID_FILE"; tail -20 "$LOG_FILE" >&2; exit 1; fi
  if grep -q 'Ready in' "$LOG_FILE"; then echo "Landing: http://localhost:5557 (pid $pid)"; exit 0; fi
  sleep 1
done
# A timeout is a failed start; clean up only this process group.
if is_owned; then kill -TERM -- "-$pid"; fi
rm -f "$PID_FILE"
echo "Landing did not become ready; see $LOG_FILE" >&2
exit 1
