"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const SLIDES = [
  { id: '01', title: 'Private Residence', location: 'Bhopal, India', category: 'Architecture & Interiors', image: '/hero images/PRIVATE RESIDENCE.png', link: '/projects/the-modern-villa' },
  { id: '02', title: 'Hospitality', location: 'Ratapani, MP', category: 'Eco-Luxury Sanctuary', image: '/hero images/HOSPITALITY.png', link: '/projects/nature-retreat' },
  { id: '03', title: 'Private Estate', location: 'Bhopal, India', category: 'Architecture & Turnkey', image: '/hero images/PRIVATE ESTATE.png', link: '/projects/kothi' },
  { id: '04', title: 'Office & Work Space', location: 'Bhopal, India', category: 'Commercial Architecture', image: '/hero images/OFFICE & WORK SPACE.png', link: '/projects/atelier-19' },
  { id: '05', title: 'Residential Development', location: 'Bhopal, India', category: 'Masterplanning & Architecture', image: '/hero images/RESIDENTIAL DEVELOPMENT.png', link: '/projects/the-courtyard-house' },
];

export const C = {
  cream: '#FFF8F0',
  ink: '#141414',
  accent: '#E8590C',
};

export const SLIDE_MS = 6000;

export const MONO = 'grayscale(1) contrast(1.3) brightness(0.85)';

// Brighter B&W that keeps the photo luminous instead of muddy
export const MONO_BRIGHT = 'grayscale(1) contrast(1.12) brightness(1.06)';

// Slow zoom on the active slide; resets once the slide is hidden
export const zoomStyle = (active) => ({
  transform: active ? 'scale(1.06)' : 'scale(1)',
  transition: active ? `transform ${SLIDE_MS + 2000}ms linear` : 'transform 0s 1.2s',
});

export const src = (path) => encodeURI(path);

// Autoplaying index; `last` is the slide we just left, so layers can transition out
export function useCarousel(count, ms = SLIDE_MS) {
  const [state, setState] = useState({ index: 0, last: null });

  const go = useCallback((i) => {
    setState((s) => {
      const next = (i + count) % count;
      return next === s.index ? s : { index: next, last: s.index };
    });
  }, [count]);

  useEffect(() => {
    const t = setTimeout(() => go(state.index + 1), ms);
    return () => clearTimeout(t);
  }, [state.index, ms, go]);

  return {
    index: state.index,
    last: state.last,
    go,
    next: () => go(state.index + 1),
    prev: () => go(state.index - 1),
  };
}

// Stacked layers where the incoming slide wipes over the outgoing one
export function useWipe(index, last, from = 'inset(0% 0% 0% 100%)') {
  const refs = useRef([]);
  const first = useRef(true);

  useLayoutEffect(() => {
    const el = refs.current[index];
    if (!el) return;
    if (first.current) {
      first.current = false;
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power3.out' });
      return;
    }
    gsap.fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' });
  }, [index, from]);

  const layerStyle = (i) => ({
    zIndex: i === index ? 2 : i === last ? 1 : 0,
    visibility: i === index || i === last ? 'visible' : 'hidden',
  });

  return { refs, layerStyle };
}

export const pad = (n) => String(n).padStart(2, '0');

export function ProgressBars({ count, index, go, ms = SLIDE_MS, color = '#fff', track = 'rgba(255,255,255,0.25)', className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => go(i)}
          aria-label={`Go to slide ${i + 1}`}
          className="relative h-6 w-10 md:w-14 cursor-pointer border-none bg-transparent p-0"
        >
          <span className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2" style={{ background: track }} />
          <span
            key={i === index ? `on-${index}` : 'off'}
            className={`absolute left-0 top-1/2 h-[2px] -translate-y-1/2 ${i === index ? 'hx-bar' : ''}`}
            style={{ background: color, width: i < index ? '100%' : i === index ? undefined : '0%', animationDuration: `${ms}ms` }}
          />
        </button>
      ))}
    </div>
  );
}

export function Arrows({ prev, next, color = '#fff', border = 'rgba(255,255,255,0.35)' }) {
  const btn = 'flex h-11 w-11 items-center justify-center rounded-full border bg-transparent cursor-pointer transition-colors duration-300 hover:bg-white/10';
  return (
    <div className="flex items-center gap-2">
      <button onClick={prev} aria-label="Previous slide" className={btn} style={{ borderColor: border, color }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
      <button onClick={next} aria-label="Next slide" className={btn} style={{ borderColor: border, color }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
    </div>
  );
}

// Keyframes shared by every hero variant
export function HeroStyles() {
  return (
    <style>{`
      @keyframes hxRise { from { transform: translateY(105%); } to { transform: translateY(0); } }
      @keyframes hxFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
      @keyframes hxBar { from { width: 0%; } to { width: 100%; } }
      @keyframes hxBloom {
        0%, 25% { filter: grayscale(1) contrast(1.25) brightness(0.95); }
        100% { filter: grayscale(0) contrast(1.05) brightness(1); }
      }
      .hx-rise { display: block; animation: hxRise 1s cubic-bezier(0.22,1,0.36,1) both; }
      .hx-fade { animation: hxFade 0.9s cubic-bezier(0.22,1,0.36,1) both; }
      .hx-bar { animation-name: hxBar; animation-timing-function: linear; animation-fill-mode: both; }
      .hx-bloom { animation: hxBloom 2.6s ease-out both; }
      @media (prefers-reduced-motion: reduce) {
        .hx-rise, .hx-fade, .hx-bloom { animation: none; }
      }
    `}</style>
  );
}
