# Phase 1 Checkpoint: Material and Project Preflight

Date: 2026-08-26

## Completed

- Confirmed GRAVHOUNDS identity with Steam App 2440760 and Octopus Panic, Inc.
- Confirmed target `F:\gitee\gravhounds-wiki` and preserved all pre-existing research files.
- Created the npm, Next.js, TypeScript, Tailwind, ESLint and Vitest toolchain.
- Added a typed page manifest with 10 ready English routes and 2 deferred intents.
- Added independent-site configuration and official platform links.
- Created feature branch `feature/gravhounds-wiki`; no implementation work occurred on `main`.

## Evidence

- RED: `npm test -- src/site/page-manifest.test.ts` failed because `page-manifest.ts` did not exist.
- GREEN: the focused Vitest suite passed 1 test with 0 failures.
- `npm run typecheck` exited 0.
- `npm run lint` exited 0.
- `npm install` reported 0 vulnerabilities.
- `git status --ignored` confirmed all raw research documents and source media remain ignored.

## Compatibility decisions

- `jsdom` is pinned to 29.0.0 because 30.0.1 requires Node 24.15 or newer while the workspace uses Node 24.14.
- ESLint is pinned to 9.39.5 because the current Next.js plugin peer range does not yet accept ESLint 10.
- Phosphor Icons replaces the plan's original Lucide entry to match the selected frontend design rules.
- Canonical URLs default to `http://localhost:3000` until the user supplies a production domain.

## Build status

- Ready pages: 10
- Deferred pages: 2 (`beginner-guide`, `crossplay`)
- Blockers: none

## Next phase

Record the reference boundary, generate optimized production images and icon variants, and establish the design tokens.
