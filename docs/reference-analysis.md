# Reference Analysis

Date: 2026-08-26

## Mode and audience

This is a greenfield editorial knowledge site for players searching before release. It is not a redesign of the official GRAVHOUNDS website and does not reproduce its layout, logo, or promotional language.

Design Read: an industrial science-fiction games magazine combined with a source-first reference manual.

- `DESIGN_VARIANCE: 7`: asymmetric editorial compositions on desktop, strict single-column collapse below 768px.
- `MOTION_INTENSITY: 4`: CSS entry and interaction feedback only, with reduced-motion support.
- `VISUAL_DENSITY: 5`: compact status and fact modules balanced by spacious reading sections.

## Verified visual cues

The official Steam artwork uses armored bio-engineered canine workers, alien terrain, industrial structures, pipelines, gravity or boost effects, cool blue equipment light, bright cyan energy, orange combat energy, and magenta vegetation.

The site translates those cues into a dark navy editorial system. Cyan is the single interactive accent. Orange is reserved for source conflicts and risk warnings, so it carries meaning rather than decoration.

## Reusable structure

- A short global status strip communicates the current pre-release state and verification date.
- The homepage uses an asymmetric image-led hero with concise copy and one primary action.
- Inner pages open with a direct answer, then use evidence modules, grouped fact layouts, source notes, and related public routes.
- Long system specifications are grouped into a responsive comparison layout rather than a decorative list with a border on every row.
- Mobile layouts collapse to one column and keep tables inside horizontal scroll containers.

## Design system boundary

The implementation uses native CSS plus Tailwind CSS. Editorial and industrial science-fiction are aesthetic directions, not official component systems. No Material, Fluent, Carbon, or game-owned design system is represented.

The site uses one dark theme, one 14px radius for elevated surfaces, and visible focus rings. It avoids glassmorphism, AI-purple gradients, centered generic heroes, equal three-card rows, fake game UI, invented statistics, decorative status dots, scroll cues, and unsupported live counters.

## Image provenance

Production images are optimized derivatives of files returned by the official Steam listing for App 2440760:

- `/images/gravhounds-hero.webp` from the official Steam page background.
- `/images/gameplay-operation.webp` from official Steam screenshot 03.
- `/images/gameplay-defense.webp` from official Steam screenshot 08.

Source: `https://store.steampowered.com/app/2440760/`

The original local files remain ignored by Git. Production pages use accurate alt text and include an independent-site disclaimer. Image copyright remains with Octopus Panic, Inc. and the relevant platform owners.

## Icon provenance

The favicon is the approved original gravity-core mark generated for this fan site. It is not an official GRAVHOUNDS logo and does not copy the game wordmark, characters, or screenshots. The production pipeline preserves the approved design at 16, 32, 180, 192, and 512 pixels and creates a multi-size ICO.

## Excluded proprietary elements

- Official GRAVHOUNDS wordmark and Octopus Panic logo
- Official website layout or proprietary code
- Character artwork used as site branding
- Copied promotional prose
- Unsupported roster abilities, classes, statistics, dates, or game systems
