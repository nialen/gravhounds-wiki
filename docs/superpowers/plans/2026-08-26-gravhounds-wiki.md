# GRAVHOUNDS Wiki Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and locally verify an English, source-grounded GRAVHOUNDS pre-release wiki with ten indexable pages and no unsupported guide claims.

**Architecture:** A statically generated Next.js App Router site uses locale-prefixed routes, validated local MDX, shared editorial components, and a generated public content manifest. Draft and deferred intents are filtered before route generation, navigation, related links, and sitemap creation.

**Tech Stack:** Next.js 16.3.3, React 19.2.8, TypeScript 5.9.3, Tailwind CSS 4.3.3, next-mdx-remote 6.0.0, Zod 4.4.3, gray-matter 4.0.3, Vitest 4.1.11, Playwright 1.62.1, Sharp 0.35.3, npm 11.

**Spec:** `docs/superpowers/specs/2026-08-26-gravhounds-wiki-design.md`

## Global Constraints

- Target directory is exactly `F:\gitee\gravhounds-wiki`; preserve all pre-existing research files.
- Raw research Markdown, `keywords.json`, `素材/`, and `品牌与图标素材/` remain Git-ignored.
- English is the only locale; public routes use `/en/`, and `/` redirects to `/en/`.
- Public route count is exactly 10; beginner-guide and crossplay are deferred and absent from public discovery.
- Every factual page claim must trace to the supplied research or listed sources; no invented codes, classes, values, dates, stats, builds, maps, or mechanics.
- Production pages disclose last checked date and evidence limits where applicable.
- Do not create or push a GitHub remote, deploy, modify DNS, or perform other external writes.
- Use npm and retain `package-lock.json`.
- Use `apply_patch` for authored file changes; use image tooling only for binary conversion and optimization.

---

## Phase 1. Material and project preflight

Checkpoint: confirmed identity, confirmed target, protected-file inventory, status table, fixed stack, English-only locale, and no unresolved build blocker.

### Task 1: Establish the project toolchain and preflight manifest

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `src/site/page-manifest.ts`
- Create: `src/site/page-manifest.test.ts`
- Create: `src/site/site-config.ts`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `PageDefinition`, `pageManifest`, `publicPages`, `deferredPages`, `SiteConfig`, and executable npm scripts.
- Consumers: route generation, navigation, sitemap, content validation, and reports in later phases.

- [ ] **Step 1: Write the failing page-manifest test**

```ts
import { describe, expect, it } from "vitest";
import { deferredPages, publicPages } from "./page-manifest";

describe("page manifest", () => {
  it("publishes ten English routes and excludes deferred intents", () => {
    expect(publicPages).toHaveLength(10);
    expect(publicPages.every((page) => page.locale === "en" && page.status === "ready")).toBe(true);
    expect(publicPages.map((page) => page.slug)).not.toContain("beginner-guide");
    expect(publicPages.map((page) => page.slug)).not.toContain("crossplay");
    expect(deferredPages.map((page) => page.slug)).toEqual(["beginner-guide", "crossplay"]);
  });
});
```

- [ ] **Step 2: Create the package and framework configuration**

