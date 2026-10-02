"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader() {
  const containerRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const ease = "power4.inOut";

    // Initial state
    gsap.set(logoRef.current, { opacity: 0, scale: 0.85, y: 10 });

    // Animation sequence
    tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease,
        delay: 0.2,
      })
      .to(logoRef.current, {
        opacity: 0,
        duration: 0.8,
        ease,
      }, "+=0.2")
      .to(leftCurtainRef.current, {
        x: "-100%",
        duration: 1.6,
        ease,
      }, "<")
      .to(rightCurtainRef.current, {
        x: "100%",
        duration: 1.6,
        ease,
      }, "<")
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        },
      });

  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex overflow-hidden pointer-events-none">
      <div ref={leftCurtainRef} className="w-1/2 h-full bg-[#fff] relative"></div>
      <div ref={rightCurtainRef} className="w-1/2 h-full bg-[#fff] relative"></div>
      
      {/* Centered Logo (Text for now, can be an image later) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div ref={logoRef}>
          <h1 className="text-black text-4xl font-normal whitespace-nowrap tracking-widest">studio ia.d</h1>
        </div>
      </div>
    </div>
  );
}
