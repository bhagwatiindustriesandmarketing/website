"use client";

import Image from "next/image";
import { Eye, Phone, Star, Sparkles } from "lucide-react";
import { categories } from "@/lib/data";
import { useLanguage, pick, labels } from "@/lib/LanguageContext";

type Variant = { weight: string; price: number };
export type Product = {
  id: number;
  slug: string;
  name: string;
  nameMarathi: string;
  category: string;
  description: string;
  descriptionMarathi?: string;
  ingredients: string;
  ingredientsMarathi?: string;
  usage: string;
  usageMarathi?: string;
  recipe?: string;
  recipeMarathi?: string;
  variants: Variant[];
  shelfLife: string;
  emoji: string;
  featured?: boolean;
  isNew?: boolean;
  image?: string;
};

// Category → background color for the image area (like ravimagic's clean product backgrounds)
const catBg: Record<string, string> = {
  flour:   "bg-amber-50",
  chatni:  "bg-orange-50",
  mukhwas: "bg-emerald-50",
  sweets:  "bg-yellow-50",
  snacks:  "bg-orange-50",
  masala:  "bg-red-50",
};

interface Props {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: Props) {
  const { language } = useLanguage();
  const t = labels[language];
  const cat = categories.find((c) => c.slug === product.category);
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const bg = catBg[product.category] ?? "bg-gray-50";
  const displayName = pick(language, product.name, product.nameMarathi);
  const displayDescription = pick(language, product.description, product.descriptionMarathi);

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">

      {/* ── Image block ────────────────────────────────────────── */}
      <div className={`relative overflow-hidden ${bg}`} style={{ aspectRatio: "1/1" }}>

        {product.image ? (
          <>
            <Image
              src={product.image}
              alt={displayName}
              fill
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Soft podium shadow for a clean studio-shot feel */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-2.5 rounded-full bg-black/10 blur-md" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl">{product.emoji}</span>
          </div>
        )}

        {/* Hover overlay with Quick View */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <button
            onClick={() => onQuickView?.(product)}
            className="flex items-center gap-1.5 bg-white text-[#2D1B00] text-xs font-bold px-5 py-2 rounded-full shadow-lg hover:bg-[#E8832A] hover:text-white transition-colors translate-y-3 group-hover:translate-y-0 duration-300"
          >
            <Eye size={13} /> {t.quickView}
          </button>
        </div>

        {/* Badges — New Launch takes top priority, Popular stacks below */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5 items-start">
          {product.isNew && (
            <div className="bg-[#8B1538] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles size={8} className="text-[#FFD9A0]" /> {t.newLaunch}
            </div>
          )}
          {product.featured && (
            <div className="bg-[#E8832A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Star size={8} fill="white" /> {t.popular}
            </div>
          )}
        </div>

        {/* Category pill */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#8B1538] text-[10px] font-semibold px-2 py-0.5 rounded-full z-10">
          {cat?.nameMarathi}
        </div>
      </div>

      {/* ── Card body ──────────────────────────────────────────── */}
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-[10px] text-[#E8832A] font-semibold uppercase tracking-wide mb-0.5">
          {cat?.name}
        </p>
        <h3 className="font-bold text-[#2D1B00] text-sm leading-snug line-clamp-2">
          {displayName}
        </h3>
        <p className="text-xs text-[#8B1538] font-medium mb-2">
          {pick(language, product.nameMarathi, product.name)}
        </p>

        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-1 mb-3">
          {displayDescription}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] text-gray-400 leading-none mb-0.5">{t.startingFrom}</p>
            <p className="text-[#E8832A] font-bold text-lg leading-none">₹{lowestPrice}</p>
          </div>
          {product.variants.length > 1 && (
            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {product.variants.length} {t.sizes}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href="tel:+919307240577"
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#E8832A] hover:bg-[#d4751f] text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
          >
            <Phone size={12} /> {t.orderNow}
          </a>
          <button
            onClick={() => onQuickView?.(product)}
            className="w-10 flex items-center justify-center border border-[#E8832A] text-[#E8832A] hover:bg-[#E8832A] hover:text-white rounded-lg transition-colors"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
