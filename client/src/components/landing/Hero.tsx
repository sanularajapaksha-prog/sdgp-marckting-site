import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Apple, Play } from "lucide-react";
import heroBg from "@/assets/images/hero-bg.jpg";
import appUi from "@/assets/images/app-ui-1.png";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Background Image with Mask */}
      <motion.div 
        className="absolute right-0 top-0 w-full lg:w-2/3 h-full z-0 lg:rounded-bl-[10rem] overflow-hidden"
        style={{ y: yBg, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
        <img 
          src={heroBg} 
          alt="Sri Lanka" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8">
              The Island's Best Kept Secret
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-foreground leading-[0.9] mb-12">
              Beyond the <br/>
              <span className="text-primary italic">Ordinary.</span>
            </h1>
            
            <div className="grid md:grid-cols-2 gap-12 items-end">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md">
                Seygo isn't just an app—it's your key to the soul of Sri Lanka. From mist-covered mountains to hidden coastal sanctuaries.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-none h-16 px-10 bg-primary text-white hover:bg-primary-dark transition-all text-base font-bold uppercase tracking-wider">
                   Get the App
                </Button>
                <div className="flex items-center gap-4 px-4">
                   <Apple className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                   <Play className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating App Mockup - Asymmetrical Positioning */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[5%] bottom-[10%] hidden lg:block z-30"
      >
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative w-[280px] h-[580px] bg-black rounded-[2.5rem] border-[6px] border-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <img src={appUi} alt="App UI" className="w-full h-full object-cover" />
        </motion.div>
        
        {/* Decorative Badge */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -top-10 -left-10 w-32 h-32 bg-secondary rounded-full flex items-center justify-center p-4 text-center leading-tight shadow-lg rotate-12"
        >
          <p className="text-white font-serif font-bold text-sm uppercase tracking-tighter">
            Locally Verified
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
