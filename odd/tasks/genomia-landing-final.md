# GenomIA landing: cierre (Quiénes somos, postulación con Google → Sheets, motion GSAP)

## Estado
- [x] Acento violeta (#a78bfa) de "Tu genoma, en palabras" y foco del hero → azul hero `#8cd0ff` / `rgb(140, 208, 255)`. Build OK.
- [x] 1–5 implementados (2026-10-06). `npm run build` y `npm run check` OK; función probada en 405/400/401 sin credenciales; Edge headless: pin + scramble resuelven, popup abre/cierra con #postula, sin errores JS.
- [ ] Pendiente del usuario: configuración Google Cloud / Netlify (README) y prueba end-to-end con `npx netlify dev` (login real, 409 duplicado, fila en planilla).

## Decisiones (grill 2026-10-06)
- Login: OAuth de Google directo (Google Identity Services). NO Netlify Identity (deprecado) ni Auth0.
- Backend: una Netlify Function. Planilla Google Sheets = fuente de verdad, sin DB.
- Cuentas: todo bajo seqgenomia@gmail.com (Gmail personal, no institucional): proyecto Google Cloud, planilla, sitio Netlify. Todo plan gratuito.
- Anti-duplicado: por `sub` de Google, verificado en servidor.
- No se bloquea a nadie por respuestas; se filtra en la planilla.
- Cuestionario crecerá: preguntas como datos en un solo archivo, compartido por front y función.
- Borrador en `localStorage` por `sub`, se borra al enviar.

## Tareas

### 1. "Tu genoma, en palabras" → GSAP
`motion` solo se usa en esta sección: se REEMPLAZA por `gsap` + `@gsap/react` (no suma librería neta; desinstalar `motion`).
- `ScrollTrigger` con `pin` + `scrub` sobre un timeline maestro reemplaza: `.wig__track` 340vh + sticky, `useScroll`, `progressIn`, rangos `data-reveal`/`data-range`.
- El canvas de bases se mantiene; lo dibuja `onUpdate` del timeline (proxy `{ head }` tweened con `ease: 'none'`).
- `ScrambleTextPlugin` (chars `ACGT`) reemplaza el `Decoded`/`scramble` propio en títulos de pilares; el título principal sigue sincronizado al cabezal.
- Motion nuevo: `SplitText` (lines + mask) en el intro; pilares con stagger y codones scrambleados; contador tween; CTA entra al final.
- `gsap.matchMedia()`: con `prefers-reduced-motion` o pantallas bajas, sin pin, estado final directo (equivale a la media query actual).
- `useGSAP()` para cleanup. Plugins registrados una vez, fuera del componente.

### 2. Quiénes somos
- `src/components/team/TeamSection.tsx` + css, debajo de WhatIsGenomia, `id="quienes-somos"`, link en Navbar (desktop y menú móvil).
- Carrusel con `ui/Marquee` existente, `repeat={3}`, 6 tarjetas: foto placeholder, nombre, rol, institución. Datos en array en el componente; fotos en `src/assets/team/`.

### 3. Postulación
- `src/questions.ts`: `{ id, section, text, type: 'yesno' | 'choice' | 'text', options? }[]`. Recuperar P0.1–P0.7 + motivación desde `git show 114f8be:src/App.tsx`. Sin campo email.
- Popup único (`<dialog>`), abierto por ambos "Postula" (Navbar y `wig__close`):
  0. "Continuar con Google" (GIS, `VITE_GOOGLE_CLIENT_ID`) → ID token.
  1. `GET`/`POST` a la función: ¿ya postuló? → "Ya recibimos tu postulación (fecha)".
  2. Secciones de `questions.ts`, una por paso. Header "Postulando como x@gmail.com · Cambiar cuenta".
  3. POSTULAR → "¡Postulación enviada!".
- Borrador `localStorage` key `genomia-draft:<sub>`, try/catch.

### 4. Netlify Function `netlify/functions/postular.ts`
- Verifica ID token (`google-auth-library` `verifyIdToken`, audience = client id).
- Sheets vía cuenta de servicio (`googleapis` o `google-auth-library` + fetch REST).
- Columnas: `fecha, sub, email, nombre, ...ids de questions.ts`; escribe header si la hoja está vacía.
- Si `sub` existe → 409. Si no → append.
- `// ponytail: check-then-append no es atómico; doble envío simultáneo puede duplicar. Aceptable al volumen del estudio.`
- Env: `GOOGLE_CLIENT_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `SHEET_ID`.

### 5. Config + guía
- `netlify.toml`: build `npm run build`, publish `dist`, functions `netlify/functions`.
- README, guía paso a paso con seqgenomia@gmail.com: proyecto GCP, pantalla de consentimiento Externa + **Publicar app** (si no, máx. 100 testers), OAuth Client web (orígenes localhost:5173/8888 y `*.netlify.app`), Sheets API, cuenta de servicio + JSON, compartir planilla como Editor, crear sitio Netlify desde GitHub, env vars, `netlify dev` para probar local.

## Fuera de alcance
Netlify Identity/Auth0, DB, borrador multi-dispositivo, router, consentimiento informado, preguntas P1–P7.

## Verificación
`npm run build`; probar flujo con `netlify dev`: login, duplicado (409), fila en planilla, borrador sobrevive recarga, reduced-motion sin pin.
