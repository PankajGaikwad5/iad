"use client";
import { SLIDES, C, MONO, src, pad, useCarousel, useWipe, HeroStyles } from './shared';

// 4C: black panel + B&W image on the right, outlined title spilling across both, numbered rail on the left
export default function HeroMonoOutline() {
  const { index, last, go } = useCarousel(SLIDES.length);
  const { refs, layerStyle } = useWipe(index, last, 'inset(0% 0% 100% 0%)');
  const slide = SLIDES[index];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <HeroStyles />

      <div className="absolute bottom-0 right-0 top-0 w-full md:w-[62%]">
        {SLIDES.map((s, i) => (
          <div key={s.id} ref={(el) => (refs.current[i] = el)} className="absolute inset-0" style={layerStyle(i)}>
            <img src={src(s.image)} alt={s.title} className="h-full w-full object-cover" style={{ filter: MONO }} />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 z-[3] bg-black/40 md:bg-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[3] hidden w-40 md:block" style={{ background: 'linear-gradient(to right, #000, transparent)' }} />
      </div>

      {/* Numbered rail */}
      <div className="absolute left-6 top-1/2 z-[5] flex -translate-y-1/2 flex-col gap-4 md:left-12">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            aria-label={`Go to ${s.title}`}
            className="flex cursor-pointer items-center gap-3 border-none bg-transparent p-0 text-xs tabular-nums transition-colors duration-300"
            style={{ color: i === index ? C.accent : 'rgba(255,255,255,0.35)' }}
          >
            {pad(i + 1)}
            <span className="h-px transition-all duration-500" style={{ width: i === index ? 32 : 0, background: C.accent }} />
          </button>
        ))}
      </div>

      <div className="relative z-[4] flex h-full items-end px-6 pb-12 md:px-24 md:pb-16 lg:px-32">
        <div key={index}>
          <h1
            className="overflow-hidden pb-2 text-[15vw] font-normal uppercase leading-[0.85] tracking-tighter md:text-[9vw]"
            style={{ color: 'transparent', WebkitTextStroke: '1.5px #fff' }}
          >
            <span className="hx-rise" style={{ animationDelay: '200ms' }}>{slide.title}</span>
          </h1>
          <a
            href={slide.link}
            className="hx-fade mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white no-underline"
            style={{ animationDelay: '450ms' }}
          >
            View Project <span style={{ color: C.accent }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
