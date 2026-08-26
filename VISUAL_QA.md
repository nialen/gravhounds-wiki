# GRAVHOUNDS Visual QA

Date: 2026-08-26

## Direction

The interface uses one dark industrial science-fiction language drawn from the game's official visual atmosphere without copying an official site layout. Cyan identifies interaction and evidence; orange is reserved for uncertainty warnings. Geist Sans handles editorial display text and Geist Mono handles status metadata.

## Inspected views

| Screenshot | Viewport | Result |
| --- | --- | --- |
| `artifacts/visual/home-desktop.png` | 1440 by 900 | Hero hierarchy, art crop, header, fact strip, callout, content and footer pass |
| `artifacts/visual/home-mobile.png` | 390 by 844 | Mobile hero, stacked facts, navigation control, callout and footer pass without horizontal overflow |
| `artifacts/visual/release-desktop.png` | 1440 by 900 | Evidence badge, contents links, related cards, source records and table pass |
| `artifacts/visual/requirements-mobile.png` | 390 by 844 | Requirement table remains contained and horizontally scrollable inside its wrapper |

## Interaction and accessibility

- Desktop and mobile pages remain within viewport width.
- Mobile navigation opens by keyboard and closes with Escape.
- Focus-visible styling is supplied by the shared CSS system.
- Official images have descriptive alt text; the decorative brand icon uses empty alt text.
- Reduced-motion preferences disable smooth scrolling and shortens transitions.
- Tables use semantic HTML after the `remark-gfm` fix.

## Fixed visual defects

The first screenshots exposed raw Markdown pipe text instead of tables. A semantic table regression test was added, GFM parsing was enabled and the screenshots were regenerated. The final images show styled tables on desktop and mobile.

## Icon review

The original gravity-core favicon was visually checked at 512, 32 and 16 pixels. Its cyan center and orange orbital streak remain distinct at small sizes. All required icon dimensions and the multi-size ICO were verified earlier in the asset checkpoint.

## Remaining limits

The full-page screenshots are tall because the pages retain complete source and related-content sections. No device-specific Safari or Firefox run was performed; the verified browser is installed stable Chrome on Windows.
