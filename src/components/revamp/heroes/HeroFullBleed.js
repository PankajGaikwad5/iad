"use client";
import { SLIDES, C, SLIDE_MS, src, pad, useCarousel, ProgressBars, Arrows, HeroStyles } from './shared';

// Option 1: full-screen colour images, crossfade + slow zoom, white type on a bottom gradient.
// `bloom` turns on option 2: each slide arrives in B&W and blooms into colour.
export default function HeroFullBleed({ bloom = false }) {
  const { index, last, go, next, prev } = useCarousel(SLIDES.length);
  const slide = SLIDES[index];

  return (
    <section className="relative h-screen w-full overflow-hidden" style={{ background: C.ink }}>
      <HeroStyles />

      {SLIDES.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.id}
            className="absolute inset-0"
            style={{
              opacity: active ? 1 : 0,
              zIndex: active ? 2 : i === last ? 1 : 0,
              transition: 'opacity 1.2s ease',
            }}
          >
            <img
              src={src(s.image)}
              alt={s.title}
              className={`h-full w-full object-cover ${active && bloom ? 'hx-bloom' : ''}`}
              style={{
                transform: active ? 'scale(1.08)' : 'scale(1)',
                transition: active ? `transform ${SLIDE_MS + 1500}ms linear` : 'transform 0s 1.2s',
              }}
            />
          </div>
        );
      })}

      {/* Legibility: dark from the bottom-left, image stays clean top-right */}
      <div className="pointer-events-none absolute inset-0 z-[3]" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.35) 40%, rgba(10,10,10,0) 70%)' }} />
      <div className="pointer-events-none absolute inset-0 z-[3]" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0) 55%)' }} />

      <div className="relative z-[4] flex h-full flex-col justify-end px-6 pb-10 md:px-14 md:pb-14 lg:px-20">
        <div key={index} className="max-w-5xl">
          <p className="hx-fade mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em]" style={{ color: C.accent }}>
            <span className="inline-block h-px w-8" style={{ background: C.accent }} />
            {slide.category}
          </p>
          <h1 className="overflow-hidden pb-2 text-5xl font-normal uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-[7.5rem]">
            <span className="hx-rise" style={{ animationDelay: '150ms' }}>{slide.title}</span>
          </h1>
          <div className="hx-fade mt-6 flex flex-wrap items-center gap-6" style={{ animationDelay: '400ms' }}>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">{slide.location}</span>
            <a
              href={slide.link}
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white no-underline transition-colors duration-300 hover:bg-white hover:text-black"
            >
              View Project
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H2M11 1v9" stroke="currentColor" strokeWidth="1.5" /></svg>
            </a>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between gap-6 border-t border-white/15 pt-6 md:mt-14">
          <div className="flex items-center gap-6">
            <span className="font-medium tabular-nums text-white">
              <span className="text-2xl">{pad(index + 1)}</span>
              <span className="text-sm text-white/50"> / {pad(SLIDES.length)}</span>
            </span>
            <ProgressBars count={SLIDES.length} index={index} go={go} color={C.accent} className="hidden sm:flex" />
          </div>
          <Arrows prev={prev} next={next} />
        </div>
      </div>
    </section>
  );
}
