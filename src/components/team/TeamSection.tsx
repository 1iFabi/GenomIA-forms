import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Alex from '../../assets/team/Alex.jpg';
import Andres from '../../assets/team/Andres.png';
import Carol from '../../assets/team/Carol.png';
import Gabriel from '../../assets/team/Gabriel.webp';
import Susan from '../../assets/team/Susan.jpg';
import './TeamSection.css';

type Qualification = { degree: string; institution: string };
type TeamMember = { name: string; role: string; photo: string; qualifications?: Qualification[] };

const TEAM: TeamMember[] = [
  {
    name: 'Alex Di Genova',
    role: 'Ingeniero en Bioinformática',
    photo: Alex,
    qualifications: [
      { degree: 'Ingeniero en Bioinformática', institution: 'Universidad de Talca' },
      {
        degree: 'Doctor en Ingeniería de Sistemas Complejos',
        institution: 'Universidad Adolfo Ibáñez',
      },
    ],
  },
  { name: 'Andrés Zuñiga', role: 'Integrante de GenomIA', photo: Andres },
  {
    name: 'Carol Moraga',
    role: 'Ingeniera en Bioinformática',
    photo: Carol,
    qualifications: [
      { degree: 'Ingeniera en Bioinformática', institution: 'Universidad de Talca' },
      { degree: 'Doctora en Bioinformática', institution: 'Universidad Claude Bernard Lyon 1, Francia' },
    ],
  },
  {
    name: 'Gabriel Cabas',
    role: 'Ingeniero en Bioinformática',
    photo: Gabriel,
    qualifications: [
      { degree: 'Ingeniero en Bioinformática', institution: 'Universidad de Talca' },
    ],
  },
  {
    name: 'Susan Calfunao',
    role: 'Tecnóloga Médica',
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

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: .15,
    });
    observer.observe(section);

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => setReduceMotion(motion.matches);
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    motion.addEventListener('change', onMotionChange);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      observer.disconnect();
      motion.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const autoPlaying = inView && pageVisible && !reduceMotion && !hovering && !expanded;

  useEffect(() => {
    if (!autoPlaying) return;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % TEAM.length);
    }, INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, autoPlaying]);

  return (
    <section ref={sectionRef} id="quienes-somos" className="team" aria-labelledby="team-title">
      <div className="team__head">
        <h2 id="team-title" className="team__title">
          Las personas <span className='team__title__down'>detrás de GenomIA</span>
        </h2>
        <p className="team__intro">
          Un equipo de investigación chileno que une genómica, ciencia de datos y salud para que tu
          genoma se entienda en palabras.
        </p>
      </div>

      <p id="team-instructions" className="team__sr">
        Usa las flechas para cambiar de persona y Enter para mostrar u ocultar sus estudios.
      </p>
      <div
        id="team-stage"
        className="team__stage"
        style={{ '--active': active } as CSSProperties}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Integrantes del equipo"
        aria-describedby="team-instructions"
        tabIndex={0}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            setExpanded(false);
            setActive((current) =>
              (current + (event.key === 'ArrowLeft' ? -1 : 1) + TEAM.length) % TEAM.length,
            );
          } else if (
            event.target === event.currentTarget
            && (event.key === 'Enter' || event.key === ' ')
            && TEAM[active].qualifications
          ) {
            event.preventDefault();
            setExpanded((open) => !open);
          }
        }}
      >
        <div className="team__track">
          {TEAM.map((member, i) => {
            const isActive = i === active;
            const isExpanded = isActive && expanded && Boolean(member.qualifications);
            return (
              <article
                key={member.name}
                className="team__card"
                data-active={isActive}
                data-expanded={isExpanded}
                style={{ '--d': Math.abs(i - active) } as CSSProperties}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${TEAM.length}`}
              >
                <div className="team__portrait">
                  <img className="team__photo" src={member.photo} alt="" loading="lazy" />
                  <div className="team__caption">
                    <h3 className="team__name">{member.name}</h3>
                    <p className="team__role">{member.role}</p>
                    {member.qualifications && (
                      <div
                        id={`team-studies-${i}`}
                        className="team__details"
                        aria-hidden={!isExpanded}
                      >
                        <div className="team__details-inner">
                          <ul className="team__credentials">
                            {member.qualifications.map(({ degree, institution }) => (
                              <li key={degree}>
                                {degree !== member.role && <span className="team__degree">{degree}</span>}
                                <span className="team__institution">{institution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {(!isActive || member.qualifications) && (
                  <button
                    type="button"
                    className="team__trigger"
                    tabIndex={isActive ? 0 : -1}
                    aria-label={isActive
                      ? isExpanded ? `Ocultar estudios de ${member.name}` : `Ver estudios de ${member.name}`
                      : member.qualifications ? `Ver estudios de ${member.name}` : `Mostrar a ${member.name}`}
                    aria-expanded={isActive && member.qualifications ? isExpanded : undefined}
                    aria-controls={isActive && member.qualifications ? `team-studies-${i}` : undefined}
                    onClick={() => {
                      if (isActive) {
                        setExpanded((open) => !open);
                      } else {
                        setExpanded(Boolean(member.qualifications));
                        setActive(i);
                      }
                    }}
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>
      <span className="team__sr" aria-live={autoPlaying ? 'off' : 'polite'}>
        {`Integrante ${active + 1} de ${TEAM.length}: ${TEAM[active].name}`}
      </span>
    </section>
  );
}