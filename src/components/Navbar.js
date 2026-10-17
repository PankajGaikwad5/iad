"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';

const DEFAULT_PREVIEWS = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000"
];

const LINKS = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/projects' },
  { title: 'Team', href: '/team' },
  { title: 'Awards & press', href: '/awards-and-press' }
];

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

// Underline that draws in from the left and exits to the right
const UNDERLINE =
  "relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100";

// Text that rolls up on hover. Needs a `group` ancestor.
function RollText({ children, className = '', altClassName = '' }) {
  return (
    <span className={`relative inline-block overflow-hidden py-[1px] ${className}`}>
      <span className={`block transition-transform duration-500 ${EASE} group-hover:-translate-y-full group-focus-visible:-translate-y-full`}>
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`absolute inset-0 block translate-y-full py-[1px] transition-transform duration-500 ${EASE} group-hover:translate-y-0 group-focus-visible:translate-y-0 ${altClassName}`}
      >
        {children}
      </span>
    </span>
  );
}

// Subtle magnetic pull toward the cursor (fine pointers only)
function useMagnetic(ref, strength = 0.25) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.set(el, { clearProps: 'x,y' });
    };
  }, [ref, strength]);
}

const motionScale = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.001 : 1;

export default function Navbar({ previewImages = DEFAULT_PREVIEWS, darkText = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const menuRef = useRef(null);
  const progressRef = useRef(null);
  const openBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const galleryRef = useRef(null);
  const menuOpenRef = useRef(false);

  useMagnetic(openBtnRef, 0.3);
  useMagnetic(galleryRef, 0.2);

  // Scroll: compact header, hide on scroll down, show on scroll up, progress hairline
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY || document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }

      setScrolled(y > 50);
      if (menuOpenRef.current) {
        lastY = y;
        return;
      }

      const delta = y - lastY;
      if (y < 150) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      if (Math.abs(delta) > 6 || y < 150) lastY = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const lock = useCallback(() => {
    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = 'hidden';
  }, [lenis]);

  const unlock = useCallback(() => {
    if (lenis) lenis.start();
    document.documentElement.style.overflow = '';
  }, [lenis]);

  const openMenu = useCallback(() => {
    const menu = menuRef.current;
    if (!menu || menuOpenRef.current) return;
    menuOpenRef.current = true;
    setMenuOpen(true);

    const d = motionScale();
    const lines = menu.querySelectorAll('[data-line]');
    const fades = menu.querySelectorAll('[data-fade]');
    const preview = menu.querySelector('[data-preview]');

    menu.style.visibility = 'visible';
    lock();

    gsap.killTweensOf([menu, lines, fades, preview]);
    gsap.to(menu, { clipPath: 'inset(0 0 0% 0)', duration: 0.9 * d, ease: 'expo.inOut' });
    gsap.fromTo(
      lines,
      { yPercent: 110 },
      { yPercent: 0, duration: 1 * d, stagger: 0.09 * d, delay: 0.35 * d, ease: 'expo.out', overwrite: true }
    );
    gsap.fromTo(
      fades,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 * d, stagger: 0.06 * d, delay: 0.5 * d, ease: 'power3.out', overwrite: true }
    );
    if (preview) {
      gsap.fromTo(
        preview,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.1 * d, delay: 0.45 * d, ease: 'expo.out', overwrite: true }
      );
    }

    closeBtnRef.current?.focus({ preventScroll: true });
  }, [lock]);

  const closeMenu = useCallback(
    (cb) => {
      const menu = menuRef.current;
      if (!menu || !menuOpenRef.current) {
        if (typeof cb === 'function') cb();
        return;
      }
      menuOpenRef.current = false;
      setMenuOpen(false);

      const d = motionScale();
      const lines = menu.querySelectorAll('[data-line]');
      const fades = menu.querySelectorAll('[data-fade]');
      const preview = menu.querySelector('[data-preview]');

      gsap.killTweensOf([menu, lines, fades, preview]);
      gsap.to(lines, { yPercent: -110, duration: 0.5 * d, stagger: 0.04 * d, ease: 'power3.in' });
      gsap.to(fades, { opacity: 0, duration: 0.3 * d, ease: 'power1.out' });
      gsap.to(menu, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8 * d,
        delay: 0.2 * d,
        ease: 'expo.inOut',
        onComplete: () => {
          menu.style.visibility = 'hidden';
          gsap.set([lines, fades, preview], { clearProps: 'all' });
          setActiveImg(0);
          unlock();
          openBtnRef.current?.focus({ preventScroll: true });
          if (typeof cb === 'function') cb();
        }
      });
    },
    [unlock]
  );

  // Escape closes the menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && menuOpenRef.current) closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeMenu]);

  // Never leave scrolling locked if we unmount mid-open
  useEffect(() => {
    return () => {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = '';
    };
  }, [lenis]);

  // Keep Tab focus inside the open menu
  const trapFocus = (e) => {
    if (e.key !== 'Tab' || !menuRef.current) return;
    const items = menuRef.current.querySelectorAll('a[href], button');
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    closeMenu(() => {
      if (href.startsWith('#')) {
        if (pathname === '/') {
          if (href === '#top') {
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.querySelector(href);
            if (el) {
              if (lenis) lenis.scrollTo(el);
              else el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        } else {
          router.push('/' + href);
        }
      } else if (href.startsWith('/#')) {
        const hash = href.slice(1);
        if (pathname === '/') {
          const el = document.querySelector(hash);
          if (el) {
            if (lenis) lenis.scrollTo(el);
            else el.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          router.push(href);
        }
      } else {
        if (pathname === href) {
          if (lenis) lenis.scrollTo(0);
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          router.push(href);
        }
      }
    });
  };

  const isLight = scrolled || darkText;

  return (
    <>
      {/* Film grain filter used by the menu preview */}
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
        <filter id="nav-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <header
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 px-6 transition-[transform,background-color,padding,backdrop-filter,color] duration-500 ${EASE} sm:px-12 md:px-16 lg:px-24 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'bg-[#f7f7f7]/90 py-3 backdrop-blur-xl md:py-4 text-[#222] border-b border-black/10'
            : isLight
            ? 'bg-transparent py-6 md:py-9 text-[#222]'
            : 'bg-transparent py-6 md:py-9 text-white'
        }`}
      >
        <div className="grid grid-cols-3 items-center">
          {/* Left: gallery button */}
          <div className="flex justify-start">
            <a
              ref={galleryRef}
              href="/projects"
              onClick={(e) => handleLinkClick(e, '/projects')}
              className={`group relative hidden cursor-pointer items-center overflow-hidden rounded-full px-6 py-[10px] font-[family-name:League_Spartan] text-[10px] uppercase tracking-[0.15em] backdrop-blur-sm transition-colors duration-500 md:inline-flex ${
                isLight
                  ? 'border border-[#222]/25 text-[#222] hover:border-[#222]'
                  : 'border border-white/25 text-white hover:border-white'
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ${EASE} group-hover:translate-y-0 group-focus-visible:translate-y-0 ${
                  isLight ? 'bg-[#222]' : 'bg-white'
                }`}
              />
              <RollText className="relative" altClassName={isLight ? 'text-white' : 'text-black'}>
                Project gallery
              </RollText>
            </a>
          </div>

          {/* Center: logo */}
          <a
            className="flex cursor-pointer items-center justify-center transition-opacity duration-300 hover:opacity-70 focus-visible:opacity-70 focus-visible:outline-none"
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            aria-label="Studio Ia.D"
          >
            <img
              src="/logo.png"
              alt="Studio Ia.D"
              className={`w-auto object-contain transition-[height] duration-500 ${EASE} ${
                scrolled ? 'h-[20px] md:h-[26px]' : 'h-[24px] md:h-[32px]'
              }`}
            />
          </a>

          {/* Right: est + menu */}
          <div className="flex items-center justify-end gap-8 md:gap-10">
            {/* <span
              className={`hidden font-[family-name:League_Spartan] text-[11px] font-normal uppercase tracking-[0.2em] md:block ${
                isLight ? 'text-[#222]/70' : 'text-white/70'
              }`}
            >
              EST – 2019
            </span> */}
            <button
              ref={openBtnRef}
              id="mb"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="menu"
              className="group -m-3 flex cursor-pointer items-center gap-4 p-3 focus-visible:outline-none"
            >
              <RollText
                className={`hidden font-[family-name:League_Spartan] text-[11px] font-normal uppercase tracking-[0.2em] md:inline-block ${
                  isLight ? 'text-[#222]' : 'text-white'
                }`}
              >
                Menu
              </RollText>
              <span className="flex h-[10px] w-[34px] flex-col items-start justify-between md:w-[38px]">
                <i className={`block h-[1.5px] w-full ${isLight ? 'bg-[#222]' : 'bg-white'}`} />
                <i
                  className={`block h-[1.5px] w-1/2 transition-[width] duration-500 ${EASE} group-hover:w-full group-focus-visible:w-full ${
                    isLight ? 'bg-[#222]' : 'bg-white'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll progress hairline */}
        <span
          ref={progressRef}
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-px origin-left transition-opacity duration-500 [transform:scaleX(0)] ${
            scrolled ? 'opacity-100 bg-[#222]/40' : 'opacity-0 bg-[#222]/40'
          }`}
        />
      </header>

      {/* Fullscreen overlay menu */}
      <div
        ref={menuRef}
        id="menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onKeyDown={trapFocus}
        className="invisible fixed inset-0 z-50 flex flex-col bg-[#f7f7f7] px-6 pb-[max(32px,env(safe-area-inset-bottom))] pt-[max(32px,env(safe-area-inset-top))] sm:px-12 md:grid md:grid-cols-[1.2fr_1fr] md:grid-rows-[auto_1fr_auto] md:px-16 md:pb-10 md:pt-10 lg:px-24"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        {/* Top bar */}
        <div data-fade className="col-span-full flex items-center justify-between">
          <a
            className="cursor-pointer font-[family-name:Glacial_Indifference] text-[30px] font-light leading-none tracking-[-0.06em] text-[#222] transition-opacity duration-300 hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
          >
            <small className="mb-[3px] block font-[family-name:League_Spartan] text-[9px] font-normal tracking-[0.3em]">
              studio
            </small>
            ia.d
          </a>
          <button
            ref={closeBtnRef}
            id="mc"
            onClick={() => closeMenu()}
            className="group -m-3 flex cursor-pointer items-center gap-3 p-3 font-[family-name:League_Spartan] text-[12px] font-normal uppercase tracking-[0.18em] text-[#222] focus-visible:outline-none"
          >
            <RollText>Close</RollText>
            <span className="relative block h-[14px] w-[14px]" aria-hidden="true">
              <i
                className={`absolute left-0 top-1/2 block h-[1.5px] w-full rotate-45 bg-[#222] transition-transform duration-500 ${EASE} group-hover:rotate-[135deg] group-focus-visible:rotate-[135deg]`}
              />
              <i
                className={`absolute left-0 top-1/2 block h-[1.5px] w-full -rotate-45 bg-[#222] transition-transform duration-500 ${EASE} group-hover:rotate-[45deg] group-focus-visible:rotate-[45deg]`}
              />
            </span>
          </button>
        </div>

        {/* Navigation links */}
        <ol
          onMouseLeave={() => setActiveImg(0)}
          className="group/list m-0 flex list-none flex-col justify-center gap-1 p-0 max-md:flex-1 md:gap-2 md:self-center"
        >
          {LINKS.map((item, i) => (
            <li
              key={item.title}
              className="overflow-hidden py-1 transition-opacity duration-500 focus-within:!opacity-100 hover:!opacity-100 group-hover/list:opacity-25 md:py-2"
            >
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                onMouseEnter={() => setActiveImg(i)}
                onFocus={() => setActiveImg(i)}
                className={`group/link inline-block cursor-pointer transition-transform duration-500 ${EASE} hover:translate-x-3 focus-visible:translate-x-3 focus-visible:outline-none`}
              >
                <span
                  data-line
                  className="flex items-baseline gap-4 font-[family-name:Glacial_Indifference] text-4xl font-light uppercase leading-[1.05] tracking-[-0.035em] text-[#111] sm:text-6xl md:gap-6 md:text-7xl lg:text-[4.75rem] xl:text-[5.25rem]"
                >
                  <sup className="font-[family-name:League_Spartan] text-[13px] font-light tracking-normal text-[#111]/50 md:text-[15px]">
                    ({i + 1})
                  </sup>
                  <span className="relative">
                    {item.title}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#111] transition-transform duration-700 ${EASE} group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100`}
                    />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>

        {/* Hover image preview */}
        <div
          data-preview
          className="relative hidden aspect-[3/4] w-[min(28vw,400px)] self-center justify-self-end md:block"
        >
          {previewImages.map((src, i) => (
            <div
              key={i}
              className={`absolute inset-0 overflow-hidden bg-[#c9c9c9] transition-opacity duration-700 ${
                activeImg === i ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className={`absolute inset-[-8%] bg-cover bg-center contrast-105 transition-transform duration-[1400ms] ${EASE} ${
                  activeImg === i ? 'scale-100' : 'scale-110'
                }`}
                style={{ backgroundImage: `url(${src})` }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
                style={{ filter: 'url(#nav-grain)' }}
              />
            </div>
          ))}
          <span className="pointer-events-none absolute bottom-3 left-4 font-[family-name:League_Spartan] text-[10px] tracking-[0.2em] text-white/90">
            {String(activeImg + 1).padStart(2, '0')} / {String(previewImages.length).padStart(2, '0')}
          </span>
        </div>

        {/* Footer contact info */}
        <div
          data-fade
          className="col-span-full flex flex-wrap justify-between gap-x-5 gap-y-2 border-t border-black/10 pt-5 font-[family-name:League_Spartan] text-[15px] text-[#222]"
        >
          <a href="mailto:admin@studioiad.com" className={`${UNDERLINE} focus-visible:outline-none`}>
            admin@studioiad.com
          </a>
          <a href="tel:+919828618643" className={`${UNDERLINE} focus-visible:outline-none`}>
            +91 98286 18643
          </a>
          <span>Bhopal, India</span>
        </div>
      </div>
    </>
  );
}