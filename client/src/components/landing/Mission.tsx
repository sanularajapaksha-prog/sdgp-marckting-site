import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Heart, Compass, Globe, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Authentic",
    desc: "Every location is chosen because it represents the real Sri Lanka — not the tourist version.",
  },
  {
    icon: Compass,
    title: "Local",
    desc: "Our community is made up of Sri Lankans who share their homeland's best-kept secrets.",
  },
  {
    icon: Globe,
    title: "Open",
    desc: "We believe travel should connect people, not separate them. Sri Lanka for everyone.",
  },
];

export default function Mission() {
  const containerRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const inView = useInView(valuesRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="mission"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background — gradient */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-teal-800 z-0"
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Blobs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-secondary/15 rounded-full blur-3xl z-0" />

      {/* Scrolling text layers */}
      <div className="overflow-hidden pointer-events-none absolute inset-0 flex flex-col justify-between py-8 z-0">
        <motion.div style={{ x: x1 }} className="whitespace-nowrap">
          <span className="text-7xl md:text-9xl font-serif font-black text-white/8 uppercase leading-none">
            Authentic • Local • Real • Unfiltered • Authentic • Local • Real • Unfiltered •
          </span>
        </motion.div>
        <motion.div style={{ x: x3 }} className="whitespace-nowrap">
          <span className="text-7xl md:text-9xl font-serif font-black text-white/5 uppercase leading-none">
            Hidden • Genuine • Community • Travel • Hidden • Genuine • Community • Travel •
          </span>
        </motion.div>
        <motion.div style={{ x: x2 }} className="whitespace-nowrap text-right">
          <span className="text-7xl md:text-9xl font-serif font-black text-white/8 uppercase leading-none">
            Experience • Discover • Wander • Live • Experience • Discover • Wander • Live •
          </span>
        </motion.div>
      </div>

      {/* Center content */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase border border-white/20">
            Our Mission
          </span>
        </motion.div>

        {/* Main quote */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight text-white"
          >
            "Our mission is to bridge the gap between travelers and the{" "}
            <span className="text-secondary italic">true heartbeat</span> of Sri Lanka."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold hover:bg-white/90 transition-colors">
              Our Story <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
              Meet the Team
            </button>
          </motion.div>
        </div>

        {/* Values row */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" ref={valuesRef}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 text-white hover:bg-white/15 transition-colors"
            >
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-serif font-bold mb-2">{v.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
