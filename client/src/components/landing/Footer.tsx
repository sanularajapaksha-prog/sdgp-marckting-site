import { motion } from "framer-motion";
import { MapPin, Mail, Instagram, Twitter, Facebook, Youtube, ArrowRight, Download, Heart } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Destinations", href: "#destinations" },
      { label: "Safety", href: "#safety" },
      { label: "App Explorer", href: "#app-explorer" },
      { label: "Download", href: "#download" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Reviews", href: "#reviews" },
      { label: "Community Wall", href: "#community" },
      { label: "Partners", href: "#partners" },
      { label: "Awards", href: "#awards" },
      { label: "Press", href: "#press" },
      { label: "Early Access", href: "#waitlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#mission" },
      { label: "Our Team", href: "#team" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Data Processing", href: "#" },
      { label: "Accessibility", href: "#" },
      { label: "Sitemap", href: "#" },
    ],
  },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-500" },
  { icon: Twitter, label: "X / Twitter", href: "#", color: "hover:text-sky-400" },
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-blue-500" },
  { icon: Youtube, label: "YouTube", href: "#", color: "hover:text-red-500" },
];

const appBadges = [
  { label: "App Store", sub: "iOS 14+", icon: "🍎" },
  { label: "Google Play", sub: "Android 8+", icon: "▶" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-foreground text-white relative overflow-hidden">
      {/* Top decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top section */}
        <div className="py-14 border-b border-white/8 grid lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={scrollToTop}
              className="flex items-center gap-2.5 mb-5 group"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl font-serif shadow-lg shadow-primary/30">
                S
              </div>
              <span className="text-2xl font-serif font-bold text-white group-hover:text-primary transition-colors">
                Seygo
              </span>
            </motion.button>

            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Discover the hidden soul of Sri Lanka. Travel authentic, travel safe, travel local.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-6">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Colombo, Sri Lanka
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className={`w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center text-white/50 ${color} transition-colors border border-white/5 hover:border-white/20`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/55 hover:text-white transition-colors hover-underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Download column */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              Get the App
            </h4>
            <div className="space-y-3">
              {appBadges.map((badge) => (
                <motion.button
                  key={badge.label}
                  whileHover={{ scale: 1.03, x: 2 }}
                  className="flex items-center gap-3 w-full bg-white/8 border border-white/10 rounded-2xl px-4 py-3 hover:bg-white/12 hover:border-white/20 transition-all group"
                >
                  <span className="text-xl">{badge.icon}</span>
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 leading-none">Download on</p>
                    <p className="text-sm font-semibold text-white leading-none mt-0.5">{badge.label}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{badge.sub}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-primary ml-auto transition-colors" />
                </motion.button>
              ))}
            </div>

            {/* Email */}
            <div className="mt-5 flex items-center gap-2 text-xs text-white/40">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <a href="mailto:hello@seygo.it.com" className="hover:text-white transition-colors">
                hello@seygo.it.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div className="flex items-center gap-1">
            <span>© 2025 Seygo Technologies (Pvt) Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1.5">
            Made with
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline mx-0.5" />
            in Sri Lanka
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-1.5 text-white/30 hover:text-white transition-colors"
          >
            Back to top
            <div className="w-5 h-5 border border-white/20 rounded-full flex items-center justify-center hover:border-primary transition-colors">
              <ArrowRight className="w-2.5 h-2.5 -rotate-90" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
