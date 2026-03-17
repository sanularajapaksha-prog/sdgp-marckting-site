import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, ThumbsUp } from "lucide-react";

const reviews = [
  {
    name: "Sarah Jenkins",
    avatar: "SJ",
    text: "Seygo completely changed how we explored Ella. We found a waterfall that wasn't on Google Maps — and had it entirely to ourselves for two hours. Absolutely magical.",
    role: "UK Traveler",
    location: "Visited: Ella & Hill Country",
    rating: 5,
    date: "March 2025",
    helpful: 47,
    verified: true,
    highlight: "Found a waterfall not on any map",
    accentColor: "from-teal-500 to-primary",
  },
  {
    name: "David Chen",
    avatar: "DC",
    text: "The safety alerts gave me real peace of mind while solo backpacking. I was notified about a road closure before heading into the mountains — saved me hours. A must-have app.",
    role: "Solo Backpacker",
    location: "Visited: Knuckles Range",
    rating: 5,
    date: "February 2025",
    helpful: 38,
    verified: true,
    highlight: "Safety alerts prevented a 3-hour detour",
    accentColor: "from-violet-500 to-purple-700",
  },
  {
    name: "Amara Perera",
    avatar: "AP",
    text: "Even as a Sri Lankan local, I discovered new spots in my own hometown I had never heard of. The community verification makes it trustworthy in a way no other travel app is.",
    role: "Local Guide · Colombo",
    location: "Discovered: 12 new local spots",
    rating: 5,
    date: "January 2025",
    helpful: 92,
    verified: true,
    highlight: "Locals love it too, not just tourists",
    accentColor: "from-emerald-500 to-teal-700",
  },
  {
    name: "Tom & Lisa B.",
    avatar: "TL",
    text: "The curated audio playlists made our coastal road trip from Galle to Trincomalee feel like a movie. We arrived knowing the history of every town before we even stepped out of the car.",
    role: "Couple · Sydney, Australia",
    location: "Visited: Southern + East Coast",
    rating: 5,
    date: "March 2025",
    helpful: 63,
    verified: true,
    highlight: "Audio playlists are a game-changer",
    accentColor: "from-amber-500 to-orange-700",
  },
  {
    name: "Jessica Wu",
    avatar: "JW",
    text: "Better than any guidebook I've ever bought. The Hidden Gems feature is pure gold — and it works offline, which is crucial when you're in the jungle with no signal.",
    role: "Digital Nomad · Taiwan",
    location: "Visited: Sinharaja & Yala",
    rating: 5,
    date: "February 2025",
    helpful: 55,
    verified: true,
    highlight: "Offline mode works flawlessly",
    accentColor: "from-rose-500 to-pink-700",
  },
  {
    name: "Marcus Bauer",
    avatar: "MB",
    text: "I travel professionally and write destination guides. Seygo showed me things in Sri Lanka I've never seen recommended anywhere online. Their community vetting is genuinely impressive.",
    role: "Travel Writer · Germany",
    location: "Visited: North & East Sri Lanka",
    rating: 5,
    date: "January 2025",
    helpful: 81,
    verified: true,
    highlight: "Better than professional travel guides",
    accentColor: "from-sky-500 to-blue-700",
  },
];

const overallStats = [
  { value: "4.9", label: "App Store Rating", icon: Star },
  { value: "10k+", label: "Happy Travelers", icon: ThumbsUp },
  { value: "98%", label: "Would Recommend", icon: Quote },
];

export default function Reviews() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="reviews" className="py-24 bg-gray-50/60 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/6 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={headerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-5 border border-primary/20">
            <Star className="w-3.5 h-3.5 fill-primary" />
            Real Traveler Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Loved by Thousands of{" "}
            <span className="text-primary italic">Explorers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't take our word for it. Here's what real travelers are saying about
            their Seygo experience across Sri Lanka.
          </p>
        </motion.div>

        {/* Overall stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-8 mb-14"
        >
          {overallStats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary fill-primary/30" />
              </div>
              <div>
                <p className="text-2xl font-bold font-serif text-foreground leading-none">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Infinite scroll row 1 — left to right */}
      <div className="relative w-full mb-5 group">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-5 pl-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            style={{ width: "fit-content" }}
          >
            {[...reviews.slice(0, 3), ...reviews.slice(0, 3), ...reviews.slice(0, 3)].map(
              (review, i) => (
                <ReviewCard key={`row1-${i}`} review={review} />
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* Infinite scroll row 2 — right to left */}
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-5 pl-5"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            style={{ width: "fit-content" }}
          >
            {[...reviews.slice(3), ...reviews.slice(3), ...reviews.slice(3)].map(
              (review, i) => (
                <ReviewCard key={`row2-${i}`} review={review} />
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="w-[360px] flex-shrink-0 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "fill-secondary text-secondary" : "text-gray-200"}`} />
        ))}
        <span className="text-xs text-muted-foreground ml-1.5">{review.date}</span>
        {review.verified && (
          <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            ✓ Verified
          </span>
        )}
      </div>

      {/* Highlight pill */}
      <div className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${review.accentColor} text-white mb-3`}>
        "{review.highlight}"
      </div>

      {/* Review text */}
      <p className="text-sm text-muted-foreground italic leading-relaxed mb-5">
        "{review.text}"
      </p>

      {/* Reviewer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${review.accentColor} flex items-center justify-center text-white text-xs font-bold`}>
            {review.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-none">{review.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{review.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>{review.helpful}</span>
        </div>
      </div>

      {/* Location tag */}
      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-muted-foreground">
        📍 {review.location}
      </div>
    </div>
  );
}
