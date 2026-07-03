"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useLanguage, labels } from "@/lib/LanguageContext";

const pointsEn = [
  "Started in 2008 with Kala Masala & Bhadang",
  "Now 30+ products loved across Maharashtra",
  "100% natural – no artificial preservatives or colours",
  "FSSAI certified manufacturing (Lic. 21520277000803)",
  "Homemade touch with commercial scale hygiene",
];

const pointsMr = [
  "२००८ मध्ये काळा मसाला आणि भडंगसह सुरुवात",
  "आता ३०+ उत्पादने महाराष्ट्रभर आवडली जातात",
  "१००% नैसर्गिक – कोणतेही कृत्रिम संरक्षक किंवा रंग नाहीत",
  "FSSAI प्रमाणित उत्पादन (परवाना क्र. 21520277000803)",
  "घरगुती स्पर्श आणि व्यावसायिक स्तरावरील स्वच्छता",
];

export default function AboutPreview() {
  const { language } = useLanguage();
  const t = labels[language];
  const points = language === "mr" ? pointsMr : pointsEn;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">

        {/* ── Visual panel (slides in from left) ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden relative aspect-[3/2] shadow-xl">
            <Image
              src="/brand/industry-building.png"
              alt="Bhagwati Industry & Marketing – our manufacturing unit"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 560px"
            />
            {/* Caption overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
              <h3 className="text-lg font-extrabold text-white leading-tight">भगवती इंडस्ट्री अँड मार्केटिंग</h3>
              <p className="text-[#FFD9A0] text-xs font-semibold mt-0.5">काही तरी नविन...</p>
            </div>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55, type: "spring", stiffness: 150 }}
            className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#E8832A] to-[#d4751f] text-white rounded-2xl px-5 py-3.5 shadow-xl text-center"
          >
            <div className="text-2xl font-extrabold">18+</div>
            <div className="text-xs font-medium opacity-90">{t.yearsOfTrust}</div>
          </motion.div>
        </motion.div>

        {/* ── Text (slides in from right) ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-[#E8832A] font-semibold text-sm uppercase tracking-widest mb-2">
            {t.ourStory}
          </p>
          <h2 className="section-title text-3xl sm:text-4xl font-bold text-[#2D1B00] mb-4">
            {t.aboutTitle}
          </h2>
          <p className="text-[#6B4226] leading-relaxed mb-6">
            {t.aboutDescription}
          </p>

          <ul className="space-y-3 mb-8">
            {points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                className="flex items-start gap-2.5 text-sm text-[#6B4226]"
              >
                <CheckCircle2 size={16} className="text-[#E8832A] shrink-0 mt-0.5" />
                {p}
              </motion.li>
            ))}
          </ul>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-[#8B1538] hover:bg-[#7a1232] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-rose-200 hover:-translate-y-0.5"
          >
            {t.readFullStory} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
