# Linux lifecycle helpers. PID identity includes kernel start ticks and repository cwd.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUN_DIR="$ROOT/.run"
PID_FILE="$RUN_DIR/landing-dev.pid"
LOG_FILE="$RUN_DIR/landing-dev.log"
process_stamp() {
  local stat
  stat="$(cat "/proc/$1/stat" 2>/dev/null)" || return 1
  stat="${stat##*) }"
  local fields
  read -ra fields <<< "$stat"
  printf '%s' "${fields[19]}"
}
is_owned() {
  [[ "${pid:-}" =~ ^[1-9][0-9]*$ ]] && [[ -n "${stamp:-}" ]] &&
    kill -0 "$pid" 2>/dev/null &&
    [[ "$(process_stamp "$pid")" = "$stamp" ]] &&
    (tr '\0' ' ' < "/proc/$pid/cmdline") 2>/dev/null | grep -Fq 'node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 5557' &&
    [[ "$(readlink "/proc/$pid/cwd")" = "$ROOT" ]] &&
    [[ "$(ps -o pgid= -p "$pid" | tr -d ' ')" = "$pid" ]]
}
