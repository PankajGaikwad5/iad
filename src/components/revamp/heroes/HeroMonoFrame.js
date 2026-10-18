"use client";
import { SLIDES, C, MONO, MONO_BRIGHT, zoomStyle, src, pad, useCarousel, useWipe, Arrows, HeroStyles } from './shared';

// 4E: B&W image framed on a black mat like a print, title overlapping the frame's bottom edge
// `refined` puts the photo first: bigger frame, brighter B&W, slow zoom, title below instead of on top.
// The light-mat version lives in HeroFrameLight.
export default function HeroMonoFrame({ refined = false }) {
  const { index, last, go, next, prev } = useCarousel(SLIDES.length);
  const { refs, layerStyle } = useWipe(index, last, 'inset(100% 0% 0% 0%)');
  const slide = SLIDES[index];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <HeroStyles />

      <div className={refined ? 'absolute inset-x-3 bottom-[18vh] top-16 md:inset-x-8 md:bottom-[20vh] md:top-20' : 'absolute inset-x-4 bottom-[22vh] top-20 md:inset-x-14 md:bottom-[24vh] md:top-24'}>
        {SLIDES.map((s, i) => (
          <div key={s.id} ref={(el) => (refs.current[i] = el)} className="absolute inset-0 overflow-hidden" style={layerStyle(i)}>
            <img
              src={src(s.image)}
              alt={s.title}
              className="h-full w-full object-cover"
              style={refined ? { filter: MONO_BRIGHT, ...zoomStyle(i === index) } : { filter: MONO }}
            />
          </div>
        ))}
      </div>

      {/* Vertical counter on the right edge */}
      <div className="absolute right-4 top-1/2 z-[4] hidden -translate-y-1/2 flex-col items-center gap-3 md:right-5 md:flex">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            aria-label={`Go to ${s.title}`}
            className="cursor-pointer rounded-full border-none p-0 transition-all duration-500"
            style={{ width: 4, height: i === index ? 28 : 4, background: i === index ? C.accent : 'rgba(255,255,255,0.35)' }}
          />
        ))}
      </div>

      <div className={`absolute inset-x-0 bottom-0 z-[4] ${refined ? 'px-3 pb-6 md:px-8 md:pb-8' : 'px-6 pb-8 md:px-14 md:pb-10'}`}>
        <div key={index} className="-mb-1">
          <h1 className={`overflow-hidden font-normal uppercase leading-[0.85] tracking-tighter ${refined ? 'text-[9vw] md:text-[4.5vw]' : 'text-[13vw] md:text-[8.5vw]'}`}>
            <span className="hx-rise" style={{ animationDelay: '200ms' }}>{slide.title}</span>
          </h1>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="tabular-nums text-sm text-white/60">
            <span style={{ color: C.accent }}>{pad(index + 1)}</span> / {pad(SLIDES.length)}
          </span>
          <Arrows prev={prev} next={next} />
        </div>
      </div>
    </section>
  );
}
