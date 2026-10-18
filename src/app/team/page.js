"use client";

import React from 'react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { teamMembers } from '@/data/team';

const SMOOTH = [0.16, 1, 0.3, 1];
const GUTTER = 'px-6 sm:px-12 md:px-16 lg:px-24';
const MONO = 'grayscale(1) contrast(1.12) brightness(1.04)';
const titleCase = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

// Fades up once when scrolled into view
const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 1.2, ease: SMOOTH, delay }}
  >
    {children}
  </motion.div>
);

// B&W print; a colour copy fades in on hover (opacity only, so it stays smooth)
const Print = ({ src, alt, className = '' }) => (
  <div className={`group/print relative overflow-hidden bg-[#e4e4e4] ${className}`}>
    <img src={src} alt={alt} className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/print:scale-[1.03]" style={{ filter: MONO }} />
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/print:scale-[1.03] group-hover/print:opacity-100"
    />
  </div>
);


export default function TeamPage() {

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f7f7] font-[family-name:League_Spartan] text-[#222] antialiased selection:bg-black selection:text-white">
      <Navbar previewImages={teamMembers.map((m) => m.fgImage)} darkText={true} />

      <main id="top">
        {/* ---------------- Intro ---------------- */}
        <section className={`${GUTTER} pb-16 pt-36 md:pb-24 md:pt-48`}>
          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
            <h1 className="overflow-hidden font-[family-name:Glacial_Indifference] text-[22vw] font-light uppercase leading-[0.82] tracking-[-0.045em] md:col-span-7 md:text-[13vw]">
              <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.4, ease: SMOOTH, delay: 0.2 }}>
                Team
              </motion.span>
            </h1>
            <Reveal className="md:col-span-5 md:pb-4" delay={0.4}>
              <p className="max-w-md text-lg font-light leading-relaxed text-[#222]/80 md:text-xl">
                Architects, interior designers and project leads working as one studio in Bhopal, from the first sketch to the last fitting on site.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Team grid ---------------- */}
        <section className={`${GUTTER} pb-24 md:pb-36`}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 border-t border-black/15 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {teamMembers.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.08}>
                <Print src={m.fgImage} alt={titleCase(m.name)} className="aspect-[3/4]" />
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="font-[family-name:Glacial_Indifference] text-2xl font-light uppercase leading-none tracking-[-0.02em]">
                    {m.name}
                  </h2>
                  <span className="text-xs tabular-nums text-[#222]/40">{m.number}</span>
                </div>
                <p className="mt-2 text-sm font-light text-[#222]/60">{m.title}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
