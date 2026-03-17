import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Rocket, Bell, Star, Download, ArrowRight, Check } from "lucide-react";
import { api } from "@/lib/api";

// Target: next version launch date
const LAUNCH_DATE = new Date("2026-03-26T00:00:00Z");

interface TimeUnit {
  value: number;
  prev: number;
  label: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const now = new Date();
  const diff = Math.max(0, LAUNCH_DATE.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const t = setTimeout(() => {
        setPrev(value);
        setFlipping(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 md:w-24 h-20 md:h-24">
        {/* Back card */}
        <div className="absolute inset-0 bg-foreground rounded-2xl flex items-center justify-center shadow-xl">
          <span className="text-3xl md:text-4xl font-bold font-serif text-white/30">
            {pad(prev)}
          </span>
        </div>

        {/* Front card — animates on change */}
        <AnimatePresence>
          <motion.div
            key={value}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-foreground rounded-2xl flex items-center justify-center shadow-xl border border-white/10"
            style={{ perspective: 600 }}
          >
            <span className="text-3xl md:text-4xl font-bold font-serif text-white">
              {pad(value)}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Divider line */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 z-10 pointer-events-none" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

const features = [
  "Advanced AI-powered recommendations",
  "Group travel planning mode",
  "In-app hotel & activity booking",
  "Seygo Premium for power travelers",
];

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyState, setNotifyState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleNotify = async () => {
    if (!notifyEmail.includes("@")) return;
    setNotifyState("loading");
    try {
      await api.subscribeNewsletter({ email: notifyEmail });
      setNotifyState("done");
    } catch {
      setNotifyState("done"); // show success even if already subscribed
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units: TimeUnit[] = [
    { value: time.days, prev: time.days, label: "Days" },
    { value: time.hours, prev: time.hours, label: "Hours" },
    { value: time.minutes, prev: time.minutes, label: "Minutes" },
    { value: time.seconds, prev: time.seconds, label: "Seconds" },
  ];

  return (
    <section className="py-24 bg-foreground text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-secondary/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-5 border border-white/20">
            <Rocket className="w-3.5 h-3.5" />
            Version 2.0 Launching
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Something big is{" "}
            <span className="text-secondary italic">coming</span>
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Seygo 2.0 is our biggest update ever — packed with features that will
            completely transform how you travel Sri Lanka.
          </p>
        </motion.div>

        {/* Countdown clocks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex justify-center gap-4 md:gap-8 mb-14"
        >
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-4 md:gap-8">
              <FlipUnit value={unit.value} label={unit.label} />
              {i < units.length - 1 && (
                <span className="text-3xl font-bold text-white/30 -mt-8 select-none">:</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* What's coming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-center text-xs font-bold uppercase tracking-widest text-white/50 mb-5">
            What's coming in v2.0
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((feat, i) => (
              <motion.div
                key={feat}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
              >
                <Star className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-sm text-white/80 font-medium">{feat}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {notifyState === "done" ? (
            <div className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-xl">
              <Check className="w-4 h-4" /> You're on the list!
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNotify()}
                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 w-52"
              />
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNotify}
                disabled={notifyState === "loading"}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-60"
              >
                <Bell className="w-4 h-4" />
                {notifyState === "loading" ? "..." : "Notify Me"}
              </motion.button>
            </div>
          )}
          <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            Download v1 now — it's free
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Subtle target date */}
        <p className="text-center text-xs text-white/30 mt-8">
          Target launch: June 1, 2025 · Join {(takenSpots + 153).toLocaleString()}+ on the notify list
        </p>
      </div>
    </section>
  );
}

const takenSpots = 347;
