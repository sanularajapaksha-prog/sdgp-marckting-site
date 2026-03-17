import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp, BookOpen } from "lucide-react";

// ─── Section registry for reading progress ────────────────────────────────────

const SECTIONS = [
  { id: "hero",        label: "Home" },
  { id: "features",   label: "Features" },
  { id: "destinations", label: "Destinations" },
  { id: "safety",     label: "Safety" },
  { id: "community",  label: "Community" },
  { id: "reviews",    label: "Reviews" },
  { id: "mission",    label: "Mission" },
  { id: "team",       label: "Team" },
  { id: "waitlist",   label: "Early Access" },
  { id: "contact",    label: "Contact" },
];

// ─── Top progress bar ─────────────────────────────────────────────────────────

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-primary z-[9999] pointer-events-none"
    />
  );
}

// ─── Floating back-to-top button ──────────────────────────────────────────────

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [pct, setPct] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setVisible(v > 0.15);
      setPct(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollUp}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-[9990] group"
        >
          {/* Circular progress ring */}
          <svg
            width={52}
            height={52}
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 52 52"
          >
            <circle
              cx={26}
              cy={26}
              r={23}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="text-gray-200"
            />
            <circle
              cx={26}
              cy={26}
              r={23}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeDasharray={`${2 * Math.PI * 23}`}
              strokeDashoffset={`${2 * Math.PI * 23 * (1 - pct / 100)}`}
              strokeLinecap="round"
              className="text-primary transition-all duration-300"
            />
          </svg>

          {/* Inner circle */}
          <div className="relative w-[52px] h-[52px] bg-white border border-gray-100 rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 group-hover:shadow-primary/20 group-hover:shadow-xl text-foreground">
            <ArrowUp className="w-5 h-5" />
          </div>

          {/* Percentage tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-foreground text-white text-[11px] font-bold px-2 py-1 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {pct}% read
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Reading indicator (mini table of contents) ───────────────────────────────

export function ReadingProgress() {
  const [activeSection, setActiveSection] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeLabel = SECTIONS.find((s) => s.id === activeSection)?.label || "Home";

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed left-5 top-1/2 -translate-y-1/2 z-[9980] hidden xl:block"
        >
          <div className="relative">
            {/* Toggle button */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 shadow-md hover:shadow-lg transition-all text-xs font-semibold text-foreground"
            >
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span className="max-w-[100px] truncate">{activeLabel}</span>
            </button>

            {/* Section list */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-0 left-full ml-3 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 w-44"
                >
                  {SECTIONS.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => {
                          const el = document.getElementById(section.id);
                          el?.scrollIntoView({ behavior: "smooth" });
                          setOpen(false);
                        }}
                        className={`w-full text-left flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs transition-colors ${
                          isActive
                            ? "bg-primary/8 text-primary font-bold"
                            : "text-foreground/70 hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isActive ? "bg-primary" : "bg-gray-300"
                          }`}
                        />
                        {section.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Default export (all-in-one wrapper) ──────────────────────────────────────

export default function ScrollProgress() {
  return (
    <>
      <ScrollProgressBar />
      <BackToTop />
      <ReadingProgress />
    </>
  );
}
