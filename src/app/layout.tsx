import type { Metadata } from "next";
import { Geist, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { LanguageProvider } from "@/lib/LanguageContext";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "700", "900"],
  variable: "--font-devanagari",
  display: "swap",
});

const TITLE = "Bhagwati Industry & Marketing | Authentic Maharashtrian Food Products";
const DESCRIPTION =
  "Aurangabad's trusted producer of natural flours, chutneys, masalas, mukhwas and traditional Maharashtrian food products since 2008. FSSAI certified.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: "bhagwati, thalipeeth bhajani, shengdana chatni, bhadang, chakali, upvas bhajani, aurangabad food",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/brand/logo.png", width: 916, height: 580, alt: SITE_NAME }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/brand/logo.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "भगवती इंडस्ट्री अँड मार्केटिंग",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.png`,
  foundingDate: "2008",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gat No. 88, Satara Parisar",
    addressLocality: "Aurangabad",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9307240577",
    contactType: "customer service",
    email: "bhagwatiindustriesandmarketing@gmail.com",
    areaServed: "IN",
  },
  sameAs: [
    "https://www.instagram.com/bhagwati_indusrty_marketing",
    "https://www.linkedin.com/in/bhagwati-industry-and-marketing-789ab2418/",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${notoDevanagari.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#2D1B00] antialiased">
        <LanguageProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}
