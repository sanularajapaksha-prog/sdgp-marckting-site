import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Apple, Play, Download, Star, Shield, Wifi, MapPin, ArrowRight } from "lucide-react";

const appFeatures = [
  { icon: MapPin, text: "200+ Hidden Destinations" },
  { icon: Shield, text: "Real-time Safety Alerts" },
  { icon: Wifi, text: "Full Offline Support" },
  { icon: Star, text: "4.9★ Rated App" },
];

const stores = [
  {
    icon: Apple,
    platform: "App Store",
    sub: "iOS 14+",
    rating: "4.9",
    reviews: "2.1k ratings",
    badge: "Editor's Choice",
  },
  {
    icon: Play,
    platform: "Google Play",
    sub: "Android 8.0+",
    rating: "4.8",
    reviews: "1.3k reviews",
    badge: "Top Travel App",
  },
];

export default function DownloadCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="download" className="py-24 relative overflow-hidden bg-background" ref={ref}>
      {/* Full-width gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-teal-800 z-0" />

      {/* Decorative noise / mesh */}
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, white 1px, transparent 1px),
                            radial-gradient(circle at 60% 80%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px, 60px 60px, 30px 30px",
        }}
      />

      {/* Blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left side — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">
              <Download className="w-3.5 h-3.5" />
              Free Download — No Credit Card
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
              Start your Sri Lanka{" "}
              <span className="text-secondary italic">adventure</span>{" "}
              today.
            </h2>

            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-md">
              Download Seygo for free and unlock access to 200+ verified hidden destinations,
              offline maps, travel playlists, and real-time safety features — everything you
              need for the trip of a lifetime.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {appFeatures.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium"
                >
                  <Icon className="w-4 h-4 text-secondary" />
                  {text}
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {stores.map((store) => (
                <motion.button
                  key={store.platform}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl text-foreground hover:bg-white/95 transition-colors shadow-xl shadow-black/20 group"
                >
                  <store.icon className="w-8 h-8 shrink-0" />
                  <div className="text-left">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="text-xs text-muted-foreground leading-none">
                        Download on
                      </p>
                      {store.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-primary/10 text-primary rounded-full">
                          {store.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-base font-bold leading-none">{store.platform}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-2.5 h-2.5 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {store.rating} · {store.reviews}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary" />
                </motion.button>
              ))}
            </div>

            <p className="text-white/50 text-xs mt-5">
              Free forever. No ads. No data selling. Just pure exploration.
            </p>
          </motion.div>

          {/* Right side — visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* QR Code placeholder */}
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-[-40px] border-2 border-white/10 rounded-full animate-pulse" />
              <div className="absolute inset-[-80px] border border-white/5 rounded-full" />

              {/* QR card */}
              <div className="w-56 h-56 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-4 p-6 relative">
                {/* Fake QR grid */}
                <div className="w-32 h-32 grid grid-cols-8 grid-rows-8 gap-0.5">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        Math.random() > 0.45 ? "bg-foreground" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-center text-muted-foreground font-medium">
                  Scan to download Seygo
                </p>
              </div>

              {/* Floating labels */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-6 -right-16 bg-secondary text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg whitespace-nowrap"
              >
                Free Download
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-16 bg-white text-primary text-xs font-bold px-4 py-2 rounded-full shadow-lg whitespace-nowrap"
              >
                iOS & Android
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
