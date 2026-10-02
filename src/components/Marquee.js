"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const logos = [
  "RETHINKING THE FUTURE",
  "GOODHOMES",
  "DCODE",
  "RETHINKING THE FUTURE",
  "GOODHOMES",
  "DCODE",
];

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    // Smooth infinite marquee animation
    gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 25,
      repeat: -1,
    });
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white py-12 border-b border-gray-100 flex items-center">
      <div ref={trackRef} className="flex whitespace-nowrap w-max">
        {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <div key={index} className="text-xl font-bold tracking-tight text-gray-800 px-16 lg:px-24">
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
