"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { teamMembers, studioLeadership, studioPillars } from '@/data/team';

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

// Text roll-up animation matching the rest of the studio site
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

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'spotlight'
  const [activeSpotlight, setActiveSpotlight] = useState(0);
  const [spotlightDirection, setSpotlightDirection] = useState(1);
  const modalRef = useRef(null);

  const totalMembers = teamMembers.length;

  // Carousel controls for spotlight mode
  const nextSpotlight = useCallback(() => {
    setSpotlightDirection(1);
    setActiveSpotlight((prev) => (prev + 1) % totalMembers);
  }, [totalMembers]);

  const prevSpotlight = useCallback(() => {
    setSpotlightDirection(-1);
    setActiveSpotlight((prev) => (prev - 1 + totalMembers) % totalMembers);
  }, [totalMembers]);

  // Navigate within detail modal
  const nextModalMember = useCallback(() => {
    if (!selectedMember) return;
    const currentIndex = teamMembers.findIndex((m) => m.id === selectedMember.id);
    const nextIdx = (currentIndex + 1) % totalMembers;
    setSelectedMember(teamMembers[nextIdx]);
  }, [selectedMember, totalMembers]);

  const prevModalMember = useCallback(() => {
    if (!selectedMember) return;
    const currentIndex = teamMembers.findIndex((m) => m.id === selectedMember.id);
    const prevIdx = (currentIndex - 1 + totalMembers) % totalMembers;
    setSelectedMember(teamMembers[prevIdx]);
  }, [selectedMember, totalMembers]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      } else if (selectedMember) {
        if (e.key === 'ArrowRight') nextModalMember();
        if (e.key === 'ArrowLeft') prevModalMember();
      } else if (viewMode === 'spotlight') {
        if (e.key === 'ArrowRight') nextSpotlight();
        if (e.key === 'ArrowLeft') prevSpotlight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember, viewMode, nextModalMember, prevModalMember, nextSpotlight, prevSpotlight]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMember]);

  const currentSpotlightMember = teamMembers[activeSpotlight];

  return (
    <div className="bg-[#f7f7f7] text-[#222] font-sans antialiased overflow-x-clip selection:bg-black selection:text-white min-h-screen">
      {/* SVG Grain Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="5" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Navbar with team portraits for hover preview */}
      <Navbar
        previewImages={teamMembers.map((m) => m.fgImage)}
        darkText={true}
      />

      <main id="top">
        {/* ---------------- Hero Section ---------------- */}
        <section className="relative pt-36 md:pt-48 pb-16 md:pb-24 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-black/10 bg-[#f7f7f7] text-[#222]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
              <div>
                <span className="block font-normal text-[11px] md:text-[12px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/60 mb-4">
                  The Practice · Studio Ia.D
                </span>
                <h1 className="font-light text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-[-0.035em] uppercase font-[family-name:Glacial_Indifference] text-[#111]">
                  Our Team
                </h1>
              </div>
              <div className="max-w-[460px]">
                <p className="text-base md:text-lg leading-relaxed tracking-wide text-[#222]/80 font-light font-[family-name:League_Spartan] mb-4">
                  A multi-disciplinary collective of architects, interior architects, computational designers, and project directors shaping contextual spaces across Central India.
                </p>
                <div className="text-[12px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#111] flex items-center gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
                  <span>Four Core Disciplines · Bhopal Studio</span>
                </div>
              </div>
            </div>

            {/* Quick Studio Ethos Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-10 border-t border-black/10">
              <div className="flex items-center gap-4 text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/60">
                <span className="text-[#111] font-medium">Design Direction:</span>
                <span>Led by Ishan Ahluwalia (Founder &amp; Principal)</span>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-black/[0.04] p-1 rounded-full border border-black/10 self-start sm:self-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`cursor-pointer px-4 py-1.5 rounded-full text-[10px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-black text-white shadow-sm'
                      : 'text-[#222]/70 hover:text-black'
                  }`}
                  aria-pressed={viewMode === 'grid'}
                >
                  Architectural Grid
                </button>
                <button
                  onClick={() => setViewMode('spotlight')}
                  className={`cursor-pointer px-4 py-1.5 rounded-full text-[10px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase transition-all duration-300 ${
                    viewMode === 'spotlight'
                      ? 'bg-black text-white shadow-sm'
                      : 'text-[#222]/70 hover:text-black'
                  }`}
                  aria-pressed={viewMode === 'spotlight'}
                >
                  Studio Spotlight
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Team Members Section ---------------- */}
        <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-16 md:py-24 max-w-[1400px] mx-auto">
          {/* Header row with count */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-4 border-b border-black/10">
            <div>
              <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-1">
                Studio Roster
              </span>
              <h2 className="font-[family-name:Glacial_Indifference] text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight text-[#111]">
                Core Practitioners
              </h2>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/60">
              <span>{teamMembers.length} Members</span>
              <span>·</span>
              <span>Central India</span>
            </div>
          </div>

          {/* VIEW MODE 1: ARCHITECTURAL GRID */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {teamMembers.map((member, idx) => (
                <article
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="group relative flex flex-col justify-between bg-white border border-black/10 p-5 md:p-6 cursor-pointer hover:shadow-2xl hover:border-black/30 transition-all duration-500"
                >
                  <div>
                    {/* Portrait Image Frame */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#c9c9c9] mb-6">
                      <img
                        src={member.fgImage}
                        alt={member.name}
                        className="w-full h-full object-cover filter grayscale contrast-[108%] brightness-[96%] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grayscale-0 group-hover:scale-105"
                      />
                      {/* Grain overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
                        style={{ filter: 'url(#grain)' }}
                      />
                      {/* Architectural index badge */}
                      <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase">
                        ({member.number})
                      </div>

                      {/* Hover action banner */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-white">
                        <span className="text-[10px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase">
                          View Profile
                        </span>
                        <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </div>

                    {/* Member Meta */}
                    <div className="mb-2">
                      <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.22em] uppercase text-[#222]/60 font-medium mb-1">
                        {member.role}
                      </span>
                      <h3 className="font-[family-name:Glacial_Indifference] text-2xl md:text-3xl font-light uppercase tracking-tight text-[#111] group-hover:translate-x-0.5 transition-transform duration-300">
                        {member.name}
                      </h3>
                      <p className="text-[12px] font-[family-name:League_Spartan] tracking-[0.08em] text-[#222]/80 font-light mt-1">
                        {member.title}
                      </p>
                    </div>

                    {/* Excerpt Bio */}
                    <p className="text-xs font-[family-name:League_Spartan] text-[#222]/70 leading-relaxed font-light line-clamp-3 mt-4 mb-4">
                      {member.bio}
                    </p>
                  </div>

                  {/* Focus Disciplines & Explore CTA */}
                  <div className="border-t border-black/10 pt-4 mt-2">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.focusAreas.slice(0, 2).map((focus, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-[family-name:League_Spartan] tracking-[0.1em] uppercase bg-black/[0.04] text-[#222]/75 px-2 py-0.5 border border-black/5"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase text-[#111]">
                      <span className="relative pb-0.5 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-black after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-500">
                        Explore Practice
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* VIEW MODE 2: STUDIO SPOTLIGHT (Cinematic Carousel) */}
          {viewMode === 'spotlight' && (
            <div className="bg-white border border-black/10 p-6 sm:p-10 md:p-14 shadow-sm relative overflow-hidden">
              {/* Subtle background ambient texture */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none overflow-hidden">
                <img
                  key={currentSpotlightMember.id}
                  src={currentSpotlightMember.bgImage}
                  alt=""
                  className="w-full h-full object-cover filter blur-md"
                />
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
                {/* Left: Member Portrait Frame */}
                <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
                  <div className="relative w-full max-w-[380px] aspect-[3/4] overflow-hidden bg-[#c9c9c9] shadow-xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSpotlightMember.id}
                        initial={{ opacity: 0, x: spotlightDirection > 0 ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: spotlightDirection > 0 ? -50 : 50 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full relative"
                      >
                        <img
                          src={currentSpotlightMember.fgImage}
                          alt={currentSpotlightMember.name}
                          className="w-full h-full object-cover filter grayscale contrast-110 brightness-95"
                        />
                        <div
                          className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
                          style={{ filter: 'url(#grain)' }}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Member index badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase">
                      ({currentSpotlightMember.number} / 04)
                    </div>
                  </div>

                  {/* Navigation dots below image */}
                  <div className="flex items-center gap-3 mt-6">
                    {teamMembers.map((m, idx) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          setSpotlightDirection(idx > activeSpotlight ? 1 : -1);
                          setActiveSpotlight(idx);
                        }}
                        className="group py-2 cursor-pointer flex items-center"
                        aria-label={`View ${m.name}`}
                      >
                        <span
                          className={`block h-[2px] transition-all duration-300 ${
                            idx === activeSpotlight ? 'w-8 bg-black' : 'w-3 bg-black/25 group-hover:bg-black/60'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Detailed Dossier */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSpotlightMember.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      <div className="flex items-center gap-3 text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/60 mb-3">
                        <span>{currentSpotlightMember.role}</span>
                        <span>·</span>
                        <span>{currentSpotlightMember.discipline}</span>
                      </div>

                      <h3 className="font-[family-name:Glacial_Indifference] text-4xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#111] mb-3">
                        {currentSpotlightMember.name}
                      </h3>

                      <div className="text-sm font-[family-name:League_Spartan] tracking-[0.1em] text-[#222]/75 font-medium uppercase mb-6">
                        {currentSpotlightMember.title}
                      </div>

                      {/* Pull quote */}
                      <blockquote className="border-l-2 border-black/80 pl-5 my-6 italic font-[family-name:League_Spartan] text-base md:text-lg text-[#222]/85 font-light">
                        "{currentSpotlightMember.quote}"
                      </blockquote>

                      <p className="font-[family-name:League_Spartan] text-sm md:text-base text-[#222]/80 leading-relaxed font-light mb-8">
                        {currentSpotlightMember.bio}
                      </p>

                      {/* Focus areas */}
                      <div className="mb-8">
                        <span className="block text-[10px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/50 mb-3">
                          Architectural Focus &amp; Detailing:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {currentSpotlightMember.focusAreas.map((focus, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-[family-name:League_Spartan] tracking-[0.12em] uppercase bg-black/[0.04] text-[#222] px-3 py-1 border border-black/10"
                            >
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Projects */}
                      <div className="mb-8">
                        <span className="block text-[10px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/50 mb-2">
                          Credited In Built Commissions:
                        </span>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-[family-name:League_Spartan] text-[#222]/80">
                          {currentSpotlightMember.keyProjects.map((p, i) => (
                            <span key={i} className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-black/40"></span>
                              <span>{p}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-black/10">
                        <button
                          onClick={() => setSelectedMember(currentSpotlightMember)}
                          className="group inline-flex items-center gap-3 text-[12px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase py-3 px-6 border border-black rounded-full relative overflow-hidden isolate cursor-pointer transition-colors duration-500 hover:text-white before:bg-black before:absolute before:inset-0 before:translate-y-[101%] hover:before:translate-y-0 before:transition-transform before:duration-[500ms] before:-z-10 before:ease-[cubic-bezier(.65,0,.15,1)]"
                        >
                          <Roll>Open Full Dossier</Roll>
                        </button>
                        <a
                          href={`mailto:${currentSpotlightMember.email}?subject=Project%20Inquiry%20via%20Studio%20Ia.D`}
                          className="text-[12px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase text-[#222]/70 hover:text-black underline underline-offset-4 transition-colors"
                        >
                          Direct Contact
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Previous / Next Controls */}
                  <div className="flex items-center justify-between border-t border-black/10 pt-6 mt-8">
                    <div className="text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/50">
                      Member {activeSpotlight + 1} of {totalMembers}
                    </div>
                    <div className="flex items-center gap-6">
                      <button
                        onClick={prevSpotlight}
                        className="cursor-pointer text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/70 hover:text-black transition-colors flex items-center gap-2"
                      >
                        <span>←</span>
                        <span>Previous</span>
                      </button>
                      <button
                        onClick={nextSpotlight}
                        className="cursor-pointer text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/70 hover:text-black transition-colors flex items-center gap-2"
                      >
                        <span>Next</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ---------------- Studio Ethos & Leadership Anchor ---------------- */}
        <section className="bg-[#ebe8e3] border-t border-b border-black/10 px-6 sm:px-12 md:px-16 lg:px-24 py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Founder Note */}
              <div className="lg:col-span-5">
                <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-3">
                  Studio Direction
                </span>
                <h2 className="font-[family-name:Glacial_Indifference] text-4xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#111] mb-6">
                  One Unified Practice
                </h2>
                <p className="font-[family-name:League_Spartan] text-base md:text-lg leading-relaxed text-[#222]/80 font-light mb-6">
                  {studioLeadership.quote}
                </p>
                <div className="border-t border-black/15 pt-4">
                  <div className="font-[family-name:Glacial_Indifference] text-2xl font-light uppercase text-[#111]">
                    {studioLeadership.founder}
                  </div>
                  <div className="text-[12px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase text-[#222]/60 mt-0.5">
                    {studioLeadership.role} · Est. {studioLeadership.foundedYear}
                  </div>
                </div>
                <div className="mt-8">
                  <Link
                    href="/#founder"
                    className="inline-flex items-center gap-2 text-[12px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase text-[#111] hover:underline underline-offset-4"
                  >
                    <span>Read Founder Profile</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Three Studio Pillars */}
              <div className="lg:col-span-7 flex flex-col divide-y divide-black/10">
                {studioPillars.map((pillar) => (
                  <div key={pillar.number} className="py-6 first:pt-0 last:pb-0">
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="font-[family-name:Glacial_Indifference] text-xl font-light text-[#222]/50">
                        {pillar.number}
                      </span>
                      <h3 className="font-[family-name:Glacial_Indifference] text-2xl sm:text-3xl font-light uppercase tracking-tight text-[#111]">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="font-[family-name:League_Spartan] text-sm md:text-base text-[#222]/75 leading-relaxed font-light pl-9">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Careers / Join the Collective ---------------- */}
        <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-20 md:py-28 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-black/10 text-[#222] p-8 sm:p-12 md:p-16 shadow-sm">
            <div className="lg:col-span-8">
              <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-3">
                Join the Collective
              </span>
              <h3 className="font-[family-name:Glacial_Indifference] text-4xl sm:text-5xl md:text-6xl font-light uppercase leading-[0.95] tracking-tight text-[#111] mb-6">
                Work With Studio Ia.D
              </h3>
              <p className="max-w-[580px] font-[family-name:League_Spartan] text-sm md:text-base font-light text-[#222]/80 leading-relaxed mb-6">
                We are regularly seeking talented architects, computational draftsmen, and interior detailers committed to contextual craft, quiet minimalism, and rigorous execution.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-[12px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase">
                <a
                  href="mailto:careers@studioiad.com?subject=Studio%20Ia.D%20Application%20-%20Portfolio%20Submission"
                  className="underline underline-offset-4 text-[#111] hover:text-[#555] transition-colors"
                >
                  careers@studioiad.com
                </a>
                <span>·</span>
                <span className="text-[#222]/60">Chunabhatti, Bhopal</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="mailto:careers@studioiad.com?subject=Portfolio%20Submission%20-%20Studio%20Ia.D"
                className="group inline-flex items-center gap-3 text-[13px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase py-[15px] px-[28px] border border-black rounded-full relative overflow-hidden isolate cursor-pointer transition-colors duration-500 hover:text-white before:bg-black before:absolute before:inset-0 before:translate-y-[101%] hover:before:translate-y-0 before:transition-transform before:duration-[600ms] before:-z-10 before:ease-[cubic-bezier(.65,0,.15,1)]"
              >
                <Roll>Submit Portfolio</Roll>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- Detail Modal / Slide-Over ---------------- */}
      <AnimatePresence>
        {selectedMember && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white border border-black/10 overflow-y-auto no-scrollbar shadow-2xl flex flex-col md:grid md:grid-cols-12"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 z-20 group -m-2 p-2 flex items-center gap-2 cursor-pointer bg-white/90 backdrop-blur-sm rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#111] hover:bg-black hover:text-white transition-all duration-300"
              >
                <span>Close</span>
                <span className="text-base leading-none">✕</span>
              </button>

              {/* Left Column: Portrait */}
              <div className="md:col-span-5 relative bg-[#c9c9c9] min-h-[340px] md:min-h-full">
                <img
                  src={selectedMember.fgImage}
                  alt={selectedMember.name}
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-105 brightness-95"
                />
                <div
                  className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
                  style={{ filter: 'url(#grain)' }}
                />
                <div className="absolute top-5 left-5 bg-black/80 text-white px-3 py-1 text-[10px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase">
                  ({selectedMember.number} / 04)
                </div>
                <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm p-3 border border-black/10 text-[10px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase text-[#111]">
                  <span>{selectedMember.location}</span>
                </div>
              </div>

              {/* Right Column: Bio & Info */}
              <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-[family-name:League_Spartan] tracking-[0.22em] uppercase text-[#222]/60 mb-1">
                    {selectedMember.role} · {selectedMember.discipline}
                  </div>
                  <h3
                    id="member-modal-title"
                    className="font-[family-name:Glacial_Indifference] text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight text-[#111] mb-2"
                  >
                    {selectedMember.name}
                  </h3>
                  <div className="text-sm font-[family-name:League_Spartan] tracking-[0.08em] uppercase text-[#222]/70 font-medium mb-6">
                    {selectedMember.title}
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-2 border-black pl-4 my-4 italic font-[family-name:League_Spartan] text-sm text-[#222]/85 font-light">
                    "{selectedMember.quote}"
                  </blockquote>

                  {/* Full Bio */}
                  <p className="font-[family-name:League_Spartan] text-sm text-[#222]/80 leading-relaxed font-light mb-6">
                    {selectedMember.bio}
                  </p>

                  {/* Focus Areas */}
                  <div className="mb-6">
                    <span className="block text-[10px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/50 mb-2">
                      Disciplines &amp; Areas of Practice
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMember.focusAreas.map((area, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-[family-name:League_Spartan] tracking-[0.1em] uppercase bg-black/[0.04] text-[#222] px-2.5 py-1 border border-black/10"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Projects */}
                  <div className="mb-8">
                    <span className="block text-[10px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/50 mb-2">
                      Representative Commissions
                    </span>
                    <ul className="list-disc list-inside text-xs font-[family-name:League_Spartan] text-[#222]/80 space-y-1">
                      {selectedMember.keyProjects.map((proj, i) => (
                        <li key={i}>{proj}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Navigation & Direct Email */}
                <div className="border-t border-black/10 pt-5 mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={prevModalMember}
                      className="cursor-pointer text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/60 hover:text-black transition-colors"
                    >
                      ← Prev
                    </button>
                    <span className="text-[11px] text-[#222]/40">/</span>
                    <button
                      onClick={nextModalMember}
                      className="cursor-pointer text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/60 hover:text-black transition-colors"
                    >
                      Next →
                    </button>
                  </div>

                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="inline-flex items-center gap-2 text-[11px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase text-black font-medium hover:underline underline-offset-4"
                  >
                    <span>Contact {selectedMember.name.split(' ')[0]}</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
