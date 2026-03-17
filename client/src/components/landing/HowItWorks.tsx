import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Search, Map, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Download Seygo",
    subtitle: "Free on iOS & Android",
    description:
      "Get the app in seconds. No subscription, no hidden fees. Seygo is completely free to download with full access to core features out of the box.",
    highlights: ["Free forever plan", "No account required to browse", "Works offline"],
    color: "text-primary",
    bgGradient: "from-primary/10 to-primary/5",
    border: "border-primary/20",
    iconBg: "bg-primary",
    emoji: "📱",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover Hidden Gems",
    subtitle: "Locally verified locations",
    description:
      "Browse our curated map of secret spots, local eateries, cultural sites, and undiscovered nature sanctuaries — all verified by people who actually live there.",
    highlights: [
      "200+ verified locations",
      "Filter by category & distance",
      "Read local insider tips",
    ],
    color: "text-secondary",
    bgGradient: "from-secondary/10 to-secondary/5",
    border: "border-secondary/20",
    iconBg: "bg-secondary",
    emoji: "🗺️",
  },
  {
    number: "03",
    icon: Map,
    title: "Navigate & Experience",
    subtitle: "Go beyond the tourist trail",
    description:
      "Use our offline maps to reach any destination safely. Follow travel playlists, get real-time safety alerts, and immerse yourself in authentic Sri Lankan culture.",
    highlights: [
      "Full offline navigation",
      "Audio travel playlists",
      "Emergency contact support",
    ],
    color: "text-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-50/30",
    border: "border-emerald-200",
    iconBg: "bg-emerald-500",
    emoji: "✨",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`relative bg-gradient-to-br ${step.bgGradient} border ${step.border} rounded-3xl p-8 md:p-10 group hover:shadow-xl transition-all duration-500`}
    >
      {/* Step number */}
      <div className="flex items-start justify-between mb-8">
        <span className={`text-6xl font-serif font-bold ${step.color} opacity-20 leading-none`}>
          {step.number}
        </span>
        <span className="text-4xl">{step.emoji}</span>
      </div>

      {/* Icon */}
      <div
        className={`w-14 h-14 ${step.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <step.icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className={`text-xs font-bold tracking-widest uppercase ${step.color} mb-2`}>
          {step.subtitle}
        </p>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{step.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
      </div>

      {/* Highlights */}
      <ul className="space-y-2">
        {step.highlights.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm">
            <CheckCircle className={`w-4 h-4 ${step.color} shrink-0`} />
            <span className="text-foreground/80">{item}</span>
          </li>
        ))}
      </ul>

      {/* Hover arrow */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className={`mt-6 flex items-center gap-2 ${step.color} text-sm font-semibold`}
      >
        Learn more <ArrowRight className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="how-it-works">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            Simple as Three Steps
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-5">
            How{" "}
            <span className="text-primary italic">Seygo</span>{" "}
            Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From your first download to your first hidden waterfall — we make it effortless
            to experience Sri Lanka the way it was meant to be experienced.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector lines between cards (desktop only) */}
          <div className="absolute top-[4.5rem] left-1/3 right-1/3 h-px bg-gradient-to-r from-primary/30 via-secondary/30 to-emerald-500/30 hidden md:block pointer-events-none" />

          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Ready to see Sri Lanka differently?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 bg-primary text-white font-bold uppercase tracking-wide text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Start Exploring — It's Free
            </motion.button>
            <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Watch the demo <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
