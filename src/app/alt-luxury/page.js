"use client";
import React from 'react';
import Loader from '../../components/Loader';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Marquee from '../../components/Marquee';
import AboutStudio from '../../components/AboutStudio';
import Founder from '../../components/Founder';
import Footer from '../../components/Footer';

export default function AltLuxuryPage() {
  return (
    <main className="alt-luxury" style={{ position: 'relative', width: '100%' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600&display=swap');
        
        /* Apply Ultra-Modern Geometric Sans-Serif globally */
        .alt-luxury, .alt-luxury * {
          font-family: 'Outfit', sans-serif !important;
        }
        
        /* Adjust tracking for Outfit */
        .alt-luxury .tracking-\\[-0\\.4rem\\] {
          letter-spacing: -0.1rem !important;
        }
        .alt-luxury .tracking-tighter {
          letter-spacing: -0.05rem !important;
        }

        /* Cool, Architectural Slate Theme (Absolutely ZERO earth tones, ZERO PKD vibes) */
        .alt-luxury {
          background-color: #F8FAFC !important;
        }
        
        .alt-luxury .bg-white { background-color: #F8FAFC !important; }
        
        /* Dark elements to Deep Slate (Cool Blue-Grey, no blacks) */
        .alt-luxury .bg-black, 
        .alt-luxury .bg-\\[\\#1a1a1a\\] { background-color: #1E293B !important; }
        
        /* Primary Text */
        .alt-luxury .text-neutral-900, 
        .alt-luxury .text-black,
        .alt-luxury .text-gray-800 { color: #0F172A !important; }
        
        /* Light Text on Dark Backgrounds */
        .alt-luxury .text-white { color: #F8FAFC !important; }
        
        /* Muted Text */
        .alt-luxury .text-neutral-800 { color: #334155 !important; }
        .alt-luxury .text-neutral-700, 
        .alt-luxury .text-gray-600 { color: #64748B !important; }
        
        /* Accents become Sharp Cobalt Blue instead of orange */
        .alt-luxury .text-orange-500,
        .alt-luxury .text-orange-600 { color: #2563EB !important; }
        
        /* Borders */
        .alt-luxury .border-white { border-color: #F8FAFC !important; }
        .alt-luxury .border-neutral-900, 
        .alt-luxury .border-black { border-color: #0F172A !important; }
        
        .alt-luxury .border-gray-100, 
        .alt-luxury .border-gray-300 { border-color: #CBD5E1 !important; }
        
        .alt-luxury .bg-gray-300 { background-color: #CBD5E1 !important; }
        
        /* Loader Curtains */
        .alt-luxury .bg-\\[\\#fff\\] { background-color: #F8FAFC !important; }
        
        /* Founder Image - crisp cool architectural tone */
        .alt-luxury .grayscale {
          filter: grayscale(100%) contrast(1.15) brightness(1.05) !important;
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
