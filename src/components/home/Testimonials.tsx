"use client";

import { useRef } from "react";
import Link from "next/link";
import { Star, Quote, MessageSquareHeart } from "lucide-react";
import { testimonials } from "@/lib/data";
import { motion, useInView } from "framer-motion";
import { useLanguage, pick, labels } from "@/lib/LanguageContext";

export default function Testimonials() {
  const { language } = useLanguage();
  const t = labels[language];
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFF8F0 0%, #FFE8CC 50%, #FFF3E6 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #E8832A 0%, transparent 70%)", transform: "translate(40%, -40%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B1538 0%, transparent 70%)", transform: "translate(-40%, 40%)" }}
      />

      {/* ── Section header with brand ── */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Brand identity in section header */}
          <div className="inline-flex flex-col items-center gap-3 mb-6">
            {/* Logo + name pill */}
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-md border border-orange-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo.png"
                alt="Bhagwati Logo"
                className="w-12 h-12 rounded-full object-contain ring-2 ring-yellow-300 flex-shrink-0"
              />
              <div className="text-left">
                <div className="text-base font-extrabold text-[#8B1538] leading-tight">
                  भगवती इंडस्ट्री अँड मार्केटिंग
                </div>
                <div className="text-[10px] font-semibold text-[#E8832A] tracking-wide mt-0.5">
                  काही तरी नविन...
                </div>
              </div>
            </div>
          </div>

          <p className="text-[#E8832A] font-semibold text-sm uppercase tracking-widest mb-2">
            {t.whatCustomersSay}
          </p>
          <h2 className="section-title center text-3xl sm:text-4xl font-bold text-[#2D1B00]">
            {t.lovedAcrossMaharashtra}
          </h2>
          <p className="mt-4 text-[#6B4226] max-w-md mx-auto text-sm">
            {t.testimonialsSubtitle}
          </p>
        </motion.div>
      </div>

      {/* ── Infinite marquee belt ── */}
      <div className="marquee-track relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #FFF3E6, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #FFF3E6, transparent)" }}
        />

        <div className="animate-marquee flex gap-5 py-4" style={{ width: "max-content" }}>
          {doubled.map((item, i) => (
            <div
              key={i}
              className="w-80 flex-shrink-0 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-orange-50 hover:border-orange-100 hover:-translate-y-1 relative group"
            >
              <div className="absolute top-4 right-4 text-orange-100 group-hover:text-orange-200 transition-colors">
                <Quote size={26} />
              </div>

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} size={13} className="text-[#C8A951] fill-[#C8A951]" />
                ))}
              </div>

              <p className="text-sm text-[#6B4226] leading-relaxed mb-4 italic pr-6">
                &ldquo;{pick(language, item.text, item.textMarathi)}&rdquo;
              </p>

              <div className="border-t border-orange-100 pt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8832A] to-[#8B1538] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[#2D1B00] text-sm leading-tight">{item.name}</div>
                  <div className="text-xs text-[#E8832A]">{item.location}</div>
                  <div className="text-xs text-[#6B4226] mt-0.5">
                    {t.bought}: {pick(language, item.product, item.productMarathi)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center mt-10">
        <Link
          href="/feedback"
          className="inline-flex items-center gap-2 bg-white border border-orange-200 text-[#8B1538] font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:border-[#E8832A] transition-all"
        >
          <MessageSquareHeart size={17} className="text-[#E8832A]" />
          {t.shareYourExperience}
        </Link>
      </div>
    </section>
  );
}
