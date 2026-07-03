"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Download, Languages } from "lucide-react";
import { useLanguage, labels } from "@/lib/LanguageContext";

const navLinks = [
  { href: "/", key: "navHome" as const },
  { href: "/products", key: "navProducts" as const },
  { href: "/about", key: "navAbout" as const },
  { href: "/faq", key: "navFaq" as const },
  { href: "/contact", key: "navContact" as const },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { language, toggle } = useLanguage();
  const t = labels[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Top utility bar ── */}
      <div
        className="text-white text-xs py-1.5 px-4 flex justify-between items-center"
        style={{ background: "linear-gradient(90deg, #6B0E28 0%, #8B1538 50%, #6B0E28 100%)" }}
      >
        <span className="hidden sm:block tracking-wide opacity-90">
          🌾 &nbsp;Established 2008 &nbsp;·&nbsp; FSSAI Lic. 21520277000803
        </span>
        <div className="flex items-center gap-3 ml-auto">
          <a
            href="tel:+919307240577"
            className="flex items-center gap-1.5 hover:text-orange-200 transition-colors font-medium"
          >
            <Phone size={11} />
            <span>+91 9307240577</span>
          </a>

          {/* ── Language toggle — product info only (name/description/price labels) ── */}
          <button
            onClick={toggle}
            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide transition-colors"
            aria-label="Switch language"
            title="Switch product language"
          >
            <Languages size={11} />
            <span className={language === "en" ? "text-white" : "text-white/50"}>EN</span>
            <span className="text-white/40">/</span>
            <span className={language === "mr" ? "text-white" : "text-white/50"}>मर</span>
          </button>
        </div>
      </div>

      {/* ── Main navigation ── */}
      <nav className="bg-white/96 backdrop-blur-md border-b border-stone-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[58px]">

          {/* ── Brand: circular logo + English & Marathi name ── */}
          <Link href="/" className="flex items-center gap-2.5 group select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.png"
              alt="Bhagwati Logo"
              className="w-10 h-10 flex-shrink-0 rounded-full object-contain ring-2 ring-yellow-300 group-hover:ring-yellow-400 transition-all duration-200"
            />
            <div className="flex flex-col leading-none">
              {/* Full Marathi company name — primary, bold, like the reference style */}
              <span className="text-[15px] font-extrabold text-[#8B1538] leading-tight tracking-wide">
                भगवती इंडस्ट्री अँड मार्केटिंग
              </span>
              {/* Tagline below — orange, small, like "DELIVERING SOLUTIONS" */}
              <span className="text-[10.5px] font-semibold text-[#E8832A] tracking-[0.08em] leading-tight mt-0.5">
                काही तरी नविन...
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      active
                        ? "text-[#8B1538] font-semibold"
                        : "text-stone-600 hover:text-[#8B1538] hover:bg-rose-50/60"
                    }`}
                  >
                    {t[link.key]}
                    {active && (
                      <span className="absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-gradient-to-r from-[#8B1538] to-[#E8832A]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── CTA + mobile toggle ── */}
          <div className="flex items-center gap-3">
            <a
              href="/bhagwati-catalogue.pdf"
              download="Bhagwati-Catalogue.pdf"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{
                background: "linear-gradient(135deg, #8B1538, #E8832A)",
                color: "white",
                boxShadow: "0 2px 8px rgba(139,21,56,0.25)",
              }}
            >
              <Download size={13} />
              {t.downloadCatalogue}
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-rose-50 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      <div
        className={`md:hidden bg-white border-t border-stone-100 transition-all duration-300 shadow-lg ${
          open ? "max-h-[calc(100vh-58px)] overflow-y-auto" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col px-4 py-3 gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-gradient-to-r from-[#8B1538] to-[#a01c44] text-white"
                      : "text-stone-700 hover:bg-rose-50 hover:text-[#8B1538]"
                  }`}
                >
                  {t[link.key]}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <a
              href="/bhagwati-catalogue.pdf"
              download="Bhagwati-Catalogue.pdf"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #8B1538, #E8832A)" }}
            >
              <Download size={14} /> {t.downloadCatalogue}
            </a>
          </li>
          <li>
            <a
              href="tel:+919307240577"
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-stone-700 hover:bg-rose-50 transition-colors"
            >
              <Phone size={14} /> +91 9307240577
            </a>
          </li>
          <li>
            <button
              onClick={toggle}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-stone-700 hover:bg-rose-50 transition-colors w-full"
            >
              <Languages size={14} />
              Product language: <span className="font-bold text-[#8B1538]">{language === "en" ? "English" : "मराठी"}</span>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
