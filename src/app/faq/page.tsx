"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, CheckCircle, Send } from "lucide-react";
import { faqs } from "@/lib/data";
import { submitForm } from "@/lib/submitForm";
import { useLanguage, pick, labels } from "@/lib/LanguageContext";

export default function FAQPage() {
  const { language } = useLanguage();
  const t = labels[language];

  const faqCategories = [
    { key: "all", label: t.faqCatAll },
    { key: "products", label: t.faqCatProducts },
    { key: "ordering", label: t.faqCatOrdering },
    { key: "business", label: t.faqCatBusiness },
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const [askOpen, setAskOpen] = useState(false);
  const [askForm, setAskForm] = useState({ name: "", contact: "", question: "" });
  const [askSubmitted, setAskSubmitted] = useState(false);
  const [askLoading, setAskLoading] = useState(false);

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAskLoading(true);
    await submitForm({ type: "faq", name: askForm.name, contact: askForm.contact, question: askForm.question });
    setAskSubmitted(true);
    setAskLoading(false);
  };

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "all" || f.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.questionMarathi?.toLowerCase().includes(q) ||
      f.answerMarathi?.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-[#8B1538] to-[#6B0E28] text-white text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">{t.faqHeroTitle}</h1>
        <p className="text-orange-200 text-lg">{t.faqHeroSubtitle}</p>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B4226]/40" />
          <input
            type="text"
            placeholder={t.faqSearchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-orange-200 bg-white text-sm text-[#2D1B00] placeholder-[#6B4226]/40 focus:outline-none focus:ring-2 focus:ring-[#E8832A]/30"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {faqCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-[#E8832A] text-white shadow"
                  : "bg-white border border-orange-200 text-[#6B4226] hover:border-[#E8832A]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#6B4226]">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-semibold">{t.faqNoneFound}</p>
            <p className="text-sm mt-1">{t.faqTryDifferent}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                    isOpen ? "border-[#E8832A] shadow-md" : "border-orange-100 hover:border-orange-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-[#2D1B00] text-sm sm:text-base leading-snug">
                      {pick(language, faq.question, faq.questionMarathi)}
                    </span>
                    <span className="text-[#E8832A] shrink-0 mt-0.5">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-[#6B4226] leading-relaxed border-t border-orange-50 pt-3 whitespace-pre-line">
                      {pick(language, faq.answer, faq.answerMarathi)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still have questions */}
        <div className="mt-12 bg-gradient-to-r from-[#E8832A] to-[#C8A951] rounded-2xl p-8 text-center text-white">
          {askSubmitted ? (
            <div className="flex flex-col items-center py-2">
              <CheckCircle size={40} className="mb-3" />
              <h3 className="text-xl font-bold mb-1">{t.faqQuestionSent}</h3>
              <p className="text-white/90 text-sm">{t.faqQuestionSentSubtitle}</p>
              <button
                onClick={() => { setAskSubmitted(false); setAskOpen(false); setAskForm({ name: "", contact: "", question: "" }); }}
                className="mt-4 text-white font-semibold hover:underline text-sm"
              >
                {t.faqAskAnother}
              </button>
            </div>
          ) : !askOpen ? (
            <>
              <h3 className="text-xl font-bold mb-2">{t.faqStillHaveQuestion}</h3>
              <p className="text-white/90 text-sm mb-4">{t.faqStillHaveQuestionSubtitle}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="tel:+919307240577"
                  className="inline-block bg-white text-[#E8832A] font-bold px-6 py-2.5 rounded-xl hover:bg-orange-50 transition-colors"
                >
                  📞 +91 9307240577
                </a>
                <button
                  onClick={() => setAskOpen(true)}
                  className="inline-block bg-white/15 border border-white/40 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/25 transition-colors"
                >
                  ✍️ {t.faqAskYourQuestion}
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleAskSubmit} className="text-left max-w-md mx-auto space-y-3">
              <h3 className="text-xl font-bold mb-2 text-center">{t.faqAskYourQuestion}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  placeholder={t.faqNamePlaceholder}
                  value={askForm.name}
                  onChange={(e) => setAskForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  placeholder={t.faqContactPlaceholder}
                  value={askForm.contact}
                  onChange={(e) => setAskForm((p) => ({ ...p, contact: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <textarea
                required
                placeholder={t.faqQuestionPlaceholder}
                rows={3}
                value={askForm.question}
                onChange={(e) => setAskForm((p) => ({ ...p, question: e.target.value }))}
                className="w-full rounded-xl px-4 py-2.5 text-sm text-[#2D1B00] focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
              />
              <div className="flex items-center justify-center gap-3">
                <button
                  type="submit"
                  disabled={askLoading}
                  className="flex items-center gap-2 bg-white text-[#E8832A] font-bold px-6 py-2.5 rounded-xl hover:bg-orange-50 disabled:opacity-60 transition-colors"
                >
                  {askLoading ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-[#E8832A] border-t-transparent" />
                  ) : (
                    <Send size={15} />
                  )}
                  {askLoading ? t.faqSending : t.faqSendQuestion}
                </button>
                <button
                  type="button"
                  onClick={() => setAskOpen(false)}
                  className="text-white/80 text-sm hover:underline"
                >
                  {t.faqCancel}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
