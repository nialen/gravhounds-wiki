# Phase 5 Checkpoint: Local Verification

Date: 2026-08-26

## Fresh verification evidence

| Check | Result |
| --- | --- |
| `npm ci` | Exit 0, 607 packages installed, 0 vulnerabilities |
| `npm run typecheck` | Exit 0 |
| `npm run lint` | Exit 0 |
| `npm test` | 7 suites, 11 tests passed |
| `npm run content:check` | 10 public pages valid, 2 deferred routes absent |
| `npm run build` | Exit 0, 15 static outputs generated |
| `node scripts/verify-build.mjs` | 10 routes, 10 internal links, 10 public assets and 2 deferred 404s passed |
| `npx playwright test` | 15 Chrome tests passed |

The local verification server used `127.0.0.1:3107` because port 3000 was occupied by an unrelated local site. Playwright used the installed stable Chrome channel after the bundled Chromium download source proved too slow.

## Browser coverage

- Every approved route returned 200 with one H1, a unique 120 to 160 character description and matching canonical URL.
- `/en/beginner-guide/` and `/en/crossplay/` returned 404.
- The desktop homepage had no horizontal overflow, image load error, console error or page error at 1440 by 900.
- The mobile menu opened from the keyboard, exposed a labeled navigation region and closed with Escape at 390 by 844.
- The requirements table remained inside its responsive wrapper at 390 pixels.
- Footer external links open separately and include `noreferrer`.
- Independent production fetches verified all internal links, sitemap count, icons and optimized images.

## Visual inspection

| Artifact | Inspected result |
| --- | --- |
| `artifacts/visual/home-desktop.png` | Strong hero hierarchy, legible navigation, sourced artwork, balanced fact strip and readable content column |
| `artifacts/visual/home-mobile.png` | Hero copy remains visible, fact modules stack cleanly, callout and footer fit without clipping |
| `artifacts/visual/release-desktop.png` | Evidence state, contents links, related pages, source list and corrected table are visually distinct |
| `artifacts/visual/requirements-mobile.png` | Three-column requirements table scrolls inside its wrapper and no longer renders as plain Markdown text |
| `public/icons/icon-512.png` | Gravity-core mark is sharp and retains transparent edges |
| `public/icons/icon-32.png` | Cyan core and orange orbit remain recognizable |
| `public/icons/icon-16.png` | Simplified silhouette remains recognizable at favicon size |

## Defects found and fixed

1. Port 3000 reused an unrelated ReStory server. The Playwright project now uses isolated port 3107 with server reuse disabled.
2. Footer official links lacked an explicit safe browsing relationship. A failing browser test captured the issue before the links gained `target="_blank"` and `rel="noreferrer"`.
3. MDX tables rendered as plain pipe text because GitHub-style tables were not enabled. A failing semantic-table test was added, `remark-gfm` was installed, the MDX compiler options were updated, and all screenshots were recaptured from the corrected build.

## Remaining limitations

- Browser verification uses the locally installed Chrome channel, not the Playwright-pinned Chromium build.
- The canonical base remains `http://localhost:3000` until a production domain is supplied through `NEXT_PUBLIC_SITE_URL`.
- Date, Game Pass and roster claims require a new source check near release.

## Next phase

Reconcile the build, content, SEO and visual evidence into the five delivery reports and final runbook.
