# Current React Hero UI Design System

## 1. Design principles

- Position the hero message above the brightest part of the Earth video.
- Keep navigation compact: desktop shows “Quiénes somos” and “Postula”; narrower screens expose both through a burger menu.
- Use a cool blue palette drawn from the Earth video for hero text and calls to action.
- Scale the desktop composition with a reference unit; switch to fluid layout on small screens.

## 2. Typography

| Element | Current evidence |
|---|---|
| Typeface | Plus Jakarta Sans is declared in handwritten CSS; system sans-serif fallback. |
| Hero H1 | 500 weight; `calc(72 * var(--u))`; line height `calc(75 * var(--u))`; letter spacing `calc(-1 * var(--u))`. Two block lines; the second is light blue. |
| Hero body | 300 weight; `calc(14.5 * var(--u))`; line height `calc(23 * var(--u))`; letter spacing `calc(-0.30 * var(--u))`. |
| CTA | 500 weight; `calc(12 * var(--u))`; line-height/letter spacing are not comprehensively specified. |
| Navigation | Desktop actions use the 11.5u reference scale; responsive menu items use 14px text, with “Postula” at weight 600. |
| H2–H6, caption, code | **Proposed:** the new section H2 uses `clamp(32px, 4vw, 52px)`, weight 500, line-height 1.08, and `-.04em` tracking; its paragraph uses 18px / 1.7 at weight 300. These are section-specific proposals, not an established global scale. |

On mobile, H1 uses `min(62px, calc((100vw - 44px) / 7.7))`, line-height `1.08`, letter-spacing `-.02em`; short landscape caps it at 40px, or `min(36px, calc((100vw - 44px) / 8.6))` on narrow short screens. Body uses `clamp(14.5px, 3.8vw, 15.5px)` and 1.6 line-height, with separate short-landscape values.

**Pending:** audience and product context remain unresolved. The repository package/README identify “Genomia Forms,” the page title says “GenomIA,” and the hero references genetics; avoid inferring additional product claims.

## 3. Palette and contrast

| Token / observed value | Use in current hero |
|---|---|
| `#f2f9ff` | Main hero text (`--ink`). |
| `#c6e7ff` | Second headline line. |
| `#c8deef` | Hero subtitle. |
| `#d8f0ff` | Filled “Postula” action in the mobile menu and following section (`--white-btn`). |
| `#09223c` | Filled action text (`--btn-ink`). |
| `rgba(10,10,12,.86)` | Responsive menu panel surface. |
| `rgba(5,22,45,.82)` | Secondary CTA glass fill. |
| `rgba(140,208,255,.32)` | Secondary CTA border. |
| `#a78bfa` | Current focus outline. |
| `#000` | Page/video backing. |

**Pending:** semantic success, warning, error, info, and general surface/text color roles are not evidenced; no values are assigned here.

The palette follows the video's blue Earth and dark sky while keeping the headline and subtitle legible against the dark sky. The central “Descubre” action uses a dark blue translucent fill; the navigation “Postula” action is white. Dynamic video contrast has not been measured across frames; there is no hero scrim. The purple focus outline remains insufficient against light actions; a dark outline on light and a white outline on dark are proposed corrections, not current implementation.

## 4. Spacing and grid

Desktop uses `--u: min(calc(100vw / 1280), calc(100dvh / 760))`; the authored reference is 1280×800, while unit height uses 760. Most desktop dimensions are multiples of `--u`. Hero content uses optical offsets `--dx: 8.5` and `--dy: -58` units, bringing the copy above the bright Earth horizon. The single central “Descubre” action is centered beneath the subtitle, with a 21.8u top margin; the subtitle top margin is 16.1u.

| Responsive range | Current behavior |
|---|---|
| Above 1160px | Proportional reference-unit layout; no reflow. |
| At/below 1160px | Tablet unit formula adds minimum/clamped sizing; desktop actions hide and a burger opens a compact menu with “Quiénes somos” and “Postula”. |
| At/below 552px | `--u:1px`; 20px horizontal hero/nav padding; hero content is positioned at `top:43%`; fluid headline and subtitle measure; subtitle breaks become natural wrapping. |
| At/below 353px | The sole central action is capped at `min(100%,272px)`. |
| At/below 552px and height at/below 460px | Short-landscape typography and spacing reductions; hero content moves to `top:40%` to keep copy off the bright horizon, or `top:47%` at/below 353px wide so the heading clears the navbar. |

The tablet `--u` override is `min(max(0.9px,min(100vw/1280,100dvh/760)),(100vw - 72px)/575,100dvh/620)`. Mobile intentionally sets `--u:1px`: the design stops scaling as a single desktop composition and uses fixed/minimum touch-friendly dimensions plus fluid text. A fallback uses `100vh` where `100dvh` is unavailable.

