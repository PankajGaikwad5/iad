"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Founder() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const bioRef = useRef(null);
  const labelRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image scales up from small
      gsap.from(imageRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 65%" },
        scale: 0.85,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      });

      // Label
      gsap.from(labelRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 65%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });

      // Name
      gsap.from(nameRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 60%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Bio
      gsap.from(bioRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 55%" },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      // Quote
      gsap.from(quoteRef.current, {
        scrollTrigger: { trigger: quoteRef.current, start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--cream)' }} id="founder">
      <div className="max-w-[1400px] mx-auto">
        {/* Asymmetric layout: Image overlaps on the left, text on the right */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-0">
          
          {/* Left: Large rounded image */}
          <div className="w-full lg:w-[48%] lg:mr-[-60px] relative z-10">
            <div
              ref={imageRef}
              className="w-full aspect-[3/4] img-rounded overflow-hidden"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat grayscale contrast-110"
                style={{ backgroundImage: "url('https://studio-iad-design-preview.ekta-soni9514.chatgpt.site/assets/ishan.jpg')" }}
              />
            </div>
          </div>

          {/* Right: Text content, offset down to create asymmetry */}
          <div className="w-full lg:w-[55%] lg:pt-24 xl:pt-32 lg:pl-20 xl:pl-28">
            <div ref={labelRef}>
              <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: 'var(--accent)' }}>
                Founder & Principal Architect
              </span>
            </div>

            <h2
              ref={nameRef}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-normal leading-[0.9] tracking-tight mt-4 mb-8"
              style={{ color: 'var(--ink)' }}
            >
              ISHAN<br />AHLUWALIA
            </h2>

            <div ref={bioRef} className="text-base leading-7" style={{ color: 'var(--ink)', opacity: 0.65 }}>
              <p className="mb-5 max-w-md">
                Ishan established Studio Ia.D in 2019, bringing architecture, interiors and landscape into one practice. He leads the design direction of the studio and works closely with clients and the team from concept to completion.
              </p>
              <p className="mb-0 max-w-md">
                His portfolio spans residences, retail spaces and hospitality, including House of Light and Kothi in Bhopal.
              </p>
            </div>

            {/* Pull quote */}
            <div ref={quoteRef} className="mt-12 pt-8 max-w-md" style={{ borderTop: '1px solid rgba(26,26,26,0.08)' }}>
              <p className="text-lg md:text-xl leading-snug font-normal italic" style={{ color: 'var(--ink)', opacity: 0.8 }}>
                "Great design is rooted in people, context, and craftsmanship — rather than trends."
              </p>
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium mt-3 block" style={{ color: 'var(--ink-muted)' }}>
                — Ishan Ahluwalia
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
