import React, { useEffect, useRef, useState } from 'react';
import { stats, parallaxBands } from '../../mock';

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [n, setN] = useState(0);
  const target = parseInt(value, 10);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1600;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {n}
      <span className="text-[#1E90FF]">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden border-t border-white/10">
      <div className="absolute inset-0">
        <img src={parallaxBands.aerial} alt="" className="w-full h-full object-cover" style={{ transform: 'scale(1.05)' }} />
        <div className="absolute inset-0 bg-black/75" />
        <div className="noise" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-10 reveal">
          <span className="w-10 h-px bg-[#1E90FF]" />
          <span className="font-display uppercase tracking-[0.3em] text-[11px] text-[#1E90FF]">Cifras</span>
        </div>
        <h2 className="reveal font-display uppercase leading-[0.95] tracking-tight text-white text-4xl md:text-6xl lg:text-7xl mb-16 max-w-3xl">
          Más de medio siglo<br /><span className="text-[#1E90FF]">construyendo México</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {stats.map((s, i) => (
            <div key={i} className="bg-black/60 backdrop-blur-sm p-8 md:p-10">
              <div className="font-display text-white text-6xl md:text-7xl lg:text-8xl leading-none">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="font-display uppercase tracking-[0.25em] text-[10px] md:text-[11px] text-white/70 mt-4">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
