'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TEAM_MEMBERS = [
  {
    name: 'LUIS PAREDES',
    role: 'Developer',
    fgImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'SOFIA MARTINEZ',
    role: 'Architect',
    fgImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'ALEJANDRO RUIZ',
    role: 'Lead Designer',
    fgImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'ISABELLA CHEN',
    role: 'Partner',
    fgImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  },
];

const imgVariants = {
  enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0, scale: 0.92 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir < 0 ? 120 : -120, opacity: 0, scale: 0.92 }),
};

export default function TeamCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const total = TEAM_MEMBERS.length;
  const timer = useRef(null);

  const startAuto = () => { clearInterval(timer.current); timer.current = setInterval(() => { setDirection(1); setIndex(p => (p + 1) % total); }, 4000); };
  const stopAuto = () => clearInterval(timer.current);

  useEffect(() => { if (!hovered) startAuto(); else stopAuto(); return stopAuto; }, [index, hovered]);

  const go = (idx) => { if (idx === index) return; setDirection(idx > index ? 1 : -1); setIndex(idx); };
  const next = () => { setDirection(1); setIndex(p => (p + 1) % total); };
  const prev = () => { setDirection(-1); setIndex(p => (p - 1 + total) % total); };

  const m = TEAM_MEMBERS[index];

  return (
    <section
      className="w-full py-24 md:py-36 px-6 md:px-12 lg:px-16 overflow-hidden"
      style={{ backgroundColor: 'var(--cream-dark)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header row */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium block mb-3" style={{ color: 'var(--accent)' }}>Our People</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[0.95] tracking-tight m-0" style={{ color: 'var(--ink)' }}>
              Meet the team.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={prev} className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer bg-transparent transition-all duration-300 hover:bg-[var(--ink)] hover:text-[var(--cream)] hover:border-[var(--ink)]" style={{ borderColor: 'rgba(26,26,26,0.15)', color: 'var(--ink)' }} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer bg-transparent transition-all duration-300 hover:bg-[var(--ink)] hover:text-[var(--cream)] hover:border-[var(--ink)]" style={{ borderColor: 'rgba(26,26,26,0.15)', color: 'var(--ink)' }} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Team grid — all members visible, active one highlighted */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {TEAM_MEMBERS.map((member, i) => {
            const isActive = i === index;
            return (
              <button
                key={i}
                onClick={() => go(i)}
                className="text-left cursor-pointer bg-transparent border-none p-0 group"
              >
                {/* Image */}
                <div className="w-full aspect-[3/4] img-rounded overflow-hidden mb-4 relative">
                  <img
                    src={member.fgImage}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700"
                    style={{
                      filter: isActive ? 'grayscale(0%) brightness(100%)' : 'grayscale(100%) brightness(90%)',
                      transform: isActive ? 'scale(1)' : 'scale(1.02)',
                    }}
                  />
                  {/* Active indicator bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-500"
                    style={{
                      backgroundColor: 'var(--accent)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                    }}
                  />
                </div>
                {/* Name & role */}
                <h3 className="text-sm md:text-base font-medium tracking-[0.03em] uppercase mb-0.5 transition-colors duration-300" style={{ color: isActive ? 'var(--ink)' : 'var(--ink-muted)' }}>
                  {member.name}
                </h3>
                <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'var(--ink-muted)' }}>
                  {member.role}
                </p>
              </button>
            );
          })}
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden justify-center gap-3 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer bg-transparent" style={{ borderColor: 'rgba(26,26,26,0.15)', color: 'var(--ink)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer bg-transparent" style={{ borderColor: 'rgba(26,26,26,0.15)', color: 'var(--ink)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
