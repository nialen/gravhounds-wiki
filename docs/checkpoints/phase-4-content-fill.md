# Phase 4 Checkpoint: Source-Grounded Content Fill

Date: 2026-08-26

## Published pages and evidence

| Route | Primary evidence | Deliberately omitted claims |
| --- | --- | --- |
| `/en/` | Steam and Xbox official listings | Codes, builds, maps, tactics and complete feature parity |
| `/en/release-date/` | Steam plus Gematsu | A final guaranteed November 2 release date or price |
| `/en/gameplay/` | Steam and Xbox official descriptions | Controls, values, build orders, enemy stats and mission timing |
| `/en/system-requirements/` | Steam requirements | Performance targets, Steam Deck support and Linux support |
| `/en/platforms/` | Steam and Xbox official listings | PlayStation, Switch, native Xbox One and Steam to Xbox crossplay |
| `/en/game-pass/` | Gematsu and TheSixthAxis | Guaranteed tiers, regions, catalog duration and unchanged launch terms |
| `/en/playtest/` | Steam plus a SteamDB identity record | Immediate access, capacity, wave dates and public invite codes |
| `/en/early-access/` | Steam developer questionnaire | Fixed roadmap, content counts, final release date and prices |
| `/en/characters/` | Steam plus mxdwn Games | Abilities, classes, statistics, biographies and voice cast |
| `/en/trailer/` | Official site plus Gematsu | Unverified channel identity, transcript details and footage-derived stats |

## Completed

- Authored ten original English MDX pages with validated source objects, related links, update dates and evidence status.
- Added a homepage hero using optimized official art with visible provenance.
- Added quick facts, verification callouts, responsive tables and linked contents navigation.
- Added WebSite and VideoGame JSON-LD limited to confirmed platform and gameplay facts.
- Added generated sitemap, robots and web app manifest endpoints.
- Added a content validator that checks public page count, thin content, deferred-route links and long-dash copy.
- Added an SEO contract test for canonicals, description lengths and structured-data boundaries.

## Evidence

- RED: `npm test -- src/site/seo.test.ts` failed because structured data and the ten MDX pages did not exist.
- GREEN: the SEO suite passed 3 tests with 0 failures.
- `npm run content:check` reported 10 public pages, 0 invalid pages, 0 duplicate slugs and 2 deferred routes absent.
- Full `npm test` passed 5 suites and 9 tests before the MDX integration regression was found.
- First `npm run build` failed while prerendering because MDX did not preserve the table-of-contents array property.
- RED regression: the new table-of-contents child-link test failed against the property-only component.
- GREEN regression: the focused component test passed after moving to MDX child links.
- Second `npm run build` completed and generated the content route set plus manifest, robots and sitemap.
- `npm run typecheck` and `npm run lint` exited 0.
- Mechanical scans found no long dashes and no public links to the deferred beginner-guide or crossplay routes.

## Build status

- Ten approved pages: populated
- Source disclosures: populated
- Internal public links: populated
- Deferred routes: absent from content and discovery
- Production build: passing
- Blockers: none

## Next phase

Verify all production routes, metadata, internal links, responsive behavior, keyboard navigation, images and icons with automated browser checks and fresh screenshots.
