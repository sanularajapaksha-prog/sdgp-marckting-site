import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, Search } from "lucide-react";

const faqs = [
  {
    category: "General",
    question: "What is Seygo and how is it different from Google Maps?",
    answer:
      "Seygo is a travel companion built specifically for Sri Lanka, powered by local knowledge. Unlike Google Maps, Seygo shows you places that locals actually love — secret waterfalls, family-run restaurants, hidden viewpoints — not just tourist traps. Every location is personally verified by members of our Sri Lankan community.",
  },
  {
    category: "General",
    question: "Is Seygo free to use?",
    answer:
      "Yes, Seygo is completely free to download and the core features are free forever. You can browse all verified destinations, use offline maps, and access travel playlists without paying a cent. We offer an optional Premium plan for power users who want advanced route planning and ad-free audio guides.",
  },
  {
    category: "Features",
    question: "Does the app work offline? I'll be traveling in remote areas.",
    answer:
      "Absolutely. Offline support is one of Seygo's most important features. Before your trip, simply download the map area you need over Wi-Fi. After that, full navigation, destination info, safety alerts, and travel playlists all work without any internet connection — perfect for jungle treks and mountain regions.",
  },
  {
    category: "Features",
    question: "How are the hidden gem locations verified?",
    answer:
      "Every location goes through a 3-step local verification process. First, it's submitted by a community member who has physically visited the spot. Then it's reviewed by at least 2 local moderators from the same region. Finally, our editorial team checks photos, accuracy, and safety before publishing. Only about 1 in 4 submitted locations make it onto the map.",
  },
  {
    category: "Features",
    question: "What are Travel Playlists?",
    answer:
      "Travel Playlists are curated audio journeys that sync with your GPS location as you drive or walk through Sri Lanka. As you pass a temple, a colonial fort, or a historic town, the playlist automatically plays relevant stories about that place — history, folklore, culture, and hidden facts narrated by locals. Think of it as a human tour guide in your pocket.",
  },
  {
    category: "Safety",
    question: "How does the safety feature work?",
    answer:
      "Seygo's safety system has three layers: (1) Real-time alerts for weather events, road closures, and travel advisories from local authorities. (2) A vetted network of guides you can contact for emergency help. (3) An SOS button that shares your live GPS location with your emergency contacts and the nearest Seygo community members. We also show safety ratings for every destination.",
  },
  {
    category: "Safety",
    question: "Is my personal data and location safe with Seygo?",
    answer:
      "Your privacy is a top priority. We never sell your data to third parties. Location tracking is completely opt-in and only activates when you're actively navigating. You can use browse mode without sharing any location at all. All data is encrypted and stored in compliance with GDPR. You can delete your account and all data at any time from the app settings.",
  },
  {
    category: "Getting Started",
    question: "How do I get started as a first-time visitor to Sri Lanka?",
    answer:
      "Download the app, create a free account (or browse without one), and tap 'Plan My Trip' from the home screen. Enter your arrival city and travel dates, and Seygo will suggest a personalized itinerary based on your interests — adventure, culture, food, or relaxation. You can also just open the map and explore destinations near wherever you're currently staying.",
  },
  {
    category: "Getting Started",
    question: "Can I contribute my own discoveries to the app?",
    answer:
      "Yes! We love community contributions. If you find a place you think deserves to be on Seygo's map, tap the + button anywhere on the map to submit it. Add photos, a description, and GPS coordinates, and it'll go into our verification queue. Top contributors earn badges and get featured in our monthly 'Local Explorer' spotlight.",
  },
  {
    category: "Technical",
    question: "Which devices and operating systems does Seygo support?",
    answer:
      "Seygo is available on iOS 14+ (iPhone and iPad) and Android 8.0+. We're also working on a web version for desktop travelers who want to plan their itinerary before arrival. The app is optimized for both budget smartphones and high-end devices, and is designed to use minimal battery during navigation.",
  },
];

const categoryColors: Record<string, string> = {
  General: "bg-primary/10 text-primary",
  Features: "bg-secondary/20 text-secondary-foreground",
  Safety: "bg-emerald-100 text-emerald-700",
  "Getting Started": "bg-violet-100 text-violet-700",
  Technical: "bg-amber-100 text-amber-700",
};

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen ? "border-primary/30 shadow-md shadow-primary/5" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className={`mt-0.5 text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${categoryColors[faq.category] || "bg-gray-100 text-gray-600"}`}>
            {faq.category}
          </span>
          <span className={`text-sm md:text-base font-semibold leading-snug ${isOpen ? "text-primary" : "text-foreground"}`}>
            {faq.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? "bg-primary text-white" : "bg-gray-100 text-muted-foreground"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 bg-white">
              <div className="ml-[4.5rem] border-l-2 border-primary/20 pl-4">
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-56 h-56 bg-secondary/6 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-5 border border-primary/20">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Everything you need{" "}
            <span className="text-primary italic">to know</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Have a question? Chances are, someone else has asked it already.
            Can't find your answer? Chat with us directly.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mb-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No questions match your search. Try different keywords.</p>
            </div>
          ) : (
            filtered.map((faq, i) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))
          )}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl p-8 text-center"
        >
          <MessageCircle className="w-10 h-10 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-serif font-bold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
            Our team is always happy to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-7 py-3 bg-primary text-white font-semibold rounded-none text-sm hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
            <button className="px-7 py-3 border border-primary/30 text-primary font-semibold rounded-none text-sm hover:bg-primary/5 transition-colors">
              Join Community
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
