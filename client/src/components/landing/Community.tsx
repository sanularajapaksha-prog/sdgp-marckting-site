import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Heart,
  MapPin,
  Camera,
  Users,
  ArrowRight,
  Instagram,
  X,
  Share2,
  Bookmark,
  Mountain,
  Utensils,
  Landmark,
  Waves,
  Leaf,
  Grid3x3,
} from "lucide-react";

const FILTERS = [
  { id: "all",       label: "All",       icon: Grid3x3 },
  { id: "nature",    label: "Nature",    icon: Mountain },
  { id: "food",      label: "Food",      icon: Utensils },
  { id: "culture",   label: "Culture",   icon: Landmark },
  { id: "beach",     label: "Beach",     icon: Waves },
  { id: "wildlife",  label: "Wildlife",  icon: Leaf },
];

const photos = [
  {
    id: 1,
    user: "Kavinda M.",
    handle: "@kavinda.explores",
    location: "Sigiriya Rock Fortress",
    caption: "Sunrise from the top — nothing compares. Found this exact spot using Seygo! 🌄",
    likes: 1842,
    photo: "https://images.unsplash.com/photo-1526397751294-331021109fbd?w=800&h=600&fit=crop&q=80",
    gradient: "from-amber-400 to-orange-600",
    size: "large",
    category: "nature",
    tags: ["#Sigiriya", "#Sunrise", "#SriLanka"],
  },
  {
    id: 2,
    user: "Emma T.",
    handle: "@emma.wanderlust",
    location: "Secret Waterfall, Ella",
    caption: "Seygo showed us this hidden gem — had it all to ourselves for 2 hours!",
    likes: 967,
    photo: "https://images.unsplash.com/photo-1576941088953-6f9e03723440?w=800&h=600&fit=crop&q=80",
    gradient: "from-teal-400 to-cyan-600",
    size: "small",
    category: "nature",
    tags: ["#Ella", "#Waterfall", "#HiddenGem"],
  },
  {
    id: 3,
    user: "Roshan P.",
    handle: "@roshan.lk",
    location: "Galle Fort at Dusk",
    caption: "My hometown looks different through a traveler's eyes. Proud to be on Seygo's team.",
    likes: 2341,
    photo: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop&q=80",
    gradient: "from-purple-400 to-indigo-600",
    size: "small",
    category: "culture",
    tags: ["#GalleFort", "#Heritage", "#UNESCO"],
  },
  {
    id: 4,
    user: "Mia & Jake",
    handle: "@twobackpackers",
    location: "Knuckles Mountain Range",
    caption: "Day 3 of our Knuckles trek. Seygo offline maps saved us twice already.",
    likes: 1123,
    photo: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop&q=80",
    gradient: "from-green-400 to-emerald-700",
    size: "medium",
    category: "nature",
    tags: ["#Knuckles", "#Trekking", "#Hiking"],
  },
  {
    id: 5,
    user: "Dilnoza K.",
    handle: "@silkroad.diaries",
    location: "Jaffna Night Market",
    caption: "The food here is unlike anything in the south — Seygo's food filter is 🔥",
    likes: 734,
    photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&q=80",
    gradient: "from-rose-400 to-pink-600",
    size: "small",
    category: "food",
    tags: ["#Jaffna", "#StreetFood", "#NightMarket"],
  },
  {
    id: 6,
    user: "Tim H.",
    handle: "@timcaptures",
    location: "Mirissa Beach, Pre-Dawn",
    caption: "4:45am. Worth every second. Seygo told me exactly when and where to stand.",
    likes: 3012,
    photo: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=600&fit=crop&q=80",
    gradient: "from-sky-400 to-blue-700",
    size: "large",
    category: "beach",
    tags: ["#Mirissa", "#Sunrise", "#BeachLife"],
  },
  {
    id: 7,
    user: "Sanduni N.",
    handle: "@sanduni.wanders",
    location: "Tea Plantation, Nuwara Eliya",
    caption: "Seygo connected me with a local tea farmer for a private tour. Life-changing.",
    likes: 891,
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
    gradient: "from-lime-400 to-green-600",
    size: "small",
    category: "culture",
    tags: ["#TeaPlantation", "#NuwaraEliya", "#Local"],
  },
  {
    id: 8,
    user: "Carlos V.",
    handle: "@carlostravel",
    location: "Ancient City of Polonnaruwa",
    caption: "Following Seygo's audio guide here was like having a historian in my pocket.",
    likes: 1567,
    photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&q=80",
    gradient: "from-orange-400 to-red-600",
    size: "medium",
    category: "culture",
    tags: ["#Polonnaruwa", "#AncientCity", "#History"],
  },
  {
    id: 9,
    user: "Priya S.",
    handle: "@priya.eats",
    location: "Colombo Street Food Tour",
    caption: "The kottu roti at this Seygo pick was honestly life-changing. 10/10 recommend.",
    likes: 1205,
    photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&q=80",
    gradient: "from-yellow-400 to-amber-600",
    size: "small",
    category: "food",
    tags: ["#Colombo", "#KottuRoti", "#StreetFood"],
  },
  {
    id: 10,
    user: "Oliver B.",
    handle: "@wildlifephotos",
    location: "Yala National Park",
    caption: "Spotted a leopard on day 1. Seygo's wildlife guide made all the difference.",
    likes: 4230,
    photo: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=800&h=600&fit=crop&q=80",
    gradient: "from-stone-400 to-yellow-700",
    size: "large",
    category: "wildlife",
    tags: ["#Yala", "#Leopard", "#Wildlife"],
  },
  {
    id: 11,
    user: "Yuki R.",
    handle: "@yukiroams",
    location: "Tangalle Beach",
    caption: "Found the most deserted beach stretch thanks to Seygo's hidden spots filter 🏝️",
    likes: 889,
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80",
    gradient: "from-cyan-400 to-teal-700",
    size: "small",
    category: "beach",
    tags: ["#Tangalle", "#HiddenBeach", "#Peaceful"],
  },
  {
    id: 12,
    user: "Arjun D.",
    handle: "@arjun.local",
    location: "Kandy Esala Perahera",
    caption: "This festival is a must-see. Seygo's event calendar had the exact viewing spots.",
    likes: 2890,
    photo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80",
    gradient: "from-fuchsia-400 to-purple-700",
    size: "medium",
    category: "culture",
    tags: ["#Kandy", "#Perahera", "#Festival"],
  },
];

