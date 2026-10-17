"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SERVICES = [
  {
    num: "01",
    title: "Architecture",
    tagline: "Site-responsive envelopes & monolithic form",
    desc: "From private villas and contemplative hillside sanctuaries to commercial spaces — we conceive structures that respond intimately to climate, natural illumination, and raw materiality.",
    tags: ["Private Villas", "Monolithic Concrete", "Climatic Orientation", "Structural Detailing"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1600",
    projectRef: "The Modern Villa · Chunabhatti",
  },
  {
    num: "02",
    title: "Interior Design",
    tagline: "Atmospheric spaces & bespoke materiality",
    desc: "Spatial compositions tailored to how clients experience everyday life. We design and detail bespoke joinery, tailored furniture, acoustic environments, and nuanced lighting scenarios.",
    tags: ["Spatial Planning", "Bespoke Millwork", "Acoustic Curation", "Atmospheric Illumination"],
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1600",
    projectRef: "House of Light · Arera Colony",
  },
  {
    num: "03",
    title: "Landscape Design",
    tagline: "Living outdoor courts & water transitions",
    desc: "Dissolving boundaries between structural enclosure and external ecology through contemplative water courts, shade pergolas, and meticulously curated endemic plant palettes.",
    tags: ["Reflecting Pools", "Internal Courtyards", "Botanical Selection", "Microclimate Control"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600",
    projectRef: "The Courtyard House · Shyamala Hills",
  },
  {
    num: "04",
    title: "Master Planning",
    tagline: "Macro-scale zoning & topography orchestration",
    desc: "Comprehensive site visioning for sprawling private estates, hospitality forest retreats, and multi-acre campuses, optimizing natural contours, circulation, and environmental vistas.",
    tags: ["Terrain Strategy", "Estate Master Plans", "Zoning & Circulation", "Phased Delivery"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    projectRef: "Nilaya Forest Retreat · Central India",
  },
  {
    num: "05",
    title: "Turnkey Design & Execution",
    tagline: "Single-source accountability from concept to keys",
    desc: "An integrated model bridging architectural drawings with site fabrication. In-house engineering, artisan craft procurement, and rigorous quality management through final handover.",
    tags: ["Unified Accountability", "Artisanal Fabrication", "Budget & Timeline Governance", "Handover"],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600",
    projectRef: "Kothi Residence · Bhopal",
  },
];

export default function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeService = SERVICES[activeIdx];

  return (
    <section
      id="services"
      className="relative px-6 sm:px-12 md:px-16 lg:px-24 py-24 md:py-36 bg-[#f7f7f7] text-[#222] border-t border-black/10"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24 pb-8 border-b border-black/10">
          <div>
            <span
              data-fade
              className="block font-normal text-[11px] md:text-[12px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-4"
            >
              Practice Scope · 05 Disciplines
            </span>
            <h2
              data-fade
              className="font-light text-3xl sm:text-4xl lg:text-6xl xl:text-8xl tracking-[-0.035em] uppercase font-[family-name:Glacial_Indifference] text-[#111]"
            >
              Services by Studio Ia.D
            </h2>
          </div>
          <p
            data-fade
            className="max-w-[440px] text-base md:text-lg leading-relaxed tracking-wide text-[#222]/80 font-light font-[family-name:League_Spartan]"
          >
            An integrated spatial continuum spanning monolithic building envelopes, bespoke interior joinery, living landscapes, and full turnkey site execution.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Visual Frame & Context (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden bg-[#c9c9c9] border border-black/10 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.num}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover contrast-105"
                  />
                  <div
                    className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
                    style={{ filter: 'url(#grain)' }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Discipline Pill & Reference Tag */}
              <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-[9px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-white">
                {activeService.num} / {activeService.title}
              </div>

              <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase text-[#111] border border-black/10">
                {activeService.projectRef}
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-4 pt-2">
              <span className="text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/50">
                Holistic Practice Philosophy
              </span>
              <p className="text-sm leading-relaxed text-[#222]/75 font-light font-[family-name:League_Spartan]">
                We intentionally dissolve the traditional boundaries between architect, interior designer, and general contractor. Every commission is shepherded by a singular, unified design hand from first sketch to final installation.
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 text-[12px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#111] group cursor-pointer"
                >
                  <span className="relative pb-0.5 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-black after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-500">
                    Discuss a Commission
                  </span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Discipline Rows */}
          <div className="lg:col-span-7 flex flex-col border-t border-black/15">
            {SERVICES.map((service, idx) => {
              const isSelected = activeIdx === idx;

              return (
                <div
                  key={service.num}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative cursor-pointer border-b border-black/15 transition-all duration-500 py-6 sm:py-8 px-4 sm:px-6 ${
                    isSelected ? 'bg-white/80' : 'hover:bg-black/[0.02]'
                  }`}
                >
                  {/* Top Bar: Index, Title, Arrow */}
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={`text-xs sm:text-sm font-mono tracking-widest transition-colors duration-300 ${
                          isSelected ? 'text-[#111] font-semibold' : 'text-[#222]/35 group-hover:text-[#111]'
                        }`}
                      >
                        {service.num}
                      </span>
                      <h3
                        className={`font-[family-name:Glacial_Indifference] text-2xl sm:text-3xl md:text-4xl uppercase font-light tracking-tight transition-transform duration-500 ${
                          isSelected
                            ? 'text-[#111] translate-x-1 sm:translate-x-2'
                            : 'text-[#222]/70 group-hover:text-[#111] group-hover:translate-x-1'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-xs font-[family-name:League_Spartan] tracking-widest uppercase transition-opacity duration-300 hidden sm:inline-block ${
                          isSelected ? 'opacity-80 text-[#111]' : 'opacity-0 group-hover:opacity-60'
                        }`}
                      >
                        View Scope
                      </span>
                      <span
                        className={`text-base transition-transform duration-500 ${
                          isSelected ? 'rotate-90 text-[#111]' : 'text-[#222]/40 group-hover:translate-x-1'
                        }`}
                      >
                        →
                      </span>
                    </div>
                  </div>

                  {/* Expandable Details Container */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isSelected
                        ? 'max-h-[300px] opacity-100 mt-4 sm:mt-5'
                        : 'max-h-0 sm:group-hover:max-h-[300px] opacity-0 sm:group-hover:opacity-100 sm:group-hover:mt-4'
                    }`}
                  >
                    <p className="text-[11px] sm:text-[12px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase text-[#111]/70 mb-2 font-medium">
                      {service.tagline}
                    </p>
                    <p className="font-[family-name:League_Spartan] text-sm md:text-base font-light text-[#222]/80 leading-relaxed mb-4 max-w-[580px]">
                      {service.desc}
                    </p>

                    {/* Scope Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {service.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9px] sm:text-[10px] font-[family-name:League_Spartan] tracking-[0.15em] uppercase px-2.5 py-1 bg-black/[0.04] text-[#222]/75 border border-black/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
