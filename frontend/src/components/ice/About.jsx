import React from 'react';
import { about } from '../../mock';

export default function About() {
  return (
    <section id="about" className="relative bg-black py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-10 reveal">
          <span className="w-10 h-px bg-[#1E90FF]" />
          <span className="font-display uppercase tracking-[0.3em] text-[11px] text-[#1E90FF]">{about.kicker}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7 reveal">
            <h2 className="font-display uppercase leading-[0.95] tracking-tight text-white text-5xl md:text-7xl lg:text-[88px]">
              Empresa<br />
              <span className="text-[#1E90FF]">Administradora</span><br />
              &amp; Gerencial
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-6 reveal flex flex-col justify-end">
            <p className="text-white/80 font-body text-[17px] leading-relaxed">{about.body}</p>
            <p className="text-white/60 font-body text-[15px] leading-relaxed">{about.body2}</p>
          </div>
        </div>

        {/* Image trio */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 reveal">
          <div className="md:col-span-5 relative overflow-hidden group">
            <img src={about.image} alt="" className="w-full h-[300px] md:h-[480px] object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out group-hover:scale-105" />
            <div className="absolute bottom-4 left-4 font-display uppercase tracking-[0.25em] text-[10px] text-white/80">
              <span className="text-[#1E90FF]">—</span> Precisión Técnica
            </div>
          </div>
          <div className="md:col-span-3 relative overflow-hidden group">
            <img src={about.imageEngineers} alt="" className="w-full h-[300px] md:h-[480px] object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 font-display uppercase tracking-[0.25em] text-[10px] text-white/80">
              <span className="text-[#1E90FF]">—</span> Equipo Multidisciplinar
            </div>
          </div>
          <div className="md:col-span-4 bg-[#0a0a0a] border border-white/10 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="font-display uppercase tracking-[0.25em] text-[10px] text-[#1E90FF] mb-3">Nuestra Misión</div>
              <p className="text-white/85 font-body text-[14px] leading-relaxed">{about.mission}</p>
            </div>
            <div className="ice-line my-6" />
            <div>
              <div className="font-display uppercase tracking-[0.25em] text-[10px] text-[#1E90FF] mb-3">Filosofía</div>
              <p className="text-white/70 font-body text-[14px] leading-relaxed">{about.philosophy}</p>
            </div>
          </div>
        </div>

        {/* Values — 3 columns desktop, 2 mobile */}
        <div className="mt-24 reveal">
          <div className="font-display uppercase tracking-[0.3em] text-[11px] text-white/50 mb-6">Valores</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10">
            {about.values.map((v, i) => (
              <div key={v} className="bg-black p-6 md:p-10 group cursor-default min-h-[160px] flex flex-col justify-between">
                <div className="font-display text-[#1E90FF] text-xs tracking-widest mb-4">0{i + 1}</div>
                <div className="font-display uppercase text-white text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[0.95] group-hover:text-[#1E90FF] transition-colors break-words">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
