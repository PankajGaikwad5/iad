"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { motion, useReducedMotion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import ServicesSection from '@/components/ServicesSection';
import HeroFrameLight from '@/components/revamp/heroes/HeroFrameLight';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const SRC = {
  founder: "https://studio-iad-design-preview.ekta-soni9514.chatgpt.site/assets/ishan.jpg",
  p1: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
  p2: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000",
  p3: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000",
  w: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000",
};

const SLIDES = [
  { title: "The Modern Villa", image: SRC.p1, category: "Architecture", link: "/projects/the-modern-villa" },
  { title: "House of Light", image: SRC.p2, category: "Interiors", link: "/projects/house-of-light" },
  { title: "Kothi", image: SRC.p3, category: "Turnkey", link: "/projects/kothi" }
];

const SLIDE_MS = 1200;
const AUTOPLAY_MS = 5000;

// Trying the framed B&W hero (4E+ from /alt-revamp/heroes); false brings back the original slider
const USE_FRAME_HERO = true;
const SLIDE_EASE = [0.76, 0, 0.24, 1];
const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';
const pad = (n) => String(n).padStart(2, '0');

// Underline that draws in from the left and exits to the right
const UNDERLINE =
  "relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100 focus-visible:outline-none";

// Same idea, for light-on-image links that already have a faint baseline
const HERO_LINK =
  "relative border-b border-white/30 after:absolute after:left-0 after:-bottom-px after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-white after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100 focus-visible:outline-none";

// Text that rolls up on hover. Needs a `group` ancestor.
const Roll = ({ children }) => (
  <span className="relative inline-block overflow-hidden py-[1px]">
    <span className={`block transition-transform duration-500 ${EASE} group-hover:-translate-y-full group-focus-visible:-translate-y-full`}>
      {children}
    </span>
    <span
      aria-hidden="true"
      className={`absolute inset-0 block translate-y-full py-[1px] transition-transform duration-500 ${EASE} group-hover:translate-y-0 group-focus-visible:translate-y-0`}
    >
      {children}
    </span>
  </span>
);

const Button = ({ children, href, className = "", white = false, id, ...props }) => (
  <a
    href={href}
    id={id}
    className={`bt group inline-flex items-center gap-3 text-[13px] tracking-[0.18em] uppercase py-[15px] px-[26px] border rounded-full relative overflow-hidden isolate cursor-pointer transition-colors duration-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 ${
      white
        ? 'text-white border-white hover:text-black before:bg-white focus-visible:outline-white'
        : 'text-black border-black hover:text-white before:bg-black focus-visible:outline-black'
    } before:absolute before:inset-0 before:translate-y-[101%] hover:before:translate-y-0 before:transition-transform before:duration-[600ms] before:-z-10 before:ease-[cubic-bezier(.65,0,.15,1)] ${className}`}
    {...props}
  >
    <Roll>{children}</Roll>
  </a>
);

// Headline split into lines; each line slides up out of its own mask on scroll
const Lines = ({ lines, className = "", as: Tag = 'h2' }) => (
  <Tag className={className} data-lines>
    {lines.map((line, i) => (
      <span key={i} className="-my-[0.06em] block overflow-hidden py-[0.06em]">
        <span data-reveal className="block">{line}</span>
      </span>
    ))}
  </Tag>
);

const ImageWrapper = ({ src, className = "", id, label }) => (
  <div
    id={id}
    role={label ? 'img' : undefined}
    aria-label={label}
    className={`ph absolute inset-0 overflow-hidden bg-[#c9c9c9] ${className}`}
  >
    <div className="im absolute inset-[-8%] bg-cover bg-center contrast-105" style={{ backgroundImage: `url(${src})` }} />
    <div className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none" style={{ filter: 'url(#grain)' }} />
  </div>
);

