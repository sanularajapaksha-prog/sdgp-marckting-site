import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Handshake, ArrowRight, CheckCircle } from "lucide-react";

const partnerCategories = [
  {
    title: "Tourism & Government",
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/15",
    partners: [
      { name: "Sri Lanka Tourism Development Authority", short: "SLTDA", emoji: "🇱🇰", type: "Official Partner" },
      { name: "Ceylon Tourist Board", short: "CTB", emoji: "🏛️", type: "Partner" },
      { name: "Ministry of Tourism", short: "MOT", emoji: "🏢", type: "Endorsed" },
      { name: "Colombo City Council", short: "CCC", emoji: "🏙️", type: "Partner" },
    ],
  },
  {
    title: "Hospitality & Stays",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    partners: [
      { name: "Jetwing Hotels", short: "JW", emoji: "🏨", type: "Hotel Partner" },
      { name: "Aitken Spence Hotels", short: "AS", emoji: "🌴", type: "Hotel Partner" },
      { name: "Cinnamon Hotels", short: "CH", emoji: "✨", type: "Official Partner" },
      { name: "Airbnb Sri Lanka", short: "AB", emoji: "🏠", type: "Integration" },
    ],
  },
  {
    title: "Transport & Adventure",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    partners: [
      { name: "SriLankan Airlines", short: "UL", emoji: "✈️", type: "Airline Partner" },
      { name: "PickMe Taxis", short: "PM", emoji: "🚗", type: "Transport" },
      { name: "Adventure Lanka", short: "AL", emoji: "🧗", type: "Activities" },
      { name: "Expo Rail", short: "ER", emoji: "🚂", type: "Rail Partner" },
    ],
  },
  {
    title: "Tech & Media",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    partners: [
      { name: "Dialog Axiata", short: "DG", emoji: "📡", type: "Connectivity" },
      { name: "Roar Media", short: "RM", emoji: "📰", type: "Media Partner" },
      { name: "Lanka Business Online", short: "LB", emoji: "💼", type: "Media" },
      { name: "Digital Ocean", short: "DO", emoji: "☁️", type: "Cloud Partner" },
    ],
  },
];

const partnerBenefits = [
  "Verified location badges for partner properties",
  "Priority listing in search results",
  "Co-branded audio travel content",
  "Real-time traveler analytics dashboard",
  "Direct in-app booking integration",
  "Featured placement in destination guides",
];

export default function Partners() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gray-50/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-0 w-80 h-80 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-2xl" />
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
            <Handshake className="w-3.5 h-3.5" />
            Partners & Integrations
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Trusted by Sri Lanka's{" "}
            <span className="text-primary italic">leading brands</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            From government tourism bodies to hotels, airlines, and tech platforms —
            Seygo works with the island's most trusted names.
          </p>
        </motion.div>

        {/* Partner category grids */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {partnerCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              className={`rounded-3xl border ${cat.border} ${cat.bg} p-6`}
            >
              <h3 className={`text-xs font-bold uppercase tracking-widest ${cat.color} mb-5`}>
                {cat.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {cat.partners.map((partner, pi) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: ci * 0.1 + pi * 0.06 }}
                    className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-white/80 hover:shadow-md transition-shadow group"
                  >
                    <span className="text-2xl">{partner.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{partner.short}</p>
                      <p className={`text-[10px] font-medium ${cat.color}`}>{partner.type}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Become a partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Partner with Seygo
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
              Grow your business with Sri Lanka's most trusted travel platform
            </h3>
            <ul className="space-y-2.5">
              {partnerBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5">
              <p className="text-sm font-bold text-foreground mb-1">Current Partner Stats</p>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {[
                  { value: "20+", label: "Active Partners" },
                  { value: "10k+", label: "Monthly Referrals" },
                  { value: "4.8★", label: "Partner Rating" },
                  { value: "98%", label: "Retention Rate" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-xl font-bold font-serif text-primary">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors">
              Become a Partner <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-foreground text-sm font-semibold hover:bg-gray-50 transition-colors">
              Download Partner Kit
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