Use exact dependency versions:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "content:check": "tsx scripts/validate-content.ts",
    "verify": "npm run typecheck && npm run lint && npm run test && npm run content:check && npm run build"
  },
  "dependencies": {
    "@tailwindcss/postcss": "4.3.3",
    "gray-matter": "4.0.3",
    "@phosphor-icons/react": "2.1.10",
    "next": "16.3.3",
    "next-mdx-remote": "6.0.0",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "sharp": "0.35.3",
    "tailwindcss": "4.3.3",
    "zod": "4.4.3"
  },
  "devDependencies": {
    "@playwright/test": "1.62.1",
    "@testing-library/react": "16.3.2",
    "@types/node": "26.3.0",
    "@types/react": "19.2.18",
    "@types/react-dom": "19.2.5",
    "eslint": "9.39.5",
    "eslint-config-next": "16.3.3",
    "jsdom": "29.0.0",
    "postcss": "8.5.26",
    "tsx": "4.23.12",
    "typescript": "5.9.3",
    "vitest": "4.1.11"
  }
}
```

- [ ] **Step 3: Install dependencies and prove the test fails for the missing manifest**

Run: `npm install`  
Run: `npm test -- src/site/page-manifest.test.ts`  
Expected: FAIL because `src/site/page-manifest.ts` does not exist.

- [ ] **Step 4: Implement the manifest and site config**

Define:

```ts
export type BuildStatus = "ready" | "draft" | "deferred" | "blocked";
export type SourceStatus = "official" | "multi-source" | "single-source" | "unverified";

export interface PageDefinition {
  slug: string;
  locale: "en";
  keyword: string;
  title: string;
  description: string;
  category: "overview" | "release" | "guide" | "platform" | "media";
  sourceStatus: SourceStatus;
  status: BuildStatus;
  navLabel?: string;
}
```

Create exactly ten `ready` entries for the approved routes and exactly two `deferred` entries for `beginner-guide` and `crossplay`. Export filtered arrays. In `site-config.ts`, set the independent-site name, English locale, base URL from `NEXT_PUBLIC_SITE_URL` with `http://localhost:3000` as the local fallback until the user supplies a production domain, official links, and `2026-08-26` last-checked date.

- [ ] **Step 5: Run the focused and base checks**

Run: `npm test -- src/site/page-manifest.test.ts`  
Expected: PASS, 10 ready and 2 deferred.  
Run: `npm run typecheck`  
Expected: exit 0.

- [ ] **Step 6: Record phase checkpoint and commit**

Create `docs/checkpoints/phase-1-preflight.md` with identity, target, protected files, stack, locale, the 10/2 status count, changed files, evidence, and next phase. Verify `git status --ignored` shows the research pack as ignored.

```powershell
git add package.json package-lock.json tsconfig.json next.config.mjs postcss.config.mjs eslint.config.mjs vitest.config.ts src/site .gitignore docs/checkpoints/phase-1-preflight.md
git commit -m "chore: establish GRAVHOUNDS wiki preflight"
```

---

## Phase 2. Reference analysis

Checkpoint: visual cues and reusable structure recorded; official art is treated as sourced media, not copied branding.

### Task 2: Establish design tokens and a provenance-safe asset pipeline

**Files:**
- Create: `src/app/globals.css`
- Create: `src/site/assets.ts`
- Create: `src/site/assets.test.ts`
- Create: `scripts/prepare-assets.mjs`
- Create: `public/images/gravhounds-hero.webp`
- Create: `public/images/gameplay-building.webp`
- Create: `public/images/gameplay-combat.webp`
- Create: `public/icons/icon-16.png`
- Create: `public/icons/icon-32.png`
- Create: `public/icons/apple-touch-icon.png`
- Create: `public/icons/icon-192.png`
- Create: `public/icons/icon-512.png`
- Create: `public/favicon.ico`
- Create: `public/site.webmanifest`
- Create: `docs/reference-analysis.md`

**Interfaces:**
- Produces: `siteAssets`, CSS design tokens, optimized production images, icon variants, and asset provenance notes.
- Consumes: ignored local files under `素材/官方-Steam/` and `品牌与图标素材/favicon-source-512.png`.

- [ ] **Step 1: Write the failing asset-contract test**

```ts
import { describe, expect, it } from "vitest";
import { siteAssets } from "./assets";

describe("site assets", () => {
  it("uses optimized public files with provenance and alt text", () => {
    for (const asset of Object.values(siteAssets)) {
      expect(asset.src).toMatch(/^\/images\/.+\.(webp|avif)$/);
      expect(asset.alt.length).toBeGreaterThan(15);
      expect(asset.sourceUrl).toBe("https://store.steampowered.com/app/2440760/");
    }
  });
});
```

