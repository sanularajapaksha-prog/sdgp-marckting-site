import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Sparkles, MapPin, Calendar, Users, DollarSign, Clock,
  ChevronRight, ChevronLeft, RotateCcw, Download, Share2,
  Zap, Mountain, Waves, Building2, Coffee, Camera, Utensils,
  TreePine, Sunset, Star, Check, ArrowRight, Loader2,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Step = "preferences" | "generating" | "result";

interface Preference {
  days: number;
  group: string;
  budget: string;
  vibe: string[];
}

// ── Data ───────────────────────────────────────────────────────────────────────
const groups = [
  { id: "solo", label: "Solo", icon: "🧍" },
  { id: "couple", label: "Couple", icon: "💑" },
  { id: "friends", label: "Friends", icon: "👫" },
  { id: "family", label: "Family", icon: "👨‍👩‍👧" },
];

const budgets = [
  { id: "budget", label: "Budget", sub: "< $30/day", color: "emerald" },
  { id: "mid", label: "Mid-range", sub: "$30–80/day", color: "blue" },
  { id: "luxury", label: "Luxury", sub: "$80+/day", color: "violet" },
];

const vibes = [
  { id: "nature", label: "Nature & Wildlife", icon: TreePine },
  { id: "heritage", label: "Heritage & Culture", icon: Building2 },
  { id: "beach", label: "Beach & Ocean", icon: Waves },
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "food", label: "Food & Local Life", icon: Utensils },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "relaxation", label: "Relaxation", icon: Sunset },
  { id: "nightlife", label: "Cafés & Social", icon: Coffee },
];

// ── AI-generated itineraries (deterministic based on inputs) ──────────────────
const itineraryTemplates: Record<string, {
  title: string;
  tagline: string;
  highlights: string[];
  days: { title: string; morning: string; afternoon: string; evening: string; tip: string }[];
}> = {
  nature: {
    title: "Wild Sri Lanka",
    tagline: "Ancient forests, leopards, and misty highlands",
    highlights: ["Yala National Park", "Sinharaja Forest", "Horton Plains"],
    days: [
      { title: "Yala Safari", morning: "Dawn game drive at Yala — leopards, elephants, crocs", afternoon: "Bundala wetlands bird watching", evening: "Sunset at Kirinda beach", tip: "Book your jeep the night before — slots fill fast!" },
      { title: "Sinharaja Rainforest", morning: "Guided rainforest trek through UNESCO biosphere", afternoon: "Lunch at a village homestay", evening: "Night sounds walk with local guide", tip: "Wear light long sleeves — leeches are real!" },
      { title: "Horton Plains", morning: "World's End viewpoint at sunrise", afternoon: "Baker's Falls hike", evening: "Nuwara Eliya tea estate sunset", tip: "Go before 8 AM to beat the clouds" },
    ],
  },
  beach: {
    title: "Coastal Sri Lanka",
    tagline: "Turquoise water, whale watching, and surf",
    highlights: ["Mirissa", "Trincomalee", "Arugam Bay"],
    days: [
      { title: "Mirissa", morning: "Whale watching boat (blue whales, Apr–Oct)", afternoon: "Parrot Rock snorkelling", evening: "Seafood BBQ on the beach", tip: "Book whale watching 2 days ahead" },
      { title: "Trincomalee", morning: "Pigeon Island snorkelling — coral reefs, reef sharks", afternoon: "Fort Frederick & Koneswaram temple", evening: "Uppuveli beach bar", tip: "Bring reef-safe sunscreen only" },
      { title: "Arugam Bay", morning: "Surf lesson at main point (all levels)", afternoon: "Crocodile rock lagoon paddle", evening: "Rooftop restaurant with bay view", tip: "Best swell May–Oct. Flat? Try SUP!" },
    ],
  },
  heritage: {
    title: "Cultural Triangle",
    tagline: "2,500 years of kingdoms, frescoes & sacred peaks",
    highlights: ["Sigiriya", "Polonnaruwa", "Kandy"],
    days: [
      { title: "Sigiriya", morning: "Climb Sigiriya Rock — mirror wall & frescoes", afternoon: "Pidurangala Rock (better views, fewer crowds)", evening: "Minneriya elephant gathering safari", tip: "Sigiriya entry is 30 USD — Pidurangala is $5 with the same views!" },
      { title: "Polonnaruwa", morning: "Cycle through ancient city ruins", afternoon: "Dimbulagala rock temple", evening: "Giritale lake sunset", tip: "Rent bicycles at the gate for $3/day" },
      { title: "Kandy", morning: "Temple of the Tooth Relic", afternoon: "Peradeniya Botanical Gardens", evening: "Kandyan dance performance", tip: "The Esala Perahera festival (July/Aug) is unmissable" },
    ],
  },
  default: {
    title: "Best of Sri Lanka",
    tagline: "The perfect mix — culture, nature, beaches, and flavour",
    highlights: ["Sigiriya", "Ella", "Mirissa"],
    days: [
      { title: "Sigiriya & Dambulla", morning: "Sigiriya Rock Fortress at sunrise", afternoon: "Dambulla Cave Temple frescoes", evening: "Village cooking class", tip: "Stay overnight near Sigiriya to beat the tour buses" },
      { title: "Ella Hill Country", morning: "Little Adam's Peak hike", afternoon: "Nine Arch Bridge train view", evening: "Ella Rock sunset", tip: "Take the Kandy–Ella train — one of the world's most scenic rides" },
      { title: "Mirissa Coast", morning: "Whale watching or snorkelling", afternoon: "Galle Fort walk", evening: "Beach dinner with fresh catch", tip: "Mirissa fish market at 6 AM for the best seafood" },
    ],
  },
};

