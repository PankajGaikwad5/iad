"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

const slides = [
  {
    id: '01',
    category: 'SELECTED WORK',
    title: 'THE MODERN VILLA',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: '02',
    category: 'SELECTED WORK',
    title: 'HOUSE OF LIGHT',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: '03',
    category: 'SELECTED WORK',
    title: 'NATURE RETREAT',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const textRef = useRef(null);
  const isAnimating = useRef(false);
  const autoplayTimer = useRef(null);
  
  const current = slides[currentSlide - 1];

  const animateTransition = useCallback((updateStateCallback) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    gsap.to(textRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        updateStateCallback();
        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
          onComplete: () => {
            isAnimating.current = false;
          }
        });
      }
    });
  }, []);

  const handleNext = useCallback(() => {
    animateTransition(() => {
      setCurrentSlide((prev) => (prev === slides.length ? 1 : prev + 1));
    });
  }, [animateTransition]);

  const handlePrev = useCallback(() => {
    animateTransition(() => {
      setCurrentSlide((prev) => (prev === 1 ? slides.length : prev - 1));
    });
  }, [animateTransition]);

  const setSlide = useCallback((index) => {
    if (index === currentSlide) return;
    animateTransition(() => {
      setCurrentSlide(index);
    });
  }, [currentSlide, animateTransition]);

  // Autoplay Effect
  useEffect(() => {
    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(autoplayTimer.current);
  }, [handleNext, currentSlide]);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 2 }
    );
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#1a1a1a]">
      {/* Pre-render all background images and crossfade them via CSS */}
      {slides.map((s, idx) => (
        <div 
          key={s.id}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ 
            backgroundImage: `url(${s.image})`,
            opacity: currentSlide === idx + 1 ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            zIndex: currentSlide === idx + 1 ? 1 : 0
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}
      
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pb-16 md:pb-24 text-white z-10" ref={textRef}>
        <div className="flex justify-between items-end w-full flex-col md:flex-row gap-8 md:gap-0">
          <div>
            <p className="text-xs tracking-widest font-medium mb-6 uppercase">
              {current.id} <span className="mx-2">/</span> {current.category}
            </p>
            <h1 className="text-7xl lg:text-[5rem] font-normal leading-none tracking-[-0.4rem] mb-8">
              {current.title}
            </h1>
            <a href="#project" className="text-xs tracking-widest font-medium border-b border-white pb-1.5 uppercase transition-opacity hover:opacity-50 inline-block">
              VIEW PROJECT
            </a>
          </div>
          
          <div className="flex items-center gap-8 md:gap-12">
            <button onClick={handlePrev} className="text-xs tracking-widest font-medium hover:opacity-50 transition-opacity">PREV</button>
            
            <div className="flex gap-4">
              {slides.map((s, idx) => (
                <span 
                  key={s.id} 
                  className={`cursor-pointer text-sm font-medium transition-opacity ${currentSlide === idx + 1 ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  onClick={() => setSlide(idx + 1)}
                >
                  {s.id}
                </span>
              ))}
            </div>
            
            <button onClick={handleNext} className="text-xs tracking-widest font-medium hover:opacity-50 transition-opacity">NEXT</button>
          </div>
        </div>
      </div>
    </section>
  );
}
