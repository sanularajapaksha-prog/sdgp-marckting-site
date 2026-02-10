import { motion } from "framer-motion";
import { MapPin, Music, Shield, Compass, Heart, Camera } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Hidden Gems",
    description: "Discover secret waterfalls, secluded beaches, and local eateries that aren't in the guidebooks."
  },
  {
    icon: Music,
    title: "Travel Playlists",
    description: "Curated audio journeys that match your route. Learn about history and culture as you drive."
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Real-time safety alerts, verified guides, and emergency support at your fingertips."
  },
  {
    icon: Compass,
    title: "Smart Navigation",
    description: "Offline maps designed for Sri Lankan roads. Never get lost in the jungle again."
  },
  {
    icon: Heart,
    title: "Authentic Experiences",
    description: "Connect directly with local artisans and families for truly immersive cultural exchanges."
  },
  {
    icon: Camera,
    title: "Photo Spots",
    description: "Find the perfect angles at iconic locations and discover un-instagrammed viewpoints."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest text-sm uppercase"
          >
            Why Seygo?
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif mt-4 mb-6 text-foreground"
          >
            More than just a map. <br/> Your personal travel companion.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            We combine local wisdom with modern tech to give you the most authentic Sri Lankan experience possible.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
