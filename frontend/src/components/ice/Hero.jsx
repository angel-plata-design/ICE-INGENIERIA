import React, { useEffect, useState } from 'react';
import { ArrowDown, Plus } from 'lucide-react';
import { hero, contact } from '../../mock';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[100vh] min-h-[700px] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={hero.image} alt="" className={`w-full h-full object-cover transition-transform duration-[1500ms] ease-out ${loaded ? 'scale-100' : 'scale-110'}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="noise" />
      </div>

      {/* Grid overlay (industrial) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '8.33% 100%' }}
      />

      {/* Content */}
      <div className="relative h-full max-w-[1600px] mx-auto px-6 md:px-10 pt-28 pb-16 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <span className="w-10 h-px bg-[#1E90FF]" />
          <span className="font-display uppercase tracking-[0.3em] text-[11px] text-[#1E90FF]">{hero.eyebrow}</span>
        </div>

        <div>
          <h1 className="font-display uppercase leading-[0.9] tracking-tight text-white text-[56px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[180px]">
            {hero.words.map((w, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className="block transition-transform duration-[1100ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]"
                  style={{
                    transform: loaded ? 'translateY(0)' : 'translateY(110%)',
                    transitionDelay: `${i * 130}ms`,
                  }}
                >
                  {i === 2 ? (
                    <span>
                      <span className="text-[#1E90FF]">{w}</span>
                    </span>
                  ) : (
                    w
                  )}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <p className="md:col-start-7 md:col-span-6 text-white/75 font-body text-[15px] md:text-[17px] leading-relaxed max-w-xl"
              style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.8s' }}
            >
              {hero.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="flex items-center gap-4">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-primary"
            >
              Ver Proyectos <Plus size={16} />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-ghost"
            >
              Cotizar Obra
            </a>
          </div>

          <div className="flex items-end gap-10">
            <div>
              <div className="font-display text-[#1E90FF] text-5xl md:text-6xl leading-none">50<span className="text-white/60">+</span></div>
              <div className="font-display uppercase tracking-[0.25em] text-[10px] text-white/60 mt-2">Años de experiencia</div>
            </div>
            <div className="hidden md:block h-16 w-px bg-white/20" />
            <div className="hidden md:block">
              <div className="font-display uppercase tracking-[0.25em] text-[10px] text-white/50 mb-1">Base de Operaciones</div>
              <div className="font-display text-white text-xl">Mazatlán, Sinaloa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="font-display uppercase tracking-[0.3em] text-[10px]">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>

      {/* Marker corners */}
      <Corners />
    </section>
  );
}

function Corners() {
  const c = 'absolute w-6 h-6 border-[#1E90FF]';
  return (
    <>
      <span className={`${c} top-20 left-4 border-t border-l`} />
      <span className={`${c} top-20 right-4 border-t border-r`} />
      <span className={`${c} bottom-4 left-4 border-b border-l`} />
      <span className={`${c} bottom-4 right-4 border-b border-r`} />
    </>
  );
}
