import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Eye, Heart, Camera } from "lucide-react";

const categories = ["All", "Nature", "Culture", "Beach", "Adventure", "Food"];

const destinations = [
  {
    id: 1,
    name: "Ella Rock",
    region: "Uva Province",
    category: "Adventure",
    description: "A hidden hiking trail that rewards with panoramic misty mountain views above the clouds.",
    emoji: "⛰️",
    tags: ["Hiking", "Sunrise", "Views"],
    verified: true,
    likes: 1243,
    photos: 89,
    difficulty: "Moderate",
    bgColor: "from-emerald-600 to-teal-800",
    accent: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Hiriketiya Beach",
    region: "Southern Coast",
    category: "Beach",
    description: "A crescent-shaped bay hidden behind coconut groves — still undiscovered by mass tourism.",
    emoji: "🏖️",
    tags: ["Surfing", "Snorkeling", "Sunset"],
    verified: true,
    likes: 987,
    photos: 234,
    difficulty: "Easy",
    bgColor: "from-sky-500 to-blue-800",
    accent: "bg-sky-500",
  },
  {
    id: 3,
    name: "Knuckles Range",
    region: "Central Province",
    category: "Nature",
    description: "UNESCO-listed wilderness with endemic wildlife, cloud forests, and ancient walking paths.",
    emoji: "🌿",
    tags: ["UNESCO", "Wildlife", "Trekking"],
    verified: true,
    likes: 756,
    photos: 167,
    difficulty: "Challenging",
    bgColor: "from-green-600 to-emerald-900",
    accent: "bg-green-500",
  },
  {
    id: 4,
    name: "Dambulla Cave Temple",
    region: "North Central",
    category: "Culture",
    description: "Over 2,000 years old — five caves filled with 150+ statues of Buddha and ancient murals.",
    emoji: "🏛️",
    tags: ["History", "UNESCO", "Architecture"],
    verified: true,
    likes: 1102,
    photos: 312,
    difficulty: "Easy",
    bgColor: "from-amber-600 to-orange-900",
    accent: "bg-amber-500",
  },
  {
    id: 5,
    name: "Jaffna Night Market",
    region: "Northern Province",
    category: "Food",
    description: "Authentic Northern Sri Lankan cuisine, spices, and street food — a sensory explosion after dark.",
    emoji: "🍛",
    tags: ["Local Food", "Night Market", "Culture"],
    verified: true,
    likes: 642,
    photos: 98,
    difficulty: "Easy",
    bgColor: "from-rose-600 to-pink-900",
    accent: "bg-rose-500",
  },
  {
    id: 6,
    name: "Sinharaja Forest",
    region: "Sabaragamuwa",
    category: "Nature",
    description: "Sri Lanka's last viable area of primary tropical rainforest — home to 50% of endemic species.",
    emoji: "🌳",
    tags: ["Rainforest", "Birds", "Endemic"],
    verified: true,
    likes: 834,
    photos: 145,
    difficulty: "Moderate",
    bgColor: "from-teal-600 to-green-900",
    accent: "bg-teal-500",
  },
];

const difficultyColor: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-700",
  Moderate: "bg-amber-100 text-amber-700",
  Challenging: "bg-rose-100 text-rose-700",
};

function DestCard({ dest, index }: { dest: typeof destinations[0]; index: number }) {
  const [liked, setLiked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400"
    >
      {/* Image / Color block */}
      <div className={`relative h-52 bg-gradient-to-br ${dest.bgColor} overflow-hidden`}>
        {/* Emoji as visual placeholder */}
        <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30">
          {dest.emoji}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Top row inside image */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full">
            {dest.category}
          </span>
          <button
            onClick={() => setLiked(!liked)}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
              liked ? "bg-rose-500 text-white" : "bg-white/20 text-white hover:bg-rose-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Bottom inside image */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1.5">
            {dest.verified && (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-primary text-white rounded-full">
                ✓ Verified
              </span>
            )}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${difficultyColor[dest.difficulty]}`}>
              {dest.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-serif font-bold text-foreground">{dest.name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="w-3 h-3" />
              {dest.region}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{dest.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {dest.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-medium px-2.5 py-1 bg-gray-100 text-foreground/70 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" /> {dest.likes + (liked ? 1 : 0)}
            </span>
            <span className="flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-primary" /> {dest.photos}
            </span>
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all">
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    activeCategory === "All"
      ? destinations
      : destinations.filter((d) => d.category === activeCategory);

  return (
    <section id="destinations" className="py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-secondary/8 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-5 border border-primary/20">
            <Eye className="w-3.5 h-3.5" />
            Hidden Destinations
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Places You Won't Find{" "}
            <span className="text-primary italic">in a Guidebook</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every location in Seygo is personally visited and verified by our local community.
            No tourist traps. No inflated prices. Just Sri Lanka as it truly is.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-white text-muted-foreground hover:text-primary hover:bg-primary/5 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((dest, i) => (
              <DestCard key={dest.id} dest={dest} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground mb-4 text-sm">
            Showing {filtered.length} of 200+ verified destinations
          </p>
          <button className="inline-flex items-center gap-2 px-10 py-4 bg-foreground text-background font-bold uppercase tracking-wide text-sm hover:bg-foreground/90 transition-colors">
            Explore All Destinations <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
