# Document the Current Design System

## Goal
Replace the stale `DESIGN.md` with an evidence-grounded design-system source of truth for the current React hero page.

## Tasks
1. [x] Audit current UI, stack, tokens, components, and accessibility evidence.
2. [x] Write the complete `DESIGN.md` with required sections, concrete tokens, contrast calculations, and explicit pending decisions.
3. [x] Correct independent review findings, then re-check document/code consistency and token completeness.

## Scope
- Modify only `DESIGN.md`.
- Derive values from current `src/pages/HomePage.tsx`, its CSS, global styles, root HTML, and package configuration.
- Mark missing product/audience/component choices as pending rather than inventing them.
- Record the moving-video contrast as unverified and provide a calculated, clearly labeled correction target rather than claiming compliance.
- Include CSS variables and a Tailwind v3 mapping example; distinguish current configuration from proposed token export.

## Constraints
- Keep the document in English, matching current repository-facing technical artifacts.
- No source code changes, tests, installation, or commit for this documentation request.
- Existing native review lineage remains pending and is not approval.
- Engram provider unavailable; mirror attempt recorded separately.

## Checks
- WCAG ratios were independently computed with the standard sRGB formula.
- Independent review found one unsupported `#181818` panel value, requested source evidence/qualification for the hero-image description, and missing `--dx`, `--dy`, `--e-reveal`, and `--e-soft` from the token export.
- A second review found the Tailwind CTA-radius mapping used fixed `19.5px`; corrected to responsive `19.5u` and moved transforms/easing to appropriate Tailwind keys.
- Final review found the exported token snippet omitted the `100vh` fallback for `--u`; added the fallback and confirmed responsive `--u` overrides.
- Final read-only consistency review found no remaining discrepancies; tokens, Tailwind mapping, and responsive values are internally consistent.
- Observed facts versus pending/proposed items are clearly distinguished.