**Proposed section layout:** the scroll section uses a 620px minimum desktop height, 96px vertical padding, and fluid 8vw side padding; columns use a flexible two-column grid with a fluid gap. At 700px and below it stacks, with 76px top / 88px bottom and 24px side padding. These are concrete proposals for this section, not existing global spacing tokens.

## 5. Shape and elevation

The single central “Descubre” action is pill-shaped: desktop radius 19.5u; tablet at least 22px; mobile 23px. Desktop navigation shows “Quiénes somos” and “Postula”; at narrower widths, a burger opens a 184px-wide panel with both actions. The panel has a 20px radius and 22px backdrop blur. The central action uses 2px backdrop blur and a subtle blue border. The background video fills/bleeds and is cropped with `object-fit:cover`, positioned at `51% 8%`.

## 6. Buttons

| Control | Current appearance and behavior |
|---|---|
| Hero center | “Descubre”; dark navy translucent fill, pale blue text, arrow SVG, subtle blue border and blur; hover increases fill/border opacity. |
| Navigation | Desktop: “Quiénes somos” scrolls to the team section and “Postula” opens the application dialog; the responsive menu exposes both actions. |

The central CTA dimensions are: desktop 39u high, 19.5u radius, 12u text; tablet minimum 44px high / 14px text; mobile 46px high / 23px radius / 14px text. The central “Descubre” destination is not configured; do not infer one from the label. Current focus styling is a 2px `#a78bfa` outline offset 3px and pill radius; its contrast limitation is recorded above. Proposed dual focus tokens are normative recommendations, not implemented.

## 7. Forms

No forms or form controls are present in the current hero UI. Validation, labels, errors, and form-state colors are **pending**, not defined by this design system.

## 8. Other present components

- **Header/navigation:** the top-left brand is the local `src/assets/genomia.png` wordmark (28u high on desktop, 24px on mobile), with the accessible name “GenomIA”. Desktop displays “Quiénes somos” and “Postula”; at 1160px and below they move into the burger menu.
- **Hero copy:** Spanish H1 “Lee la historia que / está escrita en ti” and subtitle “Sumérgete en tu información genética y descubre los secretos de tu biología en una sola plataforma.”
- **Video background:** two layered video elements use the same blue rotating-Earth clip and cross-fade at the loop boundary. Neither has a `poster` image; the background remains black until the video renders. The video elements are hidden from assistive technology, while their container has a descriptive label.
- **Team carousel:** Five bundled portraits (Alex, Andrés, Carol, Gabriel and Susan) appear in a manually navigated, scroll-snapping row: three profiles on desktop, two on tablet, one on mobile. The dark-blue section pairs large photographs with unboxed captions.
  Each supplied qualification is split into its degree and university, with distinct type sizes and spacing; Andrés has no qualification text because none was provided. The introductory paragraph uses a 400-weight reading style.
  Text buttons “Anterior” and “Siguiente” reuse `src/components/ui/Arrow.tsx`; the counter reads “1 de 5”. Buttons disable at the ends, the focused rail responds to horizontal arrow keys, and reduced-motion preference disables smooth button scrolling.
- **What is GenomIA scroll section (proposed):** sibling section immediately below the full-screen hero; left-aligned heading “QUÉ ES GenomIA” and temporary Lorem ipsum description, plus a right-side CSS phone frame with an ordered list of three Spanish messages. The list remains semantic and present in reading order regardless of its visual reveal; it is not a modal.
- Phone frame proposal: 300px wide, 440px minimum height, 8px white border, 38px radius, near-black interior, violet-accented message bubbles.
- No table or alert component is evidenced.

## 9. Iconography and images

The hero uses inline SVG arrow icons and a bundled PNG wordmark; no icon package is evidenced. Team portraits are bundled PNG, JPG and WebP files. The only hero background media source is the video:

