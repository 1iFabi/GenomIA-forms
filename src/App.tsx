import { useEffect, useRef, useState, type Ref } from 'react';
import './index.css';

type EnrollButtonProps = {
  className?: string;
  buttonRef: Ref<HTMLButtonElement>;
  onClick: () => void;
};

function EnrollButton({ className = '', buttonRef, onClick }: EnrollButtonProps) {
  return (
    <button ref={buttonRef} className={`enroll-button ${className}`} type="button" onClick={onClick}>
      POSTULAR
    </button>
  );
}

type ChoiceQuestionProps = {
  id: string;
  question: string;
  options: string[];
  multiple?: boolean;
  otherFieldLabel?: string;
};

function ChoiceQuestion({ id, question, options, multiple = false, otherFieldLabel }: ChoiceQuestionProps) {
  const inputType = multiple ? 'checkbox' : 'radio';

  return (
    <fieldset className="questionnaire-question">
      <legend className="questionnaire-question__legend">
        {question}
        {multiple && <span className="questionnaire-question__hint">(Puede marcar más de una alternativa)</span>}
      </legend>
      <div className="questionnaire-question__options">
        {options.map((option, index) => {
          const inputId = `${id}-${index}`;
          return (
            <label
              key={option}
              htmlFor={inputId}
              className="questionnaire-option"
            >
              <input
                id={inputId}
                className="questionnaire-option__input"
                type={inputType}
                name={id}
                value={option}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
      {otherFieldLabel && (
        <label className="questionnaire-other-field">
          <span>{otherFieldLabel}</span>
          <input
            className="questionnaire-answer"
            type="text"
          />
        </label>
      )}
    </fieldset>
  );
}

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [questionnaireStep, setQuestionnaireStep] = useState(0);
  const aboutTriggerRef = useRef<HTMLButtonElement>(null);
  const aboutDialogRef = useRef<HTMLDialogElement>(null);
  const questionnaireDialogRef = useRef<HTMLDialogElement>(null);
  const questionnaireTriggerRef = useRef<HTMLButtonElement>(null);
  const questionnaireContentRef = useRef<HTMLDivElement>(null);
  const characterizationTitleRef = useRef<HTMLHeadingElement>(null);
  const motivationPromptRef = useRef<HTMLSpanElement>(null);

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

  function handleAboutDialogKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
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

  useEffect(() => {
    if (!questionnaireDialogRef.current?.open) return;
    questionnaireContentRef.current?.scrollTo({ top: 0 });
    if (questionnaireStep === 0) characterizationTitleRef.current?.focus();
    else motivationPromptRef.current?.focus();
  }, [questionnaireStep]);

  const openQuestionnaire = () => {
    const dialog = questionnaireDialogRef.current;
    if (!dialog || dialog.open) return;
    setQuestionnaireStep(0);
    questionnaireContentRef.current?.scrollTo({ top: 0 });
    dialog.showModal();
  };
  const closeQuestionnaire = () => questionnaireDialogRef.current?.close();

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
          <EnrollButton
            buttonRef={questionnaireTriggerRef}
            className="enroll-button--hero"
            onClick={openQuestionnaire}
          />
        </div>

        <span className="hero-horizon" aria-hidden="true" />
      </section>

      <dialog
        ref={questionnaireDialogRef}
        className="questionnaire-dialog"
        aria-labelledby="questionnaire-title"
        onClose={() => questionnaireTriggerRef.current?.focus()}
      >
        <div className="questionnaire-dialog__layout">
          <header className="questionnaire-header">
            <div className="questionnaire-header__title">
              <p className="questionnaire-kicker">GenomIA · Postulación</p>
              <h2 id="questionnaire-title">Cuestionario de postulación</h2>
            </div>
            <div className="questionnaire-header__actions">
              {questionnaireStep === 1 && (
                <button
                  className="questionnaire-back"
                  type="button"
                  aria-label="Volver a la sección anterior"
                  onClick={() => setQuestionnaireStep(0)}
                >
                  <span>Anterior</span>
                </button>
              )}
              <button
                autoFocus
                className="questionnaire-close"
                type="button"
                aria-label="Cerrar cuestionario"
                onClick={closeQuestionnaire}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          </header>
          <div className="questionnaire-progress" aria-label={`Sección ${questionnaireStep + 1} de 2`}>
            <span>Sección {questionnaireStep + 1} de 2</span>
            <span>{questionnaireStep === 0 ? 'Caracterización' : 'Motivación'}</span>
            <div
              className="questionnaire-progress__track"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={2}
              aria-valuenow={questionnaireStep + 1}
              aria-label="Progreso de postulación"
            >
              <span style={{ width: questionnaireStep === 0 ? '50%' : '100%' }} />
            </div>
          </div>
          <div ref={questionnaireContentRef} className="questionnaire-content">
            {questionnaireStep === 1 && (
              <section className="questionnaire-section" aria-labelledby="motivation-prompt">
                <label className="questionnaire-motivation" htmlFor="application-reason">
                  <span ref={motivationPromptRef} id="motivation-prompt" tabIndex={-1}>
                    ¿Por qué te quieres hacer tu genoma? (Máximo 100 palabras)
                  </span>
                  <textarea
                    id="application-reason"
                    className="questionnaire-answer"
                    rows={5}
                    placeholder="Escribe aquí tu respuesta..."
                  />
                </label>
                <button className="questionnaire-submit" type="button">POSTULAR</button>
              </section>
            )}

            {questionnaireStep === 0 && (
              <section className="questionnaire-section" aria-labelledby="characterization-title">
                <h3 ref={characterizationTitleRef} id="characterization-title" className="questionnaire-section__title" tabIndex={-1}>
                  Ficha de caracterización
                </h3>
                <label className="questionnaire-other-field" htmlFor="application-email">
                  <span>Correo electrónico</span>
                  <input
                    id="application-email"
                    className="questionnaire-answer"
                    type="email"
                    autoComplete="email"
                  />
                </label>
                <div className="questionnaire-questions">
                  <ChoiceQuestion id="p0-1" question="P0.1 ¿Tiene 18 años o más?" options={['Sí', 'No']} />
                  <ChoiceQuestion id="p0-2" question="P0.2 ¿Acepta participar voluntariamente en el estudio y entregar una muestra biológica para análisis genómico?" options={['Sí', 'No']} />
                  <ChoiceQuestion id="p0-3" question="P0.3 ¿Se considera actualmente una persona sana o sin una enfermedad grave activa?" options={['Sí', 'No']} />
                  <ChoiceQuestion id="p0-4" question="P0.4 ¿Ha sido diagnosticado/a alguna vez con cáncer?" options={['Sí', 'No']} />
                  <ChoiceQuestion id="p0-5" question="P0.5 ¿Ha recibido un trasplante de órgano o médula ósea?" options={['Sí', 'No']} />
                  <ChoiceQuestion id="p0-6" question="P0.6 ¿Ha recibido transfusión de sangre en los últimos 6 meses?" options={['Sí', 'No']} />
                  <ChoiceQuestion id="p0-7" question="P0.7 ¿Tiene parentesco de primer grado con otra persona ya incorporada al estudio?" options={['Sí', 'No']} />
                </div>
                <button className="questionnaire-next" type="button" onClick={() => setQuestionnaireStep(1)}>
                  <span>Continuar</span>
                </button>
              </section>
            )}

          </div>
        </div>
      </dialog>

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
        onKeyDown={handleAboutDialogKeyDown}
      >
        <div className="about-content">
          <button
            className="about-close"
            type="button"
            aria-label="Cerrar Quiénes somos"
            onClick={() => setAboutOpen(false)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
          <p className="about-eyebrow">GENOMIA</p>
          <h2 className="about-title" id="about-title" tabIndex={-1}>QUIÉNES SOMOS</h2>
          <p>
            GenomIA convierte la secuenciación de tu genoma completo en un reporte personal, escrito en español y pensado para la realidad chilena. Puedes postular con una muestra de sangre o saliva, siempre con tu consentimiento informado, o con datos de secuenciación que ya tengas. El reporte explica los hallazgos en lenguaje simple, los sitúa en el contexto de Chile y muestra la evidencia que respalda cada uno. Además, lo actualizamos cuando cambia el conocimiento científico.
          </p>
          <p>
            GenomIA está en etapa de desarrollo y no es una herramienta clínica. Tiene fines educativos e informativos, además de servir a la investigación y al emprendimiento, y no reemplaza la consulta con un profesional de la salud. Tu información genética es sensible y la protegemos conforme a la Ley 19.628 y a la normativa del MINSAL. Si quieres conocer tu genoma y ser parte del proyecto, postula aquí.
          </p>
        </div>
      </dialog>
    </main>
  );
}
