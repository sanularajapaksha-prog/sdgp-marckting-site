import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Download, MapPin, Globe, MessageSquare, TrendingUp, Award } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

const stats: StatItem[] = [
  {
    icon: Download,
    value: 10000,
    suffix: "+",
    label: "Downloads",
    description: "Active travelers using Seygo worldwide",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MapPin,
    value: 200,
    suffix: "+",
    label: "Hidden Gems",
    description: "Verified secret locations across Sri Lanka",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Globe,
    value: 47,
    suffix: "+",
    label: "Countries",
    description: "Nationalities of travelers in our community",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: MessageSquare,
    value: 3200,
    suffix: "+",
    label: "Reviews",
    description: "5-star reviews on App Store & Google Play",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    label: "Satisfaction",
    description: "Users who would recommend Seygo to friends",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    icon: Award,
    value: 12,
    suffix: "",
    label: "Awards Won",
    description: "Tourism & technology awards since 2023",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const start = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(stat.value, 1800, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${stat.bgColor} rounded-bl-full opacity-40 group-hover:opacity-70 transition-opacity`}
      />

      {/* Icon */}
      <div className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center mb-4 relative z-10`}>
        <stat.icon className={`w-6 h-6 ${stat.color}`} />
      </div>

      {/* Number */}
      <div className="relative z-10 mb-1">
        <span className={`text-4xl font-bold font-serif ${stat.color}`}>
          {stat.prefix || ""}
          {count.toLocaleString()}
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-lg font-semibold text-foreground mb-1 relative z-10">{stat.label}</p>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-snug relative z-10">{stat.description}</p>

      {/* Bottom progress bar decoration */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: index * 0.1 + 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute bottom-0 left-0 h-1 w-full ${stat.bgColor} origin-left`}
      >
        <div className={`h-full w-2/3 ${stat.color.replace("text-", "bg-")} rounded-r-full`} />
      </motion.div>
    </motion.div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gradient-to-b from-background to-gray-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4 border border-primary/20">
            By the Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Trusted by Thousands of{" "}
            <span className="text-primary italic">Adventurers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From solo backpackers to family expeditions — Seygo is the go-to guide for
            anyone who wants to see Sri Lanka the right way.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 bg-primary rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-xl shadow-primary/20"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
              Join the movement.
            </h3>
            <p className="text-white/80 text-base max-w-md">
              Every traveler who downloads Seygo helps us add more verified hidden gems to
              the map. Be part of the community.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button className="px-8 py-3 bg-white text-primary font-bold rounded-none hover:bg-white/90 transition-colors uppercase tracking-wide text-sm">
              Download Free
            </button>
            <button className="px-8 py-3 border border-white/40 text-white font-semibold rounded-none hover:bg-white/10 transition-colors text-sm">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
