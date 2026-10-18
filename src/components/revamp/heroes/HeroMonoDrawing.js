"use client";
import { SLIDES, MONO, src, pad, useCarousel, useWipe, HeroStyles } from './shared';

const LINE = 'rgba(255,255,255,0.45)';

// Print crop mark: two hairlines continuing the frame's edges just outside a corner
function CropMark({ top, left }) {
  const gap = 'calc(100% + 6px)';
  return (
    <>
      <span className="pointer-events-none absolute h-px w-5" style={{ background: LINE, [top ? 'top' : 'bottom']: 0, [left ? 'right' : 'left']: gap }} />
      <span className="pointer-events-none absolute h-5 w-px" style={{ background: LINE, [left ? 'left' : 'right']: 0, [top ? 'bottom' : 'top']: gap }} />
    </>
  );
}

// 4H: framed print annotated like a drawing sheet, with crop marks, a dimension line and a title block
export default function HeroMonoDrawing() {
  const { index, last, go } = useCarousel(SLIDES.length);
  const { refs, layerStyle } = useWipe(index, last, 'inset(0% 0% 100% 0%)');
  const slide = SLIDES[index];

  return (
    <section className="relative flex h-screen w-full flex-col bg-black px-8 pb-8 pt-24 text-white md:px-20 md:pb-10 md:pt-28">
      <HeroStyles />
      {/* Dimension line across the top of the frame */}
      <div className="mb-4 flex items-center gap-3 text-[11px] tabular-nums text-white/60">
        <span className="h-3 w-px" style={{ background: LINE }} />
        <span className="h-px flex-1" style={{ background: LINE }} />
        <span>{pad(index + 1)} / {pad(SLIDES.length)}</span>
        <span className="h-px flex-1" style={{ background: LINE }} />
        <span className="h-3 w-px" style={{ background: LINE }} />
      </div>

      <div className="relative flex-1">
        <CropMark top left />
        <CropMark top left={false} />
        <CropMark top={false} left />
        <CropMark top={false} left={false} />

        <div className="absolute inset-0 overflow-hidden">
          {SLIDES.map((s, i) => (
            <div key={s.id} ref={(el) => (refs.current[i] = el)} className="absolute inset-0" style={layerStyle(i)}>
              <img src={src(s.image)} alt={s.title} className="h-full w-full object-cover" style={{ filter: MONO }} />
            </div>
          ))}
        </div>
      </div>

      {/* Title block, like the corner of a drawing sheet */}
      <div className="mt-8 grid grid-cols-[1fr_auto] border text-white" style={{ borderColor: LINE }}>
        <div className="border-r px-4 py-3" style={{ borderColor: LINE }}>
          <h1 key={index} className="overflow-hidden text-2xl font-normal uppercase leading-none tracking-tight md:text-4xl">
            <span className="hx-rise">{slide.title}</span>
          </h1>
        </div>
        <div className="flex">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Go to ${s.title}`}
              className="cursor-pointer border-0 border-l bg-transparent px-3 text-xs tabular-nums transition-colors first:border-l-0 md:px-4"
              style={{ borderColor: LINE, color: i === index ? '#000' : 'rgba(255,255,255,0.6)', background: i === index ? '#fff' : 'transparent' }}
            >
              {pad(i + 1)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
