import { useState, useEffect, useCallback } from "react";
import { Menu, X, Download, ChevronDown, Star, Bell, ArrowRight, Globe, Smartphone } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/landing/ThemeToggle";

const navLinks = [
  {
    name: "Features",
    href: "#features",
    dropdown: [
      { label: "Hidden Gems", desc: "Discover secret locations", icon: "🗺️" },
      { label: "Travel Playlists", desc: "Curated audio journeys", icon: "🎵" },
      { label: "Safety First", desc: "Real-time alerts & guides", icon: "🛡️" },
      { label: "Smart Navigation", desc: "Offline Sri Lankan maps", icon: "📍" },
    ],
  },
  { name: "Destinations", href: "#destinations" },
  { name: "Reviews", href: "#reviews" },
  { name: "Mission", href: "#mission" },
  { name: "Team", href: "#team" },
];

const announcements = [
  "🎉 Seygo is now available on the App Store & Google Play!",
  "🏆 Winner — Best Travel App, Sri Lanka Tourism Awards 2025",
  "📍 New: 200+ verified hidden gems added this month",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [announcementIndex, setAnnounceIndex] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setScrolled(latest > 50);
  });

  // Rotate announcements every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnounceIndex((prev: number) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["features", "destinations", "reviews", "mission", "team"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close dropdown on outside click
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-nav-dropdown]")) {
        setOpenDropdown(null);
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleOutsideClick]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-primary text-white text-xs md:text-sm font-medium overflow-hidden"
          >
            <div className="container mx-auto px-6 py-2 flex items-center justify-between">
              <div className="flex-1 flex items-center justify-center gap-2 text-center">
                <Bell className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={announcementIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="truncate"
                  >
                    {announcements[announcementIndex]}
                  </motion.span>
                </AnimatePresence>
                <a
                  href="#download"
                  className="hidden sm:flex items-center gap-1 ml-2 underline underline-offset-2 hover:opacity-80 shrink-0"
                >
                  Learn more <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <button
                onClick={() => setAnnouncementVisible(false)}
                className="ml-4 hover:opacity-70 transition-opacity shrink-0"
                aria-label="Dismiss announcement"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.nav
        className={cn(
          "transition-all duration-300 border-b",
          scrolled
            ? "bg-white/90 backdrop-blur-lg py-3 shadow-md border-gray-100/80"
            : "bg-transparent py-5 border-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-sans text-lg font-bold shadow-md shadow-primary/30"
            >
              S
            </motion.div>
            <span className="text-2xl font-serif font-bold text-primary group-hover:opacity-80 transition-opacity">
              Seygo
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative" data-nav-dropdown>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.name ? null : link.name)
                      }
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all",
                        activeSection === link.href.replace("#", "") || openDropdown === link.name
                          ? "text-primary bg-primary/10"
                          : scrolled
                          ? "text-foreground hover:text-primary hover:bg-primary/5"
                          : "text-foreground/80 hover:text-foreground hover:bg-white/20"
                      )}
                    >
                      {link.name}
                      <motion.span
                        animate={{ rotate: openDropdown === link.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.span>
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 p-2"
                        >
                          {link.dropdown.map((item, i) => (
                            <motion.a
                              key={item.label}
                              href={link.href}
                              onClick={() => handleNavClick(link.href)}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 transition-colors group/item"
                            >
                              <span className="text-xl">{item.icon}</span>
                              <div>
                                <p className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">
                                  {item.label}
                                </p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                              </div>
                            </motion.a>
                          ))}
                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <a
                              href="#features"
                              onClick={() => handleNavClick("#features")}
                              className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/5 rounded-xl transition-colors"
                            >
                              View all features <ArrowRight className="w-3 h-3" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      activeSection === link.href.replace("#", "")
                        ? "text-primary bg-primary/10"
                        : scrolled
                        ? "text-foreground hover:text-primary hover:bg-primary/5"
                        : "text-foreground/80 hover:text-foreground hover:bg-white/20"
                    )}
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Right Side CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Download badge */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
              <span className="font-semibold text-foreground">4.9</span>
              <span>· 10k+ downloads</span>
            </div>

            <div className="w-px h-5 bg-gray-200" />

            <ThemeToggle compact />

            <div className="w-px h-5 bg-gray-200" />

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                className={cn(
                  "rounded-full px-6 font-semibold gap-2 shadow-md transition-all",
                  scrolled
                    ? "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
                    : "bg-white text-primary hover:bg-white/90 shadow-black/10"
                )}
              >
                <Download className="w-4 h-4" />
                Get App
              </Button>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={cn(
              "md:hidden p-2 rounded-xl transition-colors",
              scrolled ? "text-foreground hover:bg-gray-100" : "text-foreground hover:bg-white/20"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={cn(
                    "flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-medium transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-gray-50"
                  )}
                >
                  <span>{link.name}</span>
                  {link.dropdown && <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </motion.a>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-100 my-2" />

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="font-bold text-foreground">4.9</span>
                    <span>App Store rating</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Smartphone className="w-4 h-4" />
                    <span>10k+ downloads</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full rounded-2xl bg-primary text-white font-bold gap-2 h-14"
                >
                  <Download className="w-5 h-5" />
                  Download Seygo — Free
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pb-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Available worldwide · iOS & Android</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
