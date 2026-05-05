import React, { useState } from 'react';
import axios from 'axios';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { contact, serviceOptions } from '../../mock';
import { useToast } from '../../hooks/use-toast';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: 'Faltan datos', description: 'Completa nombre, correo y descripción del proyecto.' });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        name: form.name,
        company: form.company || null,
        email: form.email,
        phone: form.phone || null,
        service_type: form.service || null,
        message: form.message,
      };
      await axios.post(`${API}/quotations`, payload);
      toast({ title: 'Solicitud enviada', description: 'Nuestro equipo se pondrá en contacto contigo pronto.' });
      setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg = Array.isArray(detail)
        ? detail.map((d) => d.msg).join(', ')
        : (typeof detail === 'string' ? detail : 'Hubo un problema. Intenta de nuevo en unos minutos.');
      toast({ title: 'No se pudo enviar', description: msg });
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = 'w-full bg-transparent border-b border-white/20 focus:border-[#1E90FF] outline-none py-3 text-white placeholder:text-white/35 font-body text-[15px] transition-colors';

  return (
    <section id="contact" className="relative bg-[#050505] py-28 md:py-40 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-10 reveal">
          <span className="w-10 h-px bg-[#1E90FF]" />
          <span className="font-display uppercase tracking-[0.3em] text-[11px] text-[#1E90FF]">Contacto</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: heading + details */}
          <div className="lg:col-span-5 reveal">
            <h2 className="font-display uppercase leading-[0.95] tracking-tight text-white text-5xl md:text-7xl lg:text-[88px]">
              Hablemos de<br /><span className="text-[#1E90FF]">Tu Proyecto</span>
            </h2>

            <div className="mt-12 space-y-6">
              <InfoRow icon={<Mail size={16} />} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
              <InfoRow icon={<Phone size={16} />} label="Teléfono" value={contact.phone} href={`tel:${contact.phoneTel}`} />
              <InfoRow icon={<MapPin size={16} />} label="Dirección" value={contact.address} />
            </div>

            <div className="mt-16 border-t border-white/10 pt-8">
              <div className="font-display text-[#1E90FF] text-6xl md:text-7xl leading-none">{contact.founded}</div>
              <div className="font-display uppercase tracking-[0.25em] text-[11px] text-white/60 mt-3">Año de Fundación</div>
              <p className="mt-4 font-body text-sm text-white/60 max-w-sm">Más de 50 años construyendo la infraestructura que conecta y desarrolla a México.</p>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={submit} className="lg:col-span-7 reveal grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <div>
              <Label>01 / Nombre completo</Label>
              <input className={inputCls} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Juan Pérez" />
            </div>
            <div>
              <Label>02 / Empresa / Organización</Label>
              <input className={inputCls} value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Opcional" />
            </div>
            <div>
              <Label>03 / Correo electrónico</Label>
              <input type="email" className={inputCls} value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="tu@correo.com" />
            </div>
            <div>
              <Label>04 / Teléfono</Label>
              <input className={inputCls} value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(669) 000 0000" />
            </div>
            <div className="md:col-span-2">
              <Label>05 / Tipo de servicio</Label>
              <select
                className={`${inputCls} appearance-none cursor-pointer`}
                value={form.service}
                onChange={(e) => update('service', e.target.value)}
                style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #1E90FF 50%), linear-gradient(135deg, #1E90FF 50%, transparent 50%)', backgroundPosition: 'calc(100% - 14px) 20px, calc(100% - 8px) 20px', backgroundSize: '6px 6px', backgroundRepeat: 'no-repeat' }}
              >
                <option value="" className="bg-black">Selecciona un servicio</option>
                {serviceOptions.map((o) => (
                  <option key={o} value={o} className="bg-black">{o}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <Label>06 / Descripción del proyecto</Label>
              <textarea
                rows={5}
                className={`${inputCls} resize-none`}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Cuéntanos sobre tu obra, alcance, ubicación y tiempos estimados."
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-4 pt-4">
              <span className="font-body text-xs text-white/50 max-w-sm">Al enviar aceptas ser contactado por nuestro equipo. Tus datos no serán compartidos con terceros.</span>
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                {submitting ? 'Enviando…' : 'Enviar Solicitud'} <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Label({ children }) {
  return <div className="font-display uppercase tracking-[0.25em] text-[10px] text-[#1E90FF] mb-3">{children}</div>;
}

function InfoRow({ icon, label, value, href }) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag href={href} className="flex items-start gap-4 group">
      <span className="w-10 h-10 flex items-center justify-center border border-white/15 text-[#1E90FF] group-hover:border-[#1E90FF] transition-colors">
        {icon}
      </span>
      <div>
        <div className="font-display uppercase tracking-[0.25em] text-[10px] text-white/50 mb-1">{label}</div>
        <div className="font-body text-white group-hover:text-[#1E90FF] transition-colors">{value}</div>
      </div>
    </Tag>
  );
}
