import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, AlertTriangle, Phone, Users, MapPin, Bell, Eye, Lock, ArrowRight, CheckCircle } from "lucide-react";

const safetyFeatures = [
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description: "Instant notifications for weather warnings, road closures, civil advisories, and natural events. Delivered before they affect your journey.",
    bullets: ["Push notifications", "Area-specific alerts", "Priority by severity"],
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: Phone,
    title: "One-Tap Emergency SOS",
    description: "In any emergency, a single tap shares your live GPS location with your emergency contacts and the nearest Seygo community responders.",
    bullets: ["Live GPS sharing", "Auto-call emergency contacts", "Offline capable"],
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    icon: Users,
    title: "Verified Guide Network",
    description: "Connect with background-checked, community-verified local guides across every region of Sri Lanka — bookable directly in the app.",
    bullets: ["Background checked", "Community rated", "Instant booking"],
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/15",
  },
  {
    icon: Eye,
    title: "Destination Safety Scores",
    description: "Every location on Seygo has a live safety score based on community reports, government advisories, and real traveler feedback.",
    bullets: ["Live scoring system", "Updated daily", "Community-sourced data"],
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Lock,
    title: "Privacy & Data Protection",
    description: "Your location data is encrypted, never sold, and fully under your control. Tracking is opt-in and can be paused at any time.",
    bullets: ["End-to-end encryption", "GDPR compliant", "No data selling"],
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: MapPin,
    title: "Safe Route Planning",
    description: "Seygo's routing engine avoids flagged roads, flood-prone areas, and regions with recent safety reports — automatically.",
    bullets: ["Hazard avoidance", "Flood area detection", "Night-safe routes"],
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
];

const alertMockup = [
  { type: "warning", emoji: "⚠️", title: "Road Alert", msg: "A9 Highway: Landslide risk — detour recommended", time: "2m ago" },
  { type: "info", emoji: "🌧️", title: "Weather Advisory", msg: "Heavy rain expected in Kandy District until 18:00", time: "15m ago" },
  { type: "safe", emoji: "✅", title: "Area Confirmed Safe", msg: "Ella region: All clear — enjoy your visit!", time: "1h ago" },
];

export default function SafetyHighlight() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-widest uppercase mb-5 border border-rose-200">
            <Shield className="w-3.5 h-3.5" />
            Safety First
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Travel with{" "}
            <span className="text-primary italic">complete confidence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sri Lanka is one of the world's most beautiful destinations — and one of the safest
            when you travel with the right tools. Seygo keeps you informed, connected, and protected.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Feature grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {safetyFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-white rounded-3xl border ${feat.border} p-5 hover:shadow-lg transition-all duration-300 group`}
              >
                <div className={`w-11 h-11 ${feat.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feat.icon className={`w-5 h-5 ${feat.color}`} />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{feat.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{feat.description}</p>
                <ul className="space-y-1">
                  {feat.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-1.5 text-xs text-foreground/70">
                      <CheckCircle className={`w-3 h-3 ${feat.color} shrink-0`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Right — phone mockup with alert notifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-28"
          >
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: "100%", label: "Verified Safety Scores", icon: Shield },
                { value: "< 2min", label: "Average Alert Delivery", icon: Bell },
                { value: "24/7", label: "Emergency Network", icon: Phone },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-lg font-bold font-serif text-foreground">{value}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Alert mockup */}
            <div className="bg-gray-900 rounded-3xl p-5 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wide">
                  Live Safety Alerts
                </p>
              </div>
              <div className="space-y-3">
                {alertMockup.map((alert, i) => (
                  <motion.div
                    key={alert.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className={`rounded-2xl p-4 ${
                      alert.type === "warning" ? "bg-amber-500/15 border border-amber-500/30" :
                      alert.type === "safe" ? "bg-emerald-500/15 border border-emerald-500/30" :
                      "bg-sky-500/15 border border-sky-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{alert.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-white text-xs font-bold">{alert.title}</p>
                          <span className="text-white/40 text-[10px]">{alert.time}</span>
                        </div>
                        <p className="text-white/70 text-xs leading-snug">{alert.msg}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-white/40 text-xs">Powered by community + gov data</span>
                <button className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
                  All alerts <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-6 bg-rose-50 border border-rose-100 rounded-2xl p-5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-foreground">Safety is not optional</p>
                  <p className="text-xs text-muted-foreground">Seygo keeps you informed so you can explore freely.</p>
                </div>
              </div>
              <button className="shrink-0 text-xs font-bold text-primary hover:underline whitespace-nowrap">
                Learn more →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
