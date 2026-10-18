"use client";
import { SLIDES, MONO, src, pad, useCarousel, useWipe, HeroStyles } from './shared';

const n = SLIDES.length;

// 4G: two framed prints side by side, current large, next one waiting small. Click the small one to advance.
export default function HeroMonoDiptych() {
  const { index, last, next } = useCarousel(n);
  const big = useWipe(index, last, 'inset(0% 0% 0% 100%)');
  const small = useWipe((index + 1) % n, last === null ? null : (last + 1) % n, 'inset(0% 0% 0% 100%)');
  const slide = SLIDES[index];
  const upcoming = SLIDES[(index + 1) % n];

  return (
    <section className="relative flex h-screen w-full flex-col gap-4 bg-black px-4 pb-6 pt-20 text-white md:flex-row md:items-end md:gap-6 md:px-14 md:pb-10 md:pt-24">
      <HeroStyles />
      <div className="flex min-h-0 flex-1 flex-col md:h-full">
        <div className="relative flex-1 overflow-hidden">
          {SLIDES.map((s, i) => (
            <div key={s.id} ref={(el) => (big.refs.current[i] = el)} className="absolute inset-0" style={big.layerStyle(i)}>
              <img src={src(s.image)} alt={s.title} className="h-full w-full object-cover" style={{ filter: MONO }} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-baseline gap-4">
          <span className="text-sm tabular-nums text-white/50">{pad(index + 1)}</span>
          <h1 key={index} className="overflow-hidden text-3xl font-normal uppercase leading-none tracking-tight md:text-5xl">
            <span className="hx-rise">{slide.title}</span>
          </h1>
        </div>
      </div>

      <button onClick={next} className="group hidden w-[22%] cursor-pointer flex-col border-none bg-transparent p-0 text-left text-white md:flex">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {SLIDES.map((s, i) => (
            <div key={s.id} ref={(el) => (small.refs.current[i] = el)} className="absolute inset-0" style={small.layerStyle(i)}>
              <img
                src={src(s.image)}
                alt=""
                className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                style={{ filter: MONO }}
              />
            </div>
          ))}
        </div>
        <span className="mt-3 text-sm text-white/50 transition-colors group-hover:text-white">
          Next — {upcoming.title}
        </span>
      </button>
    </section>
  );
}
