# Serene — Luxury Beauty & Wellness Landing Page

This document is the design source of truth for the two-section Serene landing page. It preserves the supplied visual, content, interaction, responsive, and motion requirements. The implementation is React + Vite + Tailwind CSS + TypeScript; do not add routes, sections, endpoints, dependencies, or destinations that are not specified here.

## Brand and typography

- Brand: **Serene**, a luxury beauty and holistic wellness brand.
- **Dancing Script** (weights 400, 500, 600, 700): the Serene wordmark.
- **Instrument Serif** (regular and italic): hero headline and founder quote.
- **Inter** (weights 300, 400, 500, 600, 700, 800, 900): body, navigation, and buttons.
- Load the families from Google Fonts with preconnects to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (the latter with `crossorigin`), using exactly:
  `https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800;900&display=swap`
- Set the document language to English. Page title: `Serene — Beauty & Wellness`. Description: `Expert beauty and holistic wellness, delivered with warmth and intention.`

## Page structure and navigation

Render exactly two vertically scrollable, full-screen sections, in this order, inside an app wrapper with background `#0a0608`:

1. `<Hero />` — cinematic video-led introduction.
2. `<QuoteSection />` — founder statement over a blue sky gradient.

Do not lock page scrolling. There are no supplied service, journal, contact, booking, or other routes. Navigation and calls to action must use valid in-page anchors only; do not invent external destinations or extra page sections.

## Hero

- Full viewport height (`h-screen`), positioned and clipped as a media composition.
- Full-bleed, cover-cropped background video:
  `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4`
  Autoplay, muted, loop, and `playsInline`. Place a full-section `bg-black/20` overlay above it. Keep it muted; the sound indicator is visual only and is not a sound control.
- Fixed navbar at `top-0 left-0 right-0 z-50`, horizontal space-between, `px-6 md:px-12 py-5`.
  - Left: white Serene wordmark in Dancing Script, `text-2xl md:text-3xl`.
  - Desktop center: About, Services, Journal, Contact links in white/80, white on hover, `text-sm tracking-wide`, `gap-12`.
  - Desktop right: white, rounded-pill **Book a consultation** CTA.
  - Mobile: accessible hamburger with expanded state and three animated lines. On open, top line rotates 45° and moves down 9px; middle line fades and scales to zero; bottom line rotates -45° and moves up 9px. Use `cubic-bezier(0.22,1,0.36,1)`. The panel slides in from the right, is `w-[85%] max-w-[340px]`, and has `bg-[#0a0608]/95`, `backdrop-blur-xl`, and a translucent white left border. Escape closes it; keyboard focus, visible focus, and restoration/continuation of focus must remain sensible. Link entrances stagger opacity and horizontal translation, starting at 150ms with 75ms between links; the bottom CTA starts at 450ms. Reduced-motion preferences remove non-essential movement.
  - Where the provided destination is not a real route, links must resolve to the available in-page sections/actions rather than fabricated URLs.
- Center the hero content with an upward offset of `-120px`.
  - Heading in white Instrument Serif: `Gentle touch. Radiant presence.`; `text-[36px] md:text-7xl lg:text-[110px]`, `leading-[0.9]`, tight tracking, centered, with the white text-glow.
  - Exact subtitle: `Expert beauty and holistic wellness, delivered with warmth and intention.` White/70, `text-sm md:text-base`, centered, `mt-5 md:mt-7`, `max-w-xl`.
  - White pill CTA: **Begin your renewal**, `mt-6 md:mt-9`.
- Shared CTA appearance: white background, black text, `px-8 py-3.5`, fully rounded, medium weight, `text-sm tracking-wide`; hover to white/90; 300ms transition; apply button glow. CTA is an in-page link, not a booking/contact endpoint.
- Desktop-only lower-left sound indicator at `bottom-8 left-8`: 40px circle, white/20 border, small horizontal bar, and two small white/60 text lines: `Experience` / `with sound`. It does not unmute or control the video.

## Founder quote section

- Full viewport height (`h-screen`), centered content, clipped decorative layers.
- Exact top-to-bottom background gradient:
  `#010A17 0% -> #0A4267 30% -> #20658E 60% -> #6BADC4 100%`.
- Rainbow image:
  `https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png`
  Absolute, inset-x-0, top-0, z-30, full width. Its vertical target moves from +120px to -160px according to section progress, using lerp factor 0.06.
- Cloud image:
  `https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png`
  Both clouds are hidden below `sm`; start at zero opacity and offscreen. Horizontal entry/exit uses the 0.12–0.92 progress window, from -200px on the left / +200px on the right, with opacity derived from horizontal distance. Vertical drift is `progress * -50px`. Lerp cloud transform and opacity with factor 0.04. Left cloud: absolute left-0, bottom-[10%], z-10, `w-[500px] md:w-[650px]`, margin-left -50%. Right cloud: same image flipped horizontally, absolute right-0, bottom-[15%], z-10, same widths, margin-right -75%.
- Put all animated layer transforms directly on those layers using `translate3d` and `will-change: transform`.
- Center the quote content at z-20, max-width 4xl. Instrument Serif, white, `text-xl sm:text-2xl md:text-4xl lg:text-[42px]`, `leading-[1.45] md:leading-[1.5]`.
- Exact founder quote: `Serene was founded on a belief in beauty that honors your nature. We pursue refined outcomes, considered approaches, and lasting vitality. We spend time learning what matters to you before deciding what serves you best. No rushing, no excess -- just support that lets you feel radiant.`
- Attribution: `Dr. Mia Callahan -- Founder`, `mt-6 md:mt-8`, white/80, `text-sm md:text-base tracking-wide`.

## Motion and accessibility

- Compute section progress exactly as `clamp(0, 1, (windowHeight - rect.top) / (windowHeight + rect.height))`.
- Drive parallax with `requestAnimationFrame`; lerp using `current + (target - current) * factor`. Cancel frames and remove listeners on cleanup.
- Honor `prefers-reduced-motion`: keep the page and decorative content legible, but do not run non-essential position/parallax motion. Keep visible focus indicators for all keyboard-operable links and controls.
- The hamburger is a native button with an accessible name, `aria-expanded`, and a relationship to the menu. Escape closes the open menu; hidden menu links cannot be reached by keyboard.
- Video is muted by default; do not add an invented sound toggle, booking endpoint, or contact endpoint.

## Global styling

Use Tailwind's base, components, and utilities directives. Baseline and utilities:

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: #0a0a0c; overflow-x: hidden; }
.font-inter { font-family: 'Inter', sans-serif; }
.font-instrument { font-family: 'Instrument Serif', serif; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.liquid-glass { background: rgba(255,255,255,.01); background-blend-mode: luminosity; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); border: none; box-shadow: inset 0 1px 1px rgba(255,255,255,.1); position: relative; overflow: hidden; }
.liquid-glass::before { content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1.4px; background: linear-gradient(180deg, rgba(255,255,255,.45) 0%, rgba(255,255,255,.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,.15) 80%, rgba(255,255,255,.45) 100%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; }
.text-glow { text-shadow: 0 0 40px rgba(255,255,255,.4), 0 0 80px rgba(255,255,255,.2), 0 0 120px rgba(255,255,255,.1); }
.button-glow { box-shadow: 0 0 20px rgba(255,255,255,.3), 0 0 40px rgba(255,255,255,.1); }
```

Keep horizontal overflow hidden without locking vertical scrolling. Add clear `:focus-visible` styling and reduced-motion handling without altering the requested visual identity.
