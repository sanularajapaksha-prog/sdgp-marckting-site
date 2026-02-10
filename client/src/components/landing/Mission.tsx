import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Mission() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section id="mission" ref={containerRef} className="py-32 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="space-y-4">
          <motion.div style={{ x: x1 }} className="whitespace-nowrap">
            <h2 className="text-7xl md:text-9xl font-serif font-black opacity-10 uppercase leading-none">
              Authentic • Local • Real • Unfiltered • Authentic • Local • Real • Unfiltered
            </h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto py-12 relative z-10">
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif leading-tight text-center"
            >
              "Our mission is to bridge the gap between travelers and the true heartbeat of Sri Lanka."
            </motion.p>
          </div>

          <motion.div style={{ x: x2 }} className="whitespace-nowrap">
            <h2 className="text-7xl md:text-9xl font-serif font-black opacity-10 uppercase leading-none text-right">
              Experience • Discover • Wander • Live • Experience • Discover • Wander • Live
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
