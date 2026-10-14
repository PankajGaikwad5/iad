"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const PRESS_LOGOS = [
  {
    name: "GoodHomes India",
    src: "/logos/goodhomes-logo.svg",
    href: "https://www.instagram.com/reel/DEHy8JHPTQU/",
    ariaLabel: "GoodHomes coverage",
    className: "h-8 sm:h-10 md:h-11 w-auto max-w-[185px] object-contain",
  },
  {
    name: "Casamia D'Code",
    src: "/logos/dcode-logo.png",
    href: "https://www.goodhomes.co.in/home-and-design-trends/dcode/dcode-presents-design-ikon-ishan-ahluwalia-studio-iad-9145.html",
    ariaLabel: "D/Code coverage",
    className: "h-10 sm:h-12 md:h-13 w-auto max-w-[145px] object-contain",
  },
  {
    name: "Rethinking The Future",
    src: "/logos/rtf-logo.png",
    href: "https://www.re-thinkingthefuture.com/residential/9491-kothi-bhopal-by-studio-iad/",
    ariaLabel: "Rethinking The Future coverage",
    className: "h-7 sm:h-9 md:h-10 w-auto max-w-[200px] object-contain",
  },
];

export default function Marquee() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    // Smooth infinite marquee animation with GSAP
    if (trackRef.current) {
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 32,
        repeat: -1,
      });
    }

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  return (
    <section
      aria-label="Media and press coverage"
      className="group/marquee relative w-full overflow-hidden bg-white py-7 sm:py-9 border-b border-black/10 select-none z-10"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap w-max items-center will-change-transform"
      >
        {/* Render duplicate groups to guarantee a seamless 50% infinite translation loop */}
        {[0, 1, 2, 3].map((setIdx) => (
          <div
            key={setIdx}
            className="flex items-center justify-around gap-14 sm:gap-20 md:gap-28 px-8 sm:px-12 md:px-16 flex-shrink-0"
            aria-hidden={setIdx > 0}
          >
            {PRESS_LOGOS.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={setIdx > 0 ? -1 : 0}
                aria-label={item.ariaLabel}
                className="flex items-center justify-center shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className={item.className}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
