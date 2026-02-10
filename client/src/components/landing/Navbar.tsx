import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Reviews", href: "#reviews" },
    { name: "Mission", href: "#mission" },
    { name: "Team", href: "#team" },
  ];

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-white/80 backdrop-blur-md py-4 shadow-sm border-white/20"
          : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
           {/* Logo placeholder - replace with img if available */}
           <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-sans text-lg font-bold">S</div>
           Seygo
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                scrolled ? "text-foreground" : "text-foreground md:text-white md:hover:text-white/80" // Dark text on white nav, white text on transparent (assuming dark hero overlay) - actually hero bg might be light or dark. Let's assume dark overlay on hero image.
              )}
            >
              {link.name}
            </a>
          ))}
          <Button 
            className={cn(
              "rounded-full px-6 font-semibold",
              scrolled ? "bg-primary text-white" : "bg-white text-primary hover:bg-white/90"
            )}
          >
            Get App
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu className={scrolled ? "text-foreground" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 md:hidden shadow-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button className="w-full rounded-full">Get App</Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
