"use client";
import React from 'react';
import Loader from '../../components/Loader';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Marquee from '../../components/Marquee';
import AboutStudio from '../../components/AboutStudio';
import Founder from '../../components/Founder';
import Footer from '../../components/Footer';

export default function AltFontPage() {
  return (
    <main className="alt-font" style={{ position: 'relative', width: '100%' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.cdnfonts.com/css/glacial-indifference-2');
        .alt-font, .alt-font * {
          font-family: 'Glacial Indifference', sans-serif !important;
        }
        /* Reset tracking specifically for this font */
        .alt-font .tracking-\\[-0\\.4rem\\] {
          letter-spacing: -0.1rem !important;
        }
        .alt-font .tracking-tighter {
          letter-spacing: -0.05rem !important;
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