- [ ] **Step 2: Run the asset test and confirm the missing-module failure**

Run: `npm test -- src/site/assets.test.ts`  
Expected: FAIL because `assets.ts` is absent.

- [ ] **Step 3: Implement deterministic image and icon generation**

In `scripts/prepare-assets.mjs`, use Sharp to:

- resize `page-background.jpg` to 1920x1080 WebP quality 82 as `gravhounds-hero.webp`;
- resize `screenshot-03.jpg` and `screenshot-08.jpg` to 1280x720 WebP quality 80;
- resize the approved favicon source to 16, 32, 180, 192, and 512 PNGs without cropping;
- create a multi-size `favicon.ico` if Sharp supports the installed encoder; otherwise use the 32x32 PNG as `src/app/icon.png` and record ICO as a verified blocker rather than fabricating success;
- write `site.webmanifest` with icon paths, `display: "standalone"`, background `#101c38`, and theme `#1fe0e8`.

- [ ] **Step 4: Implement CSS tokens and asset metadata**

Declare the approved HSL palette as CSS custom properties, responsive type scale, focus ring, card surface, content width, and table overflow utility. Export typed asset records with `src`, `alt`, `width`, `height`, `sourceUrl`, and `sourceLabel`.

- [ ] **Step 5: Run asset generation and focused tests**

Run: `node scripts/prepare-assets.mjs`  
Expected: all required images and PNG icon variants exist.  
Run: `npm test -- src/site/assets.test.ts`  
Expected: PASS.  
Inspect dimensions with a Sharp metadata script; expected icon sizes: 16, 32, 180, 192, 512.

- [ ] **Step 6: Record reference boundary and checkpoint, then commit**

`docs/reference-analysis.md` must record official visual cues, reusable hierarchy, excluded official branding, image provenance, and copyright disclaimer. `docs/checkpoints/phase-2-reference-analysis.md` records evidence and next phase.

```powershell
git add src/app/globals.css src/site/assets.ts src/site/assets.test.ts scripts/prepare-assets.mjs public docs/reference-analysis.md docs/checkpoints/phase-2-reference-analysis.md
git commit -m "feat: establish visual system and asset pipeline"
```

---

## Phase 3. Project skeleton

Checkpoint: shared shell, locale routing, MDX loader, validation, metadata base, and public/deferred route boundaries exist.

### Task 3: Build validated content loading and the shared application shell

**Files:**
- Create: `src/content/schema.ts`
- Create: `src/content/loader.ts`
- Create: `src/content/loader.test.ts`
- Create: `src/components/site-header.tsx`
- Create: `src/components/mobile-nav.tsx`
- Create: `src/components/site-footer.tsx`
- Create: `src/components/status-strip.tsx`
- Create: `src/components/breadcrumbs.tsx`
- Create: `src/components/evidence-badge.tsx`
- Create: `src/components/source-list.tsx`
- Create: `src/components/related-pages.tsx`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/app/en/layout.tsx`
- Create: `src/app/en/[[...slug]]/page.tsx`
- Create: `src/app/en/[[...slug]]/page.test.tsx`

**Interfaces:**
- Produces: `ContentFrontmatter`, `ContentPage`, `getPublicContent(): Promise<ContentPage[]>`, `getContentBySlug(slug: string): Promise<ContentPage | null>`, `getStaticSlugs(): string[]`, `generateStaticParams()`, and the shared shell.
- Consumes: `publicPages`, `siteAssets`, and `siteConfig`.

- [ ] **Step 1: Write loader schema and route-boundary tests**

```ts
it("rejects duplicate locale and slug pairs", async () => {
  await expect(validateContent([fixture("gameplay"), fixture("gameplay")])).rejects.toThrow(/duplicate/i);
});

