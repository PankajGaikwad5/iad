"use client";
import { SLIDES, C, src, pad, useCarousel, useWipe, ProgressBars, HeroStyles } from './shared';

// Option 3: keeps the split layout, but on ink with colour images and a clickable project index
export default function HeroDarkSplit() {
  const { index, last, go } = useCarousel(SLIDES.length);
  const { refs, layerStyle } = useWipe(index, last);
  const slide = SLIDES[index];

  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden md:flex-row" style={{ background: C.ink, color: C.cream }}>
      <HeroStyles />

      <div className="relative z-10 flex w-full flex-col justify-between px-6 pb-8 pt-24 md:w-[42%] md:px-12 md:pb-12 lg:px-16">
        <div key={index}>
          <p className="hx-fade mb-5 text-[11px] font-medium uppercase tracking-[0.3em]" style={{ color: C.accent }}>
            Featured Project — {slide.id}
          </p>
          <h1 className="overflow-hidden pb-2 text-5xl font-normal uppercase leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <span className="hx-rise" style={{ animationDelay: '100ms' }}>{slide.title}</span>
          </h1>
          <p className="hx-fade mt-5 text-xs font-medium uppercase tracking-[0.2em]" style={{ color: 'rgba(255,248,240,0.6)', animationDelay: '350ms' }}>
            {slide.category} · {slide.location}
          </p>
          <a
            href={slide.link}
            className="hx-fade mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] no-underline transition-opacity duration-300 hover:opacity-85"
            style={{ background: C.accent, color: '#fff', animationDelay: '450ms' }}
          >
            View Project
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H2M11 1v9" stroke="currentColor" strokeWidth="1.5" /></svg>
          </a>
        </div>

        {/* Project index doubles as navigation */}
        <ol className="m-0 mt-10 hidden list-none flex-col p-0 md:flex">
          {SLIDES.map((s, i) => (
            <li key={s.id} className="border-t" style={{ borderColor: 'rgba(255,248,240,0.12)' }}>
              <button
                onClick={() => go(i)}
                className="flex w-full cursor-pointer items-center gap-4 border-none bg-transparent py-3 text-left text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300"
                style={{ color: i === index ? C.cream : 'rgba(255,248,240,0.35)' }}
              >
                <span className="tabular-nums" style={{ color: i === index ? C.accent : 'inherit' }}>{pad(i + 1)}</span>
                {s.title}
              </button>
            </li>
          ))}
        </ol>
        <ProgressBars count={SLIDES.length} index={index} go={go} color={C.accent} track="rgba(255,248,240,0.2)" className="mt-8 md:hidden" />
      </div>

      <div className="relative h-[45vh] w-full md:h-full md:w-[58%]">
        {SLIDES.map((s, i) => (
          <div key={s.id} ref={(el) => (refs.current[i] = el)} className="absolute inset-0" style={layerStyle(i)}>
            <img src={src(s.image)} alt={s.title} className="h-full w-full object-cover" />
          </div>
        ))}
        {/* Soft blend into the ink panel */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[3] hidden w-32 md:block" style={{ background: `linear-gradient(to right, ${C.ink}, transparent)` }} />
      </div>
    </section>
  );
}
