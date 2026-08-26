# GRAVHOUNDS Pre-Release Wiki Design

Date: 2026-08-26  
Target: `F:\gitee\gravhounds-wiki`  
Status: Approved in chat; written-spec review pending

## Purpose

Build an English, source-grounded pre-release knowledge hub for GRAVHOUNDS that can grow into a full guide site after public playtests or Early Access provide reliable gameplay evidence. The first version must be useful without pretending that unreleased mechanics, builds, values, or progression details are known.

The site is an independent fan resource. It must not imply affiliation with Octopus Panic, Steam, Xbox, or Microsoft.

## Confirmed identity

- Canonical game: GRAVHOUNDS
- Developer and publisher: Octopus Panic, Inc.
- Steam App ID: 2440760
- Official site: `https://www.gravhounds.com/`
- Confirmed platforms: Windows PC and Xbox Series X|S

This identity excludes the older game GRAV, GraveHound Games, sports teams, and unrelated canine content.

## Project and source safety

The confirmed non-empty project directory contains user-owned research Markdown, `keywords.json`, original Steam media, and favicon handoff assets. These files stay in place and are excluded from Git from the first commit. Production content may paraphrase verified facts from them. Only optimized, selected production images copied into `public/` may be tracked.

No GitHub repository, remote, push, Vercel deployment, DNS change, analytics account, or other external write is included.

## Technical approach

Use Next.js App Router, TypeScript, Tailwind CSS, local MDX, and npm. Generate a lockfile and retain it. Use static generation wherever possible.

English is the only first-version locale. Public routes use the `/en/` prefix. `/` redirects to `/en/`. No hreflang alternates are emitted until a complete equivalent locale exists.

Content is stored as MDX with validated frontmatter:

- `title`
- `description`
- `slug`
- `category`
- `updatedAt`
- `sourceStatus`
- `draft`
- `locale`

Draft filtering applies to navigation, related content, sitemap, and static route generation.

## Public information architecture

The first version contains ten indexable pages:

1. `/en/` — homepage and trust hub
2. `/en/release-date/` — release status and source conflict
3. `/en/gameplay/` — verified gameplay loop overview
4. `/en/system-requirements/` — official PC requirements
5. `/en/platforms/` — PC, Xbox, and platform features
6. `/en/game-pass/` — reported Game Pass availability with qualification
7. `/en/playtest/` — Steam playtest access instructions
8. `/en/early-access/` — official Early Access expectations
9. `/en/characters/` — limited roster overview with single-source disclosure
10. `/en/trailer/` — official-site and announcement video references

The following intents are deferred and absent from public routes, navigation, related links, and sitemap:

- `gravhounds beginner guide` — no reliable hands-on sequence or tactics
- `gravhounds crossplay` — Xbox ecosystem labels do not confirm Steam-to-Xbox play
- codes, builds, tier lists, bosses, maps, weapons, enemies, resources, quests, and upgrade databases — insufficient evidence

## Preflight content status

| Keyword | Page type | Material sources | Verification status | Build status | Reason |
|---|---|---|---|---|---|
| GRAVHOUNDS | Homepage | Official site, Steam, Xbox | Multi-source | ready | Identity and core premise confirmed |
| gravhounds release date | Status explainer | Steam, Gematsu, media reports | Conflict disclosed | ready | Useful status page can represent conflicting current evidence |
| gravhounds gameplay | Overview | Steam, Xbox | Multi-source | ready | Core loop and named systems overlap |
| gravhounds system requirements | Requirements table | Steam | Official single-source | ready | Platform store is authoritative for PC requirements |
| gravhounds platforms | Platform guide | Steam, Xbox, official site | Multi-source | ready | PC and Xbox availability confirmed |
| gravhounds game pass | Availability page | Gematsu, TheSixthAxis | Multi-source but same announcement cycle | ready | Publish with reported/last-checked language |
| gravhounds playtest | How-to/status | Steam, SteamDB | Official plus database | ready | Steam Request Access is live |
| gravhounds early access | FAQ | Steam developer questionnaire | Official single-source | ready | Developer expectations are explicitly stated |
| gravhounds characters | Roster overview | Steam/Xbox general claim, mxdwn names | Single-source for names | ready | Publish a limited page with visible evidence limitation |
| gravhounds trailer | Media page | Official site, Steam, Gematsu embeds | Official plus media | ready | Video identities are recorded; inaccessible captions are not used |
| gravhounds beginner guide | Guide | Marketing-level loop only | Insufficient | deferred | No hands-on tactics or verified sequence |
| gravhounds crossplay | Compatibility FAQ | Xbox feature labels only | Insufficient | deferred | Steam-to-Xbox compatibility unconfirmed |

Ready public page count: 10. Deferred page count: 2.

## Page design

