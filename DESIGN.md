# Current React Hero UI Design System

## 1. Design principles

- Center the hero message over edge-to-edge animated media.
- Keep navigation compact and collapse it to a menu on narrower screens.
- Use a bright primary CTA and a translucent secondary CTA.
- Scale the desktop composition with a reference unit; switch to fluid layout on small screens.

## 2. Typography

| Element | Current evidence |
|---|---|
| Typeface | Plus Jakarta Sans is declared in handwritten CSS; system sans-serif fallback. |
| Hero H1 | 500 weight; `calc(89 * var(--u))`; line height `calc(90 * var(--u))`; letter spacing `calc(-1 * var(--u))`. Two block lines. |
| Hero body | 300 weight; `calc(17.4 * var(--u))`; line height `calc(27 * var(--u))`; letter spacing `calc(-0.30 * var(--u))`. |
| CTA | 500 weight; `calc(13.3 * var(--u))`; line-height/letter spacing are not comprehensively specified. |
| Navigation | Menu links are 500 / 15px tablet and 500 / 15.5px mobile. Other navigation scale is not established here. |
| H2–H6, caption, code | **Proposed:** the new section H2 uses `clamp(32px, 4vw, 52px)`, weight 500, line-height 1.08, and `-.04em` tracking; its paragraph uses 18px / 1.7 at weight 300. These are section-specific proposals, not an established global scale. |

On mobile, H1 uses `min(74px, calc((100vw - 44px) / 6.9))`, line-height `1.04`, letter-spacing `-.02em`; short landscape caps it at 44px. Body uses `clamp(15.5px, 4vw, 16.5px)` and 1.6 line-height, with separate short-landscape values.

**Pending:** brand, audience, and product context are unresolved. Repository package/README identify “Genomia Forms”; the current document title says “Sellix — Cross-border finance,” while hero copy references genetics. Do not infer or normalize the brand from these conflicting signals.

## 3. Palette and contrast

| Token / observed value | Use in current hero |
|---|---|
| `#ffffff` | Main hero text (`--ink`) and primary CTA hover. |
| `#ededed` | Muted ink (`--ink-muted`). |
| `#f6f6f6` | Subtitle. |
| `#fdfdfd` | Primary CTA fill (`--white-btn`). |
| `#050505` | Primary CTA text (`--btn-ink`). |
| `rgba(10, 10, 12, .86)` | Current responsive menu panel surface. |
| `rgba(0,0,0,.78)` | Secondary CTA glass fill. |
| `rgba(255,255,255,.09)` | Secondary CTA border. |
| `#a78bfa` | Current focus outline. |
| `#000` | Page/video backing. |

**Pending:** semantic success, warning, error, info, and general surface/text color roles are not evidenced; no values are assigned here.

WCAG 2.1 sRGB calculations for solid pairs: white/black 21.00:1; `#ededed`/black 17.94:1; `#f6f6f6`/black 19.43:1; `#050505`/`#fdfdfd` 20.04:1. The secondary CTA text `#d9d9d9` over its `rgba(0,0,0,.78)` fill composited over worst-case white is approximately 8.30:1. These do not certify text over the changing video. No video contrast has been measured; hero copy currently has no scrim, so contrast against every frame cannot be certified.

Known focus issue: current purple `#a78bfa` against `#fdfdfd` is 2.68:1, below the 3:1 UI contrast criterion. Against black it is 7.72:1. **Proposed correction, not current implementation:** use dual focus colors, black `#050505` on light (`#fdfdfd`, 20.04:1) and white `#ffffff` on dark (`#050505`, 20.38:1). **Proposed video mitigation, not current implementation:** a black scrim with opacity at least `.56` over a pure-white frame composites near `#707070`, yielding about 4.58:1 for `#f6f6f6`. Dynamic video still requires validation across actual frames.

## 4. Spacing and grid

Desktop uses `--u: min(calc(100vw / 1280), calc(100dvh / 760))`; the authored reference is 1280×800, while unit height uses 760. Most desktop dimensions are multiples of `--u`. Hero content is centered with optical offsets `--dx: 8.5` and `--dy: 13.1` units. CTA gap is 7u; subtitle top margin 16.1u; CTA top margin 21.8u.

| Responsive range | Current behavior |
|---|---|
| Above 1160px | Proportional reference-unit layout; no reflow. |
| At/below 1160px | Tablet unit formula adds minimum/clamped sizing; nav links/actions hide, burger appears; content and controls get minimum sizes. |
| At/below 552px | `--u:1px`; 20px horizontal hero/nav padding; fluid headline and subtitle measure; subtitle breaks become natural wrapping. |
| At/below 353px | CTAs stack vertically; button width capped at `min(100%,272px)`. |
| At/below 552px and height at/below 460px | Short-landscape typography and spacing reductions. |

The tablet `--u` override is `min(max(0.9px,min(100vw/1280,100dvh/760)),(100vw - 72px)/575,100dvh/620)`. Mobile intentionally sets `--u:1px`: the design stops scaling as a single desktop composition and uses fixed/minimum touch-friendly dimensions plus fluid text. A fallback uses `100vh` where `100dvh` is unavailable.

**Proposed section layout:** the scroll section uses a 620px minimum desktop height, 96px vertical padding, and fluid 8vw side padding; columns use a flexible two-column grid with a fluid gap. At 700px and below it stacks, with 76px top / 88px bottom and 24px side padding. These are concrete proposals for this section, not existing global spacing tokens.

## 5. Shape and elevation

Primary and secondary hero CTAs are pill-shaped: desktop radius 19.5u; tablet at least 22px; mobile 23px. Mobile menu panel uses 20px radius, links 12px, and menu primary action 14px. Secondary CTA uses 2px backdrop blur and a subtle border. The responsive menu uses 22px backdrop blur and `0 24px 60px rgba(0,0,0,.55)` shadow. The background video fills/bleeds and is cropped with `object-fit:cover`, positioned at `51% 8%`.

