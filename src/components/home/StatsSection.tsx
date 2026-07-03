"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Package, Users, Leaf } from "lucide-react";
import { stats } from "@/lib/data";
import { useLanguage, labels } from "@/lib/LanguageContext";

const icons = [Award, Package, Users, Leaf];
const iconColors = [
  "from-orange-400 to-amber-500",
  "from-rose-400 to-pink-500",
  "from-emerald-400 to-teal-500",
  "from-lime-400 to-green-500",
];
// Maps stats[] order to the translation dictionary keys
const labelKeys = ["yearsOfExcellence", "productsAvailable", "happyCustomers", "naturalIngredients"] as const;

/** Parse "18+" → { num: 18, suffix: "+" } */
function parseValue(val: string) {
  const m = val.match(/^(\d+)(.*)/);
  return m ? { num: parseInt(m[1]), suffix: m[2] } : { num: 0, suffix: val };
}

function CountUp({
  target,
  duration = 1600,
  active,
}: {
  target: number;
  duration?: number;
  active: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return <>{active ? value : 0}</>;
}

function StatCard({
  stat,
  index,
  inView,
}: {
  stat: (typeof stats)[0];
  index: number;
  inView: boolean;
}) {
  const { language } = useLanguage();
  const { num, suffix } = parseValue(stat.value);
  const Icon = icons[index];
  const label = labels[language][labelKeys[index]];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="group relative text-center p-6 sm:p-8 rounded-2xl bg-white/10 hover:bg-white/16 backdrop-blur-sm border border-white/15 hover:border-white/30 transition-all duration-300 overflow-hidden"
    >
      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 30px rgba(232,131,42,0.08)" }} />

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${iconColors[index]} mb-4 shadow-lg`}
      >
        <Icon size={21} className="text-white" />
      </div>

      {/* Number */}
      <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1 tabular-nums">
        <CountUp target={num} active={inView} />
        {suffix}
      </div>

      <div className="text-orange-200/90 text-sm font-medium">{label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-16 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #6B0E28 0%, #5a0b22 50%, #4a081c 100%)",
      }}
    >
      {/* Dot-grid decoration */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Radial light blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #E8832A, transparent 70%)" }} />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #C8A951, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
