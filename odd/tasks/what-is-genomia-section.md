# Add the “Qué es GenomIA” Section

## Goal
Add a full-width scroll section directly below the current hero, with the heading and placeholder copy on the left and a phone mockup on the right that reveals three GenomIA messages.

## Tasks
1. [x] Create an accessible section component and responsive phone/message mockup.
2. [x] Integrate the section below the hero, enable page scrolling, and update DESIGN.md.
3. [ ] Correct landmark/formatting findings and re-verify typecheck/build and static accessibility/motion behavior.

## Scope
- Add `src/components/WhatIsGenomiaSection.tsx` and colocated `WhatIsGenomiaSection.css`.
- Update `src/pages/HomePage.tsx` and `src/styles.css` to add the section and permit vertical scrolling while keeping hero video clipping local.
- Update `DESIGN.md` to document the new component, animation behavior, and design values.
- Use “QUÉ ES GenomIA” as the section heading and short Lorem ipsum copy as the temporary description.
- Show messages for ancestry, traits, and health sequentially in the phone. Keep all message text accessible with reduced-motion support.
- Use the existing dark/white/violet visual language; any new sizing/timing values should be marked as proposals in DESIGN.md.

## Constraints
- User chose a scroll section below the hero, not a modal.
- Keep the implementation readable and split TSX/CSS.
- The prior native review lineage remains unresolved and is not approval for this new UI.
- No commit unless explicitly requested.

## Checks
- `npm run typecheck` and `npm run build`.
- Check section reading order, responsive stacking, readable message copy without motion, and scroll behavior.
- Browser visual test only if a browser is available.
