import { useEffect, useRef, useState } from 'react';
import './index.css';

function EnrollButton({ className = '' }: { className?: string }) {
  return (
    <button className={`enroll-button ${className}`} type="button">
      INSCRIBIRSE
    </button>
  );
}

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutTriggerRef = useRef<HTMLButtonElement>(null);
  const aboutDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = aboutDialogRef.current;
    if (!dialog) return;
    if (aboutOpen && !dialog.open) {
      dialog.showModal();
      dialog.focus();
    } else if (!aboutOpen && dialog.open) {
      dialog.close();
      aboutTriggerRef.current?.focus();
    }
  }, [aboutOpen]);

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;
    const focusable = aboutDialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <main className="genomia-page relative h-full w-full overflow-hidden" aria-label="GenomIA">
      <section className="genomia-hero" aria-labelledby="hero-title">
        <video className="hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1}>
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-atmosphere" aria-hidden="true" />

        <header className="topbar">
          <a className="brand-lockup" href="/" aria-label="GenomIA, inicio">
            <img className="brand-mark" src="/public/cSolido.png" alt="Logo GenomIA" />
          </a>
          <button
            className="about-link"
            type="button"
            ref={aboutTriggerRef}
            aria-haspopup="dialog"
            onClick={() => setAboutOpen(true)}
          >
            QUIÉNES SOMOS
          </button>
        </header>

        <div className="hero-content">
          <h1 id="hero-title" className="hero-title">
            <span className="title-line title-line--brand text-glow">GenomIA</span>
            <span className="title-line title-line--subtitle">Postula, secuencia tu ADN y descubre lo que dice</span>
            <span className="title-line title-line--subtitle">sobre ti en un reporte hecho a tu medida.</span>
          </h1>
          <EnrollButton className="enroll-button--hero" />
        </div>

        <span className="hero-horizon" aria-hidden="true" />
      </section>

      <dialog
        ref={aboutDialogRef}
        className="about-dialog"
        aria-labelledby="about-title"
        aria-modal="true"
        onCancel={(event) => {
          event.preventDefault();
          setAboutOpen(false);
        }}
        onClick={(event) => {
          if (event.target === aboutDialogRef.current) setAboutOpen(false);
        }}
        onKeyDown={handleDialogKeyDown}
      >
        <div className="about-content">
          <button
            className="about-close"
            type="button"
            aria-label="Cerrar Quiénes somos"
            onClick={() => setAboutOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
          <p className="about-eyebrow">GENOMIA</p>
          <h2 className="about-title" id="about-title" tabIndex={-1}>QUIÉNES SOMOS</h2>
          <p>
            GenomIA convierte la secuenciación de tu genoma completo en un reporte personal, escrito en español y pensado para la realidad chilena. Puedes postular con una muestra de sangre o saliva, siempre con tu consentimiento informado, o con datos de secuenciación que ya tengas. El reporte explica los hallazgos en lenguaje simple, los sitúa en el contexto de Chile y muestra la evidencia que respalda cada uno. Además, lo actualizamos cuando cambia el conocimiento científico.
          </p>
          <p>
            GenomIA Chile está en etapa de desarrollo y no es una herramienta clínica. Tiene fines educativos e informativos, además de servir a la investigación y al emprendimiento, y no reemplaza la consulta con un profesional de la salud. Tu información genética es sensible y la protegemos conforme a la Ley 19.628 y a la normativa del MINSAL. Si quieres conocer tu genoma y ser parte del proyecto, postula aquí.
          </p>
        </div>
      </dialog>
    </main>
  );
}