function getItinerary(prefs: Preference) {
  const primary = prefs.vibe[0] || "default";
  return itineraryTemplates[primary] || itineraryTemplates.default;
}

// ── Sub-components ────────────────────────────────────────────────────────────
function DayCard({ day, index, days }: { day: typeof itineraryTemplates.default.days[0]; index: number; days: number }) {
  const [open, setOpen] = useState(index === 0);
  if (index >= days) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border border-border overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-muted/40 hover:bg-muted/70 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
            D{index + 1}
          </span>
          <span className="font-semibold text-foreground">{day.title}</span>
        </div>
        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4 space-y-3 bg-background">
              {[
                { label: "Morning", text: day.morning, color: "text-amber-500" },
                { label: "Afternoon", text: day.afternoon, color: "text-blue-500" },
                { label: "Evening", text: day.evening, color: "text-violet-500" },
              ].map(({ label, text, color }) => (
                <div key={label} className="flex gap-3">
                  <span className={`text-xs font-bold uppercase tracking-wider w-20 shrink-0 mt-0.5 ${color}`}>{label}</span>
                  <span className="text-sm text-muted-foreground">{text}</span>
                </div>
              ))}
              <div className="flex items-start gap-2 mt-2 pt-3 border-t border-border">
                <Zap className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                <span className="text-xs text-muted-foreground italic">{day.tip}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function AiDesigner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [step, setStep] = useState<Step>("preferences");
  const [prefs, setPrefs] = useState<Preference>({ days: 5, group: "couple", budget: "mid", vibe: [] });
  const [generatingDots, setGeneratingDots] = useState(0);

  const toggleVibe = (id: string) => {
    setPrefs((p) => ({
      ...p,
      vibe: p.vibe.includes(id) ? p.vibe.filter((v) => v !== id) : p.vibe.length < 3 ? [...p.vibe, id] : p.vibe,
    }));
  };

  const generate = () => {
    setStep("generating");
    let dots = 0;
    const t = setInterval(() => {
      dots = (dots + 1) % 4;
      setGeneratingDots(dots);
    }, 400);
    setTimeout(() => {
      clearInterval(t);
      setStep("result");
    }, 2800);
  };

  const reset = () => {
    setStep("preferences");
    setPrefs({ days: 5, group: "couple", budget: "mid", vibe: [] });
  };

  const itinerary = getItinerary(prefs);

  const generatingPhrases = [
    "Scanning 2,000+ hidden spots…",
    "Building your personalised route…",
    "Adding local insider tips…",
    "Optimising travel times…",
  ];

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-5 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            AI Trip Designer · Phase 2
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Your perfect Sri Lanka trip,{" "}
            <span className="text-primary italic">designed by AI</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Answer 4 quick questions. Our AI builds a day-by-day itinerary from
            2,000+ verified local spots — personalised to your vibe and budget.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-3xl border border-border bg-card shadow-xl shadow-black/5 overflow-hidden">

            {/* Card header bar */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 font-mono">seygo-ai-planner · v2.0</span>
              <div className="ml-auto flex items-center gap-1.5 text-xs text-primary font-semibold">
                <Sparkles className="w-3 h-3" /> Powered by Seygo AI
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">

              {/* ── Step 1: Preferences ── */}
              {step === "preferences" && (
                <motion.div
                  key="prefs"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="p-6 md:p-8 space-y-7"
                >
                  {/* Days */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      How many days? <span className="text-primary font-bold">{prefs.days}</span>
                    </label>
                    <input
                      type="range"
                      min={2}
                      max={14}
                      value={prefs.days}
                      onChange={(e) => setPrefs((p) => ({ ...p, days: +e.target.value }))}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>2 days</span><span>14 days</span>
                    </div>
                  </div>

                  {/* Group */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Who's travelling?</label>
                    <div className="grid grid-cols-4 gap-2">
                      {groups.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setPrefs((p) => ({ ...p, group: g.id }))}
                          className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-sm font-medium transition-all ${
                            prefs.group === g.id
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          <span className="text-xl">{g.icon}</span>
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">Budget level?</label>
                    <div className="grid grid-cols-3 gap-2">
                      {budgets.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setPrefs((p) => ({ ...p, budget: b.id }))}
                          className={`flex flex-col items-start gap-0.5 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                            prefs.budget === b.id
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          <span className="font-bold">{b.label}</span>
                          <span className="text-xs opacity-70">{b.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vibe */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Travel vibe? <span className="text-muted-foreground font-normal">(pick up to 3)</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                      {vibes.map((v) => {
                        const Icon = v.icon;
                        const active = prefs.vibe.includes(v.id);
                        return (
                          <button
                            key={v.id}
                            onClick={() => toggleVibe(v.id)}
                            className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                              active
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border text-muted-foreground hover:border-primary/40"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            {v.label}
                            {active && <Check className="w-3 h-3 ml-auto" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Generate button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generate}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-2xl text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate My Itinerary
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}

              {/* ── Step 2: Generating ── */}
              {step === "generating" && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 px-8 gap-8"
                >
                  {/* Animated logo */}
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="w-20 h-20 rounded-3xl border-2 border-primary/30 border-t-primary flex items-center justify-center"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="font-semibold text-foreground text-lg">Building your itinerary…</p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={generatingDots}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="text-sm text-muted-foreground"
                      >
                        {generatingPhrases[generatingDots]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Fake progress dots */}
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Result ── */}
              {step === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 md:p-8"
                >
                  {/* Itinerary header */}
                  <div className="flex items-start justify-between mb-6 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">AI Itinerary</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Personalised for you
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-foreground">{itinerary.title}</h3>
                      <p className="text-muted-foreground text-sm mt-0.5">{itinerary.tagline}</p>
                    </div>
                    <button onClick={reset} className="shrink-0 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-xl px-3 py-2 transition-colors">
                      <RotateCcw className="w-3.5 h-3.5" /> Redo
                    </button>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { icon: Calendar, label: "Duration", value: `${prefs.days} Days` },
                      { icon: Users, label: "Group", value: groups.find((g) => g.id === prefs.group)?.label || prefs.group },
                      { icon: DollarSign, label: "Budget", value: budgets.find((b) => b.id === prefs.budget)?.label || prefs.budget },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-muted/40 border border-border">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">{label}</span>
                        <span className="text-sm font-bold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {itinerary.highlights.map((h) => (
                      <span key={h} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                        <MapPin className="w-3 h-3" /> {h}
                      </span>
                    ))}
                  </div>

                  {/* Day cards */}
                  <div className="space-y-2 mb-6">
                    {itinerary.days.map((day, i) => (
                      <DayCard key={i} day={day} index={i} days={Math.min(prefs.days, itinerary.days.length)} />
                    ))}
                    {prefs.days > itinerary.days.length && (
                      <div className="rounded-2xl border border-dashed border-border px-5 py-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          <span className="text-primary font-semibold">+{prefs.days - itinerary.days.length} more days</span> included in your full plan — unlock in the Seygo app
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="#waitlist"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-bold rounded-2xl text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Save Full Plan in App
                    </motion.a>
                    <button className="flex items-center justify-center gap-2 py-3.5 px-5 border border-border rounded-2xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-muted-foreground"
        >
          {["2,000+ verified spots", "Updated weekly by locals", "No ads. No fluff.", "Works offline"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-primary" /> {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
