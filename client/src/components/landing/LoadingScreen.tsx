import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
  "Finding hidden gems...",
  "Mapping secret waterfalls...",
  "Verifying local spots...",
  "Loading your adventure...",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Progress bar animation
    const duration = 2200;
    const steps = 60;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      setProgress(Math.min(current, 100));
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    }, duration / steps);

    // Rotate messages
    const msgTimer = setInterval(() => {
      setMessageIndex((prev: number) => (prev + 1) % loadingMessages.length);
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(msgTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-foreground flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.04, 0.1, 0.04] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary rounded-full blur-3xl"
            />
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          {/* Logo reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center mb-16"
          >
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/40 mb-6"
            >
              <span className="text-white font-serif font-bold text-4xl">S</span>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.05em" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white font-serif text-4xl font-bold tracking-wide"
            >
              Seygo
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/40 text-sm mt-2 tracking-widest uppercase"
            >
              Discover the Real Sri Lanka
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.5 }}
            className="w-64 relative"
          >
            <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-teal-400 to-secondary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-white/40"
                >
                  {loadingMessages[messageIndex]}
                </motion.p>
              </AnimatePresence>
              <span className="text-xs text-white/30 font-mono">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>

          {/* Bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 text-xs text-white/20 tracking-widest uppercase"
          >
            Sri Lanka's Hidden Side
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
