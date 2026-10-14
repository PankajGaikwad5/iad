"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 3.5 }
    );

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        opacity: 0,
        backgroundColor: scrolled ? 'rgba(255,248,240,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,26,26,0.05)' : '1px solid transparent',
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 lg:px-14 py-4" style={{ color: scrolled ? 'var(--ink)' : '#fff' }}>
        {/* Logo */}
        <a href="/" className="no-underline flex items-baseline gap-1" style={{ color: 'inherit' }}>
          <span className="text-[9px] font-medium tracking-[0.3em] uppercase" style={{ color: scrolled ? 'var(--accent)' : 'rgba(255,255,255,0.6)' }}>studio</span>
          <span className="text-2xl font-normal tracking-tight leading-none">ia<span style={{ color: 'var(--accent)' }}>.</span>d</span>
        </a>

        {/* Center links */}
        <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0 text-[11px] tracking-[0.18em] font-medium" style={{ color: 'inherit' }}>
          <li><a href="#home" className="link-hover no-underline transition-opacity hover:opacity-60" style={{ color: 'inherit' }}>HOME</a></li>
          <li><a href="#studio" className="link-hover no-underline transition-opacity hover:opacity-60" style={{ color: 'inherit' }}>STUDIO</a></li>
          <li><a href="#projects" className="link-hover no-underline transition-opacity hover:opacity-60" style={{ color: 'inherit' }}>PROJECTS</a></li>
          <li><a href="#contact" className="link-hover no-underline transition-opacity hover:opacity-60" style={{ color: 'inherit' }}>CONTACT</a></li>
        </ul>

        {/* Right side CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.18em] font-medium uppercase no-underline px-5 py-2 rounded-full border transition-all duration-400"
          style={{
            color: 'inherit',
            borderColor: scrolled ? 'rgba(26,26,26,0.15)' : 'rgba(255,255,255,0.25)',
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = scrolled ? 'var(--ink)' : 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = scrolled ? 'var(--cream)' : '#fff'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = scrolled ? 'var(--ink)' : '#fff'; }}
        >
          LET'S TALK
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 11V1.5M11 11H1.5" stroke="currentColor" strokeWidth="1.5"/></svg>
        </a>

        {/* Mobile: simple text link */}
        <a href="#contact" className="md:hidden text-[10px] tracking-[0.15em] font-medium uppercase no-underline" style={{ color: 'inherit' }}>
          CONTACT
        </a>
      </div>
    </nav>
  );
}
