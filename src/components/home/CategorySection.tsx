"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/lib/data";
import { motion, useInView } from "framer-motion";
import { useLanguage, pick, labels } from "@/lib/LanguageContext";

export default function CategorySection() {
  const { language } = useLanguage();
  const t = labels[language];
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#E8832A] font-semibold text-sm uppercase tracking-widest mb-2">
            {t.whatWeMake}
          </p>
          <h2 className="section-title center text-3xl sm:text-4xl font-bold text-[#2D1B00]">
            {t.ourProductCategories}
          </h2>
          <p className="mt-4 text-[#6B4226] max-w-xl mx-auto">
            {t.categoriesSubtitle}
          </p>
        </motion.div>
      </div>

      {/* ── Manual arrow-controlled carousel — big cards, no auto-slide ── */}
      <div className="relative max-w-7xl mx-auto">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }} />

        {/* Arrows — visible on all screen sizes so mobile users know they can browse */}
        <button onClick={() => scroll(-1)} aria-label="Previous"
          className="flex absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-[#8B1538] hover:bg-[#8B1538] hover:text-white transition-colors">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => scroll(1)} aria-label="Next"
          className="flex absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-[#8B1538] hover:bg-[#8B1538] hover:text-white transition-colors">
          <ChevronRight size={18} />
        </button>

        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 sm:px-10 lg:px-16 py-2"
        >
          {categories.map((cat) => {
            const displayName = pick(language, cat.name, cat.nameMarathi);
            const displayDescription = pick(language, cat.description, cat.descriptionMarathi);
            return (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group flex-shrink-0 snap-start w-72 sm:w-80 lg:w-[22rem] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl border border-gray-100 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Big, clean light backdrop — full image, never cropped */}
                <div className={`relative h-64 sm:h-72 lg:h-80 bg-gradient-to-br ${cat.color} overflow-hidden`}>
                  {cat.image && (
                    <Image
                      src={cat.image}
                      alt={displayName}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 80vw, 360px"
                    />
                  )}
                  {/* Secondary-language badge */}
                  <div className="absolute top-3 right-3 bg-white/85 backdrop-blur-sm text-[#8B1538] text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {pick(language, cat.nameMarathi, cat.name)}
                  </div>
                  {/* Soft podium shadow under product, like a studio shot */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-3 rounded-full bg-black/10 blur-md" />
                </div>

                {/* Solid colour label bar — Ravimagic-style */}
                <div className="bg-gradient-to-r from-[#8B1538] to-[#6B0E28] px-5 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight">{displayName}</h3>
                    <p className="text-white/65 text-sm mt-0.5 line-clamp-1">{displayDescription}</p>
                  </div>
                  <ArrowRight size={18} className="text-[#E8832A] flex-shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border-2 border-[#E8832A] text-[#E8832A] hover:bg-[#E8832A] hover:text-white px-7 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-200"
          >
            {t.viewAllProducts} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
