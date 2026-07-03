"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Phone, Clock, Leaf, ChefHat, ShoppingBag, BookOpen } from "lucide-react";
import type { Product } from "./ProductCard";
import { categories } from "@/lib/data";
import { useLanguage, pick, labels } from "@/lib/LanguageContext";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: Props) {
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  const { language } = useLanguage();
  const t = labels[language];

  if (!product) return null;

  const cat = categories.find((c) => c.slug === product.category);
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const displayName = pick(language, product.name, product.nameMarathi);
  const displayDescription = pick(language, product.description, product.descriptionMarathi);
  const displayIngredients = pick(language, product.ingredients, product.ingredientsMarathi);
  const displayUsage = pick(language, product.usage, product.usageMarathi);
  const displayRecipe = pick(language, product.recipe ?? "", product.recipeMarathi);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col sm:flex-row animate-scale-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur text-gray-700 hover:text-[#E8832A] hover:bg-white rounded-full p-1.5 shadow transition-colors"
        >
          <X size={18} />
        </button>

        {/* Left – image */}
        <div className="sm:w-2/5 relative bg-gray-50 min-h-60 sm:min-h-full">
          {product.image ? (
            <Image
              src={product.image}
              alt={displayName}
              fill
              className="object-contain p-5"
              sizes="(max-width: 640px) 100vw, 40vw"
              priority
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${cat?.color ?? "from-orange-50 to-amber-100"} flex items-center justify-center`}>
              <span className="text-8xl">{product.emoji}</span>
            </div>
          )}

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-[#E8832A] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              ★ {t.popular}
            </div>
          )}
        </div>

        {/* Right – details */}
        <div className="sm:w-3/5 overflow-y-auto p-6 flex flex-col">
          {/* Category */}
          <p className="text-xs font-semibold text-[#E8832A] uppercase tracking-widest mb-1">
            {cat?.name} · {cat?.nameMarathi}
          </p>

          {/* Name */}
          <h2 className="text-2xl font-bold text-[#2D1B00] leading-tight mb-0.5">
            {displayName}
          </h2>
          <p className="text-sm text-[#8B1538] font-medium mb-3">
            {pick(language, product.nameMarathi, product.name)}
          </p>

          {/* Price */}
          <div className="flex items-end gap-2 mb-4">
            <span className="text-3xl font-bold text-[#E8832A]">₹{lowestPrice}</span>
            <span className="text-sm text-gray-400 pb-1">{t.onwards}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{displayDescription}</p>

          {/* Info rows */}
          <div className="space-y-2.5 mb-5">
            <div className="flex gap-2 items-start">
              <div className="mt-0.5 text-[#E8832A]"><Leaf size={14} /></div>
              <div>
                <span className="text-xs font-bold text-[#2D1B00]">{t.ingredients}: </span>
                <span className="text-xs text-gray-600">{displayIngredients}</span>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <div className="mt-0.5 text-[#E8832A]"><ChefHat size={14} /></div>
              <div>
                <span className="text-xs font-bold text-[#2D1B00]">{t.useFor}: </span>
                <span className="text-xs text-gray-600">{displayUsage}</span>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <div className="mt-0.5 text-[#E8832A]"><Clock size={14} /></div>
              <div>
                <span className="text-xs font-bold text-[#2D1B00]">{t.shelfLife}: </span>
                <span className="text-xs text-gray-600">{product.shelfLife}</span>
              </div>
            </div>
          </div>

          {/* Recipe — only shown when the product has one */}
          {displayRecipe && (
            <div className="mb-5 bg-[#FFF8F0] border border-orange-100 rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen size={14} className="text-[#E8832A]" />
                <span className="text-xs font-bold text-[#2D1B00] uppercase tracking-wide">
                  {t.recipe}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{displayRecipe}</p>
            </div>
          )}

          {/* Variants */}
          <div className="mb-5">
            <p className="text-xs font-bold text-[#2D1B00] uppercase tracking-wide mb-2">
              {t.availableSizes}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {product.variants.map((v) => (
                <div
                  key={v.weight}
                  className="flex items-center justify-between bg-[#FFF8F0] border border-orange-100 rounded-xl px-3 py-2.5"
                >
                  <div className="flex items-center gap-1.5">
                    <ShoppingBag size={12} className="text-[#E8832A]" />
                    <span className="text-xs font-semibold text-[#2D1B00]">{v.weight}</span>
                  </div>
                  <span className="text-[#E8832A] font-bold text-sm">₹{v.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FSSAI note */}
          <p className="text-[10px] text-gray-400 mb-4">
            ✅ FSSAI Lic. 21520277000803 · 100% Natural · No Preservatives
          </p>

          {/* CTA */}
          <div className="flex gap-3 mt-auto">
            <a
              href="tel:+919307240577"
              className="flex-1 flex items-center justify-center gap-2 bg-[#E8832A] hover:bg-[#d4751f] text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-lg shadow-orange-200"
            >
              <Phone size={15} /> Order on Call
            </a>
            <a
              href="https://wa.me/919307240577"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
