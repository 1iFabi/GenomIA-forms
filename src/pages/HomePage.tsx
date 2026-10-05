import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import './HomePage.css';
import WhatIsGenomiaSection from '../components/WhatIsGenomiaSection';

const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4';
const POSTER =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp';
const items = ['Products', 'Solutions', 'Resources', 'Company', 'Pricing'];

function Arrow() {
  return (
    <svg
      className="arw"
      viewBox="0 0 13 11"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 5.5h10M7 1.5l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type PlaceholderProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function Placeholder({
  children,
  className = '',
  ...props
}: PlaceholderProps) {
  return (
    <button
      type="button"
      className={`link-button ${className}`}
      disabled
      {...props}
    >
      {children}
    </button>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const [a, b] = [videoARef.current, videoBRef.current];
    if (!a || !b) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      a.removeAttribute('autoplay');
      a.pause();
      b.pause();

      try {
        a.currentTime = 0;
      } catch {
        // The media may not be seekable yet.
      }

      return;
    }

    const fade = 900;
    let current = a;
    let next = b;
    let swapping = false;
    let timer: number | undefined;

    const play = (video: HTMLVideoElement) => {
      const result = video.play();
      if (result) void result.catch(() => undefined);
    };

    const tick = () => {
      if (
        swapping ||
        !current.duration ||
        current.duration - current.currentTime > fade / 1000
      ) {
        return;
      }

      swapping = true;
      const outgoing = current;
      next.currentTime = 0;
      play(next);
      next.classList.add('is-active');
      outgoing.classList.remove('is-active');
      current = next;
      next = outgoing;

      timer = window.setTimeout(() => {
        outgoing.pause();

        try {
          outgoing.currentTime = 0;
        } catch {
          // Ignore unavailable seek.
        }

        swapping = false;
      }, fade + 100);
    };

    play(a);
    a.addEventListener('timeupdate', tick);
    b.addEventListener('timeupdate', tick);

    return () => {
      a.removeEventListener('timeupdate', tick);
      b.removeEventListener('timeupdate', tick);

      if (timer !== undefined) window.clearTimeout(timer);

      a.pause();
      b.pause();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    root.classList.add('anim');
    let bootTimer: number | undefined;
    let safetyTimer: number | undefined;
    let started = false;
    let cleaned = false;

    const clean = () => {
      if (cleaned) return;
      cleaned = true;

      if (safetyTimer !== undefined) window.clearTimeout(safetyTimer);

      document.removeEventListener('animationend', onEnd, true);
      root.classList.remove('anim', 'go');
    };

    const onEnd = (event: AnimationEvent) => {
      if (
        event.animationName === 'pillIn' &&
        event.target instanceof Element &&
        event.target.classList.contains('btn-ghost')
      ) {
        clean();
      }
    };

    const start = () => {
      if (started || cleaned) return;
      started = true;

      if (bootTimer !== undefined) window.clearTimeout(bootTimer);

      document.addEventListener('animationend', onEnd, true);
      safetyTimer = window.setTimeout(clean, 2600);
      root.classList.add('go');
    };

    const boot = () => {
      bootTimer = window.setTimeout(start, 900);

      if (document.fonts?.ready) {
        void document.fonts.ready.then(start, start);
      } else {
        start();
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
      boot();
    }

    return () => {
      if (bootTimer !== undefined) window.clearTimeout(bootTimer);

      document.removeEventListener('DOMContentLoaded', boot);
      clean();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;

      if (
        target instanceof Node &&
        !menuRef.current?.contains(target) &&
        !burgerRef.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <main className="hero">
      <div
        className="bg"
        role="img"
        aria-label="Stylised globe of Earth rendered as a purple dot matrix against a starfield, slowly rotating"
      >
        <video
          ref={videoARef}
          className="bg-video is-active"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          poster={POSTER}
        >
          <source src={VIDEO} type="video/mp4" />
        </video>
        <video
          ref={videoBRef}
          className="bg-video"
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          poster={POSTER}
        >
          <source src={VIDEO} type="video/mp4" />
        </video>
      </div>

      <header className="nav">
        <Placeholder className="logo" aria-label="Sellix home">
          Sellix
        </Placeholder>
        <div className="nav-actions">
          <Placeholder className="btn btn-login">Descubre</Placeholder>
          <Placeholder className="btn btn-nav-start">Postula</Placeholder>
        </div>
        <button
          ref={burgerRef}
          className="burger"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <nav
        ref={menuRef}
        className={`menu${menuOpen ? ' open' : ''}`}
        id="menu"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {items.map((item) => (
          <Placeholder key={item} className="menu-link">
            {item}
          </Placeholder>
        ))}
        <div className="divider" />
        <Placeholder className="menu-link">Descubre</Placeholder>
        <Placeholder className="m-start">
          Postula <Arrow />
        </Placeholder>
      </nav>

      <div className="hero-inner">
        <h1>
          <span className="ln">
            <span className="ln-i">Lee la historia que</span>
          </span>
          <span className="ln">
            <span className="ln-i">está escrita en ti</span>
          </span>
        </h1>
        <p className="sub">
          Sumérgete en tu información genética y descubre los secretos de tu biología<br />
          en una sola plataforma.
        </p>
        <div className="ctas">
          <Placeholder className="btn btn-lg btn-primary">
            Postula <Arrow />
          </Placeholder>
          <Placeholder className="btn btn-lg btn-ghost">
            Descubre<Arrow />
          </Placeholder>
        </div>
      </div>
      </main>
      <WhatIsGenomiaSection />
    </>
  );
}
