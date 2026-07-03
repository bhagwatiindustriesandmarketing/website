"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { useLanguage, labels } from "@/lib/LanguageContext";

export default function CTABanner() {
  const { language } = useLanguage();
  const t = labels[language];

  return (
    <section className="py-16 bg-gradient-to-r from-[#8B1538] to-[#6B0E28]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {t.ctaTitle}
        </h2>
        <p className="text-orange-200 text-lg mb-8">
          {t.ctaSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+919307240577"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#8B1538] hover:bg-orange-50 px-6 py-3 rounded-xl font-bold transition-all"
          >
            <Phone size={18} /> +91 9307240577
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#E8832A] hover:bg-[#d4751f] text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            {t.sendEnquiry} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
