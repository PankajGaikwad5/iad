"use client";
import React from 'react';
import Loader from '../../components/Loader';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Marquee from '../../components/Marquee';
import AboutStudio from '../../components/AboutStudio';
import Founder from '../../components/Founder';
import Footer from '../../components/Footer';

export default function AltAwwwardsPage() {
  return (
    <main className="alt-awwwards" style={{ position: 'relative', width: '100%' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500&display=swap');
        
        /* Deeply Subtle Luxury Typography */
        .alt-awwwards, .alt-awwwards p, .alt-awwwards span, .alt-awwwards a {
          font-family: 'Jost', sans-serif !important;
        }
        
        .alt-awwwards h1, .alt-awwwards h2, .alt-awwwards h3, .alt-awwwards h4 {
          font-family: 'Marcellus', serif !important;
          font-weight: 400 !important;
        }
        
        /* Elegant, slightly wider tracking for luxury fonts */
        .alt-awwwards .tracking-\\[-0\\.4rem\\] {
          letter-spacing: 0.05rem !important;
        }
        .alt-awwwards .tracking-tighter {
          letter-spacing: 0.05rem !important;
        }

        /* Subtle Luxury Palette: Pearl, Gunmetal, and Champagne Bronze */
        .alt-awwwards {
          background-color: #F5F5F7 !important;
          color: #2D323A !important;
        }
        
        /* Main background: Pearl / Soft Platinum */
        .alt-awwwards .bg-white { background-color: #F5F5F7 !important; }
        
        /* Dark sections converted to Soft Silver/Platinum */
        .alt-awwwards .bg-black, 
        .alt-awwwards .bg-\\[\\#1a1a1a\\] { background-color: #EAEAEF !important; }
        
        /* Delicate Gunmetal Wash for Hero Overlay (Replaces the dark wash) */
        .alt-awwwards .bg-black\\/40 {
          background-color: rgba(45, 50, 58, 0.12) !important;
        }
        
        /* Primary Text: Rich Deep Gunmetal (NOT harsh black) */
        .alt-awwwards .text-neutral-900, 
        .alt-awwwards .text-black,
        .alt-awwwards .text-gray-800,
        .alt-awwwards .text-white { color: #2D323A !important; }
        
        /* Muted Text */
        .alt-awwwards .text-neutral-800 { color: #6B7280 !important; }
        .alt-awwwards .text-neutral-700, 
        .alt-awwwards .text-gray-600 { color: #8A919E !important; }
        
        /* Accent: Champagne Bronze (Luxurious but very subtle) */
        .alt-awwwards .text-orange-500,
        .alt-awwwards .text-orange-600 { color: #A39171 !important; }
        
        /* Subtle Silver Borders */
        .alt-awwwards .border-white,
        .alt-awwwards .border-neutral-900, 
        .alt-awwwards .border-black,
        .alt-awwwards .border-gray-100, 
        .alt-awwwards .border-gray-300 { border-color: #D1D1D6 !important; }
        
        .alt-awwwards .bg-gray-300 { background-color: #D1D1D6 !important; }
        
        /* Loader Curtains */
        .alt-awwwards .bg-\\[\\#fff\\] { background-color: #F5F5F7 !important; }
        
        /* Founder Image - Soft, warm, low contrast luxury film look */
        .alt-awwwards .grayscale {
          filter: grayscale(80%) sepia(10%) contrast(0.9) brightness(1.05) !important;
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
