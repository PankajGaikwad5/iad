"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Founder() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: 100, // moves the image slightly down as user scrolls up
        ease: "none"
      });

      // Fade up content
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white text-neutral-900 py-36 px-8 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16 overflow-hidden" id="founder">
      <div className="col-span-1 lg:col-span-6 h-96 md:h-[60vh] lg:h-[80vh] w-full overflow-hidden relative">
        <div 
          ref={imageRef} 
          className="absolute -top-16 left-0 w-full h-[120%] bg-cover bg-center grayscale contrast-125"
          style={{ backgroundImage: "url('https://studio-iad-design-preview.ekta-soni9514.chatgpt.site/assets/ishan.jpg')" }}
        />
      </div>
      
      <div className="col-span-1 lg:col-span-6 max-w-xl w-full" ref={contentRef}>
        <div className="flex items-center gap-2 text-sm font-medium tracking-widest text-neutral-700 mb-12">
          <span>02</span>
          <span>/</span>
          <span className="uppercase">FOUNDER & PRINCIPAL ARCHITECT</span>
        </div>
        
        <h2 className="text-7xl lg:text-[5rem] font-normal leading-none tracking-[-0.4rem] mb-12 text-black">
          ISHAN<br/>AHLUWALIA
        </h2>
        
        <div className="text-lg text-justify leading-7 text-neutral-800">
          <p className="mb-6 max-w-lg">
            Ishan established Studio Ia.D in 2019, bringing architecture, interiors and landscape into one practice. He leads the design direction of the studio and works closely with clients and the team from concept to completion.
          </p>
          <p className="mb-0 max-w-lg">
            His portfolio spans residences, retail spaces and hospitality, including House of Light and Kothi in Bhopal.
          </p>
        </div>
      </div>
    </section>
  );
}
