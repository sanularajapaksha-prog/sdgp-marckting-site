import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  MapPin,
  Star,
  Download,
  Camera,
  MessageCircle,
  Navigation,
  Shield,
  Zap,
  Users,
  Globe,
  TrendingUp,
  Bell,
  Clock,
} from "lucide-react";

type FeedEvent = {
  id: number;
  type: "download" | "review" | "photo" | "alert" | "checkin" | "achievement";
  user: string;
  country: string;
  flag: string;
  message: string;
  location?: string;
  rating?: number;
  time: string;
  icon: React.ElementType;
  color: string;
  bg: string;
};

const eventTemplates: Omit<FeedEvent, "id" | "time">[] = [
  {
    type: "download",
    user: "Yuki T.",
    country: "Japan",
    flag: "🇯🇵",
    message: "just downloaded Seygo",
    icon: Download,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    type: "review",
    user: "Emma S.",
    country: "Germany",
    flag: "🇩🇪",
    message: "left a 5-star review",
    rating: 5,
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    type: "photo",
    user: "Marco R.",
    country: "Italy",
    flag: "🇮🇹",
    message: "shared a photo from",
    location: "Sigiriya",
    icon: Camera,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    type: "checkin",
    user: "Priya K.",
    country: "India",
    flag: "🇮🇳",
    message: "checked in at",
    location: "Galle Fort",
    icon: MapPin,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    type: "alert",
    user: "Alex M.",
    country: "Australia",
    flag: "🇦🇺",
    message: "used a safety alert near",
    location: "Colombo",
    icon: Shield,
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    type: "download",
    user: "Sarah L.",
    country: "UK",
    flag: "🇬🇧",
    message: "just downloaded Seygo",
    icon: Download,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    type: "achievement",
    user: "Carlos V.",
    country: "Spain",
    flag: "🇪🇸",
    message: "earned the Explorer badge at",
    location: "Ella",
    icon: Zap,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    type: "review",
    user: "Aiko N.",
    country: "Japan",
    flag: "🇯🇵",
    message: "left a 5-star review",
    rating: 5,
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    type: "photo",
    user: "Rania H.",
    country: "France",
    flag: "🇫🇷",
    message: "shared a photo from",
    location: "Mirissa Beach",
    icon: Camera,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    type: "checkin",
    user: "Jan K.",
    country: "Netherlands",
    flag: "🇳🇱",
    message: "checked in at",
    location: "Yala National Park",
    icon: Navigation,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
];

const liveStats = [
  { label: "Active Users Right Now", value: "3,241", icon: Activity, color: "text-green-400", pulse: true },
  { label: "Photos Shared Today", value: "8,472", icon: Camera, color: "text-pink-400", pulse: false },
  { label: "Countries Online", value: "87", icon: Globe, color: "text-blue-400", pulse: false },
  { label: "Routes Navigated Today", value: "14,903", icon: Navigation, color: "text-violet-400", pulse: false },
  { label: "Safety Alerts Sent", value: "126", icon: Bell, color: "text-red-400", pulse: false },
  { label: "Reviews This Week", value: "2,108", icon: Star, color: "text-yellow-400", pulse: false },
];

const regionActivity = [
  { region: "Colombo", pct: 88, color: "bg-blue-500" },
  { region: "Galle", pct: 72, color: "bg-cyan-500" },
  { region: "Ella", pct: 65, color: "bg-violet-500" },
  { region: "Sigiriya", pct: 59, color: "bg-orange-500" },
  { region: "Kandy", pct: 54, color: "bg-pink-500" },
  { region: "Mirissa", pct: 47, color: "bg-green-500" },
];

let nextId = 1;
function makeEvent(): FeedEvent {
  const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
  const mins = Math.floor(Math.random() * 3) + 1;
  return {
    ...template,
    id: nextId++,
    time: `${mins}m ago`,
  };
}

export default function LiveFeed() {
  const [feed, setFeed] = useState<FeedEvent[]>(() =>
    Array.from({ length: 6 }, () => makeEvent())
  );
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setFeed((prev) => [makeEvent(), ...prev.slice(0, 7)]);
    }, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-green-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live Activity
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Seygo is{" "}
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              alive right now
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Real-time activity from the Seygo community — every second, someone is exploring Sri Lanka with us.
          </p>
        </motion.div>

        {/* Live stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {liveStats.map(({ label, value, icon: Icon, color, pulse }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              viewport={{ once: true }}
              className="p-4 rounded-2xl bg-white/3 border border-white/8 text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <div className="relative">
                  <Icon className={`w-5 h-5 ${color}`} />
                  {pulse && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 animate-ping" />
                  )}
                </div>
              </div>
              <div className={`text-xl font-black ${color}`}>{value}</div>
              <div className="text-slate-600 text-xs mt-0.5">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-400" />
                Live Event Feed
              </h3>
              <button
                onClick={() => setPaused((p) => !p)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs hover:text-white transition-colors"
              >
                {paused ? <><Zap className="w-3 h-3" /> Resume</> : <><Clock className="w-3 h-3" /> Pause</>}
              </button>
            </div>

            <div className="space-y-2 max-h-[440px] overflow-hidden">
              <AnimatePresence initial={false}>
                {feed.map((event) => {
                  const Icon = event.icon;
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: -20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/8"
                    >
                      <div className={`w-8 h-8 rounded-lg ${event.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-4 h-4 ${event.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white leading-tight">
                          <span className="font-medium">{event.flag} {event.user}</span>
                          {" "}
                          <span className="text-slate-400">{event.message}</span>
                          {event.location && (
                            <span className="text-slate-300"> {event.location}</span>
                          )}
                          {event.rating && (
                            <span className="text-yellow-400"> ★★★★★</span>
                          )}
                        </p>
                      </div>
                      <span className="text-slate-600 text-xs shrink-0">{event.time}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Region activity */}
            <div>
              <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Hottest Destinations Right Now
              </h3>
              <div className="space-y-3">
                {regionActivity.map(({ region, pct, color }, idx) => (
                  <motion.div
                    key={region}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 text-sm">{region}</span>
                      <span className="text-slate-500 text-xs">{pct}% capacity</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: idx * 0.08 }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full ${color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Community callout */}
            <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-green-900/30 to-cyan-900/20 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">120,000+</div>
                  <div className="text-slate-500 text-xs">active travellers this month</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Join the fastest-growing Sri Lanka travel community. Share your experiences, get local tips, and never feel lost again.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["YT", "ES", "MR", "PK", "AM"].map((init, i) => (
                    <div
                      key={init}
                      className="w-7 h-7 rounded-full border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#22c55e"][i] }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <span className="text-slate-500 text-xs">+2,341 joined this week</span>
              </div>
              <button className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors">
                Join the Community
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