it("does not generate deferred routes", () => {
  expect(getStaticSlugs()).not.toContain("beginner-guide");
  expect(getStaticSlugs()).not.toContain("crossplay");
});
```

- [ ] **Step 2: Run tests and confirm schema/loader failures**

Run: `npm test -- src/content/loader.test.ts src/app/en/[[...slug]]/page.test.tsx`  
Expected: FAIL because loader and route modules are missing.

- [ ] **Step 3: Implement the schema and loader**

Use Zod to require the eight approved frontmatter fields plus a non-empty `sources` array for public pages. Enforce ISO-compatible dates, locale `en`, unique locale/slug pairs, route-manifest agreement, and `draft: false` for public content. Export only public ready pages.

- [ ] **Step 4: Implement the route and shared shell**

`src/app/page.tsx` calls `redirect("/en/")`. The catch-all route resolves the homepage for an empty slug and inner content otherwise, calls `notFound()` for unknown/deferred slugs, exports metadata from content, and statically generates only approved slugs. The header contains accessible desktop navigation and a client mobile-menu button with `aria-expanded` and Escape handling.

- [ ] **Step 5: Run focused tests, typecheck, and lint**

Run: `npm test -- src/content/loader.test.ts src/app/en/[[...slug]]/page.test.tsx`  
Expected: PASS.  
Run: `npm run typecheck`  
Expected: exit 0.  
Run: `npm run lint`  
Expected: exit 0.

- [ ] **Step 6: Record checkpoint and commit**

Create `docs/checkpoints/phase-3-project-skeleton.md` with route boundaries, loader interface, test output summary, changed files, and next phase.

```powershell
git add src docs/checkpoints/phase-3-project-skeleton.md
git commit -m "feat: add locale routing and validated content shell"
```

---

## Phase 4. Source-grounded content fill

Checkpoint: ten ready pages are populated, sourced, internally linked, and use the approved icon/image pipeline; unsupported pages remain absent.

### Task 4: Author the ten verified pages and SEO surfaces

**Files:**
- Create: `content/en/home.mdx`
- Create: `content/en/release-date.mdx`
- Create: `content/en/gameplay.mdx`
- Create: `content/en/system-requirements.mdx`
- Create: `content/en/platforms.mdx`
- Create: `content/en/game-pass.mdx`
- Create: `content/en/playtest.mdx`
- Create: `content/en/early-access.mdx`
- Create: `content/en/characters.mdx`
- Create: `content/en/trailer.mdx`
- Create: `src/components/hero.tsx`
- Create: `src/components/fact-grid.tsx`
- Create: `src/components/status-callout.tsx`
- Create: `src/components/responsive-table.tsx`
- Create: `src/components/table-of-contents.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/manifest.ts`
- Create: `src/site/structured-data.ts`
- Create: `src/site/seo.test.ts`
- Create: `scripts/validate-content.ts`

**Interfaces:**
- Produces: ten renderable `ContentPage` objects, public sitemap entries, robots rules, manifest metadata, and JSON-LD builders.
- Consumes: the content loader, page manifest, source list component, and asset map.

- [ ] **Step 1: Write SEO and content validation tests**

```ts
it("produces ten unique canonical URLs", async () => {
  const pages = await getPublicContent();
  const canonicals = pages.map((page) => canonicalFor(page.slug));
  expect(new Set(canonicals).size).toBe(10);
  expect(canonicals.every((url) => url.startsWith("http://localhost:3000/en/"))).toBe(true);
});

