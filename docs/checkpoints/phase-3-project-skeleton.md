# Phase 3 Checkpoint: Project Skeleton

Date: 2026-08-26

## Completed

- Added a Zod-validated MDX content contract and filesystem loader.
- Added the optional English catch-all route, metadata generation, static route enumeration, root redirect, and not-found page.
- Kept the public surface to the approved home page plus nine inner pages.
- Kept `beginner-guide` and `crossplay` outside static generation.
- Added the shared status strip, sticky header, responsive navigation, breadcrumbs, evidence labels, related links, source list, and footer.
- Added self-hosted Geist Sans and Geist Mono fonts.
- Completed the responsive dark industrial interface for article content, tables, evidence warnings, navigation, and mobile layout.

## Evidence

- RED: the focused loader and route test command failed because the loader and catch-all route did not exist.
- GREEN: the focused command passed 2 suites and 4 tests with 0 failures.
- Full `npm test` passed 4 suites and 6 tests with 0 failures.
- `npm run typecheck` exited 0.
- `npm run lint` exited 0 with no warnings.
- `npm install` completed with 0 vulnerabilities.

## Build status

- Route contract: ready
- MDX schema and loader: ready
- Shared site shell: ready
- Responsive article styling: ready for content integration
- Blockers: none

## Next phase

Write the ten source-grounded MDX pages, add homepage-specific editorial modules, and implement the SEO support routes.
