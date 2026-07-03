"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { src: "/brand/mukhwas-banner-new3.png",      alt: "Bhagwati Mukhwas Range – Sugandhi Supari, Til-Ova, Javas Mukhwas" },
  { src: "/brand/chutneys-banner-new2.png",     alt: "Bhagwati Authentic Dry Chutneys" },
  { src: "/brand/diwali-faral-banner-new.png",  alt: "Bhagwati Diwali Faral Collection" },
  { src: "/brand/upvas-special-banner-new.png", alt: "Bhagwati Navratri Upvas Special" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const goTo = (idx: number) => setCurrent((idx + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(t);
  }, [current]);

  return (
    <section
      className="relative w-full mt-[90px] aspect-[12/5] max-h-[700px] min-h-[320px] overflow-hidden"
      style={{ background: "linear-gradient(135deg, #8B1538 0%, #6B0E28 100%)" }}
    >
      {/* ── Full, clear image — object-contain so nothing is ever cropped ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Carousel controls ── */}
      <button onClick={() => goTo(current - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 rounded-full transition-all border border-white/20 hover:scale-110"
        aria-label="Previous">
        <ChevronLeft size={20} />
      </button>
      <button onClick={() => goTo(current + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 rounded-full transition-all border border-white/20 hover:scale-110"
        aria-label="Next">
        <ChevronRight size={20} />
      </button>

      {/* ── Slide dots ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-7 h-2 bg-[#E8832A] shadow-lg shadow-orange-500/50" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
