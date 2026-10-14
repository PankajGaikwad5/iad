"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

const slides = [
  {
    id: '01',
    title: 'THE MODERN VILLA',
    location: 'Bhopal, India',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: '02',
    title: 'HOUSE OF LIGHT',
    location: 'Bhopal, India',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: '03',
    title: 'NATURE RETREAT',
    location: 'Indore, India',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000',
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const isAnimating = useRef(false);
  const autoRef = useRef(null);

  const slide = slides[current];

  const goTo = useCallback((next) => {
    if (isAnimating.current || next === current) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; }
    });

    // Animate image out with a wipe
    tl.to(imageRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.6,
      ease: "power3.in",
    })
    .to([titleRef.current, metaRef.current], {
      y: 40,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }, "<")
    .call(() => setCurrent(next))
    // Animate image back in
    .fromTo(imageRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0 0 0 0)', duration: 0.8, ease: "power3.out" },
      "+=0.05"
    )
    .fromTo(titleRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(metaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );
  }, [current]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  // Autoplay
  useEffect(() => {
    autoRef.current = setInterval(next, 5500);
    return () => clearInterval(autoRef.current);
  }, [next]);

  // Initial animation
  useEffect(() => {
    gsap.fromTo(imageRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0 0 0 0)', duration: 1.4, ease: "power3.out", delay: 3.2 }
    );
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 3.8 }
    );
    gsap.fromTo(metaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 4 }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: 'var(--cream)' }} id="home">
      {/* Layout: Split — left text, right image with rounded corners */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-stretch">
        {/* Left: Big text overlay */}
        <div className="relative z-20 w-full md:w-[45%] flex flex-col justify-end p-8 md:p-14 lg:p-20 pb-12 md:pb-20">
          <div ref={titleRef} style={{ opacity: 0 }}>
            <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-4" style={{ color: 'var(--accent)' }}>
              Featured Project — {slide.id}
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-normal leading-[0.92] tracking-tight mb-6" style={{ color: 'var(--ink)' }}>
              {slide.title}
            </h1>
          </div>
          <div ref={metaRef} className="flex items-center gap-6" style={{ opacity: 0 }}>
            <span className="text-xs tracking-[0.15em] uppercase font-medium" style={{ color: 'var(--ink-muted)' }}>{slide.location}</span>
            <a href="#projects" className="btn-pill text-[10px] py-2 px-5 no-underline">
              View Project
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 11V1.5M11 11H1.5" stroke="currentColor" strokeWidth="1.5"/></svg>
            </a>
          </div>

          {/* Slide indicators */}
          <div className="flex items-center gap-3 mt-10 md:mt-16">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="bg-transparent border-none cursor-pointer p-0"
                aria-label={`Go to slide ${i + 1}`}
              >
                <div
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === current ? '32px' : '8px',
                    height: '8px',
                    backgroundColor: i === current ? 'var(--ink)' : 'rgba(26,26,26,0.15)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Rounded image */}
        <div className="relative w-full md:w-[55%] h-[45vh] md:h-full p-2 md:p-4">
          <div
            ref={imageRef}
            className="w-full h-full overflow-hidden"
            style={{
              borderRadius: 'var(--radius)',
              clipPath: 'inset(100% 0 0 0)',
            }}
          >
            {slides.map((s, idx) => (
              <div
                key={s.id}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                style={{
                  backgroundImage: `url(${s.image})`,
                  opacity: current === idx ? 1 : 0,
                  borderRadius: 'var(--radius)',
                }}
              >
                <div className="absolute inset-0 bg-black/10" style={{ borderRadius: 'var(--radius)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
