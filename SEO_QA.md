# GRAVHOUNDS SEO QA

Date: 2026-08-26

All public routes returned 200, one H1, a unique title, a unique 120 to 160 character description, a matching canonical, Open Graph metadata and JSON-LD. All 10 appear in the generated sitemap and are allowed by robots.

| Route | Search focus | H1 | Canonical | Sitemap | Link check |
| --- | --- | ---: | --- | --- | --- |
| `/en/` | GRAVHOUNDS | 1 | Pass | Included | Pass |
| `/en/release-date/` | gravhounds release date | 1 | Pass | Included | Pass |
| `/en/gameplay/` | gravhounds gameplay | 1 | Pass | Included | Pass |
| `/en/system-requirements/` | gravhounds system requirements | 1 | Pass | Included | Pass |
| `/en/platforms/` | gravhounds platforms | 1 | Pass | Included | Pass |
| `/en/game-pass/` | gravhounds game pass | 1 | Pass | Included | Pass |
| `/en/playtest/` | gravhounds playtest | 1 | Pass | Included | Pass |
| `/en/early-access/` | gravhounds early access | 1 | Pass | Included | Pass |
| `/en/characters/` | gravhounds characters | 1 | Pass | Included | Pass |
| `/en/trailer/` | gravhounds trailer | 1 | Pass | Included | Pass |

## Technical surfaces

| Surface | Result |
| --- | --- |
| `/sitemap.xml` | 10 unique canonical URLs |
| `/robots.txt` | Allows `/en/` and names the sitemap |
| `/manifest.webmanifest` | Name, theme, start URL and 192/512 icons present |
| Favicon | ICO plus 16, 32, 180, 192 and 512 PNG variants |
| Open Graph | Article metadata and 1920 by 1080 image on content pages |
| Twitter cards | Summary large image metadata present |
| Structured data | WebSite on home and VideoGame using confirmed game facts |
| Deferred routes | Beginner guide and crossplay return 404 and are absent from sitemap/navigation |
| Internal links | 10 discovered production links returned below 400 |

## Production-domain action

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before the production build. Rebuild and rerun the route verifier so canonical, sitemap, robots and structured-data URLs use the live domain.
