"use client";
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { SLIDES, MONO_BRIGHT, zoomStyle, src, pad, useCarousel, useWipe, Arrows, HeroStyles } from './shared';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const SMOOTH = 'cubic-bezier(0.16,1,0.3,1)';

// Pinned scroll constants (only used if pinnedFrame=true is passed)
const OPEN = 1;
const HOLD = 0.6;
const PIN_VH = OPEN + HOLD;

// Optimal vertical alignment per image to keep roofs, domes and key architectural features from being cut
const POSITIONS = {
  '01': 'center 40%', // Private Residence
  '02': 'center 18%', // Hospitality (Hotel Regenta - keeps full roofline in view)
  '03': 'center 26%', // Private Estate (keeps full central dome in view)
  '04': 'center 18%', // Office & Work Space (keeps mansard roof & top arches in view)
  '05': 'center 38%', // Residential Development (keeps villas and entrance arch in view)
};

export default function HeroFrameLight({ pinnedFrame = false }) {
  const { index, last, go, next, prev } = useCarousel(SLIDES.length);
  const { refs, layerStyle } = useWipe(index, last, 'inset(100% 0% 0% 0%)');
  const slide = SLIDES[index];

  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const imageTrackRef = useRef(null);
  const measureRef = useRef(null);
  const uiRef = useRef(null);
  const shadeRef = useRef(null);
  const scrollOverlayRef = useRef(null);
  const stRef = useRef(null);
  const lenis = useLenis();

  // Scroll animations
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (pinnedFrame) {
      // Legacy pinned animation mode (for demo showroom)
      const frame = frameRef.current;
      const framedInset = () => {
        const s = section.getBoundingClientRect();
        const f = measureRef.current.getBoundingClientRect();
        return `inset(${f.top - s.top}px ${s.right - f.right}px ${s.bottom - f.bottom}px ${f.left - s.left}px)`;
      };

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${PIN_VH * 100}%`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => frame.toggleAttribute('data-expanded', self.progress > 0.01),
          },
        })
          .fromTo(frame, { clipPath: framedInset, '--sc': 0 }, { clipPath: 'inset(0px 0px 0px 0px)', '--sc': 1, ease: 'none', duration: OPEN }, 0)
          .fromTo(uiRef.current, { color: '#222222' }, { color: '#ffffff', ease: 'none', duration: OPEN }, 0)
          .fromTo(shadeRef.current, { opacity: 0 }, { opacity: 1, ease: 'none', duration: OPEN }, 0)
          .to({}, { duration: HOLD });
        stRef.current = tl.scrollTrigger;
      }, section);

      return () => ctx.revert();
    }

    // Default full-bleed hero: natural scrolling with high-end scroll animation
    const ctx = gsap.context(() => {
      // 1. Subtle, gentle parallax on scroll without aggressively clipping images
      if (imageTrackRef.current) {
        gsap.to(imageTrackRef.current, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }


      // 3. Smooth darkening overlay to seamlessly bridge into next section
      if (scrollOverlayRef.current) {
        gsap.to(scrollOverlayRef.current, {
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [pinnedFrame]);

  // Snap effect ONLY when pinnedFrame is true
  useEffect(() => {
    if (!lenis || !pinnedFrame) return;
    let idle;
    let snapping = false;

    const settle = () => {
      const st = stRef.current;
      if (!st) return;
      const y = lenis.scroll;
      if (y <= st.start + 2 || y >= st.end - 2) return;
      const full = st.start + (st.end - st.start) * (OPEN / (OPEN + HOLD));
      const points = [st.start, full, st.end];
      if (points.some((p) => Math.abs(p - y) < 2)) return;
      const target = lenis.direction >= 0 ? points.find((p) => p > y) : [...points].reverse().find((p) => p < y);
      snapping = true;
      lenis.scrollTo(target, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
      setTimeout(() => { snapping = false; }, 1300);
    };

    const onScroll = () => {
      if (snapping) return;
      clearTimeout(idle);
      idle = setTimeout(settle, 140);
    };

    lenis.on('scroll', onScroll);
    return () => {
      lenis.off('scroll', onScroll);
      clearTimeout(idle);
    };
  }, [lenis, pinnedFrame]);

  // If in legacy pinned mode
  if (pinnedFrame) {
    return (
      <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#f7f7f7] text-[#222]">
        <HeroStyles />
        <style>{`
          .hx-frame { transition: transform 1600ms ${SMOOTH}; will-change: transform, clip-path; }
          .hx-frame:not([data-expanded]):hover { transform: scale(1.025); }
          .hx-color { opacity: max(var(--sc, 0), var(--hv, 0)); transition: opacity 1600ms ${SMOOTH}; }
          .hx-frame:hover { --hv: 1; }
          .hx-frame[data-expanded] .hx-color { transition: none; }
        `}</style>

        <div ref={measureRef} aria-hidden="true" className="pointer-events-none invisible absolute inset-x-6 bottom-[19vh] top-24 sm:inset-x-12 md:inset-x-16 md:bottom-[17vh] md:top-28 lg:inset-x-24" />

        <div ref={frameRef} className="hx-frame absolute inset-0">
          {SLIDES.map((s, i) => (
            <div key={s.id} ref={(el) => (refs.current[i] = el)} className="absolute inset-0 overflow-hidden" style={layerStyle(i)}>
              <div className="h-full w-full will-change-transform" style={zoomStyle(i === index)}>
                <img src={src(s.image)} alt={s.title} className="h-full w-full object-cover" style={{ filter: MONO_BRIGHT }} />
                <img src={src(s.image)} alt="" aria-hidden="true" className="hx-color absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          ))}
          <div ref={shadeRef} className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-1/3 opacity-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))' }} />
        </div>

        <div ref={uiRef} style={{ color: '#222' }}>
          <div className="absolute right-6 top-1/2 z-[4] hidden -translate-y-1/2 flex-col items-center gap-3 md:flex lg:right-10">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i)}
                aria-label={`Go to ${s.title}`}
                className="cursor-pointer rounded-full border-none p-0 transition-all duration-500"
                style={{ width: 3, height: i === index ? 28 : 3, background: 'currentColor', opacity: i === index ? 1 : 0.3 }}
              />
            ))}
          </div>

          <div className="absolute inset-x-6 bottom-6 z-[4] flex items-end justify-between gap-6 sm:inset-x-12 md:inset-x-16 md:bottom-8 lg:inset-x-24">
            <h1 key={index} className="overflow-hidden font-[family-name:Glacial_Indifference] text-4xl font-light uppercase leading-[0.9] tracking-[-0.035em] md:text-6xl xl:text-7xl">
              <span className="hx-rise" style={{ animationDelay: '200ms' }}>{slide.title}</span>
            </h1>
            <div className="flex shrink-0 items-center gap-6">
              <span className="hidden font-[family-name:League_Spartan] text-[11px] tabular-nums tracking-[0.2em] sm:inline">
                {pad(index + 1)} <span className="opacity-50">/ {pad(SLIDES.length)}</span>
              </span>
              <Arrows prev={prev} next={next} color="currentColor" border="color-mix(in srgb, currentColor 25%, transparent)" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // DEFAULT: Full-bleed hero that visitors see right away, fitting the full window size without cutting key architectural features
  return (
    <section ref={sectionRef} className="hx-hero relative h-[100svh] min-h-[480px] w-full overflow-hidden bg-[#111] text-white select-none">
      <HeroStyles />
      <style>{`
        .hx-hero-color {
          opacity: 0;
          transition: opacity 1200ms ${SMOOTH};
          will-change: opacity;
        }
        .hx-hero:hover .hx-hero-color,
        .hx-hero:focus-within .hx-hero-color {
          opacity: 1;
        }
      `}</style>

      {/* Full-window image container */}
      <div ref={imageTrackRef} className="absolute inset-0 will-change-transform">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => (refs.current[i] = el)}
            className="absolute inset-0 overflow-hidden"
            style={layerStyle(i)}
          >
            <div
              className="relative h-full w-full will-change-transform"
              style={{
                ...zoomStyle(i === index),
                transformOrigin: POSITIONS[s.id] || 'center center',
              }}
            >
              {/* Black and white base image */}
              <img
                src={src(s.image)}
                alt={s.title}
                className="h-full w-full object-cover"
                style={{
                  objectPosition: POSITIONS[s.id] || 'center center',
                  filter: MONO_BRIGHT,
                }}
              />
              {/* Color layer displayed on hover */}
              <img
                src={src(s.image)}
                alt=""
                aria-hidden="true"
                className="hx-hero-color pointer-events-none absolute inset-0 h-full w-full object-cover contrast-[1.03]"
                style={{
                  objectPosition: POSITIONS[s.id] || 'center center',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Atmospheric overlays for contrast and readability */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-black/25" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40 md:h-48 bg-gradient-to-b from-black/75 via-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[55%] md:h-[45%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] hidden w-40 bg-gradient-to-l from-black/45 to-transparent md:block" />

      {/* Scroll-driven subtle darkening scrim */}
      <div ref={scrollOverlayRef} className="pointer-events-none absolute inset-0 z-[3] bg-black opacity-0" />

      {/* Grain overlay for tactile editorial finish */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.16] mix-blend-overlay"
        style={{ filter: 'url(#grain)' }}
      />

      {/* UI layer: original typography formatting with View Project link above arrow buttons */}
      <div ref={uiRef} className="pointer-events-none absolute inset-0 z-10 text-white">
        {/* Vertical counter on the right edge */}
        <div className="pointer-events-auto absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex lg:right-10">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Go to ${s.title}`}
              className="cursor-pointer rounded-full border-none p-0 transition-all duration-500 focus-visible:outline-none"
              style={{ width: 3, height: i === index ? 28 : 3, background: 'currentColor', opacity: i === index ? 1 : 0.3 }}
            />
          ))}
        </div>

        <div className="pointer-events-auto absolute inset-x-6 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-20 flex items-end justify-between gap-4 sm:inset-x-12 sm:gap-6 md:inset-x-16 md:bottom-8 lg:inset-x-24">
          <div className="flex min-w-0 flex-col items-start">
            <h1 key={index} className="overflow-hidden break-words font-[family-name:Glacial_Indifference] text-[1.75rem] font-light uppercase leading-[0.9] tracking-[-0.035em] min-[400px]:text-4xl md:text-6xl xl:text-7xl">
              <span className="hx-rise" style={{ animationDelay: '200ms' }}>{slide.title}</span>
            </h1>
            <div className="mt-3 md:mt-4">
              <span className="font-[family-name:League_Spartan] text-[11px] md:text-[12px] tabular-nums tracking-[0.2em] text-white/70">
                {pad(index + 1)} <span className="opacity-40">/ {pad(SLIDES.length)}</span>
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-3 md:gap-4">
            <a
              href={slide.link}
              className="text-[11px] md:text-[12px] font-[family-name:League_Spartan] tracking-[0.18em] font-normal uppercase pb-1 text-white border-b border-white/40 hover:border-white transition-colors duration-300 focus-visible:outline-none"
            >
              View project
            </a>
            <Arrows prev={prev} next={next} color="#ffffff" border="rgba(255,255,255,0.35)" />
          </div>
        </div>
      </div>
    </section>
  );
}
