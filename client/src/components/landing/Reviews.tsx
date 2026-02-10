import { motion } from "framer-motion";

const reviews = [
  {
    name: "Sarah Jenkins",
    text: "Seygo completely changed how we explored Ella. We found a waterfall that wasn't on Google Maps!",
    role: "UK Traveler"
  },
  {
    name: "David Chen",
    text: "The safety alerts gave me peace of mind while solo traveling. A must-have app.",
    role: "Solo Backpacker"
  },
  {
    name: "Amara Perera",
    text: "Even as a local, I discovered new spots in my own hometown. Highly recommended!",
    role: "Local Guide"
  },
  {
    name: "Tom & Lisa",
    text: "The curated playlists made our road trip across the coast magical.",
    role: "Couple from Australia"
  },
  {
    name: "Jessica Wu",
    text: "Better than any guidebook I bought. The 'Hidden Gems' feature is gold.",
    role: "Digital Nomad"
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Loved by Travelers</h2>
      </div>
      
      <div className="relative w-full">
        {/* Gradients for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-6 pl-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            style={{ width: "fit-content" }}
          >
            {[...reviews, ...reviews, ...reviews].map((review, i) => (
              <div 
                key={i} 
                className="w-[350px] flex-shrink-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