it("keeps descriptions within useful search lengths", async () => {
  for (const page of await getPublicContent()) {
    expect(page.description.length).toBeGreaterThanOrEqual(120);
    expect(page.description.length).toBeLessThanOrEqual(160);
  }
});
```

- [ ] **Step 2: Run SEO/content tests and confirm failure before MDX exists**

Run: `npm test -- src/site/seo.test.ts`  
Expected: FAIL because zero content pages load.

- [ ] **Step 3: Author homepage and release/access pages**

Write concise, original English copy from `关键词素材.md`. The release page must show Steam `Coming soon`, reported November 2, 2026, and last checked August 26, 2026 as separate facts. The playtest page must instruct users to use Steam Request Access without promising entry. Early Access uses `expects/plans` language. Game Pass uses `reported` language and does not generalize subscription tiers or regions.

- [ ] **Step 4: Author gameplay, requirements, platforms, characters, and trailer pages**

Use only named verified systems and requirements. The characters page visibly marks the five-name roster as single-source and assigns no roles or abilities. The trailer page links the two known YouTube IDs and does not claim transcript details. Add source objects to every frontmatter block.

- [ ] **Step 5: Implement page components and SEO endpoints**

Render one H1 per page, source/update disclosures, table-of-contents links, related public pages, and responsive tables. Generate sitemap from `publicPages`, robots with `/en/` allowed, manifest from the approved icons, and VideoGame/WebSite JSON-LD using only confirmed facts.

- [ ] **Step 6: Run content, test, type, and lint checks**

Run: `npm run content:check`  
Expected: 10 public pages, 0 invalid pages, 0 duplicate slugs, deferred routes absent.  
Run: `npm test`  
Expected: all tests pass.  
Run: `npm run typecheck`  
Expected: exit 0.  
Run: `npm run lint`  
Expected: exit 0.

- [ ] **Step 7: Record checkpoint and commit**

Create `docs/checkpoints/phase-4-content-fill.md` listing each public page, sources, omitted claims, internal links, changed files, and next phase.

```powershell
git add content src scripts/validate-content.ts docs/checkpoints/phase-4-content-fill.md
git commit -m "feat: publish source-grounded GRAVHOUNDS content"
```

---

## Phase 5. Local verification

Checkpoint: install, type, lint, tests, build, content, routes, links, SEO, desktop/mobile, and icons have fresh evidence; failures are fixed and rerun.

### Task 5: Add route, link, SEO, and responsive production verification

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/public-routes.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`
- Create: `scripts/verify-build.mjs`
- Create: `artifacts/visual/home-desktop.png`
- Create: `artifacts/visual/home-mobile.png`
- Create: `artifacts/visual/release-desktop.png`
- Create: `artifacts/visual/requirements-mobile.png`

**Interfaces:**
- Produces: reproducible build/route/SEO/link evidence and visual screenshots.
- Consumes: production server output and `publicPages`.

- [ ] **Step 1: Write failing Playwright route and deferred-route checks**

```ts
for (const path of expectedRoutes) {
  test(`${path} is indexable`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\//);
  });
}

test("deferred routes are not public", async ({ request }) => {
  expect((await request.get("/en/beginner-guide/")).status()).toBe(404);
  expect((await request.get("/en/crossplay/")).status()).toBe(404);
});
```

- [ ] **Step 2: Install the Playwright browser and run the pre-build test**

Run: `npx playwright install chromium`  
Run: `npm run build`  
Run: `npm run start` in a persistent session.  
Run: `npx playwright test tests/e2e/public-routes.spec.ts`  
Expected before all assertions are implemented: at least one focused failure demonstrating the verifier is active.

- [ ] **Step 3: Implement complete production verification**

`scripts/verify-build.mjs` fetches every expected route plus sitemap, robots, manifest, icons, and production images. It asserts status, unique title/description/canonical, one H1, internal links with no 4xx response, exactly ten sitemap URLs, deferred-route absence, and no starter-template residue.

- [ ] **Step 4: Add responsive and interaction assertions**

At 1440x900 and 390x844, assert `document.documentElement.scrollWidth <= window.innerWidth`, mobile menu keyboard behavior, visible focus, table containment, image dimensions, and no console errors. Capture the four named screenshots from the current production build.

- [ ] **Step 5: Run the full fresh verification set**

