import ApplyDialog from '../components/apply/ApplyDialog';
import HeroSection from '../components/hero/HeroSection';
import TeamSection from '../components/team/TeamSection';
import WhatIsGenomiaSection from '../components/what-is-genomia/WhatIsGenomiaSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsGenomiaSection />
      <TeamSection />
      <footer className="site-footer">
        <p>
          GenomIA no es una herramienta clínica y no reemplaza la consulta con un profesional de la
          salud.
        </p>
      </footer>
      <ApplyDialog />
    </>
  );
}
