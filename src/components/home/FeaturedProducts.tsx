"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import QuickView from "@/components/products/QuickView";
import type { Product } from "@/components/products/ProductCard";
import { motion, useInView } from "framer-motion";
import { useLivePrices } from "@/lib/useLivePrices";
import { applyLivePrices } from "@/lib/livePrices";
import { useLanguage, labels } from "@/lib/LanguageContext";

export default function FeaturedProducts() {
  const { language } = useLanguage();
  const t = labels[language];
  const livePrices = useLivePrices();
  const featured = applyLivePrices(products.filter((p) => p.featured), livePrices);
  const doubled = [...featured, ...featured];

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const handleQuickView = useCallback((p: Product) => setQuickViewProduct(p), []);
  const handleClose = useCallback(() => setQuickViewProduct(null), []);

  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-[#F9F5F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-[#E8832A] font-semibold text-sm uppercase tracking-widest mb-1">
              {t.customerFavourites}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1B00]">
              {t.featuredProducts}
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1.5 text-[#E8832A] font-semibold text-sm hover:gap-3 transition-all duration-200"
          >
            {t.viewAll} <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>

      {/* ── Slow, continuous auto-slide (same belt mechanic as Testimonials, big cards) ── */}
      <div className="marquee-track relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #F9F5F0, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #F9F5F0, transparent)" }} />

        <div
          className="animate-marquee flex gap-5 py-2"
          style={{ width: "max-content", animationDuration: "70s" }}
        >
          {doubled.map((product, i) => (
            <div key={`${product.slug}-${i}`} className="w-64 sm:w-72 lg:w-80 flex-shrink-0">
              <ProductCard product={product} onQuickView={handleQuickView} />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-10 sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#E8832A] hover:bg-[#d4751f] text-white px-8 py-3 rounded-xl font-semibold transition-all"
          >
            {t.seeAllProducts} <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <QuickView product={quickViewProduct} onClose={handleClose} />
    </section>
  );
}
