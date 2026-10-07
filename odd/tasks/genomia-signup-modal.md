# GenomIA section-by-section postulation form

## Objective
Implement a two-section postulation flow in the existing dialog while preserving the pulled app's “Quiénes somos” popup and GenomIA visual identity. The form is frontend-only and does not send or persist answers.

## Why
The signup CTA had no questionnaire. An earlier implementation was interrupted when the app/CSS changed and left a working-tree draft with the full questionnaire. The user's latest direction narrows that draft to the characterization section through P0.7, followed by one section asking why the person wants to sequence their genome.

## Scope and constraints
- Source scope: `src/App.tsx` and `src/index.css`; this final follow-up changed only `src/App.tsx`.
- Preserve the pulled hero, GenomIA brand and copy, signup trigger, “QUIÉNES SOMOS” button/dialog behavior, and incumbent CSS outside the requested form/popup polish.
- Keep the questionnaire as a separate popup and make it progress section by section.
- Section one begins with an email-address field, then contains only ficha de caracterización P0.1–P0.7, ending with “¿Tiene parentesco de primer grado con otra persona ya incorporada al estudio?”. Remove `NS/NR` and equivalent “No sabe” / “Prefiere no responder” choices from this section. Section two contains only the genome-motivation prompt (“¿Por qué te quieres hacer tu genoma?”) and a small `POSTULAR` button.
- Do not show the exact phrase “ESTO ES UNA VISTA FRONTEND” or “CONSENTIMIENTO INFORMADO” anywhere in the UI, including the About dialog. Remove the standalone consent heading/placeholder and frontend disclaimer, while retaining P0.2 as part of the requested ficha. Do not add other consent copy, eligibility items beyond P0.7, P7.3–P7.7, sections P1–P6, or any extra application question.
- Use Impeccable guidance to make the postulation form and “Quiénes somos” popup feel considered and human, not generic AI output. Preserve the current GenomIA navy/teal palette, existing Inter/Instrument Serif fonts, and glass-dialog language; `DESIGN.md` documents a different brand and is not an authority for this refinement.
- `POSTULAR` is a frontend-only visual affordance: no API, analytics, network submission, local persistence, or claim that answers were submitted.
- Preserve existing untracked files, especially `cuestionario_instrucciones.md` and `odd/tasks/serene-luxury-wellness-landing.md`.
- Do not commit, push, or publish.

## Task checklist
- [x] **GFM-1 — Build the two-section application flow.** Section one starts with email and contains only P0.1–P0.7 with Sí/No choices; section two contains only motivation and `POSTULAR`; the consent phrase was removed from About copy while preserving P0.2.
- [x] **GFM-2 — Run the available build check.** Latest worker and final independent spot-check both passed `npm run build`.

## Acceptance criteria
- The existing signup CTA opens the questionnaire popup without replacing or breaking the “QUIÉNES SOMOS” popup.
- The user moves from the email field and P0.1–P0.7 characterization section to the reduced genome-motivation section; no other questionnaire section appears.
- The email field appears before P0.1, and the P0 section contains only Sí/No options.
- Neither forbidden phrase appears in user-facing text; no standalone consent section, placeholder, or frontend disclaimer remains. P0.2 is preserved.
- The second section contains only the genome-motivation prompt and `POSTULAR`; answers are neither submitted nor stored.
- Both dialogs close with their own close button or Escape and restore focus to their own trigger.
- The questionnaire scrolls inside its popup on desktop and mobile; the hero and page structure otherwise remain unchanged.
- Inputs have visible labels and are keyboard-operable. The form and popup styling feel intentional and human while remaining consistent with the incumbent navy/teal identity.

## Route and checks
- Route: bounded `gentle-ai-worker` implementations plus a final read-only `gentle-ai-verify` spot-check. No source edits were made by the verifier.
- TDD mode: no project/session TDD setting was exposed and the project has no test script. No test framework was added.
- `pnpm run build` previously exited 127 because `pnpm` was not found. The latest implementation worker and final independent verifier each ran `npm run build` successfully (`tsc --noEmit` and Vite build; 31 modules transformed). No package installation was needed.
- The final read-only verifier confirmed the two forbidden phrases are absent from `src/App.tsx`, P0.2 remains, P0.1–P0.7 have only Sí/No, and POSTULAR has no submission behavior.
- No browser screenshot check was run. The Impeccable detector ran once and flagged incumbent Inter/Instrument Serif usage plus a width transition on the small progress bar; the incumbent type system was preserved.
- Native assessment was unassessable because an existing untracked questionnaire source document requires explicit declaration. Ordinary review was declined for the prior candidate; final code was independently verified through the returned high-risk path. No review receipt or delivery authorization is claimed.
- No commit, push, or publication was made by this task.

## Progress and evidence
- The resumed implementation preserves the two-dialog structure, existing “QUIÉNES SOMOS” behavior, in-memory-only form, section navigation, and responsive internal scrolling.
- A bounded worker added the email input before P0.1 and removed NS/NR, “No sabe”, and “Prefiere no responder” choices from P0.1–P0.7.
- A read-only verifier found the informed-consent phrase in About copy. A bounded follow-up worker removed that clause, preserved P0.2, confirmed both forbidden phrases are absent, and passed the build.
- The final read-only verifier independently confirmed the email and option ordering, exact forbidden-phrase removal, retained P0.2, inert submit behavior, and a successful production build.
- **Next step:** none; implementation and available checks are complete.
