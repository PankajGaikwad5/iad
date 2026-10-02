"use client";
import React from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import AboutStudio from '../components/AboutStudio';
import Founder from '../components/Founder';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main style={{ position: 'relative', width: '100%' }}>
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
