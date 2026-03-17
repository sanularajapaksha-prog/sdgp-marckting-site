import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "seygo_theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolved: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
  resolved: "light",
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as Theme) || "light";
    } catch {
      return "light";
    }
  });

  const resolved = theme === "system" ? getSystemTheme() : theme;

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    applyTheme(t);
  };

  useEffect(() => {
    applyTheme(theme);

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// ─── Toggle Button ────────────────────────────────────────────────────────────

const options: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, resolved } = useTheme();
  const [open, setOpen] = useState(false);

  const current = options.find((o) => o.value === theme) || options[0];
  const CurrentIcon = current.icon;

  if (compact) {
    // Simple icon toggle between light ↔ dark
    return (
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
        className="relative w-9 h-9 rounded-xl border border-border bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={resolved}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            {resolved === "dark" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    );
  }

  // Full dropdown version
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-muted text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="hidden sm:inline">{current.label}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-1.5 w-36 overflow-hidden"
            >
              {options.map((opt) => {
                const Icon = opt.icon;
                const active = theme === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setTheme(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                      active
                        ? "bg-primary/8 text-primary font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {opt.label}
                    {active && (
                      <motion.div
                        layoutId="theme-active"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
