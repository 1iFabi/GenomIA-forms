# Landing Hero with Video Background

## Goal
Replace the neutral starter screen with the first landing-page hero specified in `Instrucciones.txt`, using the provided MP4 as a background video.

## Scope
- Dark, centered responsive hero with title, subtitle, and two pill-shaped calls to action.
- No navigation, badges, or floating corner elements.
- Use the supplied MP4 as a decorative background with an overlay for readable contrast; keep text and controls accessible.
- Defer product-specific sections and detailed copy beyond temporary introductory content.

## Tasks
1. [x] Implement the responsive video hero.
2. [x] Verify structure and production build where dependencies permit.

## Constraints
- The existing native review transaction for the starter scaffold is left pending by user decision; do not claim it is closed or use it to approve the landing changes.
- Dependencies were previously absent; build checks may require `npm install`.
- No commit created unless explicitly requested.

## Checks
- `npm run typecheck`: passed.
- `npm run build`: passed; Tailwind warned that no utility classes were detected.
- `git diff --check -- src/App.tsx src/styles.css`: passed.
- Accessibility structure verified: background video muted/autoplay/loop/playsInline, hidden from assistive technology and keyboard focus; reduced-motion preference hides video.
- Functional browser check not run; visual contrast depends on the supplied video's frames, and CTA buttons are placeholders without actions.

## Delivery evidence
- No commit created; user did not request a commit.
- The pre-existing scaffold review remains unresolved and was intentionally left pending by user decision; this feature has no native review approval.
