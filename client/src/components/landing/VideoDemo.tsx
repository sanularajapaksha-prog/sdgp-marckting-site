import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, ChevronRight } from "lucide-react";

const chapters = [
  { time: "0:00", title: "Welcome to Seygo", desc: "A quick intro to the app and its mission" },
  { time: "0:45", title: "Finding Hidden Gems", desc: "Browse and filter verified secret spots" },
  { time: "1:30", title: "Travel Playlists", desc: "How audio guides sync with your GPS" },
  { time: "2:15", title: "Offline Maps", desc: "Download and navigate without signal" },
  { time: "3:00", title: "Safety Features", desc: "Alerts, emergency contacts, guide network" },
  { time: "3:50", title: "Community", desc: "Share discoveries and earn explorer badges" },
];

const highlights = [
  { emoji: "🗺️", text: "200+ hidden locations shown" },
  { emoji: "🎵", text: "Audio guide demo" },
  { emoji: "📍", text: "Offline navigation live" },
  { emoji: "🛡️", text: "Safety alert walkthrough" },
];

export default function VideoDemo() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-foreground text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-5 border border-white/20">
            <Play className="w-3.5 h-3.5 fill-white" />
            Product Walkthrough
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            See Seygo in{" "}
            <span className="text-secondary italic">action</span>
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Watch how Seygo helps travelers discover Sri Lanka's best-kept secrets — from first
            download to first hidden waterfall.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            {/* Video container */}
            <div className="relative bg-gray-900 rounded-3xl overflow-hidden aspect-video border border-white/10 shadow-2xl group">
              {/* Fake video background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-teal-900/50 to-gray-900 flex items-center justify-center">
                <div className="text-8xl opacity-20">🌴</div>
              </div>

              {/* Video overlay content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {!playing && (
                    <motion.button
                      key="play-btn"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => setPlaying(true)}
                      className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                    >
                      <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Chapter title overlay */}
              <div className="absolute top-4 left-4">
                <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  {chapters[activeChapter].time} — {chapters[activeChapter].title}
                </span>
              </div>

              {/* Controls bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Progress bar */}
                <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer">
                  <div
                    className="h-full bg-secondary rounded-full transition-all duration-300"
                    style={{ width: `${(activeChapter / (chapters.length - 1)) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPlaying(!playing)}
                      className="w-8 h-8 flex items-center justify-center hover:text-secondary transition-colors"
                    >
                      {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                    </button>
                    <button
                      onClick={() => setMuted(!muted)}
                      className="hover:text-secondary transition-colors"
                    >
                      {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-xs text-white/70 font-mono">
                      {chapters[activeChapter].time} / 4:20
                    </span>
                  </div>
                  <button className="hover:text-secondary transition-colors">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Highlights strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5"
                >
                  <span className="text-lg">{h.emoji}</span>
                  <span className="text-xs text-white/80 font-medium leading-tight">{h.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chapter List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-4 h-4 text-white/60" />
              <span className="text-sm text-white/60 font-semibold uppercase tracking-wide">
                Chapters · 4 min
              </span>
            </div>
            <div className="space-y-2">
              {chapters.map((chapter, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveChapter(i);
                    setPlaying(true);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 group/ch ${
                    activeChapter === i
                      ? "bg-white/15 border border-white/20"
                      : "hover:bg-white/8 border border-transparent"
                  }`}
                >
                  <span
                    className={`text-xs font-mono shrink-0 ${
                      activeChapter === i ? "text-secondary" : "text-white/40"
                    }`}
                  >
                    {chapter.time}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold leading-none mb-1 ${
                        activeChapter === i ? "text-white" : "text-white/70"
                      }`}
                    >
                      {chapter.title}
                    </p>
                    <p className="text-xs text-white/40 truncate">{chapter.desc}</p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-all ${
                      activeChapter === i
                        ? "text-secondary"
                        : "text-white/20 group-hover/ch:text-white/50"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Subscribe / notify */}
            <div className="mt-6 p-5 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-sm font-semibold text-white mb-1">Full demo coming soon</p>
              <p className="text-xs text-white/50 mb-4">
                Get notified when the full product video is live.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/10 border border-white/20 text-white text-xs px-3 py-2 rounded-xl placeholder-white/30 focus:outline-none focus:border-primary/50"
                />
                <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-colors">
                  Notify
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