// ─── Photo Detail Modal ───────────────────────────────────────────────────────

function PhotoModal({
  photo,
  onClose,
}: {
  photo: (typeof photos)[0];
  onClose: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="relative h-64 overflow-hidden bg-muted">
          {photo.photo
            ? <img src={photo.photo} alt={photo.location} className="w-full h-full object-cover" />
            : <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />
          }
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-full">
            <Instagram className="w-3 h-3" />
            {photo.handle}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-bold text-foreground">{photo.user}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="w-3 h-3 text-primary" />
                {photo.location}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSaved(!saved)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${
                  saved
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "border-gray-200 text-muted-foreground hover:border-primary/20"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${saved ? "fill-primary" : ""}`} />
              </button>
              <button className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-muted-foreground hover:border-primary/20 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-sm text-foreground/80 leading-relaxed mb-3">{photo.caption}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {photo.tags.map((tag) => (
              <span key={tag} className="text-xs text-primary font-medium hover:underline cursor-pointer">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                liked ? "text-rose-500" : "text-muted-foreground hover:text-rose-400"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-rose-500" : ""}`} />
              {photo.likes + (liked ? 1 : 0)} likes
            </button>
            <a
              href="#waitlist"
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs bg-primary text-white px-4 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              Share yours
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Photo Card ───────────────────────────────────────────────────────────────

function PhotoCard({
  photo,
  index,
  onClick,
}: {
  photo: (typeof photos)[0];
  index: number;
  onClick: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const heightClass =
    photo.size === "large" ? "row-span-2" : "row-span-1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${heightClass}`}
      style={{ minHeight: photo.size === "large" ? "400px" : "190px" }}
      onClick={onClick}
    >
      {photo.photo
        ? <img src={photo.photo} alt={photo.location} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        : <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />
      }
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-xs font-bold truncate">{photo.user}</p>
        <div className="flex items-center gap-1 text-white/70 text-[10px] mt-0.5">
          <MapPin className="w-2.5 h-2.5 shrink-0" />
          <span className="truncate">{photo.location}</span>
        </div>
        <p className="text-white/80 text-[11px] mt-1.5 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {photo.caption}
        </p>
      </div>

      {/* Like */}
      <button
        onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
        className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white px-2 py-1.5 rounded-full text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/70"
      >
        <Heart className={`w-3.5 h-3.5 ${liked ? "fill-white" : ""}`} />
        {photo.likes + (liked ? 1 : 0)}
      </button>

      {/* Handle */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
          <Instagram className="w-2.5 h-2.5" />
          {photo.handle}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Community() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState<(typeof photos)[0] | null>(null);

  const filtered =
    activeFilter === "all"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  const totalLikes = photos.reduce((a, p) => a + p.likes, 0).toLocaleString();

  return (
    <section id="community" className="py-24 bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-secondary/6 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-5 border border-primary/20">
            <Users className="w-3.5 h-3.5" />
            Community Wall
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Real people.{" "}
            <span className="text-primary italic">Real moments.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-3">
            Every week, thousands of travelers share their Seygo discoveries.
            Here's a glimpse of the community in action.
          </p>
          <p className="text-sm font-bold text-primary">
            {totalLikes}+ total likes across the community
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeFilter === id
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                  : "bg-white text-muted-foreground border-gray-200 hover:border-primary/30 hover:text-primary"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[190px]"
          >
            {filtered.map((photo, i) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={i}
                onClick={() => setSelected(photo)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-4xl mb-3">📸</p>
            <p className="font-semibold">No photos in this category yet.</p>
            <p className="text-sm mt-1">Be the first to share one!</p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {["🧑‍🎨", "👩‍💼", "🧔", "👩‍🦱", "🧑‍🤝‍🧑"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/60 to-primary flex items-center justify-center text-lg border-2 border-white"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-foreground">Join 10,000+ explorers</p>
              <p className="text-sm text-muted-foreground">Share your Sri Lanka story with the world</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-full hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4" />
              Share Your Photo
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-foreground text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Photo modal */}
      <AnimatePresence>
        {selected && (
          <PhotoModal photo={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
