import React from 'react';
import { specialties } from '../../mock';

export default function Specialties() {
  return (
    <section id="specialties" className="relative bg-[#050505] py-28 md:py-40 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-10 reveal">
          <span className="w-10 h-px bg-[#1E90FF]" />
          <span className="font-display uppercase tracking-[0.3em] text-[11px] text-[#1E90FF]">Estudios de Ingeniería</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          <h2 className="lg:col-span-8 reveal font-display uppercase leading-[0.95] tracking-tight text-white text-5xl md:text-7xl lg:text-[96px]">
            Nuestras<br /><span className="text-[#1E90FF]">Especialidades</span>
          </h2>
          <p className="lg:col-span-4 reveal text-white/70 font-body text-[16px] leading-relaxed">
            Un equipo multidisciplinar preparado para abordar cada etapa técnica de un proyecto de infraestructura con precisión milimétrica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 reveal">
          {specialties.map((s, i) => (
            <div key={s.title} className="bg-black p-8 md:p-10 group hover:bg-[#0a0a0a] transition-colors min-h-[260px] flex flex-col">
              <div className="font-display text-[#1E90FF] text-xs tracking-widest mb-4">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h4 className="font-display uppercase text-white text-2xl leading-tight tracking-tight mb-3 group-hover:text-[#1E90FF] transition-colors">{s.title}</h4>
              <p className="font-body text-[13px] text-white/55 leading-relaxed">{s.desc}</p>
              <div className="mt-auto pt-6">
                <span className="block w-8 h-px bg-white/30 group-hover:bg-[#1E90FF] group-hover:w-16 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
