import React from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { contact } from '../../mock';

export default function CTA() {
  return (
    <section className="relative bg-black py-24 md:py-32 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1589710039840-8ebf7a876fa5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHw0fHxza3lzY3JhcGVyJTIwZHVza3xlbnwwfHx8Ymx1ZXwxNzc3OTYzNTUwfDA&ixlib=rb-4.1.0&q=85"
          alt=""
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="noise" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8 reveal">
          <h2 className="font-display uppercase leading-[0.95] tracking-tight text-white text-5xl md:text-7xl lg:text-[96px]">
            ¿Tienes un<br /><span className="text-[#1E90FF]">proyecto</span> en mente?
          </h2>
          <p className="mt-6 text-white/70 font-body text-[17px] max-w-2xl">
            Hablemos. Nuestro equipo está listo para asesorarte desde los estudios preliminares hasta la entrega final de tu obra.
          </p>
        </div>
        <div className="lg:col-span-4 reveal flex flex-col gap-4">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary justify-center"
          >
            Solicitar Cotización <ArrowUpRight size={16} />
          </a>
          <a href={`tel:${contact.phoneTel}`} className="btn-ghost justify-center">
            <Phone size={14} /> {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
