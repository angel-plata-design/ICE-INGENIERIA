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
          <div className="lg:col-span-5 space-y-6 reveal">
            <p className="text-white/75 font-body text-[16px] leading-relaxed">{about.body}</p>
            <p className="text-white/60 font-body text-[15px] leading-relaxed">{about.body2}</p>
          </div>
        </div>

        {/* Image band */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 reveal">
          <div className="md:col-span-7 relative overflow-hidden group">
            <img src={about.image} alt="" className="w-full h-[380px] md:h-[520px] object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out group-hover:scale-105" />
            <div className="absolute bottom-4 left-4 font-display uppercase tracking-[0.25em] text-[10px] text-white/80">
              <span className="text-[#1E90FF]">—</span> Precisión Técnica
            </div>
          </div>
          <div className="md:col-span-5 bg-[#0a0a0a] border border-white/10 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="font-display uppercase tracking-[0.25em] text-[10px] text-[#1E90FF] mb-3">Nuestra Misión</div>
              <p className="text-white/85 font-body text-[15px] leading-relaxed">{about.mission}</p>
            </div>
            <div className="ice-line my-8" />
            <div>
              <div className="font-display uppercase tracking-[0.25em] text-[10px] text-[#1E90FF] mb-3">Filosofía</div>
              <p className="text-white/70 font-body text-[14px] leading-relaxed">{about.philosophy}</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24 reveal">
          <div className="font-display uppercase tracking-[0.3em] text-[11px] text-white/50 mb-6">Valores</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10">
            {about.values.map((v, i) => (
              <div key={v} className="bg-black p-6 group cursor-default">
                <div className="font-display text-[#1E90FF] text-xs tracking-widest mb-2">0{i + 1}</div>
                <div className="font-display uppercase text-white text-2xl md:text-3xl tracking-tight group-hover:text-[#1E90FF] transition-colors">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
