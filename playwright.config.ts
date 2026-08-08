import { defineConfig } from '@playwright/test';

// Task 6 (verification pass) diagnosis, replacing three prior unproven
// "flaky e2e suite" theories (stale port-4321 daemon, generic resource
// contention, cold-Chromium startup) with two confirmed, separate causes —
// see task-6-report.md for the full evidence trail:
//
// 1. "Process from config.webServer exited early." on a cold start. Astro
//    7.2's `astro preview` shells out to `am-i-vibing`'s isRunByAgent() and,
//    when it detects an AI coding agent's shell (env vars like CLAUDECODE —
//    always true when this suite is driven by Claude Code, i.e. every task
//    of both passes), silently switches to the same background-daemon mode
//    as `--background`: it forks a detached server, prints a pid, and the
//    wrapped command process exits(0) within ~3s. Playwright's webServer
//    plugin treats any exit of its command as fatal unless the readiness
//    probe already won the race — an inherent race the daemon-fork model
//    loses often enough to look "flaky". `ASTRO_PREVIEW_BACKGROUND=1`
//    suppresses the auto-detection (src: node_modules/astro/dist/cli/
//    preview/index.js, `agentDetected = !process.env.ASTRO_PREVIEW_BACKGROUND
//    && isRunByAgent()`) and restores normal foreground/blocking behaviour,
//    confirmed live: without it `npm run preview` self-exits at ~2.9s
//    (code 0); with it, the same command still blocks after 6s of a
//    `timeout` wrapper (killed, never exited on its own).
//
// 2. `astro preview` binds `[::1]:4321` — IPv6 loopback ONLY, no IPv4 —
//    confirmed via `netstat`. On this machine that turned out NOT to be
//    what caused the reported failures: Node's default `dns.lookup` and
//    Playwright's own dual-stack Happy-Eyeballs request agent (used for the
//    webServer readiness probe) both resolve `localhost` to `::1` first and
//    connect immediately. Still pinned to `127.0.0.1` explicitly here —
//    confirmed to bind IPv4-only with no dual-stack ambiguity — since an
//    unpinned IPv6-only bind is a latent risk on any host/tool that doesn't
//    prefer IPv6 the way this one does (a different CI runner, a proxy,
//    Windows' per-network IPv6 preference table), even though it wasn't the
//    active cause here.
//
// The genuinely reproduced flakiness — page.goto/frame.evaluate hitting the
// 30s timeout under default parallel workers, never an assertion failure,
// clean at --workers=1, and slower wall-clock under parallel workers than
// serial — is real, local Chromium/CPU contention on this machine (12 CPUs,
// confirmed independently this task and by Tasks 4 and 5). Neither fix
// above touches it; it is not caused by the webServer race or the address
// family, and is unresolved by this change. Run e2e serially
// (`npx playwright test --workers=1`) until it's investigated further.
export default defineConfig({
  testDir: 'tests/e2e',
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { ...process.env, ASTRO_PREVIEW_BACKGROUND: '1' },
  },
  use: { baseURL: 'http://127.0.0.1:4321' },
});
