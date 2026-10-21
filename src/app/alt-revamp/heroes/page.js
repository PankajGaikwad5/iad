"use client";
import { useLenis } from 'lenis/react';
import CurrentHero from '@/components/revamp/Hero';
import HeroFullBleed from '@/components/revamp/heroes/HeroFullBleed';
import HeroColorBloom from '@/components/revamp/heroes/HeroColorBloom';
import HeroDarkSplit from '@/components/revamp/heroes/HeroDarkSplit';
import HeroMono from '@/components/revamp/heroes/HeroMono';
import HeroMonoBlend from '@/components/revamp/heroes/HeroMonoBlend';
import HeroMonoOutline from '@/components/revamp/heroes/HeroMonoOutline';
import HeroMonoFilmstrip from '@/components/revamp/heroes/HeroMonoFilmstrip';
import HeroMonoFrame from '@/components/revamp/heroes/HeroMonoFrame';
import HeroFrameLight from '@/components/revamp/heroes/HeroFrameLight';
import HeroMonoAperture from '@/components/revamp/heroes/HeroMonoAperture';
import HeroMonoDiptych from '@/components/revamp/heroes/HeroMonoDiptych';
import HeroMonoDrawing from '@/components/revamp/heroes/HeroMonoDrawing';
import HeroMonoStack from '@/components/revamp/heroes/HeroMonoStack';

const OPTIONS = [
  { id: 'current', label: 'Current', name: 'Current — cream split, B&W', Hero: CurrentHero },
  { id: 'opt-1', label: '1', name: 'Option 1 — Full-bleed colour', Hero: HeroFullBleed },
  { id: 'opt-2', label: '2', name: 'Option 2 — B&W blooms into colour', Hero: HeroColorBloom },
  { id: 'opt-3', label: '3', name: 'Option 3 — Dark split + project index', Hero: HeroDarkSplit },
  { id: 'opt-4', label: '4', name: 'Option 4 — Committed black & white', Hero: HeroMono },
  { id: 'opt-4r', label: '4+', name: '4 Refined — photo first', Hero: () => <HeroMono refined /> },
  { id: 'opt-4b', label: '4B', name: '4B — B&W, blended centre title', Hero: HeroMonoBlend },
  { id: 'opt-4c', label: '4C', name: '4C — B&W, outlined title + number rail', Hero: HeroMonoOutline },
  { id: 'opt-4d', label: '4D', name: '4D — B&W, filmstrip thumbnails', Hero: HeroMonoFilmstrip },
  { id: 'opt-4e', label: '4E', name: '4E — B&W, framed print', Hero: HeroMonoFrame },
  { id: 'opt-4er', label: '4E+', name: '4E Refined — photo first', Hero: () => <HeroMonoFrame refined /> },
  { id: 'opt-4el', label: '4E Light', name: '4E Light — on the site’s light mat', Hero: () => <HeroFrameLight pinnedFrame /> },
  { id: 'opt-4f', label: '4F', name: '4F — Shutter / aperture', Hero: HeroMonoAperture },
  { id: 'opt-4g', label: '4G', name: '4G — Diptych, next print waiting', Hero: HeroMonoDiptych },
  { id: 'opt-4h', label: '4H', name: '4H — Drawing sheet', Hero: HeroMonoDrawing },
  { id: 'opt-4i', label: '4I', name: '4I — Stack of prints', Hero: HeroMonoStack },
];

// The current revamp hero reads these tokens from revamp-globals.css, which this route doesn't load
const REVAMP_TOKENS = {
  '--cream': '#FFF8F0',
  '--ink': '#1a1a1a',
  '--ink-muted': '#888',
  '--accent': '#E8590C',
  '--radius': '16px',
};

export default function HeroOptionsPage() {
  const lenis = useLenis();

  const jump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ ...REVAMP_TOKENS, background: '#000' }}>
      {OPTIONS.map(({ id, name, Hero }) => (
        <div key={id} id={id} className="relative">
          <span className="pointer-events-none absolute left-4 top-4 z-50 rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-black shadow-lg md:left-6 md:top-6">
            {name}
          </span>
          <Hero />
        </div>
      ))}

      <nav className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/95 p-1.5 shadow-2xl backdrop-blur">
        {OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => jump(id)}
            className="cursor-pointer rounded-full border-none bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-black hover:text-white"
          >
            {label}
          </button>
        ))}
      </nav>
    </main>
  );
}
