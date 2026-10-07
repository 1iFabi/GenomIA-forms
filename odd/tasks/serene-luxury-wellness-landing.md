# Serene Luxury Beauty & Wellness Landing Page

**Feature ID:** `serene-luxury-wellness-landing`  
**Repository:** `C:/Users/fabia/Desktop/forms/GenomIA-forms`  
**Status:** In progress

## Objective

Implement the user's supplied Serene landing-page brief as the design source of truth, create `DESIGN.md` in the app repository, and replace the current single GenomIA hero with two full-screen Serene sections: a cinematic hero and an animated founder quote.

## Problem and rationale

The current app is a single full-viewport GenomIA hero and suppresses page scrolling, so it cannot deliver the requested two-section Serene experience. The user selected the nested `GenomIA-forms/` repository after a workspace-root mismatch was surfaced; the outer `forms/` workspace must remain untouched. Recording the supplied brief in `DESIGN.md` keeps visual and motion decisions durable for future work.

## Scope

- Add `DESIGN.md` preserving the supplied brief as the project's visual, content, and motion source of truth.
- Update document title, description, language/font loading in `index.html` for Serene.
- Replace the app UI in `src/App.tsx` with the requested responsive Hero and QuoteSection.
- Update `src/index.css` for the requested base styles, fonts, glass and glow effects, scrolling, and accessible reduced-motion behavior.
- Do not change package dependencies, Tailwind configuration, unrelated public assets, the outer workspace, or the app's Git history.

## Constraints and decisions

- Preserve the requested two full-screen sections, copy, colors, font families/weights, external video/image URLs, CTA styles, navbar links, mobile menu stagger, and rAF/lerp parallax behavior.
- Keep the mobile menu keyboard-operable with an accessible toggle name/state, Escape close, visible focus, and sensible focus behavior; respect `prefers-reduced-motion` for non-essential movement.
- Use `transform`/`opacity` and `translate3d` for animated layers, clean up animation/frame/listener work on unmount, and leave video muted/autoplay/loop/playsInline as requested.
- Use the existing React/TypeScript/Vite/Tailwind setup without adding dependencies.
- No commit, push, PR, or release is authorized by the user. Leave work uncommitted unless the user later explicitly asks for delivery.

## Checklist

- [ ] **T1 — Implement the documented Serene page** (in progress): write `DESIGN.md`, update metadata/fonts/global styles, and implement the responsive hero/navigation plus quote/parallax section.
- [ ] **T2 — Verify the implementation**: perform a focused static review of page structure, keyboard/menu behavior, reduced motion, and section scrolling. The user explicitly waived `npm run build` to avoid generating outputs outside the authorized file boundary; report it as skipped, not passed.
- [ ] **T3 — Close out review evidence and task record**: follow the applicable native assessment/review workflow, record final evidence and remaining limitations, and report delivery state without committing.

## Acceptance criteria

1. `DESIGN.md` documents the user's supplied design prompt as the Serene visual and interaction source of truth.
2. The first viewport contains the muted looping cover video, fixed responsive navigation, centered serif headline/subtitle/CTA, and desktop sound indicator.
3. The mobile navigation opens/closes accessibly and its panel/links honor the requested visual and staggered-motion design.
4. The second full-screen section uses the specified blue gradient, rainbow/cloud assets, founder quote, and requestAnimationFrame parallax with the specified progress formula and lerp behavior.
5. The page scrolls between sections, remains usable on mobile, and honors reduced-motion preferences without breaking core content.
6. The focused static review finds no known TypeScript/behavioral issue; `npm run build` remains explicitly unverified because the user waived it, and no unrelated files or the outer workspace are modified.

## Verification evidence

- Baseline: nested repository `main` was clean and aligned with `origin/main` before implementation; the outer workspace remains outside the authorized edit scope.
- `npm run build`: explicitly waived by the user after the writer identified that build output may exceed the authorized file boundary; not run and not passed.
- Focused UI/accessibility static review: pending.
- Native assessment/review evidence: pending.

## Progress and next step

- User explicitly selected `GenomIA-forms/` as the target and asked to leave the outer `forms/` workspace untouched.
- User selected the writer's `waive-build` option; proceed with implementation and static review only, and report the build as skipped.
- No product source has been changed yet.
- Next: implement T1 within `GenomIA-forms/DESIGN.md`, `index.html`, `src/App.tsx`, and `src/index.css` only; do not execute the build.