"use client";
import { SLIDES, C, MONO, src, pad, useCarousel, useWipe, ProgressBars, HeroStyles } from './shared';

// 4B: B&W full-bleed, slides wipe in from the right, giant centred title in difference blend
export default function HeroMonoBlend() {
  const { index, last, go } = useCarousel(SLIDES.length);
  const { refs, layerStyle } = useWipe(index, last);
  const slide = SLIDES[index];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <HeroStyles />

      {SLIDES.map((s, i) => (
        <div key={s.id} ref={(el) => (refs.current[i] = el)} className="absolute inset-0" style={layerStyle(i)}>
          <img src={src(s.image)} alt={s.title} className="h-full w-full object-cover" style={{ filter: MONO }} />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center px-4" style={{ mixBlendMode: 'difference' }}>
        <h1 key={index} className="overflow-hidden text-center text-[14vw] font-normal uppercase leading-[0.85] tracking-tighter text-white md:text-[10vw]">
          <span className="hx-rise" style={{ animationDelay: '250ms' }}>{slide.title}</span>
        </h1>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[4] flex items-center justify-between px-6 pb-8 md:px-14 md:pb-10">
        <span className="tabular-nums text-sm text-white/70">
          <span style={{ color: C.accent }}>{pad(index + 1)}</span> / {pad(SLIDES.length)}
        </span>
        <ProgressBars count={SLIDES.length} index={index} go={go} color={C.accent} />
      </div>
    </section>
  );
}
