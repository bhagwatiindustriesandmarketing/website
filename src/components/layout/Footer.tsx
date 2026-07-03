"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { categories } from "@/lib/data";
import { useLanguage, pick, labels } from "@/lib/LanguageContext";

/** Official Instagram gradient glyph */
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="35%" stopColor="#FF543E" />
          <stop offset="65%" stopColor="#C837AB" />
          <stop offset="100%" stopColor="#5B51D8" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="url(#ig-gradient)" />
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.6" fill="none" stroke="white" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="white" strokeWidth="1.6" />
      <circle cx="17.05" cy="6.95" r="1" fill="white" />
    </svg>
  );
}

/** Official LinkedIn blue square + "in" mark */
function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <path d="M7.2 9.5H4.4V19.1H7.2V9.5Z" fill="white" />
      <path d="M5.8 8.2C6.74 8.2 7.5 7.45 7.5 6.5C7.5 5.56 6.74 4.8 5.8 4.8C4.86 4.8 4.1 5.56 4.1 6.5C4.1 7.45 4.86 8.2 5.8 8.2Z" fill="white" />
      <path d="M9.6 9.5H12.3V10.85C12.7 10.05 13.7 9.2 15.2 9.2C18 9.2 19 11 19 13.8V19.1H16.2V14.3C16.2 12.95 15.7 12 14.5 12C13.5 12 12.9 12.7 12.6 13.4C12.5 13.7 12.4 14.1 12.4 14.5V19.1H9.6V9.5Z" fill="white" />
    </svg>
  );
}

/** Gmail-red mail glyph */
function GmailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M3.5 6.5L12 13L20.5 6.5" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { language } = useLanguage();
  const t = labels[language];

  return (
    <footer className="bg-[#2D1B00] text-orange-100">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* ── Brand ── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            {/* Circular logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.png"
              alt="Bhagwati Logo"
              className="w-14 h-14 rounded-full object-contain ring-2 ring-yellow-400/60 flex-shrink-0 bg-[#3a2500]"
            />
            <div>
              <div className="text-[15px] font-extrabold text-orange-100 leading-tight">
                भगवती इंडस्ट्री अँड मार्केटिंग
              </div>
              <div className="text-[10px] text-[#E8832A] tracking-wide mt-0.5">
                काही तरी नविन...
              </div>
            </div>
          </div>

          <p className="text-sm text-orange-200 leading-relaxed mb-4">
            Established in 2008, we are Aurangabad&apos;s trusted producer of natural flours,
            chutneys, masalas and traditional Maharashtrian food products.
          </p>
          <p className="text-xs text-orange-300 mb-4">
            FSSAI Lic. No.: 21520277000803
          </p>
          <div className="flex gap-3">
            <a
              href="mailto:bhagwatiindustriesandmarketing@gmail.com"
              aria-label="Email"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
            >
              <GmailIcon size={16} />
            </a>
            <a
              href="https://wa.me/919307240577"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
            >
              <MessageCircle size={15} className="text-white" fill="white" />
            </a>
            <a
              href="https://www.instagram.com/bhagwati_indusrty_marketing?igsh=MW41M2pzeGlhZWt2YQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full overflow-hidden hover:scale-110 transition-transform shadow-sm"
            >
              <InstagramIcon size={32} />
            </a>
            <a
              href="https://www.linkedin.com/in/bhagwati-industry-and-marketing-789ab2418/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full overflow-hidden hover:scale-110 transition-transform shadow-sm"
            >
              <LinkedInIcon size={32} />
            </a>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h3 className="text-white font-semibold mb-4">{t.quickLinks}</h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: t.navHome },
              { href: "/products", label: t.allProducts },
              { href: "/about", label: t.navAbout },
              { href: "/faq", label: t.navFaq },
              { href: "/contact", label: t.navContact },
              { href: "/feedback", label: t.giveFeedback },
              { href: "/bhagwati-catalogue.pdf", label: t.downloadCatalogue, download: true },
            ].map((l) => (
              <li key={l.href}>
                {l.download ? (
                  <a
                    href={l.href}
                    download="Bhagwati-Catalogue.pdf"
                    className="hover:text-[#E8832A] transition-colors flex items-center gap-1"
                  >
                    📄 {l.label}
                  </a>
                ) : (
                  <Link href={l.href} className="hover:text-[#E8832A] transition-colors">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Categories ── */}
        <div>
          <h3 className="text-white font-semibold mb-4">{t.productCategories}</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products?category=${c.slug}`}
                  className="hover:text-[#E8832A] transition-colors"
                >
                  {pick(language, c.name, c.nameMarathi)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div>
          <h3 className="text-white font-semibold mb-4">{t.contactUs}</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin size={15} className="text-[#E8832A] shrink-0 mt-0.5" />
              <span>
                {language === "mr"
                  ? <>गट नं. ८८, सातारा परिसर,<br />औरंगाबाद, महाराष्ट्र</>
                  : <>Gat No. 88, Satara Parisar,<br />Aurangabad, Maharashtra</>}
              </span>
            </li>
            <li className="flex gap-2">
              <Phone size={15} className="text-[#E8832A] shrink-0 mt-0.5" />
              <a href="tel:+919307240577" className="hover:text-[#E8832A] transition-colors">
                +91 9307240577
              </a>
            </li>
            <li className="flex gap-2">
              <Mail size={15} className="text-[#E8832A] shrink-0 mt-0.5" />
              <a
                href="mailto:bhagwatiindustriesandmarketing@gmail.com"
                className="hover:text-[#E8832A] transition-colors break-all"
              >
                bhagwatiindustriesandmarketing@gmail.com
              </a>
            </li>
            <li className="flex gap-2">
              <Clock size={15} className="text-[#E8832A] shrink-0 mt-0.5" />
              <span>{t.businessHours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10 py-4 px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center text-xs text-orange-300">
        <span>
          © {year} Bhagwati Industry and Marketing. All rights reserved. &nbsp;|&nbsp; काही तरी नविन...
        </span>
        <span className="hidden sm:inline text-orange-300/30">|</span>
        <nav className="flex items-center gap-3">
          <Link href="/privacy-policy" className="hover:text-[#E8832A] transition-colors">
            Privacy Policy
          </Link>
          <span className="text-orange-300/30">·</span>
          <Link href="/terms" className="hover:text-[#E8832A] transition-colors">
            Terms &amp; Conditions
          </Link>
          <span className="text-orange-300/30">·</span>
          <Link href="/shipping-refund-policy" className="hover:text-[#E8832A] transition-colors">
            Shipping &amp; Refund
          </Link>
        </nav>
      </div>
    </footer>
  );
}
