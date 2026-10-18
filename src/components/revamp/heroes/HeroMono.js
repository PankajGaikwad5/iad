"use client";
import { SLIDES, C, MONO, MONO_BRIGHT, zoomStyle, src, pad, useCarousel, useWipe, ProgressBars, Arrows, HeroStyles } from './shared';

// Option 4: committed black & white. Real blacks, punchy contrast, orange as the only colour.
// `refined` puts the photo first: brighter B&W, slow zoom, lighter overlay, smaller title.
export default function HeroMono({ refined = false }) {
  const { index, last, go, next, prev } = useCarousel(SLIDES.length);
  const { refs, layerStyle } = useWipe(index, last, 'inset(100% 0% 0% 0%)');
  const slide = SLIDES[index];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <HeroStyles />

      {SLIDES.map((s, i) => (
        <div key={s.id} ref={(el) => (refs.current[i] = el)} className="absolute inset-0" style={layerStyle(i)}>
          <img
            src={src(s.image)}
            alt={s.title}
            className="h-full w-full object-cover"
            style={refined ? { filter: MONO_BRIGHT, ...zoomStyle(i === index) } : { filter: MONO }}
          />
        </div>
      ))}

      {refined ? (
        // Just enough shade behind the type; the rest of the photo stays untouched
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[38%]" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)' }} />
      ) : (
        <>
          {/* Vignette so whites stay crisp and type sits on true black */}
          <div className="pointer-events-none absolute inset-0 z-[3]" style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.75) 100%)' }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-2/3" style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0) 100%)' }} />
        </>
      )}

      <div className="relative z-[4] flex h-full flex-col justify-between px-6 pb-10 pt-24 md:px-14 md:pb-12 lg:px-20">
        <div className="flex items-start justify-end">
          <span className="tabular-nums text-sm text-white/60">
            <span style={{ color: C.accent }}>{pad(index + 1)}</span> / {pad(SLIDES.length)}
          </span>
        </div>

        <div>
          <div key={index}>
            <h1 className={`overflow-hidden pb-2 font-normal uppercase leading-[0.85] tracking-tighter ${refined ? 'text-[11vw] md:text-[5.5vw]' : 'text-[13vw] md:text-[9vw]'}`}>
              <span className="hx-rise" style={{ animationDelay: '200ms' }}>{slide.title}</span>
            </h1>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-white/20 pt-6">
            <div key={index} className="hx-fade" style={{ animationDelay: '450ms' }}>
              <a href={slide.link} className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white no-underline">
                <span className="border-b pb-1 transition-colors duration-300 group-hover:border-[#E8590C]" style={{ borderColor: 'rgba(255,255,255,0.4)' }}>View Project</span>
                <span style={{ color: C.accent }}>→</span>
              </a>
            </div>
            <div className="flex items-center gap-6">
              <ProgressBars count={SLIDES.length} index={index} go={go} color={C.accent} className="hidden sm:flex" />
              <Arrows prev={prev} next={next} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
