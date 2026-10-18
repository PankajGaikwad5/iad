"use client";
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { SLIDES, MONO_BRIGHT, zoomStyle, src, pad, useCarousel, useWipe, Arrows, HeroStyles } from './shared';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const SMOOTH = 'cubic-bezier(0.16,1,0.3,1)';

// Pinned scroll, in viewport heights: OPEN of it opens the frame, HOLD keeps it full screen
const OPEN = 1;
const HOLD = 0.6;
const PIN_VH = OPEN + HOLD;

// 4E Light: B&W print framed on the site's light mat. Hover lifts it into colour;
// scrolling pins the hero and opens the frame out to full screen.
export default function HeroFrameLight() {
  const { index, last, go, next, prev } = useCarousel(SLIDES.length);
  const { refs, layerStyle } = useWipe(index, last, 'inset(100% 0% 0% 0%)');
  const slide = SLIDES[index];

  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const measureRef = useRef(null);
  const uiRef = useRef(null);
  const shadeRef = useRef(null);
  const stRef = useRef(null);
  const lenis = useLenis();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;

    // The framed area, read off an invisible box so the gutters live in one place (its classes)
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
          // No hover-lift once the frame starts opening up
          onUpdate: (self) => frame.toggleAttribute('data-expanded', self.progress > 0.01),
        },
      })
        .fromTo(frame, { clipPath: framedInset, '--sc': 0 }, { clipPath: 'inset(0px 0px 0px 0px)', '--sc': 1, ease: 'none', duration: OPEN }, 0)
        // Type stays put; it turns white with a soft shade as the photo grows under it
        .fromTo(uiRef.current, { color: '#222222' }, { color: '#ffffff', ease: 'none', duration: OPEN }, 0)
        .fromTo(shadeRef.current, { opacity: 0 }, { opacity: 1, ease: 'none', duration: OPEN }, 0)
        // Hold at full screen before the page moves on
        .to({}, { duration: HOLD });
      stRef.current = tl.scrollTrigger;
    }, section);

    return () => ctx.revert();
  }, []);

  // Snap between rest, full screen and release once the scroll settles, driven through Lenis
  // so it glides with the same smoothing as normal scrolling
  useEffect(() => {
    if (!lenis) return;
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
      // Released by time, not onComplete, so a user scroll that interrupts the glide can't leave it stuck
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
  }, [lenis]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#f7f7f7] text-[#222]">
      <HeroStyles />
      <style>{`
        .hx-frame { transition: transform 1600ms ${SMOOTH}; will-change: transform, clip-path; }
        .hx-frame:not([data-expanded]):hover { transform: scale(1.025); }
        /* Colour shows from hover or from scroll (--sc, 0 → 1), whichever is stronger */
        .hx-color { opacity: max(var(--sc, 0), var(--hv, 0)); transition: opacity 1600ms ${SMOOTH}; }
        .hx-frame:hover { --hv: 1; }
        .hx-frame[data-expanded] .hx-color { transition: none; }
      `}</style>

      {/* Where the print sits at rest; never visible, only measured */}
      <div ref={measureRef} aria-hidden="true" className="pointer-events-none invisible absolute inset-x-6 bottom-[19vh] top-24 sm:inset-x-12 md:inset-x-16 md:bottom-[17vh] md:top-28 lg:inset-x-24" />

      {/* Full-screen layer clipped down to the frame; clip-path also limits hover to the visible print */}
      <div ref={frameRef} className="hx-frame absolute inset-0">
        {SLIDES.map((s, i) => (
          <div key={s.id} ref={(el) => (refs.current[i] = el)} className="absolute inset-0 overflow-hidden" style={layerStyle(i)}>
            <div className="h-full w-full will-change-transform" style={zoomStyle(i === index)}>
              <img src={src(s.image)} alt={s.title} className="h-full w-full object-cover" style={{ filter: MONO_BRIGHT }} />
              {/* Colour copy that only fades in, so hover never re-runs a filter */}
              <img src={src(s.image)} alt="" aria-hidden="true" className="hx-color absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        ))}
        <div ref={shadeRef} className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-1/3 opacity-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))' }} />
      </div>

      <div ref={uiRef} style={{ color: '#222' }}>
        {/* Vertical counter on the right edge */}
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