## 6. Buttons

| Control | Current appearance and behavior |
|---|---|
| Hero primary | “Get Started”; near-white fill, near-black text, arrow SVG; hover fill becomes white. |
| Hero secondary | “Contact Sales”; dark translucent fill, `#d9d9d9` text, subtle white border and blur; hover increases fill/border opacity. |
| Navigation actions | Source includes disabled placeholder buttons; destinations are **pending**. |
| Responsive menu action | “Get Started” styled as a light filled action. |

Hero CTA dimensions: desktop 39u high, 19.5u radius, 13.3u text; tablet minimum 44px high / 15px text; mobile 46px high / 23px radius / 15px text. CTA destinations are **pending**; do not infer from labels. Current focus styling is a 2px `#a78bfa` outline offset 3px and pill radius; its contrast limitation is recorded above. Proposed dual focus tokens are normative recommendations, not implemented. No hover/focus state is evidence of a functional destination.

## 7. Forms

No forms or form controls are present in the current hero UI. Validation, labels, errors, and form-state colors are **pending**, not defined by this design system.

## 8. Other present components

- **Header/navigation:** logo, desktop nav links and actions, and a burger control. At 1160px and below, desktop links/actions are hidden and burger is shown.
- **Menu:** responsive panel with links and a primary action; opens with a short entrance animation. Escape closes it and returns focus to the burger; outside click and link selection close it.
- **Hero copy:** Spanish H1 “Lee la historia que está / escrita en ti” and subtitle “Sumérgete en tu información genética y descubre los secretos de tu biología en una sola plataforma.”
- **Video background:** two layered video elements cross-fade at the loop boundary; decorative media is hidden from assistive technology in the source markup.
- **What is GenomIA scroll section (proposed):** sibling section immediately below the full-screen hero; left-aligned heading “QUÉ ES GenomIA” and temporary Lorem ipsum description, plus a right-side CSS phone frame with an ordered list of three Spanish messages. The list remains semantic and present in reading order regardless of its visual reveal; it is not a modal.
- Phone frame proposal: 300px wide, 440px minimum height, 8px white border, 38px radius, near-black interior, violet-accented message bubbles.
- No table or alert component is evidenced.

## 9. Iconography and images

The hero uses inline SVG arrow icons; no icon package is evidenced. Exact media sources in current markup:

- Video: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4`
- Poster: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp`

The source markup's current ARIA label describes a “Stylised globe of Earth rendered as a purple dot matrix against a starfield, slowly rotating.” This is label text, not an independently verified description of the visual video content. The actual video asset's visual content is unverified. Do not treat the label as a measured contrast guarantee.

## 10. Motion

Video layers transition opacity over `.9s` with linear timing for loop cross-fades. **Proposed section message reveal:** each message rises/fades in over `.55s`, with `.7s` additional delay between messages. Reduced-motion preference shows all messages immediately without animation. Button transitions are `.18s ease`; menu entrance is `.18s ease`. Entrance choreography runs once: headline lines 1.05s (delays .12s/.22s), logo .62s, navigation .55s with .045s stagger, subtitle .85s, and CTA elements .55–.70s; final secondary CTA starts at .97s and finishes at 1.67s. Mobile shortens headline to .92s and adjusts CTA delays. Reduced-motion preference suppresses entrance and disables transitions/animations; video script holds the first frame.

## 11. Accessibility

Source provides a main hero, semantic heading and paragraph, video elements marked `aria-hidden="true"`, a separately labelled section heading and ordered message list (no live region, so the list is not announced as an unsolicited update), a burger button with `aria-expanded` and changing `aria-label`, Escape dismissal with focus return, and `prefers-reduced-motion` handling. The menu closes on link selection and outside click. Verify keyboard order, menu relationship/expanded-state announcement, and visible focus in implementation review. Current purple focus indicator has a known contrast failure against the light CTA; see palette section. Solid-pair calculations do not establish contrast over dynamic video. No video contrast has been measured.

## 12. Exportable CSS tokens and Tailwind equivalent

Values below reproduce evidenced source values; proposed corrective values are clearly marked and are not current implementation. Unobserved semantic colors remain pending.

```css
:root {
  --u: min(calc(100vw / 1280), calc(100dvh / 760));
  --color-ink: #ffffff;
  --color-ink-muted: #ededed;
  --color-panel: rgba(10, 10, 12, .86);
  --color-button: #fdfdfd;
  --color-button-ink: #050505;
  --color-glass: rgba(0, 0, 0, .78);
  --color-glass-border: rgba(255, 255, 255, .09);
  --color-focus-current: #a78bfa;
  --color-page: #000000;
  /* Proposed section layout values, not global tokens. */
  --section-background: #050505;
  --section-message-accent: #a78bfa;
  --dx: 8.5;
  --dy: 13.1;
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
        'ink-muted': 'var(--color-ink-muted)',
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
- Semantic success/warning/error/info colors and surfaces beyond the evidenced responsive menu panel: not evidenced.
- CTA and navigation destinations: not evidenced; some navigation controls are disabled placeholders.
- Form design and behavior: no forms present.
- Dynamic video contrast: not measured and not certifiable from solid-color calculations; hero currently has no scrim. The black scrim recommendation is proposed, not current.
- Dual black/white focus treatment is a proposed correction; current purple focus remains a known contrast issue pending implementation.
- The proposed GenomIA section is implemented in `src/components/WhatIsGenomiaSection.tsx` and its colocated CSS; spacing, typography, frame, and reveal values remain proposals rather than a finalized global system.
