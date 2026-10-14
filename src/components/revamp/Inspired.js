import { FadeIn } from './Animations';
import Link from 'next/link';

export default function Inspired() {
  return (
    <section className="w-full py-24 md:py-36 px-5 md:px-14 lg:px-20 overflow-hidden" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Top row: large outline heading with inline images */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-end justify-start gap-x-4 md:gap-x-6">
            <h2 className="text-stroke text-5xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] leading-[0.85] tracking-tight m-0 font-normal">
              INSPIRED
            </h2>
            <div className="w-16 h-10 sm:w-24 sm:h-14 lg:w-40 lg:h-24 img-rounded mb-2 lg:mb-4 flex-shrink-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80"
                alt="Luxury dining room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 mt-0">
            <h2 className="text-stroke text-5xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] leading-[0.85] tracking-tight m-0 font-normal">
              DESIGN
            </h2>
            <div className="w-10 h-14 sm:w-16 sm:h-20 lg:w-24 lg:h-32 img-rounded flex-shrink-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80"
                alt="Luxury living room"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-stroke text-5xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] leading-[0.85] tracking-tight m-0 font-normal">
              BY
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-end gap-x-4 md:gap-x-6 mt-0">
            {/* This one is filled, not stroke */}
            <h2 className="text-5xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] leading-[0.85] tracking-tight m-0 font-normal" style={{ color: 'var(--ink)' }}>
              STUDIO IAD
            </h2>
          </div>
        </FadeIn>

        {/* Bottom: description + CTA */}
        <FadeIn delay={0.55}>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mt-12 md:mt-16 pt-10" style={{ borderTop: '1px solid rgba(26,26,26,0.06)' }}>
            <p className="max-w-sm text-sm leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.6 }}>
              At Studio IAD, every project is conceived as a creation that transcends architecture—a space designed to elevate everyday life through luxury, exceptional craftsmanship, and thoughtful design.
            </p>
            <Link href="#contact" className="btn-pill btn-pill-filled no-underline">
              Talk to us
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 11V1.5M11 11H1.5" stroke="currentColor" strokeWidth="1.5"/></svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
