import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
  "Finding hidden gems...",
  "Mapping secret waterfalls...",
  "Curating local experiences...",
  "Loading your adventure...",
];

// Floating orb positions
const orbs = [
  { x: "15%", y: "20%", size: 320, delay: 0, color: "primary" },
  { x: "75%", y: "65%", size: 260, delay: 0.8, color: "secondary" },
  { x: "60%", y: "10%", size: 180, delay: 1.4, color: "primary" },
  { x: "5%", y: "70%", size: 140, delay: 0.4, color: "secondary" },
];

// Travel icons that float around
const floatingIcons = ["✈", "🗺", "⛰", "🌊", "🏝", "🧭"];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    // Small delay before logo animates in
    const logoTimer = setTimeout(() => setLogoReady(true), 100);

    // Progress bar animation — 2.5s total
    const duration = 2500;
    const steps = 80;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      setProgress(Math.min(current, 100));
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 700);
        }, 400);
      }
    }, duration / steps);

    // Rotate messages
    const msgTimer = setInterval(() => {
      setMessageIndex((prev: number) => (prev + 1) % loadingMessages.length);
    }, 650);

    return () => {
      clearInterval(timer);
      clearInterval(msgTimer);
      clearTimeout(logoTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a1f14 0%, #0d2b1a 40%, #0e2d1c 60%, #091810 100%)" }}
        >
          {/* Ambient orbs */}
          {orbs.map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: orb.x,
                top: orb.y,
                width: orb.size,
                height: orb.size,
                background: orb.color === "primary"
                  ? "radial-gradient(circle, rgba(52,211,153,0.18) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 4 + i * 0.8,
                ease: "easeInOut",
                delay: orb.delay,
              }}
            />
          ))}

          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Subtle diagonal lines */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 40px)",
            }}
          />

          {/* Floating travel icons */}
          {floatingIcons.map((icon, i) => (
            <motion.div
              key={icon}
              className="absolute text-2xl select-none pointer-events-none"
              style={{
                left: `${10 + (i * 16)}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 0.15, 0.08, 0.15, 0],
                y: [0, -20, -40, -60, -80],
              }}
              transition={{
                duration: 4,
                delay: i * 0.4 + 0.5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeOut",
              }}
            >
              {icon}
            </motion.div>
          ))}

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Outer glow ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={logoReady ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8"
            >
              {/* Pulsing glow rings */}
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.25, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 0.8 }}
                className="absolute inset-0 rounded-3xl border border-emerald-400/30"
                style={{ margin: "-20px" }}
              />
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.15, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeOut", delay: 1.3 }}
                className="absolute inset-0 rounded-3xl border border-emerald-300/15"
                style={{ margin: "-36px" }}
              />

              {/* Logo image */}
              <motion.img
                src="/logo.jpg"
                alt="Seygo"
                initial={{ scale: 0.6, opacity: 0, y: 10 }}
                animate={logoReady ? { scale: 1, opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, type: "spring", stiffness: 180, damping: 18 }}
                className="relative h-16 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={logoReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-1 mb-16"
            >
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.4em" }}
                animate={logoReady ? { opacity: 1, letterSpacing: "0.25em" } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-emerald-400/70 text-xs font-semibold uppercase mt-3"
              >
                Discover the Real Sri Lanka
              </motion.p>
            </motion.div>

            {/* Progress area */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={logoReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center gap-3 w-72"
            >
              {/* Progress track */}
              <div className="w-full h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #059669, #10b981, #34d399)",
                    transition: "width 0.04s linear",
                    boxShadow: "0 0 12px rgba(52,211,153,0.8)",
                  }}
                >
                  {/* Shimmer on progress bar */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                      width: "60%",
                    }}
                    animate={{ x: ["-100%", "250%"] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>

              {/* Message + percentage */}
              <div className="flex items-center justify-between w-full px-0.5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs font-medium"
                    style={{ color: "rgba(52,211,153,0.6)" }}
                  >
                    {loadingMessages[messageIndex]}
                  </motion.p>
                </AnimatePresence>
                <span className="text-xs font-mono tabular-nums" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom brand mark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 flex flex-col items-center gap-1"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: "rgba(255,255,255,0.2)" }}>
                Sri Lanka's Hidden Side
              </span>
              <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
