import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield, ArrowRight, Settings } from "lucide-react";

const STORAGE_KEY = "seygo_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Small delay so it doesn't flash immediately
      const t = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = (all: boolean) => {
    const consent = all
      ? { essential: true, analytics: true, marketing: true }
      : { essential: true, analytics: prefs.analytics, marketing: prefs.marketing };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  const cookieTypes = [
    {
      key: "essential" as const,
      label: "Essential",
      desc: "Required for the website to function. Cannot be disabled.",
      always: true,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      key: "analytics" as const,
      label: "Analytics",
      desc: "Help us understand how visitors use our site so we can improve it.",
      always: false,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },
    {
      key: "marketing" as const,
      label: "Marketing",
      desc: "Used to show you relevant ads and content across the web.",
      always: false,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9990] w-full max-w-2xl px-4"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Main banner */}
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5">
                    <Cookie className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1">
                      We use cookies 🍪
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We use cookies to improve your experience, analyze site traffic, and
                      personalize content. You can manage your preferences or accept all cookies.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setVisible(false)}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Cookie detail toggles */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                      {cookieTypes.map((type) => (
                        <div key={type.key} className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${type.bg} ${type.color} mt-0.5 shrink-0`}>
                              {type.label}
                            </span>
                            <p className="text-xs text-muted-foreground leading-relaxed">{type.desc}</p>
                          </div>
                          <button
                            disabled={type.always}
                            onClick={() => setPrefs((p) => ({ ...p, [type.key]: !p[type.key] }))}
                            className={`relative w-11 h-6 rounded-full shrink-0 transition-all duration-200 ${
                              prefs[type.key] ? "bg-primary" : "bg-gray-200"
                            } ${type.always ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            <motion.div
                              animate={{ x: prefs[type.key] ? 22 : 2 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mt-5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => accept(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Accept All
                </motion.button>
                <button
                  onClick={() => accept(false)}
                  className="px-5 py-2.5 border border-gray-200 text-foreground font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-muted-foreground font-semibold text-sm rounded-xl hover:text-foreground transition-colors ml-auto"
                >
                  <Settings className="w-3.5 h-3.5" />
                  {showDetails ? "Hide" : "Manage"} Preferences
                </button>
              </div>
            </div>

            {/* Footer note */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-primary shrink-0" />
                We never sell your data. See our{" "}
                <a href="#" className="underline hover:text-primary transition-colors">Privacy Policy</a>
                {" "}and{" "}
                <a href="#" className="underline hover:text-primary transition-colors">Cookie Policy</a>
                {" "}for details.
                <ArrowRight className="w-3 h-3 ml-auto shrink-0 text-muted-foreground/40" />
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
