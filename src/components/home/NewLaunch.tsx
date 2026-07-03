"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Phone } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { products } from "@/lib/data";
import { useLivePrices } from "@/lib/useLivePrices";
import { applyLivePrices } from "@/lib/livePrices";
import QuickView from "@/components/products/QuickView";
import type { Product } from "@/components/products/ProductCard";
import { useLanguage, pick } from "@/lib/LanguageContext";

export default function NewLaunch() {
  const rawProduct = products.find((p) => p.isNew);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [quickView, setQuickView] = useState<Product | null>(null);
  const { language } = useLanguage();
  const livePrices = useLivePrices();

  if (!rawProduct) return null;

  const [product] = applyLivePrices([rawProduct], livePrices);
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const displayName = pick(language, product.name, product.nameMarathi);
  const displayDescription = pick(language, product.description, product.descriptionMarathi);

  return (
    <section
      ref={ref}
      className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #C8A951 0%, #E8832A 55%, #d4751f 100%)" }}
    >
      {/* Decorative glow — same warm tones, no off-brand hues */}
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFF3E6, transparent 70%)" }} />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B1538, transparent 70%)" }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden grid sm:grid-cols-2 items-stretch"
        >
          {/* Image */}
          <div className="relative aspect-square sm:aspect-auto bg-amber-50">
            {product.image && (
              <Image
                src={product.image}
                alt={displayName}
                fill
                className="object-contain p-8"
                sizes="(max-width: 640px) 100vw, 480px"
              />
            )}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#8B1538] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              <Sparkles size={13} className="text-[#FFD9A0]" /> NEW LAUNCH
            </div>
          </div>

          {/* Details */}
          <div className="p-7 sm:p-9 flex flex-col justify-center">
            <p className="text-[#E8832A] font-semibold text-sm uppercase tracking-widest mb-2">
              Just Arrived · आता उपलब्ध
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B00] mb-1">{displayName}</h2>
            <p className="text-[#8B1538] font-medium text-sm mb-4">
              {pick(language, product.nameMarathi, product.name)}
            </p>
            <p className="text-[#6B4226] leading-relaxed mb-5">{displayDescription}</p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-[#E8832A]">₹{lowestPrice}</span>
              <span className="text-sm text-gray-400">onwards</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setQuickView(product)}
                className="inline-flex items-center gap-2 bg-[#8B1538] hover:bg-[#7a1232] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-200"
              >
                Try It Now <ArrowRight size={18} />
              </button>
              <a
                href="tel:+919307240577"
                className="inline-flex items-center gap-2 bg-[#FFF3E6] hover:bg-orange-100 text-[#8B1538] border border-orange-200 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                <Phone size={16} /> Order Now
              </a>
            </div>

            <Link
              href={`/products?category=${product.category}`}
              className="text-sm text-[#6B4226] hover:text-[#E8832A] mt-4 inline-flex items-center gap-1 transition-colors"
            >
              See more {product.category === "flour" ? "flours" : "products"} <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      </div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
