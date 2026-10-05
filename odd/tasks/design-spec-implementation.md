# Implement DESIGN.md as Standalone Hero

## Goal
Implement the project's detailed `DESIGN.md` literally as a single self-contained `index.html`, replacing the React/Vite entry point for the page while preserving the specification and unrelated project files.

## Tasks
1. [x] Implement the complete standalone page in `index.html` from `DESIGN.md`.
2. [x] Update usage instructions, correct verified spec mismatches, and independently validate static acceptance criteria.

## Scope
- One self-contained HTML file with inline CSS and JavaScript, using the exact copy, source video/poster, sizing, navigation, responsiveness, motion, and interactions in `DESIGN.md`.
- Update README to explain opening/serving the standalone HTML without a build step.
- Do not change `DESIGN.md`, package/configuration files, or `src/`; they are left in place but no longer imported by the standalone document.

## Constraints
- The user explicitly chose a literal implementation of `DESIGN.md` rather than adapting it to React/Vite.
- The previous native review lineage remains unresolved and is not approval for this candidate.
- No commit created unless explicitly requested.

## Checks
- Static inspection confirms a self-contained HTML page with inline CSS/JS, no framework/module import, Google Fonts as the only external stylesheet, and the exact DESIGN.md video/poster URLs.
- Two video elements, cross-fade logic, reduced-motion handling, entrance cleanup, breakpoint rules, burger behavior, and README direct-open instructions are present.
- Subtitle matches the exact copy and two `<br>` elements required by DESIGN.md.
- Browser validation unavailable: no browser executable or Playwright/Puppeteer/Selenium tooling is installed; desktop/mobile rendering, console errors, and interaction behaviors remain unverified.
- Navigation and CTA destinations are unspecified by DESIGN.md, so current links use `#` placeholders pending product destinations.
- The previous native review lineage remains unresolved; this implementation has no native review approval.

## Delivery evidence
- No commit created; user did not request a commit.
