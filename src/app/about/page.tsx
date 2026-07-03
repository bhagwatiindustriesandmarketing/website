import Link from "next/link";
import { ArrowRight, Leaf, Shield, Heart, Award } from "lucide-react";

const philosophy = [
  {
    icon: <Leaf size={22} className="text-[#E8832A]" />,
    title: "Natural Ingredients",
    desc: "We use only the best quality raw ingredients with zero artificial preservatives, colours or additives.",
  },
  {
    icon: <Heart size={22} className="text-[#E8832A]" />,
    title: "Homemade Touch",
    desc: "Every product is crafted with the warmth and care of a home kitchen, scaled with professional hygiene standards.",
  },
  {
    icon: <Shield size={22} className="text-[#E8832A]" />,
    title: "Hygienic Manufacturing",
    desc: "Our staff follow strict cleanliness and personal hygiene principles throughout manufacturing and delivery.",
  },
  {
    icon: <Award size={22} className="text-[#E8832A]" />,
    title: "FSSAI Certified",
    desc: "All products are manufactured under FSSAI License No. 21520277000803 for your complete safety and confidence.",
  },
];

const timeline = [
  { year: "2008", event: "Founded as a home business with Kala Masala & Bhadang" },
  { year: "2010", event: "Expanded to traditional flours: Thalipeeth Bhajani, Upvas Bhajani" },
  { year: "2015", event: "Launched full range of chutneys and mukhwas" },
  { year: "2018", event: "Obtained FSSAI certification – Lic. 21520277000803" },
  { year: "2020", event: "Reached 10,000+ customers across Maharashtra" },
  { year: "2024", event: "30+ products, expanding to pan-India delivery" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-[#8B1538] to-[#6B0E28] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-cutout.png"
            alt="Bhagwati Logo"
            className="w-28 h-auto mx-auto mb-4 object-contain"
          />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Bhagwati</h1>
          <p className="text-orange-200 text-lg leading-relaxed">
            A home-grown business built on authenticity, quality, and the timeless flavours of
            Maharashtra — since 2008.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[#E8832A] font-semibold text-sm uppercase tracking-widest mb-2">
              Our Story
            </p>
            <h2 className="text-3xl font-bold text-[#2D1B00] mb-6">
              From a Home Kitchen to Maharashtra&apos;s Trusted Brand
            </h2>
            <div className="space-y-4 text-[#6B4226] leading-relaxed">
              <p>
                <strong>Bhagwati Industry and Marketing</strong> was established in 2008 as a humble
                home business in Aurangabad. What began with two products — Kala Masala and Bhadang —
                has blossomed into a brand with <strong>30+ products</strong> loved by thousands of
                families across Maharashtra.
              </p>
              <p>
                Our journey is driven by a simple belief: food should be natural, nutritious, and
                taste exactly like what your grandmother made. Every product we create carries that
                homemade spirit, combined with the hygiene and consistency of a professional operation.
              </p>
              <p>
                Today, with grand popularity and customer satisfaction, Bhagwati has successfully
                completed <strong>18+ years</strong> and continues to expand its range to meet global
                demand for authentic Indian food products.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-8 bg-[#E8832A] hover:bg-[#d4751f] text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Explore Our Products <ArrowRight size={18} />
            </Link>
          </div>

          {/* Timeline */}
          <div className="relative pl-6 border-l-2 border-[#E8832A]/30 space-y-6">
            {timeline.map((t, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-[#E8832A] border-2 border-white shadow" />
                <div className="bg-[#FFF8F0] rounded-xl p-4">
                  <div className="text-[#E8832A] font-bold text-sm mb-1">{t.year}</div>
                  <div className="text-[#2D1B00] text-sm">{t.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#E8832A] font-semibold text-sm uppercase tracking-widest mb-2">
              Our Philosophy
            </p>
            <h2 className="text-3xl font-bold text-[#2D1B00]">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow border border-orange-50">
                <div className="w-12 h-12 bg-[#FFF3E6] rounded-xl flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="font-bold text-[#2D1B00] mb-2">{p.title}</h3>
                <p className="text-sm text-[#6B4226] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#E8832A] to-[#C8A951]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience the Bhagwati Difference
          </h2>
          <p className="text-white/90 mb-8">
            Try our products and taste the authenticity of Maharashtrian home cooking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#E8832A] hover:bg-orange-50 px-6 py-3 rounded-xl font-bold transition-all"
            >
              Shop Products <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#8B1538] text-white hover:bg-[#7a1232] px-6 py-3 rounded-xl font-bold transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
