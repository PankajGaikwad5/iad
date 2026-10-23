"use client";
import { SLIDES, C, MONO, SLIDE_MS, src, pad, useCarousel, useWipe, HeroStyles } from './shared';

// 4D: B&W full-bleed with a thumbnail filmstrip as the navigation
export default function HeroMonoFilmstrip() {
  const { index, last, go } = useCarousel(SLIDES.length);
  const { refs, layerStyle } = useWipe(index, last, 'inset(0% 100% 0% 0%)');
  const slide = SLIDES[index];

  return (
    <section className="group/hero relative h-screen w-full overflow-hidden bg-black text-white">
      <HeroStyles />

      {SLIDES.map((s, i) => (
        <div key={s.id} ref={(el) => (refs.current[i] = el)} className="absolute inset-0" style={layerStyle(i)}>
          <img src={src(s.image)} alt={s.title} className="h-full w-full object-cover transition-[filter] duration-1000 ease-out group-hover/hero:filter-none" style={{ filter: MONO }} />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-3/4" style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 100%)' }} />

      <div className="relative z-[4] flex h-full flex-col justify-end px-6 pb-8 md:px-14 md:pb-12">
        <div key={index} className="mb-8 md:mb-10">
          <h1 className="overflow-hidden pb-2 text-[13vw] font-normal uppercase leading-[0.85] tracking-tighter md:text-[8vw]">
            <span className="hx-rise" style={{ animationDelay: '200ms' }}>{slide.title}</span>
          </h1>
        </div>

        <div className="flex gap-2 md:gap-3">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Go to ${s.title}`}
              className="group relative aspect-[4/3] w-1/5 cursor-pointer overflow-hidden border-none bg-transparent p-0 md:w-36"
            >
              <img
                src={src(s.image)}
                alt=""
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:!opacity-100 group-hover:filter-none"
                style={{ filter: MONO, opacity: i === index ? 1 : 0.4 }}
              />
              <span className="absolute left-2 top-1.5 text-[10px] tabular-nums text-white">{pad(i + 1)}</span>
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20" />
              {i === index && (
                <span key={index} className="hx-bar absolute bottom-0 left-0 h-[2px]" style={{ background: C.accent, animationDuration: `${SLIDE_MS}ms` }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
