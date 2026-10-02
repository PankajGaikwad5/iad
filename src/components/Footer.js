"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const containerRef = useRef(null);
  const topRef = useRef(null);
  const infoRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line expansion animation
      gsap.fromTo(lineRef.current, 
        { scaleX: 0, transformOrigin: 'left' },
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );

      // Top section text reveal
      gsap.from(topRef.current.children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Bottom info reveal
      gsap.from(infoRef.current.children, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="bg-white text-black pt-32 pb-8 px-8 lg:px-16 flex flex-col font-sans" id="contact">
      {/* Top CTA Section */}
      <div className="flex justify-between items-end mb-12 flex-col lg:flex-row lg:items-end gap-12 lg:gap-0" ref={topRef}>
        <div className="flex flex-col">
          <h2 className="text-7xl lg:text-[5rem] font-normal leading-none tracking-[-0.4rem] m-0 text-neutral-900">LET’S CREATE</h2>
          <h2 className="text-7xl lg:text-[5rem] font-normal leading-none tracking-[-0.4rem] m-0 text-neutral-900">SOMETHING PERSONAL.</h2>
        </div>
        <div className="mb-2">
          <a href="mailto:admin@studioiad.com" className="text-xl md:text-2xl font-normal text-neutral-900 no-underline border-b border-neutral-900 pb-1 transition-opacity duration-300 hover:opacity-60">
            admin@studioiad.com
          </a>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-gray-300 mb-20" ref={lineRef}></div>

      {/* Info Section */}
      <div className="flex justify-between mb-32 flex-col lg:flex-row gap-16 lg:gap-8" ref={infoRef}>
        {/* Logo Column */}
        <div className="flex-1 max-w-xs">
          <div className="flex flex-col text-neutral-900 leading-none mb-6">
            <span className="text-xs font-medium text-orange-600 lowercase mb-0">studio</span>
            <h3 className="text-6xl font-normal tracking-tight m-0 flex items-baseline">
              ia<span className="text-orange-600">.</span>d
            </h3>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest mt-1">ishan ahluwalia design</span>
          </div>
          <p className="text-xs text-gray-600 tracking-wide mt-4">Architecture · Interiors · Turnkey</p>
        </div>

        {/* Address Column */}
        <div className="flex-1 flex flex-col max-w-xs">
          <h4 className="text-xs font-medium tracking-widest text-neutral-900 mb-8 uppercase">VISIT THE STUDIO</h4>
          <p className="text-base leading-relaxed text-neutral-800 mb-2 font-normal">G.3, Ground floor, Dadaji Avenue</p>
          <p className="text-base leading-relaxed text-neutral-800 mb-2 font-normal">Chunabhatti, Bhopal</p>
          <p className="text-base leading-relaxed text-neutral-800 mb-2 font-normal">Madhya Pradesh 462016, India</p>
          <br/>
          <a href="#" className="text-base text-neutral-800 no-underline mb-2 transition-opacity duration-300 hover:opacity-60">Google Maps</a>
        </div>

        {/* Contact Column */}
        <div className="flex-1 flex flex-col max-w-xs">
          <h4 className="text-xs font-medium tracking-widest text-neutral-900 mb-8 uppercase">CONTACT</h4>
          <p className="text-base leading-relaxed text-neutral-800 mb-2 font-normal">+91 98286 18643</p>
          <a href="mailto:admin@studioiad.com" className="text-base text-neutral-800 no-underline mb-2 transition-opacity duration-300 hover:opacity-60">admin@studioiad.com</a>
          <br/>
          <a href="#" className="text-base text-neutral-800 no-underline mb-2 transition-opacity duration-300 hover:opacity-60">Instagram</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-300 text-xs text-gray-600 font-medium tracking-wide">
        <span>&copy; {new Date().getFullYear()} Studio Ia.D</span>
        <span>Bhopal, India</span>
      </div>
    </footer>
  );
}
