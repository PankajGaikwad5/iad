"use client";
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { SLIDES, MONO, src, pad, useCarousel, useWipe, HeroStyles } from './shared';

// 4F: framed print that opens like a camera shutter, from a thin slit, while the image settles back
export default function HeroMonoAperture() {
  const { index, last, next } = useCarousel(SLIDES.length);
  const { refs, layerStyle } = useWipe(index, last, 'inset(50% 0% 50% 0%)');
  const imgs = useRef([]);
  const slide = SLIDES[index];

  useLayoutEffect(() => {
    gsap.fromTo(imgs.current[index], { scale: 1.2 }, { scale: 1, duration: 1.8, ease: 'power3.out' });
  }, [index]);

  return (
    <section className="relative flex h-screen w-full flex-col bg-black px-4 pb-6 pt-20 text-white md:px-14 md:pb-8 md:pt-24">
      <HeroStyles />
      <button onClick={next} aria-label="Next project" className="relative flex-1 cursor-pointer overflow-hidden border-none bg-transparent p-0">
        {SLIDES.map((s, i) => (
          <div key={s.id} ref={(el) => (refs.current[i] = el)} className="absolute inset-0 overflow-hidden" style={layerStyle(i)}>
            <img ref={(el) => (imgs.current[i] = el)} src={src(s.image)} alt={s.title} className="h-full w-full object-cover" style={{ filter: MONO }} />
          </div>
        ))}
      </button>

      <div className="mt-5 flex items-baseline justify-between gap-6 text-white">
        <h1 key={index} className="overflow-hidden text-lg font-normal md:text-2xl">
          <span className="hx-rise">{slide.title}</span>
        </h1>
        <span className="text-sm tabular-nums text-white/50">{pad(index + 1)} — {pad(SLIDES.length)}</span>
      </div>
    </section>
  );
}
