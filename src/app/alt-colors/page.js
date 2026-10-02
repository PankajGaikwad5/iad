"use client";
import React from 'react';
import Loader from '../../components/Loader';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Marquee from '../../components/Marquee';
import AboutStudio from '../../components/AboutStudio';
import Founder from '../../components/Founder';
import Footer from '../../components/Footer';

export default function AltColorsPage() {
  return (
    <main className="alt-colors" style={{ position: 'relative', width: '100%' }}>
      <style dangerouslySetInnerHTML={{__html: `
        /* Deep Emerald & Bone White Cinematic Theme */
        .alt-colors {
          background-color: #111A16 !important;
        }
        
        /* Main background inverted to Deep Pine */
        .alt-colors .bg-white { background-color: #111A16 !important; }
        
        /* Darker elements pushed to Almost Black Pine */
        .alt-colors .bg-black, 
        .alt-colors .bg-\\[\\#1a1a1a\\] { background-color: #090D0B !important; }
        
        /* Text colors inverted to warm Bone White */
        .alt-colors .text-neutral-900, 
        .alt-colors .text-black,
        .alt-colors .text-white,
        .alt-colors .text-gray-800 { color: #E8E4D9 !important; }
        
        /* Accent Text Colors */
        .alt-colors .text-neutral-800 { color: #C5C0B1 !important; }
        .alt-colors .text-neutral-700, 
        .alt-colors .text-gray-600 { color: #9C998D !important; }
        
        /* Orange accents shifted to rich Terracotta */
        .alt-colors .text-orange-500,
        .alt-colors .text-orange-600 { color: #E07A5F !important; }
        
        /* Borders */
        .alt-colors .border-white,
        .alt-colors .border-neutral-900, 
        .alt-colors .border-black { border-color: #E8E4D9 !important; }
        
        .alt-colors .border-gray-100, 
        .alt-colors .border-gray-300 { border-color: #2C3E34 !important; }
        
        .alt-colors .bg-gray-300 { background-color: #2C3E34 !important; }
        
        /* Loader Curtains */
        .alt-colors .bg-\\[\\#fff\\] { background-color: #111A16 !important; }
        
        /* Tint Grayscale Images to warm cinematic tone */
        .alt-colors .grayscale {
          filter: grayscale(100%) sepia(30%) hue-rotate(90deg) brightness(0.9) contrast(1.2) !important;
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
