import { useEffect, useLayoutEffect, useRef } from 'react';
import { useInView, useScroll } from 'motion/react';
import Arrow from '../ui/Arrow';
import Placeholder from '../ui/Placeholder';
import './WhatIsGenomiaSection.css';

const BASES = 'ACGT';
const GENOME_SIZE = 3_100_000_000;
const ACCENT = '167, 139, 250';

// Scroll timeline, as fractions of the pinned track.
const HEAD: Range = [0.03, 0.5];
const INTRO: Range = [0.44, 0.56];
const PILLAR_START = 0.54;
const PILLAR_STEP = 0.1;
const PILLAR_LENGTH = 0.12;
const CLOSE: Range = [0.84, 0.94];
const FIELD_DIM: Range = [0.48, 0.7];

const PILLARS = [
  {
    codons: 'CTG AGC ATT',
    title: 'Lenguaje simple',
    text: 'Cada hallazgo explicado sin jerga, con el contexto para entenderlo.',
  },
  {
    codons: 'TGC CAG GTA',
    title: 'Contexto chileno',
    text: 'Un reporte pensado para la realidad de Chile.',
  },
  {
    codons: 'GAT ACC TCG',
    title: 'Evidencia que se actualiza',
    text: 'Cuando cambia el conocimiento científico, tu reporte también.',
  },
];

type Range = [number, number];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const progressIn = (p: number, [a, b]: Range) => clamp01((p - a) / (b - a));
const easeOut = (k: number) => 1 - (1 - k) ** 3;
const pillarRange = (i: number): Range => [
  PILLAR_START + i * PILLAR_STEP,
  PILLAR_START + i * PILLAR_STEP + PILLAR_LENGTH,
];
const toAttr = ([a, b]: Range) => `${a},${b}`;

/** Deterministic PRNG so the base field keeps its pattern across resizes. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function scramble(text: string, resolved: number) {
  let out = '';
  for (let i = resolved; i < text.length; i += 1) {
    out += /\p{L}/u.test(text[i]) ? BASES[(Math.random() * 4) | 0] : text[i];
  }
  return out;
}

/** Text that the engine resolves from bases; screen readers get the plain text. */
function Decoded({ text, range }: { text: string; range?: Range }) {
  return (
    <>
      <span className="wig-sr-only">{text}</span>
      <span
        className="wig-decode"
        aria-hidden="true"
        data-decode={text}
        data-range={range ? toAttr(range) : 'head'}
      >
        <span className="wig-decode__read">{text}</span>
        <span className="wig-decode__raw" />
      </span>
    </>
  );
}

