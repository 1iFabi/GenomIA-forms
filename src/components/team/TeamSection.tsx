import { useCallback, useEffect, useRef, useState } from 'react';
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

export default function TeamSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ index: 0, atStart: true, atEnd: false });

  const updatePosition = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const first = rail.firstElementChild as HTMLElement | null;
    const second = first?.nextElementSibling as HTMLElement | null;
    const step = first && second ? second.offsetLeft - first.offsetLeft : rail.clientWidth;
    const index = Math.min(TEAM.length - 1, Math.max(0, Math.round(rail.scrollLeft / step)));
    const atStart = rail.scrollLeft < 2;
    const atEnd = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;

    setPosition((previous) =>
      previous.index === index && previous.atStart === atStart && previous.atEnd === atEnd
        ? previous
        : { index, atStart, atEnd },
    );
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const observer = new ResizeObserver(updatePosition);
    observer.observe(rail);
    updatePosition();
    return () => observer.disconnect();
  }, [updatePosition]);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    const first = rail?.firstElementChild as HTMLElement | null;
    const second = first?.nextElementSibling as HTMLElement | null;
    if (!rail || !first || !second) return;

    rail.scrollTo({
      left: (second.offsetLeft - first.offsetLeft) * (position.index + direction),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <section id="quienes-somos" className="team" aria-labelledby="team-title">
      <div className="team__inner">
        <div className="team__head">
          <h2 id="team-title" className="team__title">
            Las personas detrás de GenomIA
          </h2>
          <p className="team__intro">
            Un equipo de investigación chileno que une genómica, ciencia de datos y salud para
            que tu genoma se entienda en palabras.
          </p>
        </div>

        <div className="team__toolbar">
          <span className="team__count" aria-live="polite">
            {position.index + 1} de {TEAM.length}
          </span>
          <div className="team__controls">
            <button
              type="button"
              className="team__arrow team__arrow--prev"
              aria-label="Ver integrante anterior"
              aria-controls="team-rail"
              disabled={position.atStart}
              onClick={() => move(-1)}
            >
              <Arrow /> Anterior
            </button>
            <button
              type="button"
              className="team__arrow"
              aria-label="Ver integrante siguiente"
              aria-controls="team-rail"
              disabled={position.atEnd}
              onClick={() => move(1)}
            >
              Siguiente <Arrow />
            </button>
          </div>
        </div>

        <div
          id="team-rail"
          ref={railRef}
          className="team__rail"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Integrantes del equipo"
          tabIndex={0}
          onScroll={updatePosition}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              move(event.key === 'ArrowLeft' ? -1 : 1);
            }
          }}
        >
          {TEAM.map((member) => (
            <article key={member.name} className="team__card">
              <img className="team__photo" src={member.photo} alt="" loading="lazy" />
              <h3 className="team__name">{member.name}</h3>
              {member.qualifications && (
                <ul className="team__credentials">
                  {member.qualifications.map(({ degree, institution }) => (
                    <li key={degree}>
                      <span className="team__degree">{degree}</span>
                      <span className="team__institution">{institution}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
