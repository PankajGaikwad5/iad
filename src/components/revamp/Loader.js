"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader() {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const logoRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    document.body.style.overflow = "hidden";

    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(tagRef.current, { opacity: 0, y: 12 });
    gsap.set(circleRef.current, { scale: 0 });

    tl
      .to(circleRef.current, { scale: 1, duration: 1.2, ease: "power3.out", delay: 0.2 })
      .to(logoRef.current, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, "-=0.6")
      .to(tagRef.current, { opacity: 0.5, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .to([logoRef.current, tagRef.current], { opacity: 0, y: -20, duration: 0.6, ease: "power2.in" }, "+=0.5")
      .to(circleRef.current, {
        scale: 40,
        duration: 1.4,
        ease: "power3.inOut",
      }, "-=0.3")
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          document.body.style.overflow = "";
          if (containerRef.current) containerRef.current.style.display = "none";
        },
      });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none" style={{ backgroundColor: 'var(--cream)' }}>
      {/* Expanding circle */}
      <div
        ref={circleRef}
        className="absolute rounded-full"
        style={{
          width: '120px',
          height: '120px',
          border: '1px solid rgba(26,26,26,0.1)',
          transform: 'scale(0)',
        }}
      />
      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <div ref={logoRef}>
          <span className="text-[10px] font-medium tracking-[0.35em] uppercase block text-center mb-1" style={{ color: 'var(--accent)' }}>studio</span>
          <h1 className="text-5xl font-normal tracking-tight m-0" style={{ color: 'var(--ink)' }}>
            ia<span style={{ color: 'var(--accent)' }}>.</span>d
          </h1>
        </div>
        <span ref={tagRef} className="text-[9px] tracking-[0.3em] uppercase mt-3 font-medium" style={{ color: 'var(--ink)' }}>
          ishan ahluwalia design
        </span>
      </div>
    </div>
  );
}
