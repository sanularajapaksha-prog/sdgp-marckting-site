import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Apple, Play, ChevronDown, MapPin, Shield, Star, Users } from "lucide-react";
import heroBg from "@/assets/images/hero-bg.jpg";
import appUi from "@/assets/images/app-ui-1.png";

const headlines = ["Beyond the Ordinary.", "Discover the Real.", "Explore the Hidden."];

const floatingStats = [
  { icon: Star, value: "4.9★", label: "App Rating", color: "bg-secondary" },
  { icon: MapPin, value: "200+", label: "Hidden Gems", color: "bg-primary" },
  { icon: Shield, value: "100%", label: "Verified Safe", color: "bg-emerald-500" },
  { icon: Users, value: "10k+", label: "Travelers", color: "bg-violet-500" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev: number) => (prev + 1) % headlines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-background"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute right-0 top-0 w-full lg:w-2/3 h-full z-0 lg:rounded-bl-[8rem] overflow-hidden"
        style={{ y: yBg, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
        <img
          src={heroBg}
          alt="Sri Lanka landscape"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-20 w-48 h-48 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-6 relative z-20"
        style={{ y: yContent, opacity }}
      >
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Sri Lanka's #1 Travel Companion
            </span>
            <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3 h-3 fill-secondary text-secondary" />
              ))}
              <span className="ml-1 font-semibold text-foreground">4.9</span>
              <span>on App Store</span>
            </div>
          </motion.div>

          {/* Animated Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <div className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[0.9] mb-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={headlineIndex}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {headlines[headlineIndex].split(" ").map((word, i) => (
                    <span
                      key={i}
                      className={
                        i === headlines[headlineIndex].split(" ").length - 1
                          ? "text-primary italic"
                          : ""
                      }
                    >
                      {word}{" "}
                    </span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground/50 mt-4">
              The Soul of Sri Lanka.
            </h2>
          </motion.div>

          {/* Description + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 gap-10 items-end mt-10"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md">
              Seygo isn't just an app — it's your key to the soul of Sri Lanka. From
              mist-covered mountains to hidden coastal sanctuaries, discover the places
              no travel guide will ever show you.
            </p>

            <div className="flex flex-col gap-4">
              {/* Primary CTA */}
              <div className="flex flex-wrap gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="h-14 px-8 bg-primary text-white font-bold text-base rounded-none uppercase tracking-wide shadow-lg shadow-primary/30 hover:bg-primary/90"
                  >
                    Get the App — Free
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2"
                >
                  <button className="flex items-center gap-2 px-5 h-14 border border-foreground/20 hover:border-primary hover:text-primary transition-all group">
                    <Apple className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <p className="text-[10px] text-muted-foreground leading-none">Download on</p>
                      <p className="text-sm font-semibold leading-none mt-0.5">App Store</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-2 px-5 h-14 border border-foreground/20 hover:border-primary hover:text-primary transition-all group">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <p className="text-[10px] text-muted-foreground leading-none">Get it on</p>
                      <p className="text-sm font-semibold leading-none mt-0.5">Google Play</p>
                    </div>
                  </button>
                </motion.div>
              </div>

              {/* Trust line */}
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-primary" />
                Free to download · No ads · Offline maps included
              </p>
            </div>
          </motion.div>

          {/* Floating mini-stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mt-16"
          >
            {floatingStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl px-4 py-3 shadow-sm"
              >
                <div className={`w-8 h-8 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Phone Mockup */}
      <motion.div
        initial={{ opacity: 0, x: 120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[4%] bottom-[8%] hidden lg:block z-30"
      >
        {/* Glow behind phone */}
        <div className="absolute inset-0 -bottom-10 bg-primary/20 rounded-[3rem] blur-3xl scale-90 pointer-events-none" />

        <motion.div
          animate={{ y: [0, -16, 0], rotate: [-1.5, 1.5, -1.5] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative w-[260px] h-[540px] bg-black rounded-[2.5rem] border-[6px] border-black shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          <img src={appUi} alt="Seygo app interface" className="w-full h-full object-cover" />

          {/* Screen shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-[2rem]" />
        </motion.div>

        {/* Locally Verified badge */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], rotate: [10, 14, 10] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -top-8 -left-12 w-28 h-28 bg-secondary rounded-full flex items-center justify-center p-3 text-center shadow-xl shadow-secondary/30"
        >
          <p className="text-white font-serif font-bold text-xs uppercase tracking-tight leading-tight">
            Locally<br />Verified
          </p>
        </motion.div>

        {/* Notification popup card */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -left-36 top-20 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 p-3"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-white text-xs font-bold">
              S
            </div>
            <span className="text-xs font-semibold text-foreground">Seygo</span>
          </div>
          <p className="text-xs text-muted-foreground leading-snug">
            🗺️ New hidden gem nearby: <span className="text-primary font-medium">Galway's Land</span>
          </p>
        </motion.div>

        {/* Rating card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.5 }}
          className="absolute -left-28 bottom-28 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2"
        >
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3 h-3 fill-secondary text-secondary" />
            ))}
          </div>
          <p className="text-xs font-semibold text-foreground">4.9 / 5</p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToFeatures}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </div>
  );
}
