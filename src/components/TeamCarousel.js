'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TEAM_MEMBERS = [
  {
    name: 'LUIS PAREDES',
    role: 'Developer',
    fgImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'SOFIA MARTINEZ',
    role: 'Architect',
    fgImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
    bgImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'ALEJANDRO RUIZ',
    role: 'Lead Designer',
    fgImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    bgImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'ISABELLA CHEN',
    role: 'Partner',
    fgImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    bgImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
  },
];

const bgVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 0.15,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const fgVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 250 : -250,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 250 : -250,
    opacity: 0,
  }),
};

const detailsVariants = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function TeamCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const totalSlides = TEAM_MEMBERS.length;
  const autoplayRef = useRef(null);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [index, isHovered]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleSelect = (idx) => {
    if (idx === index) return;
    setDirection(idx > index ? 1 : -1);
    setIndex(idx);
  };

  const currentMember = TEAM_MEMBERS[index];

  return (
    <section
      className="relative w-full min-h-screen bg-white flex items-center justify-center py-16 px-6 md:px-12 lg:px-20 text-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            custom={direction}
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
            src={currentMember.bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105"
          />
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col md:grid md:grid-cols-[1.2fr_auto_1.2fr] gap-8 md:gap-12 lg:gap-20 items-stretch">
        <div className="hidden md:flex flex-col justify-between py-6 text-left">
          <h2 className="text-[2.2rem] lg:text-[2.6rem] font-normal tracking-tight uppercase leading-none select-none">
            MEET THE TEAM
          </h2>
          <div className="flex gap-8 mt-auto">
            <button onClick={handlePrev} className="cursor-pointer text-sm font-medium tracking-widest text-neutral-400 hover:text-black transition-colors duration-300 uppercase">
              PREV
            </button>
            <button onClick={handleNext} className="cursor-pointer text-sm font-medium tracking-widest text-neutral-400 hover:text-black transition-colors duration-300 uppercase">
              NEXT
            </button>
          </div>
        </div>

        <div className="flex md:hidden justify-between items-center w-full mb-2">
          <h2 className="text-xl font-normal tracking-tight uppercase">
            MEET THE TEAM
          </h2>
          <div className="text-lg font-normal tracking-widest">
            {index + 1} &nbsp;/&nbsp; {totalSlides}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <div className="relative w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] xl:w-[400px] aspect-[3/4] overflow-hidden bg-white shadow-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={index}
                custom={direction}
                variants={fgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                src={currentMember.fgImage}
                alt={currentMember.name}
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-[105%] brightness-[95%] pointer-events-none"
              />
            </AnimatePresence>
          </div>

          <div className="w-full text-center md:text-left mt-6 h-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                variants={detailsVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <h3 className="text-2xl sm:text-3xl font-normal tracking-tight uppercase leading-tight text-black">
                  {currentMember.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-widest mt-1">
                  {currentMember.role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden md:flex flex-col justify-between py-6 items-end text-right">
          <div className="text-2xl font-normal tracking-widest leading-none select-none">
            {index + 1} &nbsp;/&nbsp; {totalSlides}
          </div>

          <div className="flex items-end gap-3 h-8 mt-auto">
            {TEAM_MEMBERS.map((_, idx) => {
              const isActive = idx === index;
              return (
                <button key={idx} onClick={() => handleSelect(idx)} className="group relative cursor-pointer px-1 py-2 flex items-end justify-center">
                  <div className="w-[1.5px] bg-black transition-all duration-500" style={{ height: isActive ? '32px' : '16px', opacity: isActive ? 1 : 0.2 }} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex md:hidden justify-between items-center w-full mt-4">
          <div className="flex gap-6">
            <button onClick={handlePrev} className="cursor-pointer text-xs tracking-widest font-medium uppercase text-neutral-400 hover:text-black">
              PREV
            </button>
            <button onClick={handleNext} className="cursor-pointer text-xs tracking-widest font-medium uppercase text-neutral-400 hover:text-black">
              NEXT
            </button>
          </div>
          <div className="flex items-end gap-2 h-6">
            {TEAM_MEMBERS.map((_, idx) => {
              const isActive = idx === index;
              return (
                <button key={idx} onClick={() => handleSelect(idx)} className="px-1">
                  <div className="w-[1.5px] bg-black transition-all duration-500" style={{ height: isActive ? '20px' : '10px', opacity: isActive ? 1 : 0.2 }} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
