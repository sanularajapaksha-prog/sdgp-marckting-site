import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Award, TrendingUp } from "lucide-react";

const pressLogos = [
  {
    name: "TechCrunch",
    quote: "The app that's redefining how tourists explore Sri Lanka",
    category: "Technology",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
    initial: "TC",
    year: "2025",
  },
  {
    name: "Lonely Planet",
    quote: "A must-have for anyone planning a trip to the island",
    category: "Travel",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    initial: "LP",
    year: "2025",
  },
  {
    name: "Forbes Travel",
    quote: "One of the 10 best travel apps of the year",
    category: "Business",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    initial: "FT",
    year: "2024",
  },
  {
    name: "The Guardian",
    quote: "Sri Lanka's best-kept secret is now available on your phone",
    category: "News",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    initial: "TG",
    year: "2025",
  },
  {
    name: "Wired",
    quote: "Using AI and local wisdom together — brilliantly executed",
    category: "Technology",
    color: "text-gray-800",
    bg: "bg-gray-100",
    border: "border-gray-200",
    initial: "WD",
    year: "2024",
  },
  {
    name: "Sri Lanka Tourism Board",
    quote: "Official partner for authentic destination discovery",
    category: "Official",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    initial: "SL",
    year: "2024",
  },
  {
    name: "Product Hunt",
    quote: "#1 Product of the Day — Travel Category",
    category: "Tech",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    initial: "PH",
    year: "2024",
  },
  {
    name: "CNN Travel",
    quote: "The app transforming how the world sees Sri Lanka",
    category: "News",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
    initial: "CN",
    year: "2025",
  },
];

const featuredQuote = {
  text: "Seygo isn't just a travel app. It's a cultural bridge — connecting the world to the authentic heart of Sri Lanka in a way no guidebook ever could.",
  source: "Forbes Travel",
  role: "Top 10 Travel Apps of 2025",
};

export default function Press() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-secondary/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-5 border border-primary/20">
            <TrendingUp className="w-3.5 h-3.5" />
            As Seen In
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            The world is{" "}
            <span className="text-primary italic">talking about</span>{" "}
            Seygo
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            From global tech media to travel authorities — here's what the press is saying.
          </p>
        </motion.div>

        {/* Featured Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-16 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl p-8 md:p-10 text-center relative"
        >
          <div className="text-5xl text-primary/20 font-serif leading-none mb-4">"</div>
          <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed italic mb-6">
            {featuredQuote.text}
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              FT
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-foreground">{featuredQuote.source}</p>
              <p className="text-xs text-muted-foreground">{featuredQuote.role}</p>
            </div>
          </div>
        </motion.div>

        {/* Press Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {pressLogos.map((press, i) => (
            <motion.div
              key={press.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group p-5 rounded-2xl border ${press.border} ${press.bg} hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden`}
            >
              {/* Year badge */}
              <span className="absolute top-3 right-3 text-[10px] font-bold text-muted-foreground/60">
                {press.year}
              </span>

              {/* Logo placeholder */}
              <div className={`w-10 h-10 rounded-xl ${press.color.replace("text-", "bg-").replace("600", "500").replace("800", "700")} bg-opacity-20 flex items-center justify-center font-bold text-sm ${press.color} mb-3`}
                style={{ backgroundColor: "transparent", border: `2px solid currentColor` }}>
                {press.initial}
              </div>

              <div className="mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  {press.category}
                </span>
              </div>
              <p className={`text-sm font-bold ${press.color} mb-2`}>{press.name}</p>
              <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                "{press.quote}"
              </p>

              <ExternalLink className="w-3 h-3 text-muted-foreground/40 absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {[
            { icon: Award, value: "8+", label: "Press Mentions" },
            { icon: TrendingUp, value: "#1", label: "Product Hunt — Travel" },
            { icon: ExternalLink, value: "Global", label: "Media Coverage" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold font-serif text-foreground leading-none">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
