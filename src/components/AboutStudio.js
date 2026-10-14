"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStudio() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current.children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white text-neutral-900 py-24 px-16 flex gap-24" id="studio">
      <div className="flex-none w-60">
        <div className="flex items-center gap-2 text-sm font-medium tracking-widest mt-3 uppercase">
          <span>01</span>
          <span>/</span>
          <span>THE STUDIO</span>
        </div>
      </div>
      
      <div className="flex-1 max-w-6xl">
        <h2 className="text-7xl lg:text-[5rem] font-normal leading-none tracking-tight mb-16" ref={headingRef}>
          <div className="overflow-hidden pb-2 -mb-2"><span className="inline-block">ARCHITECTURE.</span></div>
          <div className="overflow-hidden pb-2 -mb-2"><span className="inline-block">INTERIORS.</span></div>
          <div className="overflow-hidden pb-2 -mb-2"><span className="inline-block">TURNKEY.</span></div>
        </h2>
        
        <div className="flex justify-between items-end w-full" ref={textRef}>
          <p className="max-w-md text-lg text-justify leading-7  mb-0">
            Studio Ia.D is an architecture and interior design practice based in Bhopal. We design homes,
            commercial spaces and hospitality projects, carrying each brief from its first drawing through interiors and
            execution.
          </p>
          <a href="#work" className="text-xs tracking-widest font-medium border-b border-neutral-900 pb-1.5 uppercase transition-opacity duration-300 hover:opacity-50 whitespace-nowrap">
            EXPLORE OUR WORK
          </a>
        </div>
      </div>
    </section>
  );
}
