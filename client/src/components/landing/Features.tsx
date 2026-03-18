import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Music,
  Shield,
  Compass,
  Heart,
  ArrowRight,
  Check,
  Zap,
  Globe,
  Star,
} from "lucide-react";

const categories = [
  { id: "explore", label: "Explore", icon: Globe },
  { id: "navigate", label: "Navigate", icon: Compass },
  { id: "safety", label: "Stay Safe", icon: Shield },
];

const features = [
  {
    category: "explore",
    icon: MapPin,
    title: "Hidden Gems",
    description:
      "Discover secret waterfalls, secluded beaches, and local eateries that aren't in any guidebook. Every location is verified by people who actually live there.",
    bullets: [
      "200+ locally verified spots",
      "Photo-verified locations",
      "Updated weekly by the community",
    ],
    accent: "primary",
    tag: "Most Popular",
  },
  {
    category: "explore",
    icon: Music,
    title: "Travel Playlists",
    description:
      "Curated audio journeys that sync with your route. Learn about history and culture while you drive through Sri Lanka's most breathtaking landscapes.",
    bullets: [
      "50+ original audio stories",
      "Available in 3 languages",
      "Works offline",
    ],
    accent: "secondary",
    tag: "Fan Favorite",
  },
  {
    category: "explore",
    icon: Heart,
    title: "Authentic Experiences",
    description:
      "Connect directly with local artisans, families, and community guides for genuinely immersive cultural exchanges you'll never forget.",
    bullets: [
      "Book local guides in-app",
      "Cultural workshops & homestays",
      "Rated & reviewed by travelers",
    ],
    accent: "rose",
    tag: "Unique",
  },
  {
    category: "navigate",
    icon: Compass,
    title: "Smart Navigation",
    description:
      "Offline-first maps designed specifically for Sri Lankan roads, jungle paths, and coastal routes. Works without any cell signal.",
    bullets: [
      "Full offline capability",
      "Monastic road warnings",
      "Fuel station alerts on route",
    ],
    accent: "violet",
    tag: "Built for SL",
  },
  {
    category: "safety",
    icon: Shield,
    title: "Safety First",
    description:
      "Verified emergency contacts, weather advisories, and a trusted community of guides to keep you safe throughout your journey.",
    bullets: [
      "One-tap emergency call",
      "Verified guide network",
      "Weather & road advisories",
    ],
    accent: "emerald",
    tag: "Essential",
  },
];

const accentMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
    badge: "bg-primary text-white",
  },
  secondary: {
    bg: "bg-secondary/10",
    text: "text-secondary",
    border: "border-secondary/20",
    badge: "bg-secondary text-white",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-200",
    badge: "bg-rose-500 text-white",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-200",
    badge: "bg-violet-500 text-white",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    badge: "bg-amber-500 text-white",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    badge: "bg-emerald-500 text-white",
  },
};

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const colors = accentMap[feature.accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`bg-white p-8 rounded-3xl border ${colors.border} shadow-sm hover:shadow-xl transition-all duration-400 group relative overflow-hidden`}
    >
      {/* Background accent */}
      <div
        className={`absolute top-0 right-0 w-40 h-40 ${colors.bg} rounded-bl-full opacity-50 group-hover:opacity-80 transition-opacity pointer-events-none`}
      />

      {/* Tag */}
      {feature.tag && (
        <span className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full ${colors.badge} uppercase tracking-wide`}>
          {feature.tag}
        </span>
      )}

      {/* Icon */}
      <div
        className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center ${colors.text} mb-5 group-hover:scale-110 transition-transform duration-300 relative z-10`}
      >
        <feature.icon className="w-7 h-7" />
      </div>

      {/* Text */}
      <h3 className="text-xl font-serif font-bold mb-3 text-foreground relative z-10">
        {feature.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-5 relative z-10 text-sm">
        {feature.description}
      </p>

      {/* Bullets */}
      <ul className="space-y-2 relative z-10">
        {feature.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-sm">
            <div className={`w-4 h-4 ${colors.bg} rounded-full flex items-center justify-center shrink-0`}>
              <Check className={`w-2.5 h-2.5 ${colors.text}`} />
            </div>
            <span className="text-foreground/75">{b}</span>
          </li>
        ))}
      </ul>

      {/* Learn more hover link */}
      <div className={`mt-5 flex items-center gap-1.5 text-sm font-semibold ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity relative z-10`}>
        Learn more <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </motion.div>
  );
}

export default function Features() {
  const [activeCategory, setActiveCategory] = useState("explore");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = features.filter((f) => f.category === activeCategory);

  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-5 border border-primary/20">
            <Zap className="w-3.5 h-3.5" />
            Why Seygo?
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-2 mb-5 text-foreground leading-tight">
            More than just a map.{" "}
            <span className="text-primary italic">Your personal</span>{" "}
            travel companion.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We combine local wisdom with modern technology to give you the most authentic
            Sri Lankan experience possible — from discovery to navigation to staying safe.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex bg-gray-100 rounded-2xl p-1.5 gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Feature Cards — animated on tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground border-t border-gray-100 pt-12"
        >
          {[
            { icon: Star, text: "4.9★ App Rating" },
            { icon: Shield, text: "100% Verified Locations" },
            { icon: Globe, text: "Available Worldwide" },
            { icon: Compass, text: "Full Offline Support" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
