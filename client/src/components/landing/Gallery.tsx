import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Heart,
  MapPin,
  ZoomIn,
  Grid3X3,
  LayoutGrid,
} from "lucide-react";

const photos = [
  {
    id: 1,
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Sigiriya.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Sigiriya.jpg",
    title: "Sigiriya at Dawn",
    location: "Cultural Triangle",
    photographer: "Kavindi P.",
    likes: 1243,
    tags: ["heritage", "morning", "landscape"],
    size: "wide",
  },
  {
    id: 2,
    src: "https://upload.wikimedia.org/wikipedia/commons/9/90/Nine_arch_bridge%2C_Ella%2C_Sri_lanka.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/9/90/Nine_arch_bridge%2C_Ella%2C_Sri_lanka.jpg",
    title: "Nine Arch Bridge",
    location: "Ella, Hill Country",
    photographer: "Roshan F.",
    likes: 987,
    tags: ["architecture", "jungle", "landscape"],
    size: "tall",
  },
  {
    id: 3,
    src: "https://upload.wikimedia.org/wikipedia/commons/5/54/SL_Galle_Fort_asv2020-01_img24.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/5/54/SL_Galle_Fort_asv2020-01_img24.jpg",
    title: "Galle Fort Coastline",
    location: "Galle, Southern Coast",
    photographer: "Tharushi S.",
    likes: 2341,
    tags: ["sunset", "heritage", "ocean"],
    size: "normal",
  },
  {
    id: 4,
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Tea-plantation_Nuwara_Eliya-2567.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Tea-plantation_Nuwara_Eliya-2567.jpg",
    title: "Tea Plantation Mist",
    location: "Nuwara Eliya",
    photographer: "Dilshan R.",
    likes: 1876,
    tags: ["nature", "tea", "hill"],
    size: "normal",
  },
  {
    id: 5,
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Mirissa-Plage_%283%29.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Mirissa-Plage_%283%29.jpg",
    title: "Mirissa Beach",
    location: "Southern Coast",
    photographer: "Nisha W.",
    likes: 3102,
    tags: ["beach", "sunset", "ocean"],
    size: "wide",
  },
  {
    id: 6,
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f3/SL_Kandy_asv2020-01_img34_Sacred_Tooth_Temple.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/f/f3/SL_Kandy_asv2020-01_img34_Sacred_Tooth_Temple.jpg",
    title: "Temple of the Tooth",
    location: "Kandy",
    photographer: "Amara B.",
    likes: 1543,
    tags: ["culture", "religion", "architecture"],
    size: "tall",
  },
  {
    id: 7,
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Adam%27s_Peak_-_February_2020_%284%29.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Adam%27s_Peak_-_February_2020_%284%29.jpg",
    title: "Adam's Peak Pilgrimage",
    location: "Sabaragamuwa",
    photographer: "Roshan F.",
    likes: 2087,
    tags: ["hiking", "landscape", "morning"],
    size: "normal",
  },
  {
    id: 8,
    src: "https://upload.wikimedia.org/wikipedia/commons/3/39/Minneriya_National_Park%2C_elephants_gathering.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/3/39/Minneriya_National_Park%2C_elephants_gathering.jpg",
    title: "Elephant Gathering",
    location: "Minneriya National Park",
    photographer: "Kavindi P.",
    likes: 4231,
    tags: ["wildlife", "elephant", "nature"],
    size: "wide",
  },
  {
    id: 9,
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Goyambokka_Beach%2C_Tangalle%2C_Sri_Lanka.jpg",
    thumb: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Goyambokka_Beach%2C_Tangalle%2C_Sri_Lanka.jpg",
    title: "Tangalle Beach at Sunset",
    location: "Tangalle, Southern Coast",
    photographer: "Tharushi S.",
    likes: 1765,
    tags: ["beach", "sunset", "ocean"],
    size: "normal",
  },
];

const allTags = ["all", "heritage", "beach", "nature", "wildlife", "city", "sunset", "hiking", "culture"];

export default function Gallery() {
  const [activeTag, setActiveTag] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  const [layout, setLayout] = useState<"masonry" | "grid">("masonry");

  const filtered = photos.filter(
    (p) => activeTag === "all" || p.tags.includes(activeTag)
  );

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightboxIdx((i) => (i !== null ? (i + 1) % filtered.length : null));

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, filtered.length]);

  const currentPhoto = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
            <Camera className="w-4 h-4" />
            Photo Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sri Lanka Through{" "}
            <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Our Eyes
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Every photo you see was captured by a Seygo user. Join 120,000+ travellers sharing the real Sri Lanka.
          </p>
        </motion.div>

        {/* Filters + Layout toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between gap-4 mb-8 flex-wrap"
        >
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium capitalize transition-all ${
                  activeTag === tag
                    ? "bg-pink-600 border-pink-600 text-white"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-pink-500/40"
                }`}
              >
                {tag === "all" ? "All Photos" : tag}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setLayout("masonry")}
              className={`p-2 rounded-lg transition-colors ${layout === "masonry" ? "bg-white/10 text-white" : "text-slate-500"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout("grid")}
              className={`p-2 rounded-lg transition-colors ${layout === "grid" ? "bg-white/10 text-white" : "text-slate-500"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag + layout}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={
              layout === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                : "columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
            }
          >
            {filtered.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => openLightbox(idx)}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl bg-slate-800 ${
                  layout === "masonry" ? "break-inside-avoid mb-3" : ""
                }`}
              >
                <img
                  src={photo.thumb}
                  alt={photo.title}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    layout === "grid"
                      ? "h-44"
                      : photo.size === "wide"
                      ? "h-52"
                      : photo.size === "tall"
                      ? "h-80"
                      : "h-64"
                  }`}
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Info overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={(e) => toggleLike(photo.id, e)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        likedPhotos.includes(photo.id)
                          ? "bg-red-500 text-white"
                          : "bg-black/40 text-white hover:bg-red-500/80"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedPhotos.includes(photo.id) ? "fill-current" : ""}`} />
                    </button>
                    <button className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight mb-1">{photo.title}</p>
                    <p className="flex items-center gap-1 text-slate-400 text-xs">
                      <MapPin className="w-3 h-3" /> {photo.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm mb-4">
            Over <span className="text-white font-semibold">480,000</span> photos shared by our community
          </p>
          <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold transition-colors">
            Share Your Photos
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-5xl w-full flex flex-col md:flex-row gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative flex-1 min-w-0">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.title}
                  className="w-full max-h-[75vh] object-contain rounded-2xl"
                />
                {/* Nav arrows */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar info */}
              <div className="md:w-64 flex flex-col gap-4">
                <div className="flex justify-end">
                  <button
                    onClick={closeLightbox}
                    className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">{currentPhoto.title}</h3>
                  <p className="flex items-center gap-1.5 text-slate-400 text-sm mb-4">
                    <MapPin className="w-4 h-4 text-pink-400" />
                    {currentPhoto.location}
                  </p>
                  <p className="text-slate-500 text-sm">
                    by <span className="text-white">{currentPhoto.photographer}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentPhoto.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 text-xs capitalize"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <button
                    onClick={(e) => toggleLike(currentPhoto.id, e)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      likedPhotos.includes(currentPhoto.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/10 text-white hover:bg-red-500/80"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPhotos.includes(currentPhoto.id) ? "fill-current" : ""}`} />
                    {currentPhoto.likes + (likedPhotos.includes(currentPhoto.id) ? 1 : 0)}
                  </button>
                  <button className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-slate-600 text-xs">
                  {lightboxIdx + 1} / {filtered.length} photos
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
