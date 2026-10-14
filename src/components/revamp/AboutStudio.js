"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'ARCHITECTURE',
    desc: 'From villas to commercial complexes — we design structures that breathe with their surroundings.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
  },
  {
    num: '02',
    title: 'INTERIORS',
    desc: 'Spaces crafted for how you actually live — refined, functional, and unmistakably personal.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
  },
  {
    num: '03',
    title: 'TURNKEY',
    desc: 'Concept to completion — we handle every detail so you can focus on the vision.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
  },
];

export default function AboutStudio() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Cards stagger
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 80%" },
          y: 80,
          opacity: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-16" style={{ backgroundColor: 'var(--cream-dark)' }} id="studio">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium block mb-3" style={{ color: 'var(--accent)' }}>The Studio</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[0.95] tracking-tight m-0" style={{ color: 'var(--ink)' }}>
              We design spaces that<br className="hidden md:block" /> feel like they belong to you.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed md:text-right" style={{ color: 'var(--ink)', opacity: 0.55 }}>
            Studio Ia.D is an architecture and interior design practice based in Bhopal, carrying each brief from first drawing through execution.
          </p>
        </div>

        {/* Service cards — 3 col grid with rounded images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <div
              key={service.num}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] img-rounded overflow-hidden mb-6 relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Hover overlay with number */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: 'rgba(26,26,26,0.3)', borderRadius: 'var(--radius)' }}>
                  <span className="text-7xl font-light text-white/40">{service.num}</span>
                </div>
              </div>
              {/* Text */}
              <div className="flex items-start gap-3">
                <span className="text-[10px] tracking-[0.15em] font-medium mt-1.5" style={{ color: 'var(--ink-muted)' }}>{service.num}</span>
                <div>
                  <h3 className="text-lg font-medium tracking-[0.05em] mb-2" style={{ color: 'var(--ink)' }}>{service.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.55 }}>{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-16 md:mt-20">
          <a href="#projects" className="btn-pill no-underline">
            Explore our work
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 11V1.5M11 11H1.5" stroke="currentColor" strokeWidth="1.5"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
