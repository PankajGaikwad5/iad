"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { featuredPublications, awardsList } from '@/data/press';

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

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

export default function AwardsAndPressPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="bg-[#f7f7f7] text-[#222] font-sans antialiased overflow-x-clip selection:bg-black selection:text-white min-h-screen">
      {/* SVG Grain Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="5" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <Navbar previewImages={featuredPublications.slice(0, 3).map((p) => p.image)} darkText={true} />

      <main id="top">
        {/* ---------------- Hero Section ---------------- */}
        <section className="relative pt-36 md:pt-48 pb-16 md:pb-24 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-black/10 bg-[#f7f7f7] text-[#222]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
              <div>
                <span className="block font-normal text-[11px] md:text-[12px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/60 mb-4">
                  Recognition &amp; Publications
                </span>
                <h1 className="font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-[-0.035em] uppercase font-[family-name:Glacial_Indifference] text-[#111]">
                  Awards &amp; Press
                </h1>
              </div>
              <p className="max-w-[440px] text-base md:text-lg leading-relaxed tracking-wide text-[#222]/80 font-light font-[family-name:League_Spartan]">
                Studio Ia.D’s architecture and interior commissions have been documented across leading national and global design publications.
              </p>
            </div>

            {/* Publication Logomark Strip */}
            <div className="flex items-center flex-wrap gap-x-10 gap-y-6 pt-10 border-t border-black/10">
              <span className="text-[10px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50">
                Featured Across:
              </span>
              <div className="flex items-center flex-wrap gap-x-10 gap-y-4">
                <a
                  href="https://www.instagram.com/reel/DEHy8JHPTQU/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GoodHomes India feature"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img src="/logos/goodhomes-logo.svg" alt="GoodHomes India" className="h-6 sm:h-7 w-auto object-contain" />
                </a>
                <a
                  href="https://www.goodhomes.co.in/home-and-design-trends/dcode/dcode-presents-design-ikon-ishan-ahluwalia-studio-iad-9145.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Casamia D'code feature"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img src="/logos/dcode-logo.png" alt="Casamia D'Code" className="h-7 sm:h-8 w-auto object-contain" />
                </a>
                <a
                  href="https://www.re-thinkingthefuture.com/residential/9491-kothi-bhopal-by-studio-iad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rethinking The Future feature"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img src="/logos/rtf-logo.png" alt="Rethinking The Future" className="h-5 sm:h-6 w-auto object-contain" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Featured Press Articles Grid ---------------- */}
        <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-20 md:py-28 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-black/10">
            <div>
              <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-2">
                Selected Monographs
              </span>
              <h2 className="font-[family-name:Glacial_Indifference] text-4xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#111]">
                Editorial Features
              </h2>
            </div>
            <span className="text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/60">
              {featuredPublications.length} Published Articles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featuredPublications.map((article, idx) => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group flex flex-col justify-between bg-white border border-black/10 p-6 md:p-8 cursor-pointer hover:shadow-xl hover:border-black/30 transition-all duration-500"
              >
                <div>
                  {/* Article Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#c9c9c9] mb-6">
                    <img
                      src={article.image}
                      alt={article.headline}
                      className="w-full h-full object-cover contrast-105 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
                      style={{ filter: 'url(#grain)' }}
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-[9px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase">
                      {article.category}
                    </div>
                  </div>

                  {/* Publication & Date */}
                  <div className="flex items-center justify-between text-[11px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase text-[#222]/60 mb-3">
                    <span className="font-medium text-[#111]">{article.name}</span>
                    <span>{article.date}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-[family-name:Glacial_Indifference] text-2xl md:text-3xl font-light uppercase leading-[1.05] tracking-tight text-[#111] mb-4 group-hover:translate-x-1 transition-transform duration-300">
                    {article.headline}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-[family-name:League_Spartan] text-sm text-[#222]/80 leading-relaxed font-light mb-6">
                    {article.excerpt}
                  </p>
                </div>

                {/* Pull Quote Box */}
                <div className="border-t border-black/10 pt-4 mt-2">
                  <p className="font-[family-name:League_Spartan] text-xs italic text-[#222]/70 leading-normal mb-4">
                    {article.quote}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#111]">
                    <span className="relative pb-0.5 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-black after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-500">
                      Read Full Excerpt
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- Awards & Honors Archive ---------------- */}
        <section className="bg-[#ebe8e3] border-t border-b border-black/10 px-6 sm:px-12 md:px-16 lg:px-24 py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-black/15">
              <div>
                <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-2">
                  Distinctions
                </span>
                <h2 className="font-[family-name:Glacial_Indifference] text-4xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-[#111]">
                  Awards Archive
                </h2>
              </div>
              <span className="text-[11px] font-[family-name:League_Spartan] tracking-[0.2em] uppercase text-[#222]/60">
                2021 – 2024
              </span>
            </div>

            {/* Awards Table */}
            <div className="flex flex-col font-[family-name:League_Spartan]">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-3 text-[10px] tracking-[0.2em] uppercase text-[#222]/50 border-b border-black/15">
                <span className="col-span-1">Year</span>
                <span className="col-span-5">Award &amp; Honor</span>
                <span className="col-span-3">Conferring Organization</span>
                <span className="col-span-3 text-right">Project Honored</span>
              </div>

              {awardsList.map((award, i) => (
                <div
                  key={i}
                  className="group py-6 border-b border-black/10 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-baseline transition-colors duration-300 hover:bg-black/[0.02]"
                >
                  <div className="col-span-1 font-[family-name:Glacial_Indifference] text-xl md:text-2xl font-light text-[#222]">
                    {award.year}
                  </div>
                  <div className="col-span-5">
                    <span className="font-[family-name:Glacial_Indifference] text-2xl md:text-3xl font-light uppercase text-[#111] group-hover:translate-x-1 transition-transform inline-block">
                      {award.title}
                    </span>
                    <span className="block text-[10px] tracking-[0.2em] uppercase text-[#222]/50 mt-1">
                      {award.category} · {award.badge}
                    </span>
                  </div>
                  <div className="col-span-3 text-sm text-[#222]/80 font-light">
                    {award.body}
                  </div>
                  <div className="col-span-3 md:text-right text-sm font-medium uppercase tracking-wider text-[#111]">
                    {award.project}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Media & Press Kit Inquiries ---------------- */}
        <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-20 md:py-28 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-black/10 text-[#222] p-8 sm:p-12 md:p-16 shadow-sm">
            <div className="lg:col-span-8">
              <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-3">
                Editorial Inquiries
              </span>
              <h3 className="font-[family-name:Glacial_Indifference] text-4xl sm:text-5xl md:text-6xl font-light uppercase leading-[0.95] tracking-tight text-[#111] mb-6">
                Press Kit &amp; Interviews
              </h3>
              <p className="max-w-[560px] font-[family-name:League_Spartan] text-sm md:text-base font-light text-[#222]/80 leading-relaxed mb-6">
                For high-resolution photography requests, project monographs, monograph features, or interview scheduling with founder Ishan Ahluwalia, please contact our media desk.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-[12px] font-[family-name:League_Spartan] tracking-[0.18em] uppercase">
                <a
                  href="mailto:admin@studioiad.com?subject=Press%20Inquiry%20-%20Studio%20Ia.D"
                  className="underline underline-offset-4 text-[#111] hover:text-[#555] transition-colors"
                >
                  admin@studioiad.com
                </a>
                <span>·</span>
                <a
                  href="tel:+919828618643"
                  className="text-[#111] hover:text-[#555] transition-colors"
                >
                  +91 98286 18643
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="mailto:admin@studioiad.com?subject=Request%20High-Res%20Press%20Kit"
                className="group inline-flex items-center gap-3 text-[12px] tracking-[0.2em] uppercase py-[16px] px-[32px] border border-black text-black rounded-full relative overflow-hidden isolate cursor-pointer transition-colors duration-500 hover:text-white before:bg-black before:absolute before:inset-0 before:translate-y-[101%] hover:before:translate-y-0 before:transition-transform before:duration-[600ms] before:-z-10 before:ease-[cubic-bezier(.65,0,.15,1)]"
              >
                <Roll>Download Media Kit</Roll>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- Article Modal ---------------- */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#f7f7f7] text-[#222] max-w-[700px] w-full p-8 md:p-12 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 cursor-pointer font-[family-name:League_Spartan] text-xs uppercase tracking-widest text-[#222]/60 hover:text-black"
              >
                Close ✕
              </button>

              <span className="block text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] uppercase text-[#222]/50 mb-2">
                {selectedArticle.name} · {selectedArticle.date}
              </span>

              <h3 className="font-[family-name:Glacial_Indifference] text-3xl sm:text-4xl font-light uppercase leading-[1] text-[#111] mb-6">
                {selectedArticle.headline}
              </h3>

              <div className="relative aspect-[16/9] overflow-hidden bg-[#222] mb-6">
                <img
                  src={selectedArticle.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <blockquote className="border-l-2 border-black pl-4 my-6 font-[family-name:League_Spartan] text-base italic text-[#222]/80">
                {selectedArticle.quote}
              </blockquote>

              <p className="font-[family-name:League_Spartan] text-base font-light text-[#222]/90 leading-relaxed mb-4">
                {selectedArticle.excerpt}
              </p>

              <p className="font-[family-name:League_Spartan] text-sm font-light text-[#222]/70 leading-relaxed">
                Full coverage published in the {selectedArticle.issue}. Editorial rights reserved by {selectedArticle.name}. For reprint permissions or physical archival copies, contact the studio press desk.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
