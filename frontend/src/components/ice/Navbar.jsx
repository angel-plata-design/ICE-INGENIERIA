import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { brand } from '../../mock';

const links = [
  { label: 'Nosotros', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Especialidades', href: '#specialties' },
  { label: 'Clientes', href: '#clients' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled || open ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-16 h-24 flex items-center justify-between gap-8">
          {/* Logo */}
          <a href="#top" onClick={(e) => { e.preventDefault(); go('#top'); }} className="flex items-center gap-4 shrink-0">
            <img src={brand.logoWhite} alt="ICE" className="h-12 md:h-14 w-auto" />
            <div className="hidden xl:flex flex-col leading-tight pl-1 border-l border-white/15" style={{ paddingLeft: '14px' }}>
              <span className="font-display tracking-[0.25em] text-white text-[10px] uppercase opacity-80">Ingeniería Civil</span>
              <span className="font-display tracking-[0.25em] text-white text-[10px] uppercase opacity-60">Especializada</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12 mx-auto">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="font-display uppercase tracking-[0.18em] text-[12px] xl:text-[13px] text-white/80 hover:text-[#1E90FF] transition-colors ice-link"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => go('#contact')}
              className="hidden md:inline-flex items-center gap-2 font-display uppercase tracking-[0.18em] text-[13px] font-bold text-black bg-[#1E90FF] hover:bg-white transition-colors px-6 py-3.5"
            >
              Cotizar <ArrowUpRight size={16} strokeWidth={2.5} />
            </button>
            {/* Hamburger only on mobile/tablet (below lg) */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="menu"
              className="lg:hidden w-12 h-12 flex items-center justify-center border border-white/20 hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="noise" />
          <img
            src="https://images.unsplash.com/photo-1444847840129-0ac27946a0a7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwzfHxzdGVlbCUyMHN0cnVjdHVyZXxlbnwwfHx8fDE3Nzc5NjM1NTd8MA&ixlib=rb-4.1.0&q=85"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative h-full max-w-[1600px] mx-auto px-8 md:px-12 pt-32 pb-10 flex flex-col justify-between">
          <nav className="flex flex-col gap-4 md:gap-6">
            {links.map((l, i) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                style={{ transitionDelay: open ? `${i * 70}ms` : '0ms' }}
                className={`text-left font-display uppercase tracking-tight text-5xl md:text-7xl text-white hover:text-[#1E90FF] transition-all duration-500 ${
                  open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <span className="text-[#1E90FF] text-base md:text-lg align-top mr-3">0{i + 1}</span>
                {l.label}
              </button>
            ))}
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/10 text-sm text-white/70 font-body">
            <div>
              <div className="font-display uppercase tracking-widest text-[11px] text-[#1E90FF] mb-2">Oficina</div>
              Av. Del Delfín No. 6234<br />Marina Mazatlán, Sinaloa
            </div>
            <div>
              <div className="font-display uppercase tracking-widest text-[11px] text-[#1E90FF] mb-2">Contacto</div>
              gerencia@ice-ingenieria.com<br />(669) 110 00 96
            </div>
            <div>
              <div className="font-display uppercase tracking-widest text-[11px] text-[#1E90FF] mb-2">Desde</div>
              1972 — Más de 50 años construyendo México
            </div>
          </div>
        </div>
      </div>

      <span id="top" className="absolute top-0" />
    </>
  );
}
