import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../../mock';

export default function Services() {
  const [active, setActive] = useState(0);
  return (
    <section id="services" className="relative bg-[#050505] py-28 md:py-40 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-10 reveal">
          <span className="w-10 h-px bg-[#1E90FF]" />
          <span className="font-display uppercase tracking-[0.3em] text-[11px] text-[#1E90FF]">Servicios</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          <h2 className="lg:col-span-7 reveal font-display uppercase leading-[0.95] tracking-tight text-white text-5xl md:text-7xl lg:text-[96px]">
            Categorías de<br /><span className="text-[#1E90FF]">Construcción</span>
          </h2>
          <p className="lg:col-span-4 lg:col-start-9 reveal text-white/70 font-body text-[16px] leading-relaxed">
            Soluciones integrales que cubren cada fase de un proyecto de infraestructura — desde los estudios preliminares hasta la entrega final.
          </p>
        </div>

        <div className="reveal border-t border-white/10">
          {services.map((s, i) => (
            <div
              key={s.id}
              onMouseEnter={() => setActive(i)}
              className={`group grid grid-cols-12 gap-6 items-center py-8 md:py-10 border-b border-white/10 cursor-pointer transition-colors ${
                active === i ? 'bg-white/[0.02]' : ''
              }`}
            >
              <div className="col-span-2 md:col-span-1 font-display text-[#1E90FF] text-sm md:text-base tracking-widest">
                {s.id}
              </div>
              <h3 className={`col-span-10 md:col-span-5 font-display uppercase tracking-tight text-2xl md:text-4xl lg:text-5xl transition-colors ${
                active === i ? 'text-[#1E90FF]' : 'text-white group-hover:text-[#1E90FF]'
              }`}>
                {s.title}
              </h3>
              <p className="col-span-12 md:col-span-5 font-body text-[14px] md:text-[15px] text-white/60 leading-relaxed">
                {s.desc}
              </p>
              <div className="col-span-12 md:col-span-1 flex md:justify-end">
                <span className={`w-11 h-11 flex items-center justify-center border transition-all ${
                  active === i ? 'border-[#1E90FF] bg-[#1E90FF] text-black' : 'border-white/20 text-white/70'
                }`}>
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
