"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const items = [
  "ARCHITECTURE",
  "INTERIORS",
  "TURNKEY",
  "RESIDENTIAL",
  "COMMERCIAL",
  "HOSPITALITY",
];

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 35,
      repeat: -1,
    });
  }, []);

  return (
    <div className="w-full overflow-hidden py-5 flex items-center" style={{ backgroundColor: 'var(--cream)', borderTop: '1px solid rgba(26,26,26,0.06)', borderBottom: '1px solid rgba(26,26,26,0.06)' }}>
      <div ref={trackRef} className="flex whitespace-nowrap w-max items-center">
        {[...items, ...items, ...items, ...items, ...items, ...items].map((item, index) => (
          <React.Fragment key={index}>
            <span className="text-sm md:text-base font-medium tracking-[0.3em] uppercase px-6 md:px-10 text-stroke" style={{ fontSize: 'clamp(0.75rem, 1vw, 0.9rem)' }}>
              {item}
            </span>
            <span className="text-xs" style={{ color: 'var(--accent)', opacity: 0.5 }}>✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
