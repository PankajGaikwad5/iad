"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const UNDERLINE =
  "relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100 focus-visible:outline-none";

export default function Footer() {
  const lenis = useLenis();
  const footerRef = useRef(null);

  const scrollToTop = (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = footerRef.current;
    if (!el || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.big span'), {
        yPercent: 110,
        duration: 1.4,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el.querySelector('.big'),
          start: 'top 92%',
          once: true,
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="border-t border-black/10 px-6 sm:px-12 md:px-16 lg:px-24 pt-20 md:pt-28 pb-8 bg-[#f7f7f7] text-[#222]"
    >
      {/* Footer Navigation */}
      <nav className="fn flex gap-8 md:gap-16 flex-wrap font-normal text-[13px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase mb-16 md:mb-24" aria-label="Footer">
        <Link href="/" className={`cursor-pointer ${UNDERLINE}`}>Home</Link>
        <Link href="/projects" className={`cursor-pointer ${UNDERLINE}`}>Projects</Link>
        <Link href="/awards-and-press" className={`cursor-pointer ${UNDERLINE}`}>Awards &amp; press</Link>
      </nav>

      {/* Monumental Wordmark */}
      <div
        role="img"
        aria-label="Studio Ia.D"
        className="big flex items-baseline justify-between w-full max-w-full font-light text-[clamp(2.2rem,6.8vw,8rem)] leading-none font-[family-name:Glacial_Indifference] tracking-normal uppercase select-none pb-2 pt-2"
      >
        <div className="flex justify-between w-[57%] overflow-hidden py-1">
          {['S', 'T', 'U', 'D', 'I', 'O'].map((char, i) => (
            <span key={i} aria-hidden="true" className="inline-block transform-gpu will-change-transform">{char}</span>
          ))}
        </div>
        <div className="flex justify-between w-[31%] overflow-hidden py-1">
          {['I', 'A', '.', 'D'].map((char, i) => (
            <span key={i} aria-hidden="true" className="inline-block transform-gpu will-change-transform">{char}</span>
          ))}
        </div>
      </div>

      {/* Info Columns */}
      <div className="cols grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10 py-16 md:py-24 font-[family-name:League_Spartan]">
        <div>
          <h4 className="font-normal text-[12px] tracking-[0.18em] uppercase text-[#222] mb-4">Visit the studio</h4>
          <p className="block mb-2 text-[#222]/80 leading-relaxed font-light">
            G.3, Ground floor, Dadaji Avenue<br />
            Chunabhatti, Bhopal<br />
            Madhya Pradesh 462016, India
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mb-2 text-[#222]/80 hover:text-[#222] transition-colors duration-500 ${UNDERLINE}`}
          >
            Google Maps
          </a>
        </div>
        <div>
          <h4 className="font-normal text-[12px] tracking-[0.18em] uppercase text-[#222] mb-4">Follow us</h4>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mb-2 text-[#222]/80 hover:text-[#222] transition-colors duration-500 ${UNDERLINE}`}
          >
            Instagram
          </a>
        </div>
        <div>
          <h4 className="font-normal text-[12px] tracking-[0.18em] uppercase text-[#222] mb-4">Contact</h4>
          <a href="tel:+919828618643" className={`block w-fit mb-2 text-[#222]/80 hover:text-[#222] transition-colors duration-500 ${UNDERLINE}`}>
            +91 98286 18643
          </a>
          <a href="mailto:admin@studioiad.com" className={`block w-fit mb-2 text-[#222]/80 hover:text-[#222] transition-colors duration-500 ${UNDERLINE}`}>
            admin@studioiad.com
          </a>
        </div>
      </div>

      {/* Base Bar */}
      <div className="base flex flex-wrap items-center justify-between gap-y-3 text-[13px] text-[#222]/80 font-[family-name:League_Spartan] tracking-wide border-t border-black/10 pt-6">
        <span>© 2026 Studio Ia.D</span>
        <button
          onClick={scrollToTop}
          className={`cursor-pointer text-[#222]/80 hover:text-[#222] transition-colors duration-500 bg-transparent border-none p-0 ${UNDERLINE}`}
        >
          Back to top
        </button>
        <span>Bhopal, India</span>
      </div>
    </footer>
  );
}
