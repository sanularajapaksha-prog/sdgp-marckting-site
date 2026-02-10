import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Apple, Play } from "lucide-react";
import heroBg from "@/assets/images/hero-bg.jpg";
import appUi from "@/assets/images/app-ui-1.png";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-[110vh] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yBg }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
        <img 
          src={heroBg} 
          alt="Sri Lanka Landscape" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <motion.div 
            style={{ y: yText, opacity: opacityText }}
            className="text-white space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium tracking-wide uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Travel Authentic
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif leading-tight"
            >
              Discover the <br/>
              <span className="text-secondary italic">Hidden Gems</span> <br/>
              of Sri Lanka
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed"
            >
              Stop following the crowds. Seygo is your digital pocket agent for finding local secrets, creating travel playlists, and navigating safely.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="rounded-full h-14 px-8 bg-white text-primary hover:bg-white/90 hover:text-primary-dark transition-all text-base font-semibold">
                <Apple className="mr-2 h-5 w-5" /> Download iOS
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 border-white/30 text-white bg-transparent hover:bg-white/10 text-base font-semibold">
                <Play className="mr-2 h-5 w-5 fill-current" /> Android App
              </Button>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 100, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.8 }}
            className="hidden lg:block relative"
          >
            <div className="relative mx-auto w-[320px] h-[640px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden">
               {/* Screen */}
               <div className="absolute inset-0 bg-white overflow-hidden">
                  <img src={appUi} alt="App Interface" className="w-full h-full object-cover" />
                  
                  {/* Floating UI Elements inside phone (simulated) */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute bottom-8 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">You are near Sigiriya</p>
                        <p className="text-xs text-muted-foreground">2 Hidden waterfalls nearby</p>
                      </div>
                    </div>
                  </motion.div>
               </div>
            </div>

            {/* Floating Elements Outside */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute top-20 -right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-[200px]"
            >
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                 ⭐️
               </div>
               <div>
                 <p className="text-xs font-bold">Top Rated Guide</p>
                 <p className="text-[10px] text-gray-500">Based on 500+ reviews</p>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
