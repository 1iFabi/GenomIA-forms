# Port DESIGN Hero into React Page Structure

## Goal
Move the `DESIGN.md` hero from the standalone document into a maintainable React page at `src/pages/HomePage.tsx` with colocated `HomePage.css`, and restore the Vite/React document entry.

## Tasks
1. [x] Build the DESIGN.md hero as a readable TSX page with page-scoped CSS and React-managed interactions.
2. [x] Reconnect Vite/React root entry and update project setup instructions.
3. [x] Verify typecheck/build and inspect static implementation details.

## Scope
- Add `src/pages/HomePage.tsx` and `src/pages/HomePage.css`.
- Update `src/App.tsx`, global `src/styles.css`, root `index.html`, and `README.md`.
- Preserve the exact video/poster URLs, copy, sizing/typography, responsive layout, nav/menu and animation behaviors in DESIGN.md while translating imperative scripts to React lifecycle-managed effects.
- Keep code formatted with clear indentation, spaces, and line breaks.
- Retain `DESIGN.md` unchanged. Leave unrelated package/configuration files unchanged.

## Constraints
- User explicitly asks to move the design into a TSX/CSS page structure and prefers formatted, separated code.
- CTA/navigation destinations remain placeholders because DESIGN.md provides no URLs.
- The previous native review lineage remains unresolved and is not approval for this candidate.
- No commit created unless explicitly requested.

## Checks
- `npm run typecheck`: passed.
- `npm run build`: passed.
- Static review confirmed exact video/poster URLs, reduced-motion, crossfade, entrance cleanup, breakpoints, menu interactions, and Vite mount.
- Independent review found placeholder buttons exposed as `aria-disabled` but still activatable, and TSX/CSS formatting was too compressed. Refactored to multiline formatting and native disabled controls.
- Browser visual/interaction checks were not run; no browser setup is present.
