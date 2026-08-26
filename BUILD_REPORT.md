# GRAVHOUNDS Field Manual Build Report

Date: 2026-08-26

## Outcome

The local English GRAVHOUNDS pre-release knowledge site is complete in `F:\gitee\gravhounds-wiki`. It publishes 10 approved routes and keeps 2 evidence-poor intents deferred. No remote repository, deployment, DNS change or external account write was performed.

## Environment

| Item | Value |
| --- | --- |
| Node.js | 24.14.0 |
| npm | 11.9.0 |
| Framework | Next.js 16.3.3, React 19.2.8 |
| Content | Validated local MDX through next-mdx-remote 6.0.0 and Zod 4.4.3 |
| Styling | Tailwind CSS 4.3.3 plus native CSS design system |
| Browser QA | Playwright 1.62.1 using installed stable Chrome |
| Package lock | `package-lock.json` retained and verified with `npm ci` |

## Fresh command evidence

| Command | Result |
| --- | --- |
| `npm ci` | Exit 0, 607 packages, 0 vulnerabilities |
| `npm run typecheck` | Exit 0 |
| `npm run lint` | Exit 0 |
| `npm test` | 7 suites and 11 tests passed |
| `npm run content:check` | 10 valid public pages, 2 deferred routes absent |
| `npm run build` | Exit 0, production static output completed |
| `node scripts/verify-build.mjs` | 10 routes, 10 internal links, 10 assets and 2 deferred 404s passed |
| `npx playwright test` | 15 Chrome tests passed |

## Local commits

| Commit | Purpose |
| --- | --- |
| `6329798` | Project preflight and protected research boundary |
| `3c09b23` | Visual system, optimized images and favicon pipeline |
| `b73423f` | Locale route, validated content loader and application shell |
| `a5c5f62` | Ten source-grounded pages and SEO surfaces |
| `37b1c8b` | Production route, responsive, link and visual verification |

## Protected local material

The original keyword files, source notes and raw media directories remain covered by `.gitignore`. Only rewritten public MDX, code, optimized production images, generated icons and QA screenshots are tracked.

## Known limits

- `NEXT_PUBLIC_SITE_URL` is not set, so local canonical generation uses `http://localhost:3000`.
- Steam still says Coming soon while media report November 2, 2026.
- Game Pass reporting needs a launch-near platform check.
- Five character names remain supported by one media source.
