import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Music, Shield, Compass, Camera, ArrowRight, ChevronRight } from "lucide-react";

const features = [
  {
    id: "gems",
    icon: MapPin,
    label: "Hidden Gems",
    tagline: "200+ secret spots, verified by locals",
    color: "text-primary",
    bg: "bg-primary",
    lightBg: "bg-primary/10",
    border: "border-primary/20",
    screenColor: "from-primary/30 to-teal-900",
    screenEmoji: "🗺️",
    description: "Browse a curated map of secret waterfalls, hidden beaches, local eateries, and cultural treasures that no guidebook covers. Every pin is personally verified by someone who lives there.",
    steps: [
      "Open the Gems map tab",
      "Filter by category or distance",
      "Read local insider tips",
      "Navigate there — even offline",
    ],
    stat: { value: "200+", label: "Verified locations" },
  },
  {
    id: "playlists",
    icon: Music,
    label: "Travel Playlists",
    tagline: "Audio journeys that sync with your GPS",
    color: "text-violet-600",
    bg: "bg-violet-500",
    lightBg: "bg-violet-50",
    border: "border-violet-200",
    screenColor: "from-violet-400/30 to-indigo-900",
    screenEmoji: "🎵",
    description: "As you drive or walk through Sri Lanka, Seygo automatically plays curated audio stories about the places you're passing — history, folklore, culture, and hidden facts narrated by locals.",
    steps: [
      "Select a route or region",
      "Choose your playlist theme",
      "Press play and start driving",
      "Stories trigger at GPS waypoints",
    ],
    stat: { value: "50+", label: "Original audio journeys" },
  },
  {
    id: "safety",
    icon: Shield,
    label: "Safety Tools",
    tagline: "Stay protected wherever you go",
    color: "text-rose-600",
    bg: "bg-rose-500",
    lightBg: "bg-rose-50",
    border: "border-rose-200",
    screenColor: "from-rose-400/20 to-gray-900",
    screenEmoji: "🛡️",
    description: "Real-time safety alerts, a one-tap SOS button that shares your location with emergency contacts, live safety scores for every destination, and a vetted network of local guides ready to help.",
    steps: [
      "Enable safety notifications",
      "Add emergency contacts",
      "View destination safety score",
      "Book a verified local guide",
    ],
    stat: { value: "24/7", label: "Alert coverage" },
  },
  {
    id: "navigation",
    icon: Compass,
    label: "Offline Navigation",
    tagline: "Works deep in the jungle — no signal needed",
    color: "text-emerald-600",
    bg: "bg-emerald-500",
    lightBg: "bg-emerald-50",
    border: "border-emerald-200",
    screenColor: "from-emerald-400/30 to-green-900",
    screenEmoji: "🧭",
    description: "Download any region of Sri Lanka before you travel. Then navigate with full maps, turn-by-turn directions, and destination info — completely offline. Designed for Sri Lankan roads, not generic global highways.",
    steps: [
      "Download your region over Wi-Fi",
      "Open maps — no internet needed",
      "Get turn-by-turn directions",
      "Find fuel, hospitals, and more",
    ],
    stat: { value: "100%", label: "Offline capable" },
  },
  {
    id: "photos",
    icon: Camera,
    label: "Photo Spots",
    tagline: "Find the perfect shot every time",
    color: "text-amber-600",
    bg: "bg-amber-500",
    lightBg: "bg-amber-50",
    border: "border-amber-200",
    screenColor: "from-amber-400/30 to-orange-900",
    screenEmoji: "📸",
    description: "GPS-pinned photo locations show you the exact spot where thousands of stunning travel photos were taken. Best time of day indicators and golden-hour alerts help you get the perfect light.",
    steps: [
      "Browse photo spot map",
      "Filter by category and distance",
      "Check best time of day",
      "Share your shot with the community",
    ],
    stat: { value: "500+", label: "Photo locations" },
  },
];

export default function AppExplorer() {
  const [active, setActive] = useState(features[0]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gray-50/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-2xl" />
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
            Interactive Explorer
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Explore every{" "}
            <span className="text-primary italic">Seygo feature</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Click through each feature to see exactly what Seygo can do for your Sri Lanka adventure.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Feature Selector — left sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-2"
          >
            {features.map((feat) => (
              <button
                key={feat.id}
                onClick={() => setActive(feat)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 border ${
                  active.id === feat.id
                    ? `${feat.lightBg} ${feat.border} shadow-sm`
                    : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className={`w-10 h-10 ${active.id === feat.id ? feat.bg : "bg-gray-100"} rounded-xl flex items-center justify-center transition-colors shrink-0`}>
                  <feat.icon className={`w-5 h-5 ${active.id === feat.id ? "text-white" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold ${active.id === feat.id ? feat.color : "text-foreground"}`}>
                    {feat.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{feat.tagline}</p>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-all ${active.id === feat.id ? `${feat.color}` : "text-gray-300"}`} />
              </button>
            ))}
          </motion.div>

          {/* Feature Detail — right panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden"
              >
                {/* Screen mockup top */}
                <div className={`relative h-52 bg-gradient-to-br ${active.screenColor} flex items-center justify-center overflow-hidden`}>
                  <div className="text-8xl opacity-20">{active.screenEmoji}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Stat badge */}
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 text-white text-center">
                    <p className="text-xl font-bold font-serif leading-none">{active.stat.value}</p>
                    <p className="text-[10px] text-white/70 mt-0.5">{active.stat.label}</p>
                  </div>
                  {/* Feature name */}
                  <div className="absolute bottom-4 left-4">
                    <div className={`inline-flex items-center gap-2 ${active.bg} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                      <active.icon className="w-3.5 h-3.5" />
                      {active.label}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">{active.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{active.description}</p>

                  {/* Steps */}
                  <div className="space-y-3 mb-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">How it works</p>
                    {active.steps.map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className={`w-6 h-6 ${active.bg} rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                          {i + 1}
                        </div>
                        <span className="text-sm text-foreground/80">{step}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`flex items-center gap-2 text-sm font-bold ${active.color} hover:gap-3 transition-all`}>
                    Try {active.label} in the app <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
