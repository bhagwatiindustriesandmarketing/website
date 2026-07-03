"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import QuickView from "@/components/products/QuickView";
import type { Product } from "@/components/products/ProductCard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLivePrices } from "@/lib/useLivePrices";
import { applyLivePrices } from "@/lib/livePrices";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "name-az", label: "Name A–Z" },
  { value: "name-za", label: "Name Z–A" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleQuickView = useCallback((p: Product) => setQuickViewProduct(p), []);
  const handleCloseQuickView = useCallback(() => setQuickViewProduct(null), []);

  const livePrices = useLivePrices();
  const livePricedProducts = useMemo(
    () => applyLivePrices(products, livePrices),
    [livePrices]
  );

  const filtered = useMemo(() => {
    let list = livePricedProducts.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.nameMarathi.includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.ingredients.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    switch (sort) {
      case "name-az":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-za":
        list = [...list].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-low":
        list = [...list].sort(
          (a, b) =>
            Math.min(...a.variants.map((v) => v.price)) -
            Math.min(...b.variants.map((v) => v.price))
        );
        break;
      case "price-high":
        list = [...list].sort(
          (a, b) =>
            Math.min(...b.variants.map((v) => v.price)) -
            Math.min(...a.variants.map((v) => v.price))
        );
        break;
      default:
        list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [livePricedProducts, activeCategory, search, sort]);

  const activeSort = SORT_OPTIONS.find((o) => o.value === sort)!;

  return (
    <main className="min-h-screen bg-[#FFF8F0]">
      {/* Page hero bar */}
      <div className="bg-gradient-to-r from-[#8B1538] to-[#6B0E28] pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest mb-1">
            Shop Online
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Our Products</h1>
          <p className="text-white/70 mt-2 text-sm">
            50+ authentic Maharashtrian products, no preservatives
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Sort bar */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8832A]/30 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Result count */}
          <p className="text-sm text-gray-500 hidden sm:block">
            <span className="font-semibold text-gray-800">{filtered.length}</span> products
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="sm:hidden flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-3 py-2.5 rounded-xl text-sm shadow-sm"
          >
            <SlidersHorizontal size={14} /> Filter
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm hover:border-[#E8832A] transition-colors"
            >
              Sort: {activeSort.label}
              <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 min-w-[180px] overflow-hidden">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => { setSort(o.value); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors ${
                        sort === o.value ? "text-[#E8832A] font-semibold bg-orange-50" : "text-gray-700"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className={`mb-8 ${mobileFiltersOpen ? "block" : "hidden sm:block"}`}>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveCategory("all"); setMobileFiltersOpen(false); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === "all"
                  ? "bg-[#E8832A] text-white border-[#E8832A] shadow-md shadow-orange-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#E8832A] hover:text-[#E8832A]"
              }`}
            >
              🍽️ All ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat.slug).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => { setActiveCategory(cat.slug); setMobileFiltersOpen(false); }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                    activeCategory === cat.slug
                      ? "bg-[#E8832A] text-white border-[#E8832A] shadow-md shadow-orange-200"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#E8832A] hover:text-[#E8832A]"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-gray-700">No products found</p>
            <p className="text-sm mt-2">Try a different search or category</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="mt-4 px-6 py-2.5 bg-[#E8832A] text-white rounded-xl text-sm font-semibold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View modal */}
      <QuickView product={quickViewProduct} onClose={handleCloseQuickView} />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-[#E8832A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading products…
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