export default function WhatIsGenomiaSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const renderRef = useRef<(force?: boolean) => void>(() => undefined);
  const inView = useInView(trackRef, { margin: '80px 0px' });
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useLayoutEffect(() => {
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const formatCount = new Intl.NumberFormat('es-CL');
    const decodes = Array.from(stage.querySelectorAll<HTMLElement>('[data-decode]')).map(
      (el) => ({
        el,
        read: el.firstElementChild as HTMLElement,
        raw: el.lastElementChild as HTMLElement,
        text: el.dataset.decode!,
        range: el.dataset.range === 'head' ? null : (el.dataset.range!.split(',').map(Number) as Range),
        left: 0,
        width: 0,
        shown: -1,
      }),
    );
    const reveals = Array.from(stage.querySelectorAll<HTMLElement>('[data-reveal]')).map(
      (el) => ({ el, range: el.dataset.reveal!.split(',').map(Number) as Range }),
    );

    let width = 0;
    let height = 0;
    let fontSize = 13;
    let cellW = 0;
    let cellH = 0;
    let cols = 0;
    let rows = 0;
    let letters = new Uint8Array(0);
    let glow = new Float32Array(0);
    let pinned = false;
    let lastProgress = -1;
    let lastScramble = 0;
    let lastSpark = 0;

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = stage.clientWidth;
      height = stage.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fontSize = width < 600 ? 11 : 13;
      cellW = fontSize * 1.3;
      cellH = fontSize * 2.05;
      cols = Math.ceil(width / cellW);
      rows = Math.ceil(height / cellH);

      const rand = mulberry32(19628);
      letters = new Uint8Array(cols * rows).map(() => (rand() * 4) | 0);
      glow = new Float32Array(cols * rows);

      pinned = getComputedStyle(stage).position === 'sticky';

      // Measure with the readable text in place; scrambled glyphs differ in width.
      const stageLeft = stage.getBoundingClientRect().left;
      for (const d of decodes) {
        d.read.textContent = d.text;
        d.raw.textContent = '';
        d.shown = -1;
        const box = d.read.getBoundingClientRect();
        d.left = box.left - stageLeft;
        d.width = box.width;
      }
    };

    const drawField = (p: number, headX: number, band: number, now: number) => {
      const dim = 1 - 0.35 * progressIn(p, FIELD_DIM);
      const reading = headX > -band && headX < width + band;

      // Idle sparkle on unread bases so the field reads as live data.
      if (pinned && reading && now - lastSpark > 90) {
        lastSpark = now;
        for (let i = 0; i < 6; i += 1) glow[(Math.random() * glow.length) | 0] = 1;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.font = `500 ${fontSize}px ui-monospace, 'SF Mono', Menlo, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let pass = 0; pass < 2; pass += 1) {
        ctx.fillStyle = pass === 0 ? '#fff' : `rgb(${ACCENT})`;

        for (let c = 0; c < cols; c += 1) {
          const x = c * cellW + cellW / 2;
          const behind = headX - x;
          const inBand = behind >= 0 && behind < band;
          if ((pass === 1) !== inBand) continue;

          for (let r = 0; r < rows; r += 1) {
            const i = r * cols + c;
            let alpha: number;

            if (behind < 0) {
              alpha = 0.13 + glow[i] * 0.4;
            } else if (inBand) {
              alpha = 0.9 * (1 - behind / band) + 0.05;
            } else {
              alpha = 0.09;
            }

            glow[i] *= 0.9;
            ctx.globalAlpha = alpha * dim;
            ctx.fillText(BASES[letters[i]], x, r * cellH + cellH / 2);
          }
        }
      }

      if (reading && headX > 0 && headX < width) {
        const beam = ctx.createLinearGradient(0, 0, 0, height);
        beam.addColorStop(0, `rgba(${ACCENT}, 0)`);
        beam.addColorStop(0.5, `rgba(${ACCENT}, .85)`);
        beam.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.globalAlpha = 1;
        ctx.fillStyle = beam;
        ctx.fillRect(headX, 0, 1, height);
      }

      ctx.globalAlpha = 1;
    };

    const render = (force = false) => {
      const now = performance.now();
      const p = pinned ? scrollYProgress.get() : 1;
      const moved = p !== lastProgress;
      const tick = now - lastScramble > 70;
      if (!force && !moved && !tick) return;
      lastProgress = p;

      const band = Math.min(260, width * 0.3);
      const headT = progressIn(p, HEAD);
      const headX = -band + headT * (width + band * 2);

      drawField(p, headX, band, now);

      if (countRef.current) {
        countRef.current.textContent = formatCount.format(Math.round(headT * GENOME_SIZE));
      }

      if (tick) lastScramble = now;
      for (const d of decodes) {
        const k = d.range
          ? easeOut(progressIn(p, d.range))
          : clamp01((headX - d.left) / Math.max(d.width, 1));
        const resolved = Math.round(k * d.text.length);
        if (resolved === d.shown && (resolved === d.text.length || !tick)) continue;
        d.shown = resolved;
        d.read.textContent = d.text.slice(0, resolved);
        d.raw.textContent = scramble(d.text, resolved);
      }

      for (const { el, range } of reveals) {
        const k = easeOut(progressIn(p, range));
        el.style.opacity = String(k);
        el.style.transform = k === 1 ? '' : `translateY(${(1 - k) * 18}px)`;
        el.style.filter = k === 1 ? '' : `blur(${(1 - k) * 6}px)`;
      }
    };

    renderRef.current = render;
    layout();
    render(true);

    const observer = new ResizeObserver(() => {
      layout();
      render(true);
    });
    observer.observe(stage);

    return () => {
      observer.disconnect();
      renderRef.current = () => undefined;
    };
  }, [scrollYProgress]);

  // Only animate while the stage is on screen.
  useEffect(() => {
    if (!inView) return;
    let frame = requestAnimationFrame(function loop() {
      renderRef.current();
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <section className="wig" aria-labelledby="what-is-genomia-title">
      <div ref={trackRef} className="wig__track">
        <div ref={stageRef} className="wig__stage">
          <canvas ref={canvasRef} className="wig__field" aria-hidden="true" />

          <p className="wig__counter" aria-hidden="true">
            <span ref={countRef}>0</span> bases leídas
          </p>

          <div className="wig__layout">
            <h2 id="what-is-genomia-title" className="wig__title">
              <span className="wig__title-line">
                <Decoded text="Tu genoma," />
              </span>
              <span className="wig__title-line wig__title-line--accent">
                <Decoded text="en palabras." />
              </span>
            </h2>

            <p className="wig__intro" data-reveal={toAttr(INTRO)}>
              Tres mil millones de letras. GenomIA secuencia tu genoma completo y lo
              convierte en un reporte personal, en español.
            </p>

            <ul className="wig__pillars">
              {PILLARS.map(({ codons, title, text }, i) => (
                <li key={title} className="wig__pillar" data-reveal={toAttr(pillarRange(i))}>
                  <span className="wig__codons" aria-hidden="true">
                    {codons}
                  </span>
                  <h3 className="wig__pillar-title">
                    <Decoded text={title} range={pillarRange(i)} />
                  </h3>
                  <p className="wig__pillar-text">{text}</p>
                </li>
              ))}
            </ul>

            <div className="wig__close" data-reveal={toAttr(CLOSE)}>
              <p>
                Postula para ser un posible candidato a recibir tu reporte de GenomIA absolutamente gratis.
              </p>
              <Placeholder className="btn btn-lg btn-primary">
                Postula <Arrow />
              </Placeholder>
            </div>
          </div>
        </div>
      </div>

      <div className="wig__context">
        <p>
          <strong>En desarrollo. Uso educativo e informativo.</strong> GenomIA no es
          una herramienta clínica y no reemplaza la consulta con un profesional de
          la salud.
        </p>
        <p>
          Tu información genética es sensible. La protegemos conforme a la Ley
          19.628 y la normativa del MINSAL.
        </p>
      </div>
    </section>
  );
}
