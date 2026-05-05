import React from 'react';
import { clients } from '../../mock';

export default function Clients() {
  const doubled = [...clients, ...clients];
  return (
    <section id="clients" className="relative bg-black py-24 md:py-32 border-t border-white/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-8 reveal">
          <span className="w-10 h-px bg-[#1E90FF]" />
          <span className="font-display uppercase tracking-[0.3em] text-[11px] text-[#1E90FF]">Clientes</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
          <h2 className="lg:col-span-7 reveal font-display uppercase leading-[0.95] tracking-tight text-white text-5xl md:text-7xl">
            Principales <span className="text-[#1E90FF]">Clientes</span>
          </h2>
          <p className="lg:col-span-4 lg:col-start-9 reveal text-white/70 font-body text-[16px] leading-relaxed">
            Confianza de instituciones públicas y empresas privadas líderes en México.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="marquee-track py-10 border-y border-white/10">
          {doubled.map((c, i) => (
            <div key={i} className="flex-shrink-0 px-10 md:px-14 flex items-center gap-10">
              <span className="font-display uppercase tracking-tight text-white/70 text-3xl md:text-5xl hover:text-[#1E90FF] transition-colors cursor-default">
                {c}
              </span>
              <span className="text-[#1E90FF] text-3xl">—</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
