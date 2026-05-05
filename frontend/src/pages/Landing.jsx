import React, { useEffect } from 'react';
import Navbar from '../components/ice/Navbar';
import Hero from '../components/ice/Hero';
import About from '../components/ice/About';
import Services from '../components/ice/Services';
import Projects from '../components/ice/Projects';
import Specialties from '../components/ice/Specialties';
import Clients from '../components/ice/Clients';
import CTA from '../components/ice/CTA';
import Contact from '../components/ice/Contact';
import Footer from '../components/ice/Footer';

export default function Landing() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Specialties />
      <Clients />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}
