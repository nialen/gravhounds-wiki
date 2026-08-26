# Deployment Phase 2 Checkpoint: Analytics Preparation

Date: 2026-08-26

## Site URL configuration

- Canonical URL source: `src/site/site-config.ts`
- Environment variable key: `NEXT_PUBLIC_SITE_URL`
- Preview value: `https://gravhounds-wiki.vercel.app`
- Production value: `https://gravhounds-wiki.vercel.app`
- Vercel storage type: non-sensitive configuration

## Search and analytics scope

- Google Search Console: deferred by user for this publication.
- Google Analytics 4: deferred by user for this publication.
- No GA measurement ID or verification token has been added to the repository.
- Sitemap submission and first-visit analytics verification are therefore not part of this release gate.

## Repository safety

- `.env.local` is ignored and was not inspected or staged.
- `.vercel/` is ignored and contains local Vercel linkage only.
- Only public environment-variable names and scope are recorded here.

## Next safe action

Create a Vercel Preview deployment, verify public routes and SEO outputs, and promote only after the Preview gate passes.
