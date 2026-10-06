import { useEffect, useRef, useState } from 'react';
import Arrow from '../ui/Arrow';
import Placeholder from '../ui/Placeholder';

const items = ['Products', 'Solutions', 'Resources', 'Company', 'Pricing'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

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
      <header className="nav">
        <Placeholder className="logo" aria-label="Inicio de GenomIA">
          GenomIA
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
    </>
  );
}
