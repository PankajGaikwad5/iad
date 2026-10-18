"use client";
import { SLIDES, MONO, src, pad, useCarousel, HeroStyles } from './shared';

const n = SLIDES.length;

// 4I: a loose stack of prints. The top one slides to the back of the pile on each advance.
export default function HeroMonoStack() {
  const { index, next } = useCarousel(n);
  const slide = SLIDES[index];

  return (
    <section className="relative flex h-screen w-full flex-col bg-black px-6 pb-8 pt-24 text-white md:px-14 md:pb-10">
      <HeroStyles />
      <button onClick={next} aria-label="Next project" className="relative mx-auto w-full max-w-6xl flex-1 cursor-pointer border-none bg-transparent p-0">
        {SLIDES.map((s, i) => {
          const depth = (i - index + n) % n;
          return (
            <div
              key={s.id}
              className="absolute inset-0 overflow-hidden"
              style={{
                zIndex: n - depth,
                transform: `translate(${depth * 14}px, ${depth * -14}px) rotate(${depth === 0 ? 0 : (depth % 2 ? 1.2 : -1) * depth * 0.6}deg)`,
                opacity: depth > 2 ? 0 : 1,
                transition: 'transform 1s cubic-bezier(0.76,0,0.24,1), opacity 0.6s ease',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
              }}
            >
              <img
                src={src(s.image)}
                alt={s.title}
                className="h-full w-full object-cover"
                style={{ filter: `${MONO} brightness(${1 - depth * 0.25})`, transition: 'filter 1s ease' }}
              />
            </div>
          );
        })}
      </button>

      <div className="mx-auto mt-8 flex w-full max-w-6xl items-baseline justify-between">
        <h1 key={index} className="overflow-hidden text-3xl font-normal uppercase leading-none tracking-tight md:text-5xl">
          <span className="hx-rise" style={{ animationDelay: '300ms' }}>{slide.title}</span>
        </h1>
        <span className="text-sm tabular-nums text-white/50">{pad(index + 1)} — {pad(n)}</span>
      </div>
    </section>
  );
}