export default function Home() {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // ---- Hero slider -------------------------------------------------------
  const lockRef = useRef(false);
  const lockTimer = useRef(null);

  const lockSlides = useCallback(() => {
    if (lockRef.current) return false;
    lockRef.current = true;
    lockTimer.current = setTimeout(() => { lockRef.current = false; }, SLIDE_MS);
    return true;
  }, []);

  const paginate = useCallback((dir) => {
    if (!lockSlides()) return;
    setActiveSlide((p) => (p + dir + SLIDES.length) % SLIDES.length);
  }, [lockSlides]);

  const goTo = useCallback((i) => {
    if (!lockSlides()) return;
    setActiveSlide(i);
  }, [lockSlides]);

  // Autoplay restarts after every change (manual or automatic); off for reduced motion
  useEffect(() => {
    if (reduceMotion || USE_FRAME_HERO) return;
    const id = setTimeout(() => paginate(1), SLIDE_MS + AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [activeSlide, reduceMotion, paginate]);

  useEffect(() => () => clearTimeout(lockTimer.current), []);

  // ---- Lenis <-> ScrollTrigger + in-page anchors --------------------------
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const onLenisScroll = () => ScrollTrigger.update();
    if (lenis) lenis.on('scroll', onLenisScroll);

    // Anchors outside the navbar (the navbar handles its own links)
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.closest('header, #menu')) return;
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(href === '#top' ? 0 : el);
      else el.scrollIntoView({ behavior: 'smooth' });
    };
    root.addEventListener('click', onClick);

    return () => {
      if (lenis) lenis.off('scroll', onLenisScroll);
      root.removeEventListener('click', onClick);
    };
  }, [lenis]);

  // Keep a live handle on lenis for the one-time animation setup below
  const lenisRef = useRef(null);
  useEffect(() => { lenisRef.current = lenis; }, [lenis]);

  // ---- Page animations (run once) ----------------------------------------
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    gsap.ticker.lagSmoothing(0);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (s) => Array.from(root.querySelectorAll(s));
    const html = document.documentElement;

    const lockScroll = () => { html.style.overflow = 'hidden'; lenisRef.current?.stop(); };
    const unlockScroll = () => { html.style.overflow = ''; lenisRef.current?.start(); };

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('#loader', { autoAlpha: 0 });
        return;
      }

      // Loader: split curtain, held scroll until it's mostly open
      lockScroll();
      gsap.set('#loader-logo-left, #loader-logo-right', { xPercent: -50, yPercent: -50 });

      const tl = gsap.timeline();
      tl.to('.loader-logo-content', { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.6 })
        .to('#loader-left', { xPercent: -100, duration: 1.6, ease: 'expo.inOut' }, 1.8)
        .to('#loader-right', { xPercent: 100, duration: 1.6, ease: 'expo.inOut' }, 1.8)
        .to('#loader-logo-left', { x: '-50vw', duration: 1.6, ease: 'expo.inOut' }, 1.8)
        .to('#loader-logo-right', { x: '50vw', duration: 1.6, ease: 'expo.inOut' }, 1.8)
        .add(unlockScroll, 2.8)
        .set('#loader', { autoAlpha: 0 })
        .from('[data-nav]', { autoAlpha: 0, duration: 1 }, 2.4)
        .from('.hero-slider-content', { y: 40, autoAlpha: 0, duration: 1.5, ease: 'expo.out' }, 2.2);

      // Headlines: line-by-line mask reveal
      $('[data-lines]').forEach((el) => {
        gsap.from(el.querySelectorAll('[data-reveal]'), {
          yPercent: 110,
          duration: 1.4,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        });
      });

      // Everything else: gentle fade up, batched so neighbours stagger together
      const fades = $('[data-fade]');
      gsap.set(fades, { autoAlpha: 0, y: 24 });
      ScrollTrigger.batch(fades, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' })
      });

      // Founder portrait wipe
      gsap.fromTo('#fph', { clipPath: 'inset(100% 0 0 0)' }, {
        clipPath: 'inset(0% 0 0 0)', duration: 2, ease: 'expo.inOut',
        scrollTrigger: { trigger: '#founder', start: 'top 70%' }
      });

      // Wide image grows to full width as you scroll
      gsap.fromTo('#wph', { clipPath: 'inset(0 12% 0 12%)' }, {
        clipPath: 'inset(0 0% 0 0%)', ease: 'none',
        scrollTrigger: { trigger: '#wph', start: 'top 90%', end: 'top 20%', scrub: true }
      });

      // Image parallax
      $('#fph .im, #wph .im').forEach((im) => {
        gsap.fromTo(im, { yPercent: -5 }, {
          yPercent: 5, ease: 'none',
          scrollTrigger: { trigger: im.parentNode, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });
    }, root);

    return () => {
      ctx.revert();
      unlockScroll();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#f7f7f7] text-[#222] font-sans antialiased overflow-x-clip selection:bg-black selection:text-white">

      {/* Split curtain loader */}
      <div id="loader" className="fixed inset-0 z-[100] flex pointer-events-none overflow-hidden" aria-hidden="true">
        <div id="loader-left" className="w-1/2 h-full bg-[#f7f7f7] relative will-change-transform" />
        <div id="loader-right" className="w-1/2 h-full bg-[#f7f7f7] relative will-change-transform" />

        <div id="loader-logo-left" className="absolute top-1/2 left-1/2 z-10 will-change-transform" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}>
          <div className="flex justify-center items-center opacity-0 scale-95 loader-logo-content">
            <img src="/logo.png" alt="" className="w-[clamp(180px,20vw,350px)] object-contain" />
          </div>
        </div>
        <div id="loader-logo-right" className="absolute top-1/2 left-1/2 z-10 will-change-transform" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}>
          <div className="flex justify-center items-center opacity-0 scale-95 loader-logo-content">
            <img src="/logo.png" alt="" className="w-[clamp(180px,20vw,350px)] object-contain" />
          </div>
        </div>
      </div>

      <svg width="0" height="0" className="absolute" aria-hidden="true"><filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="5" /><feColorMatrix type="saturate" values="0" /></filter></svg>

      <Navbar />

      <main id="top">
        {/* ---------------- Hero ---------------- */}
        {USE_FRAME_HERO ? <HeroFrameLight /> : (
        <section className="hero relative h-[100svh] min-h-[620px] overflow-hidden bg-[#111] select-none" aria-roledescription="carousel" aria-label="Featured projects">

          {/* Filmstrip */}
          <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
            <motion.div
              className="absolute inset-0 flex transform-gpu will-change-transform"
              animate={{ x: `-${activeSlide * 100}%` }}
              transition={{ duration: reduceMotion ? 0 : SLIDE_MS / 1000, ease: SLIDE_EASE }}
            >
              {SLIDES.map((proj, idx) => (
                <div key={idx} className="w-full h-[100svh] min-h-[620px] relative shrink-0 flex-none overflow-hidden bg-[#c9c9c9]">
                  {/* Slow settle: the incoming image eases from a slight zoom */}
                  <motion.img
                    src={proj.image}
                    alt={proj.title}
                    draggable={false}
                    className="w-full h-full object-cover contrast-105 pointer-events-none"
                    initial={{ scale: reduceMotion ? 1 : 1.12 }}
                    animate={{ scale: idx === activeSlide || reduceMotion ? 1 : 1.12 }}
                    transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Overlay strictly above image only */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/35 pointer-events-none" />
                  <div className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none" style={{ filter: 'url(#grain)' }} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hero-slider-content absolute inset-0 z-20 pointer-events-none">

            {/* Arrows */}
            <button
              onClick={() => paginate(-1)}
              className="group pointer-events-auto flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 items-center justify-center text-white bg-black/20 backdrop-blur-sm hover:bg-white hover:text-black hover:border-white transition-colors duration-500 cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label="Previous slide"
            >
              <svg className={`transition-transform duration-500 ${EASE} group-hover:-translate-x-0.5`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={() => paginate(1)}
              className="group pointer-events-auto flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 items-center justify-center text-white bg-black/20 backdrop-blur-sm hover:bg-white hover:text-black hover:border-white transition-colors duration-500 cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label="Next slide"
            >
              <svg className={`transition-transform duration-500 ${EASE} group-hover:translate-x-0.5`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 18l6-6-6-6" /></svg>
            </button>

            {/* Title, bottom left */}
            <div className="absolute bottom-16 left-6 md:bottom-20 md:left-16 text-white w-[80vw] md:w-[600px] h-[220px] md:h-[300px] overflow-hidden">
              {SLIDES.map((proj, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <motion.div
                    key={idx}
                    className="absolute bottom-0 left-0 flex flex-col items-start transform-gpu will-change-[transform,opacity]"
                    style={{ pointerEvents: isActive ? 'auto' : 'none', zIndex: isActive ? 10 : 1 }}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 1, delay: isActive ? 0.3 : 0, ease: SLIDE_EASE }}
                  >
                    <motion.span
                      className="block font-[family-name:Glacial_Indifference] text-4xl md:text-6xl xl:text-7xl font-light tracking-[0.05em] uppercase leading-[0.9]"
                      initial={false}
                      animate={{ y: isActive ? 0 : 28 }}
                      transition={{ duration: reduceMotion ? 0 : 1.2, delay: isActive ? 0.3 : 0, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {proj.title}
                    </motion.span>
                    <motion.span
                      className="block mt-3 md:mt-4 text-[10px] md:text-[11px] font-[family-name:League_Spartan] tracking-[0.25em] font-normal uppercase text-white/80"
                      initial={false}
                      animate={{ y: isActive ? 0 : 20 }}
                      transition={{ duration: reduceMotion ? 0 : 1.2, delay: isActive ? 0.42 : 0, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {proj.category}
                    </motion.span>

                    <div className="flex items-center gap-4 mt-5 md:hidden">
                      <a href={proj.link} tabIndex={isActive ? 0 : -1} className={`pointer-events-auto text-[11px] font-[family-name:League_Spartan] tracking-[0.15em] font-normal uppercase pb-0.5 text-white ${HERO_LINK}`}>
                        View project
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Links, bottom right */}
            <div className="hidden md:flex absolute bottom-16 right-6 md:bottom-20 md:right-16 text-right w-[320px] h-[120px] md:h-[180px] overflow-hidden justify-end">
              {SLIDES.map((proj, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <motion.div
                    key={idx}
                    className="absolute bottom-0 right-0 flex flex-col items-end gap-1.5 transform-gpu will-change-[transform,opacity]"
                    style={{ pointerEvents: isActive ? 'auto' : 'none', zIndex: isActive ? 10 : 1 }}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                    transition={{ duration: reduceMotion ? 0 : 1.2, ease: SLIDE_EASE }}
                  >
                    <a href={proj.link} tabIndex={isActive ? 0 : -1} className={`pointer-events-auto text-[12px] md:text-[13px] font-[family-name:League_Spartan] tracking-[0.15em] font-normal uppercase pb-1 text-white ${HERO_LINK}`}>
                      View project
                    </a>
                    <a href="/projects" tabIndex={isActive ? 0 : -1} className="pointer-events-auto text-[9px] md:text-[10px] font-[family-name:League_Spartan] tracking-[0.25em] font-normal uppercase text-white/70 hover:text-white transition-colors duration-500 mt-2 focus-visible:text-white focus-visible:outline-none">
                      All projects
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* Counter + progress bars */}
            <div className="pointer-events-auto absolute bottom-5 left-6 right-6 flex items-center gap-5 text-white md:bottom-7 md:left-16 md:right-auto">
              <span className="font-[family-name:League_Spartan] text-[11px] tracking-[0.2em] tabular-nums" aria-live="polite">
                {pad(activeSlide + 1)} / {pad(SLIDES.length)}
              </span>
              <div className="flex gap-2">
                {SLIDES.map((proj, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}: ${proj.title}`}
                    aria-current={i === activeSlide}
                    className="group relative h-6 w-10 cursor-pointer md:w-14 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-px bg-white/30 transition-[height,background-color] duration-300 group-hover:h-[2px] group-hover:bg-white/60" />
                    {i === activeSlide && (
                      <motion.span
                        key={activeSlide}
                        className="absolute inset-x-0 top-1/2 h-px origin-left bg-white group-hover:h-[2px]"
                        initial={{ scaleX: reduceMotion ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTOPLAY_MS / 1000, delay: SLIDE_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        )}

        {/* ---------------- Media & Press Marquee ---------------- */}
        <Marquee />

        {/* ---------------- Founder ---------------- */}
        <section id="founder" className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24 px-6 sm:px-12 md:px-16 lg:px-24 py-20 md:py-28 items-center relative">
          <div>
            <span data-fade className="lab block font-normal text-[12px] leading-[1.4] font-[family-name:League_Spartan] tracking-[0.18em] uppercase text-[#222]">Studio Ia.D</span>
            <Lines
              lines={['Ar.','Ishan', 'Ahluwalia']}
              className="d font-light text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.035em] uppercase font-[family-name:Glacial_Indifference] mt-6 mb-8"
            />
            <div data-fade className="sub text-[16px] text-[#222] font-[family-name:League_Spartan] mb-8 font-medium">Founder &amp; principal architect</div>
            <p data-fade className="max-w-[30em] mb-6 text-base md:text-lg tracking-wide text-[#222]/80 font-light font-[family-name:League_Spartan]">Ishan established Studio Ia.D in 2019, bringing architecture, interiors and landscape into one practice. He leads the design direction of the studio and works closely with clients and the team from concept to completion.</p>
            <p data-fade className="max-w-[30em] mb-6 text-base md:text-lg tracking-wide text-[#222]/80 font-light font-[family-name:League_Spartan]">His portfolio spans residences, retail spaces and hospitality, including The Modern Villa and Nature Retreat in Bhopal.</p>
            <div data-fade className="pt-2">
              <Button href="/team" className="font-[family-name:League_Spartan]">
                Meet the Team
              </Button>
            </div>
          </div>
          <ImageWrapper id="fph" src={SRC.founder} label="Ishan Ahluwalia, founder of Studio Ia.D" className="!relative !inset-auto aspect-[4/5]" />
        </section>

        {/* ---------------- Studio ---------------- */}
        {/* <section id="why" className="px-6 sm:px-12 md:px-16 lg:px-24 pb-20 md:pb-28 relative">
          <div className="wt flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 lg:gap-16 xl:gap-24 mb-12 md:mb-20">
            <div className="flex-1 min-w-0">
              <span data-fade className="lab block font-normal text-[12px] leading-[1.4] font-[family-name:League_Spartan] tracking-[0.18em] uppercase text-[#222]">The studio</span>
              <Lines
                lines={['Architecture.', 'Interiors.', 'Turnkey.']}
                className="d font-light text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] leading-[0.95] tracking-[-0.03em] uppercase font-[family-name:Glacial_Indifference] mt-6"
              />
            </div>
            <div className="w-full lg:max-w-[380px] xl:max-w-[440px] shrink-0">
              <p data-fade className="mb-8 text-base md:text-lg leading-relaxed tracking-wide text-[#222]/80 font-light font-[family-name:League_Spartan]">
                Studio Ia.D is an architecture and interior design practice based in Bhopal. We design homes, commercial spaces and hospitality projects, carrying each brief from its first drawing through interiors and execution.
              </p>
              <div data-fade>
                <Button href="/projects" className="font-[family-name:League_Spartan]">Projects</Button>
              </div>
            </div>
          </div>
          <ImageWrapper id="wph" src={SRC.w} label="Interior of a Studio Ia.D project" className="!relative !inset-auto aspect-[16/7]" />
        </section> */}

        {/* ---------------- Services by Ia.D ---------------- */}
        <ServicesSection />

        {/* Anchor target for "Projects". */}
        <div id="work" className="scroll-mt-24" />
      </main>

      <Footer />
    </div>
  );
}