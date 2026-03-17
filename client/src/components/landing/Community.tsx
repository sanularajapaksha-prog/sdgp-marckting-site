import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, MapPin, Camera, Users, ArrowRight, Instagram } from "lucide-react";

const photos = [
  {
    id: 1,
    user: "Kavinda M.",
    handle: "@kavinda.explores",
    location: "Sigiriya Rock Fortress",
    caption: "Sunrise from the top — nothing compares. Found this exact spot using Seygo! 🌄",
    likes: 1842,
    emoji: "🏔️",
    gradient: "from-amber-400 to-orange-600",
    size: "large",
  },
  {
    id: 2,
    user: "Emma T.",
    handle: "@emma.wanderlust",
    location: "Secret Waterfall, Ella",
    caption: "Seygo showed us this hidden gem — had it all to ourselves for 2 hours!",
    likes: 967,
    emoji: "💦",
    gradient: "from-teal-400 to-cyan-600",
    size: "small",
  },
  {
    id: 3,
    user: "Roshan P.",
    handle: "@roshan.lk",
    location: "Galle Fort at Dusk",
    caption: "My hometown looks different through a traveler's eyes. Proud to be on Seygo's team.",
    likes: 2341,
    emoji: "🏛️",
    gradient: "from-purple-400 to-indigo-600",
    size: "small",
  },
  {
    id: 4,
    user: "Mia & Jake",
    handle: "@twobackpackers",
    location: "Knuckles Mountain Range",
    caption: "Day 3 of our Knuckles trek. Seygo offline maps saved us twice already.",
    likes: 1123,
    emoji: "🌿",
    gradient: "from-green-400 to-emerald-700",
    size: "medium",
  },
  {
    id: 5,
    user: "Dilnoza K.",
    handle: "@silkroad.diaries",
    location: "Jaffna Night Market",
    caption: "The food here is unlike anything in the south — Seygo's food filter is 🔥",
    likes: 734,
    emoji: "🍛",
    gradient: "from-rose-400 to-pink-600",
    size: "small",
  },
  {
    id: 6,
    user: "Tim H.",
    handle: "@timcaptures",
    location: "Mirissa Beach, Pre-Dawn",
    caption: "4:45am. Worth every second. Seygo told me exactly when and where to stand.",
    likes: 3012,
    emoji: "🌊",
    gradient: "from-sky-400 to-blue-700",
    size: "large",
  },
  {
    id: 7,
    user: "Sanduni N.",
    handle: "@sanduni.wanders",
    location: "Tea Plantation, Nuwara Eliya",
    caption: "Seygo connected me with a local tea farmer for a private tour. Life-changing.",
    likes: 891,
    emoji: "🍵",
    gradient: "from-lime-400 to-green-600",
    size: "small",
  },
  {
    id: 8,
    user: "Carlos V.",
    handle: "@carlostravel",
    location: "Ancient City of Polonnaruwa",
    caption: "Following Seygo's audio guide here was like having a historian in my pocket.",
    likes: 1567,
    emoji: "🏺",
    gradient: "from-orange-400 to-red-600",
    size: "medium",
  },
];

function PhotoCard({ photo, index }: { photo: typeof photos[0]; index: number }) {
  const [liked, setLiked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const heightClass =
    photo.size === "large" ? "row-span-2" : photo.size === "medium" ? "row-span-1" : "row-span-1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${heightClass}`}
      style={{ minHeight: photo.size === "large" ? "400px" : "190px" }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />

      {/* Emoji */}
      <div className="absolute inset-0 flex items-center justify-center text-[6rem] opacity-20">
        {photo.emoji}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

      {/* Always visible bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-xs font-semibold truncate mb-0.5">{photo.user}</p>
        <div className="flex items-center gap-1 text-white/70 text-[10px]">
          <MapPin className="w-2.5 h-2.5" />
          <span className="truncate">{photo.location}</span>
        </div>
        <p className="text-white/80 text-[11px] mt-1.5 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {photo.caption}
        </p>
      </div>

      {/* Like button */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/70"
      >
        <Heart className={`w-3.5 h-3.5 ${liked ? "fill-white" : ""}`} />
        {photo.likes + (liked ? 1 : 0)}
      </button>

      {/* Instagram badge */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
          <Instagram className="w-2.5 h-2.5" />
          {photo.handle}
        </span>
      </div>
    </motion.div>
  );
}

export default function Community() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background relative overflow-hidden">
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
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-5 border border-primary/20">
            <Users className="w-3.5 h-3.5" />
            Community Wall
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Real people.{" "}
            <span className="text-primary italic">Real moments.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Every week, thousands of travelers share their Seygo discoveries.
            Here's a glimpse of the community in action.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[190px]">
          {photos.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
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
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4" />
              Share Your Photo
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-foreground text-sm font-semibold hover:bg-gray-50 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
