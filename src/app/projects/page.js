"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

// Text roll-up animation
const Roll = ({ children }) => (
  <span className="relative inline-block overflow-hidden py-[1px]">
    <span className={`block transition-transform duration-500 ${EASE} group-hover:-translate-y-full group-focus-visible:-translate-y-full`}>
      {children}
    </span>
    <span
      aria-hidden="true"
      className={`absolute inset-0 block translate-y-full py-[1px] transition-transform duration-500 ${EASE} group-hover:translate-y-0 group-focus-visible:translate-y-0`}
    >
      {children}
    </span>
  </span>
);

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Hospitality'];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter.toLowerCase() === 'all') return projects;
    return projects.filter((p) => {
      const target = activeFilter.toLowerCase();
      const inCategories = p.categories?.some((cat) => cat.toLowerCase() === target);
      const isCategory = p.category?.toLowerCase() === target;
      const inTypology = p.typology?.toLowerCase().includes(target);
      return inCategories || isCategory || inTypology;
    });
  }, [activeFilter]);

  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length };
    CATEGORIES.forEach((cat) => {
      if (cat === 'All') return;
      const target = cat.toLowerCase();
      counts[cat] = projects.filter((p) => {
        const inCategories = p.categories?.some((c) => c.toLowerCase() === target);
        const isCategory = p.category?.toLowerCase() === target;
        const inTypology = p.typology?.toLowerCase().includes(target);
        return inCategories || isCategory || inTypology;
      }).length;
    });
    return counts;
  }, []);

  return (
    <div className="bg-[#f7f7f7] text-[#222] font-sans antialiased overflow-x-clip selection:bg-black selection:text-white min-h-screen">
      {/* SVG Grain Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="5" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <Navbar previewImages={projects.slice(0, 3).map((p) => p.heroImage)} darkText={true} />

      <main id="top">
        {/* ---------------- Hero Section ---------------- */}
        <section className="relative pt-36 md:pt-48 pb-16 md:pb-24 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-black/10 bg-[#f7f7f7] text-[#222]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
              <div>
                <span className="block font-normal text-[11px] md:text-[12px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/60 mb-4">
                  Archive · 2022–2026
                </span>
                <h1 className="font-light text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-[-0.035em] uppercase font-[family-name:Glacial_Indifference] text-[#111]">
                  Projects
                </h1>
              </div>
              <p className="max-w-[420px] text-base md:text-lg leading-relaxed tracking-wide text-[#222]/80 font-light font-[family-name:League_Spartan]">
                An archive of built commissions spanning private villas, penthouses, commercial galleries, and contemplative forest retreats across India.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- Filter & Gallery Section ---------------- */}
        <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-16 md:py-24 max-w-[1400px] mx-auto">
          {/* Architectural Filter Bar */}
          <div className="mb-14 md:mb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-black/15 pb-px">
              {/* Category Navigation Tabs */}
              <div className="flex items-center gap-6 sm:gap-8 md:gap-10 overflow-x-auto no-scrollbar scroll-smooth">
                {CATEGORIES.map((cat, idx) => {
                  const isActive = activeFilter === cat;
                  const count = categoryCounts[cat] || 0;
                  const indexNumber = String(idx + 1).padStart(2, '0');

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveFilter(cat)}
                      className={`group relative pb-3.5 sm:pb-4 cursor-pointer text-left transition-colors duration-300 font-[family-name:League_Spartan] text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.22em] uppercase whitespace-nowrap focus-visible:outline-none ${
                        isActive
                          ? 'text-[#111] font-semibold'
                          : 'text-[#222]/40 hover:text-[#111]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`text-[10px] tracking-widest font-mono transition-opacity duration-300 ${
                          isActive ? 'text-[#111] opacity-70' : 'text-[#222]/30 group-hover:opacity-70'
                        }`}>
                          {indexNumber} /
                        </span>
                        <Roll>{cat}</Roll>
                        <span className={`text-[10px] font-mono tracking-tight transition-all duration-300 ${
                          isActive
                            ? 'text-[#111] opacity-100 font-bold'
                            : 'text-[#222]/40 group-hover:text-[#111] group-hover:opacity-80'
                        }`}>
                          [{String(count).padStart(2, '0')}]
                        </span>
                      </span>

                      {/* Architectural Sliding Underline */}
                      {isActive && (
                        <motion.div
                          layoutId="activeFilterUnderline"
                          className="absolute -bottom-px left-0 right-0 h-[2px] bg-[#111]"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Counter / Scope Indicator */}
              <div className="flex items-center gap-3 pb-3.5 sm:pb-4 text-[10px] sm:text-[11px] font-[family-name:League_Spartan] tracking-[0.22em] uppercase text-[#222]/50 whitespace-nowrap self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111]/50" />
                <span>
                  Showing {filteredProjects.length} of {projects.length} Works
                </span>
              </div>
            </div>
          </div>

          {/* Project Showcase 2x2 Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-10 lg:gap-x-12 xl:gap-x-14 gap-y-16 md:gap-y-20">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const indexNum = String(idx + 1).padStart(2, '0');
                const totalNum = String(filteredProjects.length).padStart(2, '0');

                return (
                  <motion.article
                    layout
                    key={project.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex flex-col h-full"
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    >
                      {/* Image Showcase Container */}
                      <div className="overflow-hidden bg-[#c9c9c9] relative aspect-[16/11] sm:aspect-[4/3] w-full border border-black/10">
                        <motion.img
                          src={project.heroImage}
                          alt={project.title}
                          className="w-full h-full object-cover contrast-105 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
                          style={{ filter: 'url(#grain)' }}
                        />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 text-[9px] font-[family-name:League_Spartan] tracking-[0.22em] uppercase">
                          {project.category}
                        </div>

                        {/* Index Overlay */}
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-[#111] px-2.5 py-1 text-[10px] font-[family-name:League_Spartan] tracking-widest uppercase border border-black/10">
                          {indexNum} / {totalNum}
                        </div>
                      </div>

                      {/* Project Info Block */}
                      <div className="pt-6 flex flex-col flex-grow justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/55 mb-2.5">
                            <span>{project.loc}</span>
                            <span>{project.year}</span>
                          </div>

                          <h2 className="font-[family-name:Glacial_Indifference] text-3xl sm:text-4xl lg:text-[2.6rem] font-light uppercase leading-[0.98] tracking-[-0.03em] text-[#111] mb-3 group-hover:translate-x-1.5 transition-transform duration-500">
                            {project.title}
                          </h2>

                          <p className="font-[family-name:League_Spartan] text-sm md:text-base font-light text-[#222]/75 leading-relaxed mb-6 line-clamp-2">
                            {project.tagline}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-4 mt-auto">
                          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-[family-name:League_Spartan] tracking-[0.16em] uppercase text-[#222]/65 truncate">
                            <span>{project.area}</span>
                            <span className="text-black/25">·</span>
                            <span className="truncate">{project.typology}</span>
                          </div>

                          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#111] group-hover:text-black shrink-0">
                            <span className="relative pb-0.5 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-black after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-500">
                              View Project
                            </span>
                            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ---------------- Editorial Philosophy Banner ---------------- */}
        <section className="bg-[#ebe8e3] border-t border-b border-black/10 px-6 sm:px-12 md:px-16 lg:px-24 py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-8">
              <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/60 mb-4">
                Design Philosophy
              </span>
              <blockquote className="font-[family-name:Glacial_Indifference] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.03em] uppercase leading-[1.05] text-[#111]">
                “Architecture must not impose upon its environment, but orchestrate light, air, and materials to elevate everyday existence.”
              </blockquote>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end lg:border-l lg:border-black/15 lg:pl-10">
              <span className="font-[family-name:Glacial_Indifference] text-2xl font-light uppercase tracking-tight text-[#111]">
                Ishan Ahluwalia
              </span>
              <span className="font-[family-name:League_Spartan] text-[11px] tracking-[0.2em] uppercase text-[#222]/60 mt-1">
                Founder &amp; Principal Architect
              </span>
              <p className="mt-4 text-xs md:text-sm font-[family-name:League_Spartan] text-[#222]/80 leading-relaxed font-light">
                Leading Studio Ia.D with an integrated focus on architectural envelope, interior bespoke detailing, and turnkey construction management.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
