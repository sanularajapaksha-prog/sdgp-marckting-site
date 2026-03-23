import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Star, Shield, Wifi, MapPin } from "lucide-react";

const appFeatures = [
  { icon: MapPin, text: "200+ Hidden Destinations" },
  { icon: Shield, text: "Real-time Safety Alerts" },
  { icon: Wifi, text: "Full Offline Support" },
  { icon: Star, text: "4.9★ Rated App" },
];

// Real Apple SVG logo
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 814 1000" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.8 135.6-318 269.3-318 63.5 0 116.4 41.8 155.9 41.8 37.7 0 97.8-44.1 171-44.1 27.5 0 108.2 2.5 162.1 99.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

// Real Google Play colorful SVG logo
function GooglePlayLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <linearGradient id="gp1" x1="91.44" y1="25.43" x2="197.55" y2="131.54" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#387be5" />
        <stop offset="1" stopColor="#2196f3" />
      </linearGradient>
      <linearGradient id="gp2" x1="37.43" y1="256" x2="256.04" y2="256" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#32a873" />
        <stop offset="1" stopColor="#4caf50" />
      </linearGradient>
      <linearGradient id="gp3" x1="196.97" y1="280.35" x2="381.04" y2="464.42" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f8a01f" />
        <stop offset="1" stopColor="#f44336" />
      </linearGradient>
      <linearGradient id="gp4" x1="262.42" y1="212.24" x2="424.39" y2="374.21" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ffd500" />
        <stop offset="1" stopColor="#f8a01f" />
      </linearGradient>
      <path fill="url(#gp1)" d="M37.43 15.07A24 24 0 0 0 24 37v.47L246.18 260 37.43 15.07z" />
      <path fill="url(#gp2)" d="M37.43 15.07L246.18 260l-84 84L24 262.93V37.47A24 24 0 0 1 37.43 15.07z" opacity=".85" />
      <path fill="url(#gp2)" d="M24 262.93v186.6a24 24 0 0 0 13.43 22l184.2-184.2-37.27-27.28z" />
      <path fill="url(#gp3)" d="M221.63 344L37.43 496.93A24 24 0 0 0 56 501.82l295.64-170.79z" />
      <path fill="url(#gp4)" d="M472.11 233.38l-76.55-44.19L258.37 256l137.19 66.81 76.55-44.19a24 24 0 0 0 0-41.24z" />
      <path fill="url(#gp1)" d="M56 10.18L351.64 181a24 24 0 0 1 8.16 7.19L246.18 260 37.43 15.07A24 24 0 0 1 56 10.18z" opacity=".85" />
    </svg>
  );
}

export default function DownloadCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="download" className="py-24 relative overflow-hidden bg-background" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-teal-800 z-0" />
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px, 60px 60px",
        }}
      />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — text + buttons */}
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
              offline maps, and real-time safety features — everything you need for the trip of a lifetime.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {appFeatures.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium">
                  <Icon className="w-4 h-4 text-secondary" />
                  {text}
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* App Store */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4 px-6 py-4 bg-black rounded-2xl hover:bg-black/90 transition-colors shadow-xl shadow-black/30 group border border-white/10"
              >
                <AppleLogo className="w-8 h-8 shrink-0 text-white" />
                <div className="text-left">
                  <p className="text-white/60 text-[11px] leading-none mb-1">Download on the</p>
                  <p className="text-white text-lg font-semibold leading-none tracking-tight">App Store</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-white/50 text-[10px] ml-0.5">4.9 · 2.1k</span>
                  </div>
                </div>
              </motion.a>

              {/* Google Play */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4 px-6 py-4 bg-black rounded-2xl hover:bg-black/90 transition-colors shadow-xl shadow-black/30 group border border-white/10"
              >
                <GooglePlayLogo className="w-8 h-8 shrink-0" />
                <div className="text-left">
                  <p className="text-white/60 text-[11px] leading-none mb-1">Get it on</p>
                  <p className="text-white text-lg font-semibold leading-none tracking-tight">Google Play</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-white/50 text-[10px] ml-0.5">4.8 · 1.3k</span>
                  </div>
                </div>
              </motion.a>
            </div>

            <p className="text-white/40 text-xs mt-5">
              Free forever. No ads. No data selling. Just pure exploration.
            </p>
          </motion.div>

          {/* Right — real photo */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 aspect-[4/3]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Sigiriya.jpg"
                alt="Sri Lanka landscape"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating badge — top left */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3"
              >
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Sigiriya, Sri Lanka</p>
                  <p className="text-[10px] text-muted-foreground">Verified Hidden Gem</p>
                </div>
              </motion.div>

              {/* Floating badge — bottom right */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white text-xs font-bold">4.9 App Rating</p>
                <p className="text-white/60 text-[10px]">10k+ downloads</p>
              </motion.div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-[2rem] border border-white/10 -z-10" />
            <div className="absolute -inset-6 rounded-[2.5rem] border border-white/5 -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
