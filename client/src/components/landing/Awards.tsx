import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Star, Award, Zap, Globe, Shield, Heart, TrendingUp } from "lucide-react";

const awards = [
  {
    icon: Trophy,
    title: "Best Travel App",
    org: "Sri Lanka Tourism Awards",
    year: "2025",
    category: "Grand Prize",
    description: "Recognized as the most innovative travel companion for Sri Lanka.",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    ribbon: "bg-amber-500",
    shimmer: true,
  },
  {
    icon: Star,
    title: "Editor's Choice",
    org: "Apple App Store",
    year: "2025",
    category: "iOS",
    description: "Hand-picked by Apple editors for exceptional design and utility.",
    color: "text-gray-800",
    bg: "bg-gray-50",
    border: "border-gray-200",
    ribbon: "bg-gray-700",
    shimmer: false,
  },
  {
    icon: Award,
    title: "Top Travel App",
    org: "Google Play Store",
    year: "2024",
    category: "Android",
    description: "Featured in Google Play's curated Best Apps collection.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    ribbon: "bg-green-500",
    shimmer: false,
  },
  {
    icon: Zap,
    title: "Product of the Day",
    org: "Product Hunt",
    year: "2024",
    category: "Tech",
    description: "Launched to global acclaim — #1 Product of the Day on launch.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    ribbon: "bg-orange-500",
    shimmer: false,
  },
  {
    icon: Globe,
    title: "Innovation Award",
    org: "SLTDA",
    year: "2024",
    category: "Tourism",
    description: "Sri Lanka Tourism Development Authority recognition for innovation.",
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/20",
    ribbon: "bg-primary",
    shimmer: false,
  },
  {
    icon: Shield,
    title: "Safety Excellence",
    org: "Travel Safety Alliance",
    year: "2025",
    category: "Safety",
    description: "Awarded for outstanding contribution to traveler safety technology.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    ribbon: "bg-emerald-500",
    shimmer: false,
  },
  {
    icon: Heart,
    title: "Community Choice",
    org: "TripAdvisor Community",
    year: "2025",
    category: "People's Choice",
    description: "Voted by 10,000+ travelers as the most helpful travel tool.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    ribbon: "bg-rose-500",
    shimmer: false,
  },
  {
    icon: TrendingUp,
    title: "Fastest Growing App",
    org: "App Annie",
    year: "2024",
    category: "Growth",
    description: "Ranked #1 fastest growing travel app in South Asia.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    ribbon: "bg-violet-500",
    shimmer: false,
  },
];

function AwardCard({ award, index }: { award: typeof awards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`relative bg-white rounded-3xl border ${award.border} overflow-hidden group hover:shadow-xl transition-all duration-400`}
    >
      {/* Top ribbon */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${award.ribbon}`} />

      {/* Shimmer overlay for top award */}
      {award.shimmer && (
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 pointer-events-none skew-x-12"
        />
      )}

      <div className="p-6">
        {/* Year + Category */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${award.bg} ${award.color} border ${award.border}`}>
            {award.category}
          </span>
          <span className="text-xs font-semibold text-muted-foreground">{award.year}</span>
        </div>

        {/* Icon */}
        <div className={`w-14 h-14 ${award.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <award.icon className={`w-7 h-7 ${award.color}`} />
        </div>

        {/* Title */}
        <h3 className={`text-lg font-serif font-bold ${award.color} mb-1`}>{award.title}</h3>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{award.org}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{award.description}</p>
      </div>
    </motion.div>
  );
}

export default function Awards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold tracking-widest uppercase mb-5 border border-amber-200">
            <Trophy className="w-3.5 h-3.5" />
            Awards & Recognition
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Recognized by the{" "}
            <span className="text-primary italic">world's best</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            From app stores to tourism boards — Seygo has been recognized for redefining
            how travelers experience Sri Lanka.
          </p>
        </motion.div>

        {/* Main award — hero card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-10 relative bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-3xl p-8 md:p-10 text-white overflow-hidden shadow-2xl shadow-amber-300/40"
        >
          {/* Shimmer */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 2 }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
          />
          <div className="flex items-start gap-6 relative z-10">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full mb-3 inline-block">
                Grand Prize · 2025
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                Best Travel App of the Year
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Sri Lanka Tourism Awards — the most prestigious recognition in the island's
                travel and hospitality industry. Judged by 200+ industry professionals.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Award Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {awards.slice(1).map((award, i) => (
            <AwardCard key={award.title} award={award} index={i} />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto text-center"
        >
          {[
            { value: "12", label: "Total Awards" },
            { value: "3", label: "Countries" },
            { value: "2", label: "Years Running" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-serif font-bold text-primary">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
