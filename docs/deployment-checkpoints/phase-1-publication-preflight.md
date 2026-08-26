# Deployment Phase 1 Checkpoint: Publication Preflight

Date: 2026-08-26

## Confirmed targets

- Local project: `F:\gitee\gravhounds-wiki`
- Game identity: GRAVHOUNDS, Steam App 2440760, Octopus Panic, Inc.
- GitHub owner and repository: `nialen/gravhounds-wiki`
- GitHub visibility: public
- GitHub target branch: `main`
- Vercel team: `angelicachavira-1451s-projects`
- Vercel project: `gravhounds-wiki`
- Initial host strategy: Vercel default production domain
- Custom domain, GSC and GA4: not requested for this publication

## Read-only evidence before publication

- Local Git repository exists and the working tree was clean.
- Current implementation branch was `feature/gravhounds-wiki` at `c6bfc58`.
- No Git remote existed.
- `nialen/gravhounds-wiki` did not exist on GitHub.
- GitHub CLI was authenticated as `nialen`.
- Vercel CLI was authenticated as `angelicachavira-1451` with access to the confirmed team.
- No Vercel project link existed locally.
- Working-tree and Git-history secret scans found no credential patterns.
- Raw research notes and source-media directories remained Git-ignored.
- Identity scan found no previous-game residue in source or public files.

## Fresh local quality evidence

- `npm ci`: exit 0, 608 packages audited, 0 vulnerabilities.
- `npm run verify`: exit 0.
- TypeScript and lint: exit 0.
- Unit/component tests: 7 files and 11 tests passed.
- Content validation: 10 public pages valid and 2 deferred routes absent.
- Production build: 16 static outputs generated successfully.

## Authorization boundary

The user approved creation of the exact public GitHub repository, publication to its `main` branch, creation/linking of the exact Vercel project, and deployment through the confirmed Vercel team. Force-push, history rewrite, custom-domain changes, DNS writes, GSC and GA4 remain outside this authorization.

## Next safe action

Fast-forward the local `main` branch to the verified implementation, create the confirmed GitHub repository, link `origin`, record Git checkpoints, and perform the first push without force.
