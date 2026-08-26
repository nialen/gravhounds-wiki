# GRAVHOUNDS Field Manual Runbook

## Prerequisites

- Node.js 24 or a compatible current Node release
- npm 11
- Windows, macOS or Linux shell capable of running Next.js
- Stable Chrome for the current Playwright configuration

## Install and develop

```powershell
cd F:\gitee\gravhounds-wiki
npm ci
npm run dev
```

Open `http://localhost:3000/en/`. The root path redirects to the English site.

## Production build and local server

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://your-final-domain.example"
npm run build
npm run start
```

Do not publish with the local canonical fallback. Use the real HTTPS origin and rebuild.

## Content workflow

1. Add or update an MDX file in `content/en/`.
2. Keep title, description, slug, category, updated date, source status, draft flag, locale, sources and related links valid against `src/content/schema.ts`.
3. Add the intended route to `src/site/page-manifest.ts` only after its evidence is ready.
4. Use `draft: true` while content is not public-ready.
5. Run `npm run content:check` before committing.

For a future locale, add a locale-specific content directory, extend the route and manifest types, translate navigation and metadata, then add hreflang alternates. Do not copy English claims into another language without preserving source status.

## Verification

```powershell
npm run verify
npx playwright test
```

For the independent production fetcher, start the verified build on its isolated QA port:

```powershell
npm run start -- --hostname 127.0.0.1 --port 3107
```

Then, in another shell:

```powershell
node scripts/verify-build.mjs
```

The expected result is 10 routes, 10 internal links, 10 public assets and 2 deferred 404s. Playwright regenerates the four screenshots under `artifacts/visual/`.

## Source maintenance

Recheck the Steam, Xbox, official site and named media sources before November 2, 2026 or any public launch. Update the checked date only after reviewing the live sources. Give special attention to the store release state, Game Pass terms, character names and cross-network multiplayer.

Raw research files and source media remain Git-ignored. Do not force-add `关键词素材.md`, `页面矩阵.md`, `媒体素材索引.md`, `素材/` or `品牌与图标素材/`.

## Conditional deployment

No deployment is included in this build. When the user authorizes deployment:

1. supply the final domain;
2. set `NEXT_PUBLIC_SITE_URL`;
3. run the full verification set;
4. inspect `git status` to confirm raw research is still ignored;
5. create or select a remote repository;
6. push only tracked files;
7. deploy the production build;
8. verify the live canonical, sitemap, robots, icons and all 10 routes.
