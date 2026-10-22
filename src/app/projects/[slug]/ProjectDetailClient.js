"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

export default function ProjectDetailClient({ project, nextProject, prevProject }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const thumbRefs = useRef([]);

  const allImages = project.images && project.images.length > 0 ? project.images : [project.heroImage];

  const hasMany = allImages.length > 12;
  const shouldLimit = hasMany && !isExpanded;

  // Distribute images with their original index like pkd_temp to preserve fullscreen lightbox reference
  const imagesWithIndex = useMemo(() => {
    return allImages.map((img, idx) => ({ img, idx }));
  }, [allImages]);

  const displayImages2 = shouldLimit ? imagesWithIndex.slice(0, 6) : imagesWithIndex;
  const displayImages3 = shouldLimit ? imagesWithIndex.slice(0, 6) : imagesWithIndex;
  const displayImages4 = shouldLimit ? imagesWithIndex.slice(0, 8) : imagesWithIndex;

  const cols2 = useMemo(() => [
    displayImages2.filter((_, idx) => idx % 2 === 0),
    displayImages2.filter((_, idx) => idx % 2 === 1)
  ], [displayImages2]);

  const cols3 = useMemo(() => [
    displayImages3.filter((_, idx) => idx % 3 === 0),
    displayImages3.filter((_, idx) => idx % 3 === 1),
    displayImages3.filter((_, idx) => idx % 3 === 2)
  ], [displayImages3]);

  const cols4 = useMemo(() => [
    displayImages4.filter((_, idx) => idx % 4 === 0),
    displayImages4.filter((_, idx) => idx % 4 === 1),
    displayImages4.filter((_, idx) => idx % 4 === 2),
    displayImages4.filter((_, idx) => idx % 4 === 3)
  ], [displayImages4]);

  // Alternating between rectangles (3/2, 4/3, 16/10) and squares (1/1)
  const aspectRatios = ['3/2', '4/3', '1/1', '16/10', '4/3', '1/1'];

  const renderCard = ({ img, idx }) => {
    const aspectRatio = aspectRatios[idx % aspectRatios.length];
    return (
      <div
        key={idx}
        onClick={() => openLightbox(idx)}
        style={{
          aspectRatio,
          flex: '1 1 auto',
        }}
        className="relative w-full overflow-hidden bg-[#c9c9c9] cursor-pointer border border-black/10 group"
      >
        <img
          src={img}
          alt={`${project.title} - View ${idx + 1}`}
          className="w-full h-full object-cover contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.03] transform-gpu"
          loading="lazy"
        />
        <div
          className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
          style={{ filter: 'url(#grain)' }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-500 flex items-center justify-center">
          <span className="text-[10px] font-[family-name:League_Spartan] tracking-[0.25em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase border border-white/40 px-3.5 py-1.5 bg-black/25 backdrop-blur-sm">
            View Full
          </span>
        </div>
      </div>
    );
  };

  const openLightbox = (idx) => {
    setActiveImageIndex(idx);
    setIsLightboxOpen(true);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') setIsLightboxOpen(false);
    };

    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen, allImages.length]);

  // Keep the active thumbnail in view when the strip overflows (phones)
  useEffect(() => {
    if (!isLightboxOpen) return;
    thumbRefs.current[activeImageIndex]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [isLightboxOpen, activeImageIndex]);

  // Horizontal swipe on touch screens
  const touchX = useRef(null);
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) nextImage();
    else prevImage();
  };

  return (
    <div className="bg-[#f7f7f7] text-[#222] font-sans antialiased overflow-x-clip selection:bg-black selection:text-white min-h-screen">
      {/* SVG Grain Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="5" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <Navbar previewImages={allImages.slice(0, 3)} darkText={true} />

      <main id="top">
        {/* ---------------- Hero Section ---------------- */}
        <section className="relative pt-36 md:pt-44 pb-12 md:pb-16 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#f7f7f7] text-[#222] border-b border-black/10">
          <div className="max-w-[1400px] mx-auto">
            {/* Top Back & Category Bar */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mb-10 pb-6 border-b border-black/10">
              <Link
                href="/projects"
                className="group inline-flex shrink-0 items-center gap-2 text-[11px] md:text-[12px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/70 hover:text-[#111] transition-colors"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                <span>All Projects</span>
              </Link>
              <div className="flex min-w-0 items-center gap-3 text-[10px] md:text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] md:tracking-[0.25em] uppercase text-[#222]/60">
                <span className="truncate">{project.category}</span>
                <span>·</span>
                <span>{project.loc}</span>
              </div>
            </div>

            {/* Monumental Headline */}
            <div className="mb-12">
              <h1 className="break-words font-[family-name:Glacial_Indifference] text-[2.5rem] min-[400px]:text-5xl sm:text-7xl lg:text-8xl xl:text-[7.5rem] 2xl:text-[9rem] font-light uppercase leading-[0.88] tracking-[-0.035em] text-[#111]">
                {project.title}
              </h1>
              <p className="mt-6 max-w-[700px] font-[family-name:League_Spartan] text-base md:text-lg text-[#222]/80 font-light leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Cinematic Hero Image */}
            <div
              onClick={() => openLightbox(0)}
              className="group relative w-full aspect-[16/9] md:aspect-[16/8] overflow-hidden bg-[#c9c9c9] cursor-pointer border border-black/10"
            >
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover contrast-105 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
                style={{ filter: 'url(#grain)' }}
              />
              <div className="absolute bottom-4 right-4 bg-white/85 backdrop-blur-sm px-4 py-2 text-[10px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#111] border border-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to expand (1 / {allImages.length})
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Profile Specs & Architectural Essay ---------------- */}
        <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-20 md:py-28 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sidebar Details Table */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div>
                <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-2">
                  Specification
                </span>
                <h2 className="font-[family-name:Glacial_Indifference] text-3xl md:text-4xl uppercase font-light tracking-tight text-[#111]">
                  Project Profile
                </h2>
              </div>

              <div className="flex flex-col border-t border-black/15 font-[family-name:League_Spartan]">
                <div className="flex justify-between items-baseline gap-6 py-4 border-b border-black/10">
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-[#222]/50">Project</span>
                  <span className="text-[12px] tracking-[0.1em] uppercase font-light text-right">{project.projectName}</span>
                </div>
                <div className="flex justify-between items-baseline gap-6 py-4 border-b border-black/10">
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-[#222]/50">Location</span>
                  <span className="text-[12px] tracking-[0.1em] uppercase font-light text-right">{project.loc}</span>
                </div>
                <div className="flex justify-between items-baseline gap-6 py-4 border-b border-black/10">
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-[#222]/50">Typology</span>
                  <span className="text-[12px] tracking-[0.1em] uppercase font-light text-right">{project.typology || project.category}</span>
                </div>
                <div className="flex justify-between items-baseline gap-6 py-4 border-b border-black/10">
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-[#222]/50">Scope</span>
                  <span className="text-[12px] tracking-[0.1em] uppercase font-light text-right">{project.scope}</span>
                </div>
                <div className="flex justify-between items-baseline gap-6 py-4 border-b border-black/10">
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-[#222]/50">Built Area</span>
                  <span className="text-[12px] tracking-[0.1em] uppercase font-light text-right">{project.area}</span>
                </div>
                <div className="flex justify-between items-baseline gap-6 py-4 border-b border-black/10">
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-[#222]/50">Year</span>
                  <span className="text-[12px] tracking-[0.1em] uppercase font-light text-right">{project.year}</span>
                </div>
                <div className="flex justify-between items-baseline gap-6 py-4 border-b border-black/10">
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-[#222]/50">Principal</span>
                  <span className="text-[12px] tracking-[0.1em] uppercase font-light text-right">{project.details?.principal || 'Ishan Ahluwalia'}</span>
                </div>
                <div className="flex justify-between items-baseline gap-6 py-4 border-b border-black/10">
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-[#222]/50">Execution</span>
                  <span className="text-[12px] tracking-[0.1em] uppercase font-light text-right">Studio Ia.D Turnkey</span>
                </div>
              </div>
            </div>

            {/* Editorial Essay Columns */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div>
                <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-2">
                  Spatial Narrative
                </span>
                <h3 className="font-[family-name:Glacial_Indifference] text-3xl md:text-4xl uppercase font-light tracking-tight text-[#111]">
                  Concept &amp; Materiality
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 md:text-justify font-[family-name:League_Spartan] text-[#222]/85 text-base md:text-[17px] font-light leading-relaxed">
                <div className="flex flex-col gap-6">
                  {project.description.slice(0, Math.ceil(project.description.length / 2)).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="flex flex-col gap-6">
                  {project.description.slice(Math.ceil(project.description.length / 2)).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Project Gallery / Mosaic ---------------- */}
        <section className="px-6 sm:px-12 md:px-16 lg:px-24 pb-20 md:pb-28 max-w-[1400px] mx-auto border-t border-black/10 pt-16">
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-2">
                Visual Archive
              </span>
              <h2 className="font-[family-name:Glacial_Indifference] text-4xl sm:text-5xl md:text-6xl uppercase font-light tracking-tight text-[#111]">
                Gallery &amp; Details
              </h2>
            </div>
            <span className="text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/60 hidden sm:block">
              {allImages.length} Photographs
            </span>
          </div>

          <div className={`relative ${shouldLimit ? 'overflow-hidden' : ''} transition-all duration-700 ease-in-out`}>
            {/* Mobile Layout (2 columns, aligned at top and bottom) */}
            <div className="grid grid-cols-2 gap-4 sm:hidden items-stretch">
              <div className="flex flex-col gap-4 h-full">
                {cols2[0].map(renderCard)}
              </div>
              <div className="flex flex-col gap-4 h-full">
                {cols2[1].map(renderCard)}
              </div>
            </div>

            {/* Tablet Layout (3 columns, aligned at top and bottom) */}
            <div className="hidden sm:grid lg:hidden grid-cols-3 gap-5 items-stretch">
              <div className="flex flex-col gap-5 h-full">
                {cols3[0].map(renderCard)}
              </div>
              <div className="flex flex-col gap-5 h-full">
                {cols3[1].map(renderCard)}
              </div>
              <div className="flex flex-col gap-5 h-full">
                {cols3[2].map(renderCard)}
              </div>
            </div>

            {/* Desktop Layout (4 columns, aligned at top and bottom) */}
            <div className="hidden lg:grid grid-cols-4 gap-6 items-stretch">
              <div className="flex flex-col gap-6 h-full">
                {cols4[0].map(renderCard)}
              </div>
              <div className="flex flex-col gap-6 h-full">
                {cols4[1].map(renderCard)}
              </div>
              <div className="flex flex-col gap-6 h-full">
                {cols4[2].map(renderCard)}
              </div>
              <div className="flex flex-col gap-6 h-full">
                {cols4[3].map(renderCard)}
              </div>
            </div>

            {/* Gradient Blur Overlay & Show More Button */}
            {shouldLimit && (
              <div className="absolute bottom-0 left-0 right-0 h-[350px] bg-gradient-to-t from-[#f7f7f7] via-[#f7f7f7]/95 via-[#f7f7f7]/60 to-transparent flex items-end justify-center pb-6 z-10 pointer-events-none">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="pointer-events-auto bg-transparent border-0 text-[#111] text-[10px] md:text-[11px] font-light uppercase tracking-[0.25em] border-b border-black/40 pb-1 hover:border-black transition-colors duration-300 cursor-pointer mb-2"
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ---------------- Next Project Transition Banner ---------------- */}
        {nextProject && (
          <section className="bg-[#ebe7e0] text-[#111] border-t border-black/10 px-6 sm:px-12 md:px-16 lg:px-24 py-20 md:py-28">
            <div className="max-w-[1400px] mx-auto">
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group block focus-visible:outline-none"
              >
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                  <div className="min-w-0">
                    <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-4">
                      Next Commission →
                    </span>
                    <h3 className="break-words font-[family-name:Glacial_Indifference] text-[2.5rem] min-[400px]:text-5xl sm:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light uppercase leading-[0.9] tracking-[-0.035em] text-[#111] group-hover:translate-x-3 transition-transform duration-500">
                      {nextProject.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/60">
                      <span>{nextProject.category}</span>
                      <span>·</span>
                      <span>{nextProject.loc}</span>
                    </div>
                  </div>

                  <div className="w-full sm:max-w-[560px] lg:w-[420px] aspect-[16/10] overflow-hidden bg-[#c9c9c9] border border-black/10 shrink-0">
                    <img
                      src={nextProject.heroImage}
                      alt={nextProject.title}
                      className="w-full h-full object-cover contrast-105 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* ---------------- Fullscreen Lightbox Modal ---------------- */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-between p-4 md:p-8 select-none"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 w-full text-white pt-[env(safe-area-inset-top)]">
              <span className="min-w-0 truncate text-[11px] md:text-xs font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-white/80">
                {project.title} <span className="text-white/40">— {activeImageIndex + 1} / {allImages.length}</span>
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="group -m-2 p-2 shrink-0 cursor-pointer flex items-center gap-2 text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-white hover:text-white/70 transition-colors"
                aria-label="Close fullscreen view"
              >
                <span>Close<span className="hidden md:inline"> [ESC]</span></span>
                <span className="text-xl leading-none">✕</span>
              </button>
            </div>

            {/* Centered Image Display */}
            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="relative flex-1 min-h-0 flex items-center justify-center w-full my-4 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={allImages[activeImageIndex]}
                  alt={`${project.title} - View ${activeImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain pointer-events-none"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="cursor-pointer absolute left-0 sm:left-2 md:left-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <span className="text-lg">←</span>
              </button>
              <button
                onClick={nextImage}
                className="cursor-pointer absolute right-0 sm:right-2 md:right-6 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                aria-label="Next image"
              >
                <span className="text-lg">→</span>
              </button>
            </div>

            {/* Thumbnail Bottom Strip */}
            <div className="w-full max-w-[800px] mx-auto overflow-hidden pb-[env(safe-area-inset-bottom)]">
              {/* w-max + mx-auto centres a short strip; max-w-full lets a long one scroll from its first thumb */}
              <div data-lenis-prevent className="flex gap-2 w-max max-w-full mx-auto overflow-x-auto px-1 py-2 no-scrollbar">
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    ref={(el) => (thumbRefs.current[i] = el)}
                    onClick={() => setActiveImageIndex(i)}
                    className={`cursor-pointer relative w-16 h-12 md:w-20 md:h-14 shrink-0 overflow-hidden border transition-all duration-300 ${
                      i === activeImageIndex
                        ? 'border-white opacity-100 scale-105'
                        : 'border-transparent opacity-40 hover:opacity-80'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
