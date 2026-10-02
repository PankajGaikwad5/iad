"use client";
import React from 'react';
import Loader from '../../components/Loader';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Marquee from '../../components/Marquee';
import AboutStudio from '../../components/AboutStudio';
import Founder from '../../components/Founder';
import Footer from '../../components/Footer';

export default function AltUltimatePage() {
  return (
    <main className="alt-ultimate" style={{ position: 'relative', width: '100%' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@300;400&display=swap');
        
        /* Thin, elegant typography capturing the exact PKD vibe */
        .alt-ultimate, .alt-ultimate p, .alt-ultimate span, .alt-ultimate a, .alt-ultimate button {
          font-family: 'Jost', sans-serif !important;
          font-weight: 300 !important;
        }
        
        .alt-ultimate h1, .alt-ultimate h2, .alt-ultimate h3, .alt-ultimate h4 {
          font-family: 'Cormorant Garamond', serif !important;
          font-weight: 400 !important;
        }

        /* Wide, luxurious tracking for uppercase elements */
        .alt-ultimate .tracking-widest {
          letter-spacing: 0.25em !important;
        }
        .alt-ultimate .tracking-\\[-0\\.4rem\\] {
          letter-spacing: -0.05rem !important; /* Neutralize overly tight tracking */
        }
        .alt-ultimate .tracking-tighter {
          letter-spacing: normal !important;
        }

        /* The Rich Taupe & Onyx Theme */
        .alt-ultimate {
          background-color: #C3B8AA !important;
          color: #1E1C1A !important;
        }
        
        /* Main background: Warm Taupe */
        .alt-ultimate .bg-white { background-color: #C3B8AA !important; }
        
        /* Dark sections: Deep Onyx */
        .alt-ultimate .bg-black, 
        .alt-ultimate .bg-\\[\\#1a1a1a\\] { background-color: #1E1C1A !important; }
        
        /* Hero Overlay: Deep Onyx Wash so the light text pops perfectly */
        .alt-ultimate .bg-black\\/40 {
          background-color: rgba(30, 28, 26, 0.6) !important;
        }
        
        /* Primary Text */
        .alt-ultimate .text-neutral-900, 
        .alt-ultimate .text-black { color: #1E1C1A !important; }
        
        /* Light Text on Dark (Hero, Footer) */
        .alt-ultimate .text-white { color: #E5DDD1 !important; } /* Soft Cream instead of harsh white */
        
        /* Muted Text */
        .alt-ultimate .text-neutral-800 { color: #3A3530 !important; }
        .alt-ultimate .text-neutral-700, 
        .alt-ultimate .text-gray-600 { color: #524B44 !important; }
        
        /* Accents: Muted Clay/Rust */
        .alt-ultimate .text-orange-500,
        .alt-ultimate .text-orange-600 { color: #8C4A32 !important; }
        
        /* Borders */
        .alt-ultimate .border-white { border-color: #C3B8AA !important; }
        .alt-ultimate .border-neutral-900, 
        .alt-ultimate .border-black { border-color: #1E1C1A !important; }
        .alt-ultimate .border-gray-100, 
        .alt-ultimate .border-gray-300 { border-color: #A39686 !important; }
        
        .alt-ultimate .bg-gray-300 { background-color: #A39686 !important; }
        
        /* Loader Curtains */
        .alt-ultimate .bg-\\[\\#fff\\] { background-color: #C3B8AA !important; }
        
        /* Founder Image - Soft Warm Tone */
        .alt-ultimate .grayscale {
          filter: grayscale(80%) sepia(20%) contrast(1.05) brightness(0.95) !important;
        }
      `}} />
      <Loader />
      <Navbar />
      <Hero />
      <Marquee />
      <AboutStudio />
      <Founder />
      <Footer />
    </main>
  );
}
