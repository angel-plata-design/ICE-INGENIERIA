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
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <a href="#top" onClick={(e) => { e.preventDefault(); go('#top'); }} className="flex items-center gap-3">
            <img src={brand.logoWhite} alt="ICE" className="h-10 w-auto" />
            <div className="hidden md:flex flex-col leading-none">
              <span className="font-display tracking-widest text-white text-[11px] uppercase opacity-70">Ingeniería Civil</span>
              <span className="font-display tracking-widest text-white text-[11px] uppercase opacity-70">Especializada</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="font-display uppercase tracking-[0.18em] text-[13px] text-white/80 hover:text-[#1E90FF] transition-colors ice-link"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => go('#contact')}
              className="hidden md:inline-flex items-center gap-2 font-display uppercase tracking-[0.18em] text-[12px] text-black bg-[#1E90FF] hover:bg-white transition-colors px-5 py-3"
            >
              Cotizar <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="menu"
              className="w-11 h-11 flex items-center justify-center border border-white/20 hover:border-[#1E90FF] hover:text-[#1E90FF] transition-colors"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full screen menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 ${
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

        <div className="relative h-full max-w-[1600px] mx-auto px-6 md:px-10 pt-28 pb-10 flex flex-col justify-between">
          <nav className="flex flex-col gap-4 md:gap-6">
            {links.map((l, i) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                style={{ transitionDelay: open ? `${i * 70}ms` : '0ms' }}
                className={`text-left font-display uppercase tracking-tight text-5xl md:text-7xl lg:text-8xl text-white hover:text-[#1E90FF] transition-all duration-500 ${
                  open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <span className="text-[#1E90FF] text-base md:text-lg align-top mr-3">0{links.indexOf(l) + 1}</span>
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
