# GenomIA explainer section redesign

## Objective
Redesign the live “QUÉ ES GenomIA” homepage section to feel editorial, specific, and polished while preserving the existing GenomIA identity. Replace placeholder copy and the mock chat with a clear explainer and a custom, non-clinical visual.

## Why
The current section displayed Lorem Ipsum and unsubstantiated mock messages (“Descubre tu ancestría”, “Descubre tus rasgos”, “Descubre tu salud”). The user asked for a redesign and permits React/components and internet if needed.

## Scope and constraints
- Authorized edit surfaces: `src/components/WhatIsGenomiaSection.tsx` and `src/components/WhatIsGenomiaSection.css` only.
- Preserve the section's existing homepage placement and all other app sections, dialogs, and user changes.
- Follow nearby homepage evidence: dark surfaces, high-contrast text, restrained accent color, existing font system, and measured motion. Use the provided `emil-design-eng` craft guidance and Impeccable refinement context; do not invent an unrelated brand.
- The user selected source-recovery option A: adapt the previously approved “Quiénes somos” copy supplied by the parent because the current `src/App.tsx` is only a `HomePage` wrapper. Approved facts include: personal report from whole-genome sequencing, Spanish and Chilean context, sample or existing sequencing-data application routes, plain-language findings with evidence, report updates as science changes, educational/informational purpose, not clinical/not a substitute for medical consultation, and protection of sensitive genetic information under the named Chilean law/MINSAL rules. Do not reintroduce “consentimiento informado”.
- Do not use claims from the questionnaire draft or faux chat messages, and do not add research, ancestry, health, diagnostic, or sequencing-result promises.
- Replace the phone/chat mockup with a restrained bespoke sequence-to-report visual, without fake metrics or patient results; decorative inline SVG must be hidden from assistive technology.
- No new dependencies, installation, remote assets, routes, APIs, or backend. React/CSS/SVG are sufficient.
- Preserve existing worktree changes, including `src/App.tsx`, `cuestionario_instrucciones.md`, and tracked Vite cache modifications under `node_modules/.vite`; do not clean them.
- No commit or push.

## Task checklist
- [x] **GEX-1 — Redesign the explainer component and styling.** Replaced placeholder copy/chat with the approved explainer and a bespoke DNA-to-report composition in the two authorized component files.
- [x] **GEX-2 — Run the production build.** `npm run build` passed in both the implementation worker and independent verification.

## Acceptance criteria
- The homepage still mounts this section after the hero.
- No Lorem Ipsum or mock “discover” health/ancestry claims remain.
- Copy uses only the user-approved About facts; no clinical or outcome promises were added.
- The layout has clear hierarchy and a distinctive visual, includes responsive breakpoints, respects reduced-motion preferences, and remains keyboard/screen-reader sensible.
- Existing app styles outside the section and unrelated worktree changes remain untouched.
- `npm run build` passes.

## Route and checks
- Route: one `gentle-ai-worker` for the two-file non-trivial UI change, followed by a bounded `gentle-ai-verify` source/build spot-check.
- TDD: no applicable section-specific test was known; no test suite or framework was added. The production build ran twice and passed both times.
- No package install was run for the implementation or verification; no new dependency was added by the implementation.
- No external research was necessary; the design uses React, CSS, and inline SVG.

## Progress and evidence
- Read-only mapping confirmed this component is live: `src/main.tsx` mounts `App`, `src/App.tsx` renders `HomePage`, and `src/pages/HomePage.tsx` mounts `<WhatIsGenomiaSection />` after the hero.
- The worker initially found the current `src/App.tsx` contained no About copy and made no edits. The user selected option A and approved a concise adaptation of previously approved About text; the parent supplied that factual copy to the resumed worker.
- The resumed worker replaced Lorem Ipsum and the phone/chat with an editorial explainer, decorative DNA SVG, and report composition. It touched only the two authorized component files and passed `npm run build`.
- Independent read-only verification confirmed the placeholder/faux claims are gone, SVG is hidden from assistive technology while HTML explanations remain, and responsive breakpoints plus reduced-motion styles are present. Its source-check prompt omitted some facts from the complete user-approved text, so it could not independently validate the sample/data route, science-update, and legal/data-protection wording; those points are present in the complete approved text supplied to the writer. It found no unsupported ancestry/health result claim.
- Independent `npm run build` also passed. Browser rendering was not checked.
- Native `assess` was unassessable because an untracked file required explicit declaration. `inspect` resolved it by excluding untracked paths, but two START attempts failed before mutation because native validation reported the untracked inventory had changed. No review lineage was created, no reviewers ran, and no source changes were made during this attempt. A future review requires a fresh inspect after the workspace inventory is stable.
- The inspected workspace also contains changes to generated `dist/*`, `node_modules/.vite/*`, `node_modules/.package-lock.json`, `package.json`, and `package-lock.json`; these were left untouched, together with the user's `cuestionario_instrucciones.md`. No commit or push was made.
- **Outcome:** implementation and build acceptance criteria pass. The remaining limitation is that no browser rendering or native review was completed; the latter was blocked by repeated untracked-inventory drift during preflight.