Run: `npm ci`  
Expected: exit 0 using the lockfile.  
Run: `npm run typecheck`  
Run: `npm run lint`  
Run: `npm test`  
Run: `npm run content:check`  
Run: `npm run build`  
Run: `node scripts/verify-build.mjs` against the production server.  
Run: `npx playwright test`  
Expected: all commands exit 0, ten public routes pass, two deferred routes return 404, and screenshots are fresh.

- [ ] **Step 6: Visually inspect screenshots and favicon previews**

Use the image viewer on all four screenshots plus 512, 32, and 16 pixel icon files. Record overflow, clipping, hierarchy, contrast, image distortion, mobile navigation, table behavior, and icon recognition. Fix observable defects, rerun the affected check, rerun `npm run build`, and recapture stale screenshots.

- [ ] **Step 7: Record checkpoint and commit**

Create `docs/checkpoints/phase-5-local-verification.md` with command timestamps, exit codes, route totals, screenshots, fixed defects, and remaining limitations.

```powershell
git add playwright.config.ts tests scripts/verify-build.mjs artifacts/visual docs/checkpoints/phase-5-local-verification.md
git commit -m "test: verify routes SEO and responsive layouts"
```

---

## Phase 6. Delivery

Checkpoint: five required reports reconcile page counts and commands, and the runbook keeps deployment conditional and separate.

### Task 6: Produce auditable delivery reports and final local verification

**Files:**
- Create: `BUILD_REPORT.md`
- Create: `CONTENT_COVERAGE.md`
- Create: `SEO_QA.md`
- Create: `VISUAL_QA.md`
- Create: `RUNBOOK.md`
- Create: `docs/checkpoints/phase-6-delivery.md`

**Interfaces:**
- Produces: final reproducible handoff documents.
- Consumes: phase checkpoints, command output, route manifest, screenshots, and Git history.

- [ ] **Step 1: Generate evidence tables from current outputs**

Record Node/npm versions, exact dependency/build commands, exit codes, commit summaries, ten public routes, two deferred intents, file changes, and blockers. Do not copy an earlier expected result; use fresh Phase 5 output.

- [ ] **Step 2: Write content and SEO reconciliation**

`CONTENT_COVERAGE.md` lists all 12 intents with source status, build status, public outcome, materials, omitted claims, and reason. `SEO_QA.md` lists each of the ten public routes with title, description, canonical, H1 count, indexability, sitemap, robots, Open Graph, icon/manifest, and internal-link result.

- [ ] **Step 3: Write visual QA and runbook**

`VISUAL_QA.md` references the four screenshots, viewports, inspected UI elements, fixed defects, and remaining limitations. `RUNBOOK.md` documents prerequisites, `npm ci`, development, build/start, content authoring, draft publication, future locale addition, verification, and a separate conditional deployment section that performs no deployment.

- [ ] **Step 4: Run final residue and consistency checks**

Run: `rg -n "TBD|TODO|lorem ipsum|example.com|starter|placeholder" src content public BUILD_REPORT.md CONTENT_COVERAGE.md SEO_QA.md VISUAL_QA.md RUNBOOK.md`  
Expected: no unexplained hits.  
Run: `npm run verify`  
Expected: exit 0.  
Run: `node scripts/verify-build.mjs` and `npx playwright test` against a fresh production server.  
Expected: all ten public routes pass and deferred routes remain absent.

- [ ] **Step 5: Record delivery checkpoint and commit**

```powershell
git add BUILD_REPORT.md CONTENT_COVERAGE.md SEO_QA.md VISUAL_QA.md RUNBOOK.md docs/checkpoints/phase-6-delivery.md
git commit -m "docs: deliver GRAVHOUNDS wiki verification reports"
```

- [ ] **Step 6: Final handoff**

Report the local URL, build commands, public/deferred page counts, verification evidence, screenshot paths, Git commit IDs, ignored research status, and any explicit blocker. State clearly that no remote repository or deployment was created.
