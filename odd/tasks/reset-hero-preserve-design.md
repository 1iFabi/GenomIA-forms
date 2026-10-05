# Reset Implemented Hero, Preserve Design Spec

## Goal
Remove the previously implemented landing hero and MP4 from the app, restore the neutral starter screen, and preserve the user's existing `DESIGN.md` unchanged as a future specification.

## Tasks
1. [x] Restore the neutral starter UI in `src/App.tsx` and `src/styles.css`.
2. [x] Verify source diff and production build.

## Constraints
- Do not modify `DESIGN.md`; user selected to retain its detailed contents as a future specification.
- Do not delete user-authored files or the remote media asset.
- The earlier native scaffold review remains unresolved; do not claim it is closed or approved.
- No commit created unless explicitly requested.

## Checks
- `npm run typecheck`: passed.
- `npm run build`: passed; Tailwind warned that no utility classes were detected.
- `git diff --check -- src/App.tsx src/styles.css`: no whitespace errors; files are untracked, so Git did not diff them against an index baseline.
- The app source contains no MP4/hero implementation. `DESIGN.md` was not edited and remains untracked in this repository.
- The existing native review lineage for the scaffold remains pending; it was not resolved or reused for this change.
