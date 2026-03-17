import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  Tag,
  ArrowRight,
  Search,
  TrendingUp,
  MapPin,
  Camera,
  Utensils,
  Shield,
  Mountain,
  Star,
  ChevronRight,
  Eye,
  Heart,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Posts", icon: BookOpen },
  { id: "destinations", label: "Destinations", icon: MapPin },
  { id: "food", label: "Food & Drink", icon: Utensils },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "safety", label: "Safety Tips", icon: Shield },
  { id: "adventure", label: "Adventure", icon: Mountain },
];

const posts = [
  {
    id: 1,
    category: "destinations",
    tag: "Destinations",
    tagColor: "text-blue-400 bg-blue-400/10",
    title: "Sigiriya at Sunrise: Why You Must Wake Up at 5 AM",
    excerpt:
      "The ancient rock fortress looks completely different at dawn — no crowds, golden light painting the frescoes, and a silence that makes you feel like the only person in Sri Lanka.",
    author: "Kavindi Perera",
    authorAvatar: "KP",
    avatarColor: "bg-blue-600",
    date: "Mar 12, 2026",
    readTime: "6 min read",
    views: "12.4k",
    likes: 847,
    featured: true,
    gradient: "from-blue-900/60 to-indigo-900/40",
    border: "border-blue-500/20",
    emoji: "🏔️",
  },
  {
    id: 2,
    category: "food",
    tag: "Food & Drink",
    tagColor: "text-orange-400 bg-orange-400/10",
    title: "12 Sri Lankan Street Foods You Must Try Before You Leave",
    excerpt:
      "From kottu roti sizzling on iron griddles at midnight to sweet pol roti fresh off clay ovens, Sri Lanka's street food scene is a sensory overload in the best possible way.",
    author: "Dilshan Raj",
    authorAvatar: "DR",
    avatarColor: "bg-orange-600",
    date: "Mar 8, 2026",
    readTime: "8 min read",
    views: "18.9k",
    likes: 1203,
    featured: false,
    gradient: "from-orange-900/60 to-amber-900/40",
    border: "border-orange-500/20",
    emoji: "🍛",
  },
  {
    id: 3,
    category: "photography",
    tag: "Photography",
    tagColor: "text-pink-400 bg-pink-400/10",
    title: "The Golden Hour Guide: Best Spots for Travel Photography",
    excerpt:
      "Our community photographers share their top secret locations — rice paddies, colonial lighthouses, and hilltop temples — that make Sri Lanka a dream destination for golden hour shots.",
    author: "Nisha Wijesinghe",
    authorAvatar: "NW",
    avatarColor: "bg-pink-600",
    date: "Mar 5, 2026",
    readTime: "5 min read",
    views: "9.2k",
    likes: 634,
    featured: false,
    gradient: "from-pink-900/60 to-rose-900/40",
    border: "border-pink-500/20",
    emoji: "📸",
  },
  {
    id: 4,
    category: "safety",
    tag: "Safety Tips",
    tagColor: "text-green-400 bg-green-400/10",
    title: "Solo Travel in Sri Lanka: The Honest Safety Guide for 2026",
    excerpt:
      "Sri Lanka is generally very safe, but knowing the right areas, transportation options, and digital tools like Seygo's real-time alerts can make your solo trip genuinely stress-free.",
    author: "Amara Bandara",
    authorAvatar: "AB",
    avatarColor: "bg-green-600",
    date: "Feb 28, 2026",
    readTime: "10 min read",
    views: "22.1k",
    likes: 1891,
    featured: false,
    gradient: "from-green-900/60 to-emerald-900/40",
    border: "border-green-500/20",
    emoji: "🛡️",
  },
  {
    id: 5,
    category: "adventure",
    tag: "Adventure",
    tagColor: "text-violet-400 bg-violet-400/10",
    title: "Hiking Adam's Peak: Everything You Need to Know",
    excerpt:
      "The 5,500-step night hike to Sri Lanka's most sacred peak is a spiritual and physical challenge unlike anything else. Here's how to prepare, what to bring, and what to expect at the summit.",
    author: "Roshan Fernando",
    authorAvatar: "RF",
    avatarColor: "bg-violet-600",
    date: "Feb 22, 2026",
    readTime: "7 min read",
    views: "14.7k",
    likes: 1042,
    featured: false,
    gradient: "from-violet-900/60 to-purple-900/40",
    border: "border-violet-500/20",
    emoji: "⛰️",
  },
  {
    id: 6,
    category: "destinations",
    tag: "Destinations",
    tagColor: "text-cyan-400 bg-cyan-400/10",
    title: "The Secret Beaches of Sri Lanka That Locals Actually Love",
    excerpt:
      "Beyond Mirissa and Unawatuna, there are stretches of sand so quiet and pristine that you'll wonder why they don't appear in any tourist brochure. We found them for you.",
    author: "Tharushi Silva",
    authorAvatar: "TS",
    avatarColor: "bg-cyan-600",
    date: "Feb 17, 2026",
    readTime: "9 min read",
    views: "31.5k",
    likes: 2347,
    featured: false,
    gradient: "from-cyan-900/60 to-teal-900/40",
    border: "border-cyan-500/20",
    emoji: "🏖️",
  },
];

