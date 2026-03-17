import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  Star,
  ChevronRight,
  ChevronLeft,
  Plus,
  Check,
  Sunset,
  Mountain,
  Waves,
  Building2,
  Coffee,
  Camera,
  Utensils,
  Bike,
} from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Sigiriya",
    region: "Cultural Triangle",
    type: "heritage",
    duration: "Half Day",
    rating: 4.9,
    icon: Mountain,
    color: "#f97316",
    bg: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/30",
    desc: "Ancient rock fortress with stunning frescoes and water gardens.",
    activities: ["Rock Climb", "Museum Visit", "Photography"],
    bestTime: "6:00 AM – 10:00 AM",
  },
  {
    id: 2,
    name: "Galle Fort",
    region: "Southern Coast",
    type: "heritage",
    duration: "Full Day",
    rating: 4.8,
    icon: Building2,
    color: "#3b82f6",
    bg: "from-blue-500/20 to-sky-500/10",
    border: "border-blue-500/30",
    desc: "UNESCO World Heritage Dutch colonial fort by the Indian Ocean.",
    activities: ["Fort Walk", "Local Cuisine", "Shopping"],
    bestTime: "9:00 AM – 6:00 PM",
  },
  {
    id: 3,
    name: "Mirissa Beach",
    region: "Southern Coast",
    type: "beach",
    duration: "Full Day",
    rating: 4.7,
    icon: Waves,
    color: "#06b6d4",
    bg: "from-cyan-500/20 to-teal-500/10",
    border: "border-cyan-500/30",
    desc: "Pristine crescent beach famous for whale watching and surfing.",
    activities: ["Whale Watching", "Surfing", "Sunset View"],
    bestTime: "Sunrise & Sunset",
  },
  {
    id: 4,
    name: "Ella Village",
    region: "Hill Country",
    type: "nature",
    duration: "2 Days",
    rating: 4.9,
    icon: Sunset,
    color: "#8b5cf6",
    bg: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/30",
    desc: "Scenic mountain village with tea plantations and epic hikes.",
    activities: ["Nine Arch Bridge", "Little Adam's Peak", "Tea Tour"],
    bestTime: "Early Morning",
  },
  {
    id: 5,
    name: "Kandy",
    region: "Hill Country",
    type: "culture",
    duration: "Full Day",
    rating: 4.8,
    icon: Coffee,
    color: "#ec4899",
    bg: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/30",
    desc: "Cultural capital with the sacred Temple of the Tooth Relic.",
    activities: ["Temple Visit", "Cultural Show", "Lake Walk"],
    bestTime: "Morning & Evening",
  },
  {
    id: 6,
    name: "Yala National Park",
    region: "Deep South",
    type: "wildlife",
    duration: "Full Day",
    rating: 4.8,
    icon: Camera,
    color: "#22c55e",
    bg: "from-green-500/20 to-emerald-500/10",
    border: "border-green-500/30",
    desc: "Sri Lanka's most visited park, home to leopards and elephants.",
    activities: ["Safari Drive", "Birdwatching", "Photography"],
    bestTime: "5:30 AM – 10:00 AM",
  },
];

const tripStyles = [
  { id: "adventure", label: "Adventure", icon: Mountain, color: "text-orange-400" },
  { id: "beach", label: "Beach & Surf", icon: Waves, color: "text-cyan-400" },
  { id: "culture", label: "Culture", icon: Building2, color: "text-purple-400" },
  { id: "foodie", label: "Foodie", icon: Utensils, color: "text-rose-400" },
  { id: "nature", label: "Nature", icon: Camera, color: "text-green-400" },
  { id: "cycling", label: "Cycling", icon: Bike, color: "text-blue-400" },
];

const durationOptions = ["3 Days", "5 Days", "7 Days", "10 Days", "2 Weeks"];
const groupOptions = ["Solo", "Couple", "Family", "Group (4+)"];

