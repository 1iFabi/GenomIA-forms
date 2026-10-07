import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import Arrow from '../ui/Arrow';
import Alex from '../../assets/team/Alex.jpg';
import Andres from '../../assets/team/Andres.png';
import Carol from '../../assets/team/Carol.png';
import Gabriel from '../../assets/team/Gabriel.webp';
import Susan from '../../assets/team/Susan.jpg';
import './TeamSection.css';

type Qualification = { degree: string; institution: string };
type TeamMember = { name: string; photo: string; qualifications?: Qualification[] };

const TEAM: TeamMember[] = [
  {
    name: 'Alex Di Genova',
    photo: Alex,
    qualifications: [
      { degree: 'Ingeniero en Bioinformática', institution: 'Universidad de Talca' },
      {
        degree: 'Doctor en Ingeniería de Sistemas Complejos',
        institution: 'Universidad Adolfo Ibáñez',
      },
    ],
  },
  { name: 'Andrés Zuñiga', photo: Andres },
  {
    name: 'Carol Moraga',
    photo: Carol,
    qualifications: [
      { degree: 'Ingeniera en Bioinformática', institution: 'Universidad de Talca' },
      { degree: 'Doctora en Bioinformática', institution: 'Universidad Claude Bernard Lyon 1, Francia' },
    ],
  },
  {
    name: 'Gabriel Cabas',
    photo: Gabriel,
    qualifications: [
      { degree: 'Ingeniero en Bioinformática', institution: 'Universidad de Talca' },
    ],
  },
  {
    name: 'Susan Calfunao',
    photo: Susan,
    qualifications: [
      {
        degree: 'Tecnóloga Médica con especialidad en Morfofisiopatología y Citodiagnóstico',
        institution: 'Universidad Andrés Bello',
      },
      { degree: 'Magíster en Farmacología', institution: 'Universidad de Chile' },
    ],
  },
];

const INTERVAL_MS = 6000;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function TeamSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [hovering, setHovering] = useState(false);

  const go = (delta: number) => setActive((current) => (current + delta + TEAM.length) % TEAM.length);

  useEffect(() => {
    if (!playing || hovering) return;
    const timer = window.setTimeout(() => go(1), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, playing, hovering]);

  return (
    <section id="quienes-somos" className="team" aria-labelledby="team-title">
      <div className="team__head">
        <h2 id="team-title" className="team__title">
          Las personas <span className='team__title__down'>detrás de GenomIA</span>
        </h2>
        <p className="team__intro">
          Un equipo de investigación chileno que une genómica, ciencia de datos y salud para que tu
          genoma se entienda en palabras.
        </p>
      </div>

      <div
        id="team-stage"
        className="team__stage"
        style={{ '--active': active } as CSSProperties}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Integrantes del equipo"
        tabIndex={0}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            go(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        <div className="team__track">
          {TEAM.map((member, i) => {
            const isActive = i === active;
            return (
              <article
                key={member.name}
                className="team__card"
                data-active={isActive}
                style={{ '--d': Math.abs(i - active) } as CSSProperties}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${TEAM.length}`}
                onClick={() => setActive(i)}
              >
                <img className="team__photo" src={member.photo} alt="" loading="lazy" />
                <div className="team__caption">
                  <h3 className="team__name">{member.name}</h3>
                  {member.qualifications && (
                    <div className="team__details">
                      <ul className="team__credentials">
                        {member.qualifications.map(({ degree, institution }) => (
                          <li key={degree}>
                            <span className="team__degree">{degree}</span>
                            <span className="team__institution">{institution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <span className="team__sr" aria-live={playing ? 'off' : 'polite'}>
        {`Integrante ${active + 1} de ${TEAM.length}: ${TEAM[active].name}`}
      </span>

      <div className="team__controls">
        <button
          type="button"
          className="team__btn team__btn--prev"
          aria-label="Integrante anterior"
          aria-controls="team-stage"
          onClick={() => go(-1)}
        >
          <Arrow />
        </button>
        <button
          type="button"
          className="team__btn"
          aria-label={playing ? 'Pausar la rotación automática' : 'Reanudar la rotación automática'}
          aria-pressed={!playing}
          onClick={() => setPlaying((value) => !value)}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <rect x="2.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
              <rect x="8.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3.5 1.8v10.4a.5.5 0 0 0 .77.42l8-5.2a.5.5 0 0 0 0-.84l-8-5.2a.5.5 0 0 0-.77.42Z" fill="currentColor" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className="team__btn"
          aria-label="Integrante siguiente"
          aria-controls="team-stage"
          onClick={() => go(1)}
        >
          <Arrow />
        </button>
      </div>
    </section>
  );
}