const trending = [
  "Whale Watching Season 2026",
  "Train Ride Ella to Kandy",
  "Yala Leopard Safari",
  "Colombo Food Markets",
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== (featured?.id ?? -1));

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-32 right-20 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-32 left-20 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Travel Journal
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stories &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Travel Tips
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Real guides, honest advice, and hidden gems — written by travellers who know Sri Lanka from the inside.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                  activeCategory === id
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-blue-500/40"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trending */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10 flex-wrap"
        >
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
            Trending:
          </span>
          {trending.map((t) => (
            <button
              key={t}
              onClick={() => setSearchQuery(t)}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white hover:border-white/20 transition-colors"
            >
              {t}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-slate-500"
            >
              No articles match your search.
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Featured post */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative mb-8 p-8 rounded-3xl border bg-gradient-to-br ${featured.gradient} ${featured.border} overflow-hidden`}
                >
                  <div className="absolute top-6 right-6 text-5xl opacity-20">{featured.emoji}</div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${featured.tagColor}`}>
                        {featured.tag}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-yellow-400 bg-yellow-400/10">
                        <Star className="w-3 h-3 inline mr-1" />
                        Featured
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 max-w-2xl leading-tight">
                      {featured.title}
                    </h3>
                    <p className="text-slate-400 mb-6 max-w-2xl leading-relaxed">{featured.excerpt}</p>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${featured.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                          {featured.authorAvatar}
                        </div>
                        <span className="text-slate-300 text-sm">{featured.author}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-500 text-sm">{featured.date}</span>
                        <span className="text-slate-600">·</span>
                        <span className="flex items-center gap-1 text-slate-500 text-sm">
                          <Clock className="w-3.5 h-3.5" />
                          {featured.readTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-slate-500 text-sm">
                          <Eye className="w-3.5 h-3.5" /> {featured.views}
                        </span>
                        <button
                          onClick={() => toggleLike(featured.id)}
                          className={`flex items-center gap-1 text-sm transition-colors ${
                            likedPosts.includes(featured.id) ? "text-red-400" : "text-slate-500 hover:text-red-400"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${likedPosts.includes(featured.id) ? "fill-current" : ""}`} />
                          {featured.likes + (likedPosts.includes(featured.id) ? 1 : 0)}
                        </button>
                        <button className="flex items-center gap-1.5 text-white text-sm font-medium hover:gap-2.5 transition-all">
                          Read More <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ y: -3 }}
                    className={`flex flex-col p-6 rounded-2xl border bg-gradient-to-br ${post.gradient} ${post.border} cursor-pointer group transition-all`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.tagColor}`}>
                        <Tag className="w-3 h-3 inline mr-1" />
                        {post.tag}
                      </span>
                      <span className="text-3xl opacity-25">{post.emoji}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2 leading-snug group-hover:text-blue-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-6 h-6 rounded-full ${post.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                        {post.authorAvatar}
                      </div>
                      <span className="text-slate-400 text-xs">{post.author}</span>
                      <span className="text-slate-700 text-xs">·</span>
                      <span className="text-slate-500 text-xs flex items-center gap-0.5">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {post.views}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
                          className={`flex items-center gap-1 transition-colors ${
                            likedPosts.includes(post.id) ? "text-red-400" : "hover:text-red-400"
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                          {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                        </button>
                      </div>
                      <button className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-white transition-colors">
                        Read <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl font-medium transition-all">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-slate-600 text-sm mt-4">
            New guides published every week by our community of local experts
          </p>
        </motion.div>
      </div>
    </section>
  );
}