The visual direction combines an SEO reference library with an editorial games magazine. It uses original layout and components rather than copying the official site.

### Visual system

- Deep navy foundation: `hsl(215 58% 14%)`
- Cyan energy accent: `hsl(188 88% 52%)`
- Orange-red alert accent: `hsl(18 100% 55%)`
- Alien magenta secondary: `hsl(298 52% 47%)`
- Warm off-white text: `hsl(45 32% 92%)`

Typography should feel industrial and editorial without using a game-owned typeface. Headings use a strong condensed display face or a safe web equivalent; body text prioritizes reading comfort.

### Shared shell

- Header with logo mark, desktop navigation, and accessible mobile menu
- Compact game-status strip showing pre-release state and last checked date
- Breadcrumbs on inner pages
- Footer with independent-site disclaimer and primary official links

### Shared content components

- Hero with reserved image space and readable contrast overlay
- Verified fact cards
- Status/conflict callout
- Requirements and feature tables with mobile overflow handling
- In-page table of contents
- Source disclosure with titles, publishers, and check dates
- Related public-page cards
- Evidence-status badge using text as well as color

No fabricated live counters, review scores, player counts, countdowns, ratings, or dead calls to action are allowed.

## Image and icon handling

Use the approved original favicon handoff, preserving its visual identity. Generate browser PNGs at 16x16 and 32x32, Apple Touch Icon at 180x180, Android icons at 192x192 and 512x512, `favicon.ico`, and `site.webmanifest`.

Select only a small number of official Steam images for production. Create optimized WebP/AVIF derivatives in `public/images/`, preserve aspect ratios, provide accurate alt text, and disclose ownership/source in the site footer or media notes. The raw `素材/` directory remains Git-ignored.

## Content behavior and evidence rules

Every public page gives a direct answer near the top, a visible updated date, and source disclosures. Facts are paraphrased; promotional prose is not copied.

The release-date page must visibly distinguish:

- Steam official current value: `Coming soon`
- Reported media date: November 2, 2026
- Last checked date: August 26, 2026

The characters page may name Zane, Dozer, Selene, Finn, and Luna only with a single-source limitation. It must not assign classes, abilities, roles, actors, or stats without new evidence.

The Game Pass page describes availability as reported and avoids claims about every subscription tier or region. The platforms page does not claim an Xbox One native release or Linux support. The trailer page does not invent transcript details.

## SEO

Each public page has a distinct title, description, canonical URL, Open Graph data, Twitter metadata, and exactly one H1. Use a consistent trailing-slash policy.

Generate:

- `sitemap.xml` containing exactly the ten public English pages
- `robots.txt`
- website and video-game JSON-LD where supported by verified facts
- icon and manifest metadata

The deferred routes do not exist publicly. There are no indexable English duplicates without `/en/`.

## Error and empty-state behavior

Unknown routes render a branded 404 with links to the homepage and public guide hub. Missing or invalid MDX frontmatter fails validation instead of silently publishing incomplete pages. A missing source array or duplicate locale/slug pair fails the content check.

If a production image is unavailable, the page uses an intentional CSS treatment rather than a broken image. External links open safely and remain visually distinguishable.

## Verification

Required fresh checks:

- clean dependency install from lockfile
- TypeScript check
- ESLint
- automated unit/content validation tests
- MDX frontmatter validation
- production build
- route manifest comparison against the ten ready pages
- draft/deferred exclusion
- internal-link crawl
- canonical, title, description, H1, Open Graph, robots, sitemap, JSON-LD, favicon, and manifest checks
- representative production screenshots at 1440x900 and 390x844
- desktop/mobile overflow, menu, table, focus, hover, and image checks
- favicon inspection at 512x512, 32x32, and 16x16

Required delivery documents:

- `BUILD_REPORT.md`
- `CONTENT_COVERAGE.md`
- `SEO_QA.md`
- `VISUAL_QA.md`
- `RUNBOOK.md`

## Phase checkpoints

### 1. Material and project preflight

Checkpoint: confirmed identity, confirmed target, protected-file inventory, status table, fixed stack, English-only locale, and no unresolved build blocker.

### 2. Reference analysis

Checkpoint: visual cues and reusable structure recorded; official art is treated as sourced media, not copied branding.

### 3. Project skeleton

Checkpoint: shared shell, locale routing, MDX loader, validation, metadata base, and public/deferred route boundaries exist.

### 4. Source-grounded content fill

Checkpoint: ten ready pages are populated, sourced, internally linked, and use the approved icon/image pipeline; unsupported pages remain absent.

### 5. Local verification

Checkpoint: install, type, lint, tests, build, content, routes, links, SEO, desktop/mobile, and icons have fresh evidence; failures are fixed and rerun.

### 6. Delivery

Checkpoint: five required reports reconcile page counts and commands, and the runbook keeps deployment conditional and separate.
