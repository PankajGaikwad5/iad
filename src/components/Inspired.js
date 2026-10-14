'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export default function Inspired() {
  const easeCurve = [0.25, 0.1, 0.25, 1];

  return (
    <section className="w-full py-20 sm:py-24 md:py-32 lg:py-40 px-5 sm:px-8 md:px-14 lg:px-20 flex items-center justify-center overflow-hidden min-h-[85vh] bg-[#faf8f5] text-[#1c1917] select-none">
      <div className="max-w-[1400px] w-full relative">

        {/* Left Editorial Philosophy Text (PKD Top-Left Placement) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeCurve }}
          className="max-w-[240px] mb-8 md:mb-0 md:absolute md:top-0 md:left-0 z-10 mx-auto md:mx-0"
        >
          <p className="font-[family-name:League_Spartan] text-neutral-600 text-xs sm:text-[13px] md:text-sm leading-relaxed font-light">
            At Studio Ia.D, every project is conceived as a creation that transcends architecture—a space designed to{' '}
            <strong className="font-medium text-neutral-900">elevate everyday life</strong> through:
            <br />
            <br />
            luxury, exceptional craftsmanship, and thoughtful design.
          </p>
        </motion.div>

        {/* Big Editorial Architecture Typography */}
        <div className="w-full">

          {/* Line 1: INSPIRED + Dining Image (Centered on Mobile, Right-Aligned on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeCurve }}
            className="flex items-end justify-center md:justify-end text-4xl sm:text-6xl md:text-7xl lg:text-[8.5rem] xl:text-[9.25rem] leading-[0.88] tracking-tighter font-[family-name:Glacial_Indifference] font-normal uppercase"
          >
            <span className="transition-colors duration-500 hover:text-neutral-500 cursor-default">
              Inspired
            </span>

            {/* Architectural Dining Image Capsule */}
            <div className="group relative ml-2.5 sm:ml-3 md:ml-4 rounded-sm overflow-hidden flex-shrink-0 w-14 h-9 sm:w-28 sm:h-18 md:w-44 md:h-28 lg:w-60 lg:h-36 xl:w-64 xl:h-40 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85"
                alt="Luxury Dining Room"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-widest text-white font-medium drop-shadow-sm font-[family-name:League_Spartan]">
                  Spaces
                </span>
              </div>
            </div>
          </motion.div>

          {/* Line 2: DESIGN + Living Image + BY (Centered on All Breakpoints) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: easeCurve }}
            className="flex items-center justify-center text-4xl sm:text-6xl md:text-7xl lg:text-[8.5rem] xl:text-[9.25rem] leading-[0.88] tracking-tighter font-[family-name:Glacial_Indifference] font-normal uppercase mt-1 sm:mt-1.5 md:mt-2"
          >
            <span className="transition-colors duration-500 hover:text-neutral-500 cursor-default">
              Design
            </span>

            {/* Architectural Living Image Capsule */}
            <div className="group relative mx-2 sm:mx-2.5 md:mx-3 rounded-sm overflow-hidden flex-shrink-0 w-9 h-9 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85"
                alt="Luxury Living Room"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-widest text-white font-medium drop-shadow-sm font-[family-name:League_Spartan]">
                  Details
                </span>
              </div>
            </div>

            <span className="transition-colors duration-500 hover:text-neutral-500 cursor-default">
              By
            </span>
          </motion.div>

          {/* Line 3: STUDIO IA.D + Talk to Us CTA Button (Centered on All Breakpoints) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: easeCurve }}
            className="flex items-end justify-center text-4xl sm:text-6xl md:text-7xl lg:text-[8.5rem] xl:text-[9.25rem] leading-[0.88] tracking-tighter font-[family-name:Glacial_Indifference] font-normal uppercase mt-1 sm:mt-1.5 md:mt-2 gap-3 sm:gap-4 md:gap-6"
          >
            <div className="flex items-start">
              <span className="transition-colors duration-500 hover:text-neutral-500 cursor-default">
                Studio Ia.D
              </span>
            </div>

            {/* Interactive Luxury Pill Button */}
            <Link
              href="#contact"
              className="group relative inline-flex items-center gap-2 mb-1.5 sm:mb-2 md:mb-4 lg:mb-6 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-[14px] bg-[#26201b] text-[#f5efe6] rounded-[50px] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] font-[family-name:League_Spartan] overflow-hidden isolate transition-colors duration-500 hover:text-[#26201b] hover:border hover:border-[#26201b]/30 cursor-pointer shadow-sm hover:shadow-md"
            >
              <span className="relative z-10">Talk to us</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M1 11L11 1M11 1H3M11 1V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Liquid slide-up hover fill */}
              <span className="absolute inset-0 bg-[#f5efe6] -z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