export default function TripPlanner() {
  const [step, setStep] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState("7 Days");
  const [selectedGroup, setSelectedGroup] = useState("Couple");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["beach", "culture"]);
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([1, 3, 4]);
  const [itineraryBuilt, setItineraryBuilt] = useState(false);

  const toggleStyle = (id: string) => {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleDestination = (id: number) => {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const buildItinerary = () => {
    setItineraryBuilt(true);
    setStep(3);
  };

  const selectedDests = destinations.filter((d) => selectedDestinations.includes(d.id));

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            AI Trip Planner
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Build Your{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Dream Itinerary
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Tell Seygo your travel style and preferences — we'll craft a personalised
            Sri Lanka journey in seconds.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <motion.div
                animate={{
                  backgroundColor: step >= s ? "#8b5cf6" : "rgba(255,255,255,0.05)",
                  borderColor: step >= s ? "#8b5cf6" : "rgba(255,255,255,0.1)",
                }}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold text-white"
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </motion.div>
              <span className="hidden sm:block text-sm text-slate-400">
                {s === 1 ? "Preferences" : s === 2 ? "Destinations" : "Your Itinerary"}
              </span>
              {s < 3 && <ChevronRight className="w-4 h-4 text-slate-600" />}
            </div>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Duration */}
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-4">
                    <Calendar className="w-5 h-5 text-violet-400" />
                    Trip Duration
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {durationOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedDuration(opt)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                          selectedDuration === opt
                            ? "bg-violet-600 border-violet-600 text-white"
                            : "bg-white/5 border-white/10 text-slate-400 hover:border-violet-500/50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Group */}
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-4">
                    <Users className="w-5 h-5 text-violet-400" />
                    Travelling As
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {groupOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedGroup(opt)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                          selectedGroup === opt
                            ? "bg-violet-600 border-violet-600 text-white"
                            : "bg-white/5 border-white/10 text-slate-400 hover:border-violet-500/50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trip Style */}
              <div className="mb-10">
                <label className="flex items-center gap-2 text-white font-semibold mb-4">
                  <Star className="w-5 h-5 text-violet-400" />
                  Travel Style
                  <span className="text-slate-500 font-normal text-sm">(select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {tripStyles.map(({ id, label, icon: Icon, color }) => (
                    <button
                      key={id}
                      onClick={() => toggleStyle(id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                        selectedStyles.includes(id)
                          ? "bg-violet-600/20 border-violet-500/50 text-white"
                          : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${color}`} />
                      <span className="text-sm font-medium">{label}</span>
                      {selectedStyles.includes(id) && (
                        <Check className="w-4 h-4 text-violet-400 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold transition-colors"
                >
                  Choose Destinations
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              <p className="text-slate-400 text-center mb-8">
                Pick the spots you'd love to visit — Seygo will arrange the perfect order.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {destinations.map((dest) => {
                  const Icon = dest.icon;
                  const isSelected = selectedDestinations.includes(dest.id);
                  return (
                    <motion.button
                      key={dest.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleDestination(dest.id)}
                      className={`relative text-left p-5 rounded-2xl border transition-all bg-gradient-to-br ${dest.bg} ${
                        isSelected ? dest.border + " ring-1 ring-offset-0" : "border-white/10"
                      }`}
                      style={isSelected ? { ringColor: dest.color } : {}}
                    >
                      {isSelected && (
                        <div
                          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: dest.color }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: dest.color + "22" }}
                      >
                        <Icon className="w-5 h-5" style={{ color: dest.color }} />
                      </div>
                      <h4 className="text-white font-semibold mb-1">{dest.name}</h4>
                      <p className="text-slate-500 text-xs mb-2">{dest.region}</p>
                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">{dest.desc}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {dest.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {dest.rating}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 text-sm">
                    {selectedDestinations.length} selected
                  </span>
                  <button
                    onClick={buildItinerary}
                    disabled={selectedDestinations.length === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white rounded-xl font-semibold transition-colors"
                  >
                    Build Itinerary
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && itineraryBuilt && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              {/* Summary bar */}
              <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-violet-400" /> {selectedDuration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-violet-400" /> {selectedGroup}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-violet-400" /> {selectedDests.length} stops
                </span>
              </div>

              {/* Day-by-day */}
              <div className="space-y-4 mb-8">
                {selectedDests.map((dest, idx) => {
                  const Icon = dest.icon;
                  return (
                    <motion.div
                      key={dest.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.12 }}
                      className={`flex gap-4 p-5 rounded-2xl border bg-gradient-to-br ${dest.bg} ${dest.border}`}
                    >
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: dest.color }}
                        >
                          {idx + 1}
                        </div>
                        {idx < selectedDests.length - 1 && (
                          <div className="w-0.5 flex-1 mt-2 bg-white/10 min-h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-white font-semibold">{dest.name}</h4>
                          <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {dest.rating}
                          </div>
                        </div>
                        <p className="text-slate-500 text-xs mb-2">
                          {dest.region} · {dest.duration}
                        </p>
                        <p className="text-slate-400 text-sm mb-3">{dest.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {dest.activities.map((act) => (
                            <span
                              key={act}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/10 text-slate-300"
                            >
                              {act}
                            </span>
                          ))}
                        </div>
                        <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Best time: {dest.bestTime}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-violet-600/20 to-cyan-600/10 border border-violet-500/20">
                <h3 className="text-2xl font-bold text-white mb-2">Your itinerary is ready!</h3>
                <p className="text-slate-400 mb-6">
                  Open Seygo to save this plan, get offline maps and real-time alerts for each stop.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold transition-colors">
                    Save in Seygo App
                  </button>
                  <button
                    onClick={() => { setStep(1); setItineraryBuilt(false); }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Plan Another Trip
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
