import { motion } from "framer-motion";
import { Star, Download, MapPin, Users, Award, Shield, TrendingUp, Heart } from "lucide-react";

const tickerItems = [
  { icon: Download, text: "10,000+ downloads worldwide", color: "text-primary" },
  { icon: Star, text: "4.9★ rated on App Store", color: "text-secondary" },
  { icon: MapPin, text: "200+ hidden gems verified", color: "text-emerald-600" },
  { icon: Users, text: "Travelers from 47 countries", color: "text-violet-600" },
  { icon: Award, text: "Best Travel App — Sri Lanka 2025", color: "text-amber-600" },
  { icon: Shield, text: "100% locally verified locations", color: "text-teal-600" },
  { icon: TrendingUp, text: "#1 fastest growing app in South Asia", color: "text-rose-600" },
  { icon: Heart, text: "98% would recommend to friends", color: "text-pink-600" },
  { icon: Star, text: "3,200+ five-star reviews", color: "text-secondary" },
  { icon: MapPin, text: "New gems added every week", color: "text-primary" },
  { icon: Download, text: "Free to download — no credit card", color: "text-emerald-600" },
  { icon: Award, text: "Editor's Choice — Google Play", color: "text-amber-600" },
];

export default function SocialProofTicker() {
  return (
    <div className="bg-foreground text-white py-3.5 overflow-hidden relative border-y border-white/5">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-0 shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          style={{ width: "fit-content" }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 border-r border-white/10 whitespace-nowrap"
            >
              <item.icon className={`w-3.5 h-3.5 ${item.color} shrink-0`} />
              <span className="text-xs font-semibold text-white/80">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