- Video: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4`

The container's ARIA label describes a slowly rotating blue Earth against a starfield. The rendered video was visually checked; video contrast still varies frame by frame and is not certified by the label.

## 10. Motion

Video layers transition opacity over `.9s` with linear timing for loop cross-fades. **Proposed section message reveal:** each message rises/fades in over `.55s`, with `.7s` additional delay between messages. Reduced-motion preference shows all messages immediately without animation. Button transitions are `.18s ease`; menu entrance is `.18s ease`. Entrance choreography runs once: headline lines 1.05s (delays .12s/.22s), logo .62s, navigation .55s, subtitle .85s, and the single central CTA .70s (starting at .97s). Mobile shortens headline to .92s and starts the CTA at .90s. Reduced-motion preference suppresses entrance and disables transitions/animations; video script holds the first frame.

## 11. Accessibility

Source provides a main hero, semantic heading and paragraph, video elements marked `aria-hidden="true"`, and a separately labelled section heading and ordered message list (no live region, so the list is not announced as an unsolicited update). The burger button has an `aria-expanded` state; Escape closes its menu and restores focus, while clicking outside closes it. Verify keyboard order and visible focus in implementation review. Current purple focus indicator has a known contrast failure against light actions; see palette section. Solid-pair calculations do not establish contrast over dynamic video. No video contrast has been measured.

## 12. Exportable CSS tokens and Tailwind equivalent

Values below reproduce evidenced source values; proposed corrective values are clearly marked and are not current implementation. Unobserved semantic colors remain pending.

```css
:root {
  --u: min(calc(100vw / 1280), calc(100dvh / 760));
  --color-ink: #f2f9ff;
  --color-panel: rgba(10, 10, 12, .86);
  --color-button: #d8f0ff;
  --color-button-ink: #09223c;
  --color-glass: rgba(5, 22, 45, .82);
  --color-glass-border: rgba(140, 208, 255, .32);
  --color-focus-current: #a78bfa;
  --color-page: #000000;
  /* Proposed section layout values, not global tokens. */
  --section-background: #050505;
  --section-message-accent: #a78bfa;
  --dx: 8.5;
  --dy: -58;
  --e-reveal: cubic-bezier(.16, 1, .3, 1);
  --e-soft: cubic-bezier(.25, .8, .3, 1);
  --radius-cta: calc(19.5 * var(--u));
  /* Proposed correction only; not current implementation. */
  --color-focus-on-light: #050505;
  --color-focus-on-dark: #ffffff;
  /* Pending: semantic success/warning/error/info and other roles. */
}
@supports not (height: 100dvh) {
  :root {
    --u: min(calc(100vw / 1280), calc(100vh / 760));
  }
}
@media (max-width: 1160px) {
  :root {
    --u: min(max(.9px, min(calc(100vw / 1280), calc(100dvh / 760))),
      calc((100vw - 72px) / 575), calc(100dvh / 620));
  }
}
@media (max-width: 552px) { :root { --u: 1px; } }
```

Tailwind v3 mapping (extend only; handwritten CSS is currently used):

```js
// tailwind.config.js (package.json uses type: module)
export default {
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        panel: 'var(--color-panel)',
        button: 'var(--color-button)',
        'button-ink': 'var(--color-button-ink)',
        glass: 'var(--color-glass)',
        'glass-border': 'var(--color-glass-border)',
        'focus-current': 'var(--color-focus-current)',
        page: 'var(--color-page)',
      },
      spacing: { unit: 'var(--u)' },
      translate: {
        dx: 'calc(var(--dx) * var(--u))',
        dy: 'calc(var(--dy) * var(--u))',
      },
      transitionTimingFunction: {
        reveal: 'var(--e-reveal)',
        soft: 'var(--e-soft)',
      },
      borderRadius: {
        cta: 'var(--radius-cta)',
        full: '999px',
      },
      // Proposed only, not current: focus-on-light '#050505', focus-on-dark '#ffffff'.
      // Pending: semantic success/warning/error/info and other roles.
      // Responsive --u overrides below feed --radius-cta, translate, and spacing values.
      fontFamily: { sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
};
```

The CTA radius token is `calc(19.5 * var(--u))`, so it follows the intentional responsive `--u` overrides; `999px` remains the separate full-pill radius. The `@supports` fallback replaces the desktop base `100dvh` calculation with `100vh` when dynamic viewport units are unsupported; the tablet clamp and mobile `--u: 1px` override remain intentional responsive contexts. The Tailwind scale is a convenience mapping, not proof that utilities generate the current UI. React/Vite/TypeScript and Tailwind are present in project configuration; the hero styling is handwritten CSS. Responsive overrides of `--u` are intentional, so a consumer should preserve the desktop reference scaling, tablet clamps, and mobile fixed-unit regime rather than treating `--u` as globally constant.

## 13. Pending assumptions

- Brand, audience, and product context: conflicting repository and document evidence; unresolved.
- H2–H6, body variants beyond the hero paragraph, caption, and code typography: not evidenced.
- Semantic success/warning/error/info colors and surfaces beyond the evidenced hero controls: not evidenced.
- The central “Descubre” destination is not configured; navigation “Quiénes somos” targets the team section and “Postula” targets the application dialog.
- Form design and behavior: no forms present.
- Dynamic video contrast: not measured and not certifiable from solid-color calculations; hero currently has no scrim. The black scrim recommendation is proposed, not current.
- Dual black/white focus treatment is a proposed correction; current purple focus remains a known contrast issue pending implementation.
- The proposed GenomIA section is implemented in `src/components/WhatIsGenomiaSection.tsx` and its colocated CSS; spacing, typography, frame, and reveal values remain proposals rather than a finalized global system.
