import React from 'react';
import { ArrowUp } from 'lucide-react';
import { brand, contact } from '../../mock';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">
          <div className="md:col-span-5">
            <img src={brand.logoWhite} alt="ICE" className="h-14 w-auto mb-6" />
            <p className="font-body text-white/60 text-[14px] leading-relaxed max-w-md">
              Empresa administradora y gerencial para la industria de la ingeniería, construcción y supervisión. Desde 1972 en Mazatlán, Sinaloa.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="font-display uppercase tracking-[0.25em] text-[10px] text-[#1E90FF] mb-4">Navegación</div>
            <ul className="space-y-2 font-body text-[14px] text-white/70">
              {['Nosotros', 'Servicios', 'Proyectos', 'Especialidades', 'Contacto'].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="ice-link hover:text-[#1E90FF]">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="font-display uppercase tracking-[0.25em] text-[10px] text-[#1E90FF] mb-4">Contacto</div>
            <ul className="space-y-2 font-body text-[14px] text-white/70">
              <li>{contact.address}</li>
              <li><a href={`mailto:${contact.email}`} className="ice-link hover:text-[#1E90FF]">{contact.email}</a></li>
              <li><a href={`tel:${contact.phoneTel}`} className="ice-link hover:text-[#1E90FF]">{contact.phone}</a></li>
            </ul>
          </div>
        </div>

        {/* Giant brand word */}
        <div className="relative border-t border-white/10 pt-10 overflow-hidden">
          <div className="font-display uppercase text-white/[0.04] leading-none tracking-tight text-[24vw] select-none whitespace-nowrap">
            ICE 1972
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 border-t border-white/10">
          <div className="font-body text-xs text-white/40">
            © {year} {brand.name} — {brand.full}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6 font-display uppercase tracking-[0.25em] text-[10px] text-white/50">
            <span>25°13′51″N 106°27′36″W</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 hover:text-[#1E90FF] transition-colors"
            >
              Volver Arriba <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
