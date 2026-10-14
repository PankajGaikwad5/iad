"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const containerRef = useRef(null);
  const ctaRef = useRef(null);
  const colsRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ctaRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(colsRef.current.children, {
        scrollTrigger: { trigger: colsRef.current, start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(bottomRef.current, {
        scrollTrigger: { trigger: bottomRef.current, start: "top 95%" },
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="pt-24 md:pt-36 pb-8 px-6 md:px-12 lg:px-16" style={{ backgroundColor: 'var(--ink)', color: 'var(--cream)' }} id="contact">
      <div className="max-w-[1400px] mx-auto">
        {/* CTA area */}
        <div ref={ctaRef} className="mb-20 md:mb-28">
          <span className="text-[10px] tracking-[0.25em] uppercase font-medium block mb-5" style={{ color: 'var(--accent)' }}>Get in touch</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-normal leading-[0.92] tracking-tight m-0 mb-8" style={{ color: 'var(--cream)' }}>
            Let's create<br />something personal.
          </h2>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href="mailto:admin@studioiad.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] tracking-[0.18em] font-medium uppercase no-underline transition-all duration-400"
              style={{ backgroundColor: 'var(--cream)', color: 'var(--ink)', border: 'none' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--ink)'; }}
            >
              admin@studioiad.com
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 11V1.5M11 11H1.5" stroke="currentColor" strokeWidth="1.5"/></svg>
            </a>
            <a
              href="tel:+919828618643"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] tracking-[0.18em] font-medium uppercase no-underline transition-all duration-400"
              style={{ backgroundColor: 'transparent', color: 'var(--cream)', border: '1px solid rgba(255,248,240,0.15)' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,248,240,0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              +91 98286 18643
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-14" style={{ background: 'linear-gradient(to right, rgba(255,248,240,0.08), rgba(255,248,240,0.15), rgba(255,248,240,0.08))' }} />

        {/* Info columns */}
        <div ref={colsRef} className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-20">
          {/* Logo */}
          <div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-[9px] font-medium tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>studio</span>
              <span className="text-3xl font-normal tracking-tight leading-none" style={{ color: 'var(--cream)' }}>
                ia<span style={{ color: 'var(--accent)' }}>.</span>d
              </span>
            </div>
            <span className="text-[9px] tracking-[0.15em] uppercase font-medium block" style={{ color: 'var(--cream)', opacity: 0.3 }}>
              ishan ahluwalia design
            </span>
            <p className="text-[10px] tracking-[0.1em] mt-3" style={{ color: 'var(--cream)', opacity: 0.25 }}>
              Architecture · Interiors · Turnkey
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-medium uppercase mb-5" style={{ color: 'var(--cream)', opacity: 0.3 }}>Studio</h4>
            <p className="text-sm leading-relaxed font-light" style={{ color: 'var(--cream)', opacity: 0.7 }}>
              G.3, Ground floor<br />
              Dadaji Avenue, Chunabhatti<br />
              Bhopal, MP 462016
            </p>
            <a href="#" className="link-hover text-sm font-light no-underline mt-3 inline-block" style={{ color: 'var(--cream)', opacity: 0.5 }}>Google Maps ↗</a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-medium uppercase mb-5" style={{ color: 'var(--cream)', opacity: 0.3 }}>Contact</h4>
            <a href="mailto:admin@studioiad.com" className="link-hover text-sm font-light no-underline block mb-2" style={{ color: 'var(--cream)', opacity: 0.7 }}>admin@studioiad.com</a>
            <p className="text-sm font-light" style={{ color: 'var(--cream)', opacity: 0.7 }}>+91 98286 18643</p>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-medium uppercase mb-5" style={{ color: 'var(--cream)', opacity: 0.3 }}>Follow</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="link-hover text-sm font-light no-underline" style={{ color: 'var(--cream)', opacity: 0.7 }}>Instagram</a>
              <a href="#" className="link-hover text-sm font-light no-underline" style={{ color: 'var(--cream)', opacity: 0.7 }}>LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div ref={bottomRef} className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-6 text-[9px] tracking-[0.15em] font-medium" style={{ borderTop: '1px solid rgba(255,248,240,0.05)', color: 'var(--cream)', opacity: 0.25 }}>
          <span>&copy; {new Date().getFullYear()} Studio Ia.D — All rights reserved</span>
          <span>Bhopal, India</span>
        </div>
      </div>
    </footer>
  );
}
