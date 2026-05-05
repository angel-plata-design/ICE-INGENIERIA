import React, { useEffect, useRef, useState } from 'react';
import { parallaxBands } from '../../mock';

export default function ParallaxBand() {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const wh = window.innerHeight;
      if (rect.bottom > 0 && rect.top < wh) {
        const progress = (wh - rect.top) / (wh + rect.height);
        setOffset((progress - 0.5) * 80);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={ref} className="relative h-[60vh] min-h-[420px] overflow-hidden border-y border-white/10">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.15)` }}
      >
        <img src={parallaxBands.bridge} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="noise" />

      <div className="relative h-full max-w-[1600px] mx-auto px-6 md:px-10 flex items-center">
        <div className="max-w-3xl">
          <div className="font-display uppercase tracking-[0.3em] text-[11px] text-[#1E90FF] mb-6">Infraestructura que conecta</div>
          <h2 className="font-display uppercase leading-[0.95] tracking-tight text-white text-4xl md:text-6xl lg:text-7xl">
            De los estudios al<br /><span className="text-[#1E90FF]">concreto final.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
