import React, { useState } from 'react';
import { projects } from '../../mock';

export default function Projects() {
  const [active, setActive] = useState(0);
  return (
    <section id="projects" className="relative bg-black py-28 md:py-40 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-10 reveal">
          <span className="w-10 h-px bg-[#1E90FF]" />
          <span className="font-display uppercase tracking-[0.3em] text-[11px] text-[#1E90FF]">Obra Ejecutada</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          <h2 className="lg:col-span-8 reveal font-display uppercase leading-[0.95] tracking-tight text-white text-5xl md:text-7xl lg:text-[96px]">
            Proyectos<br /><span className="text-[#1E90FF]">Destacados</span>
          </h2>
          <p className="lg:col-span-4 reveal text-white/70 font-body text-[16px] leading-relaxed">
            Más de 50 años construyendo infraestructura de alto impacto. Desde carreteras federales y puentes hasta acuarios, hoteles y plantas desalinizadoras.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((p, i) => (
            <article
              key={p.title}
              onMouseEnter={() => setActive(i)}
              className="reveal group relative overflow-hidden bg-[#0a0a0a] border border-white/10"
            >
              <div className="relative h-[380px] overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                <div className="absolute top-4 left-4 font-display uppercase tracking-[0.2em] text-[10px] text-[#1E90FF] bg-black/60 backdrop-blur px-2 py-1 border border-[#1E90FF]/40">
                  0{i + 1}
                </div>
              </div>
              <div className="p-6 md:p-7">
                <div className="font-display uppercase tracking-[0.2em] text-[10px] text-white/50 mb-3">{p.category}</div>
                <h3 className="font-display uppercase text-white text-2xl md:text-3xl leading-tight tracking-tight mb-3 group-hover:text-[#1E90FF] transition-colors">{p.title}</h3>
                <p className="font-body text-[13px] text-white/60 leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="font-display uppercase tracking-[0.15em] text-[10px] text-white/70 border border-white/15 px-2 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
