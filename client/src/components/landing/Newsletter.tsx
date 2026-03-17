import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle, Send, Sparkles, Globe, TrendingUp, Camera, MapPin } from "lucide-react";

const topics = [
  { icon: MapPin, label: "New Hidden Gems", color: "text-primary" },
  { icon: TrendingUp, label: "Travel Tips & Trends", color: "text-violet-600" },
  { icon: Camera, label: "Photo of the Week", color: "text-amber-600" },
  { icon: Globe, label: "Community Stories", color: "text-emerald-600" },
];

const recentIssues = [
  { title: "The 5 Most Underrated Beaches in Sri Lanka", readers: "4.2k reads", tag: "🏖️" },
  { title: "How to Visit Ella in 48 Hours (The Local Way)", readers: "3.8k reads", tag: "⛰️" },
  { title: "Meet the Family Behind Colombo's Best Hidden Restaurant", readers: "2.9k reads", tag: "🍛" },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-0 w-80 h-80 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              Weekly Newsletter
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-5">
              Sri Lanka's{" "}
              <span className="text-primary italic">best stories</span>
              {" "}in your inbox
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Every week, we send out one email packed with newly verified hidden gems,
              traveler stories from the community, and local tips you won't find anywhere else.
              No spam. No fluff. Just Sri Lanka.
            </p>

            {/* Topics */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {topics.map((topic, i) => (
                <motion.div
                  key={topic.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3"
                >
                  <topic.icon className={`w-4 h-4 ${topic.color} shrink-0`} />
                  <span className="text-sm font-medium text-foreground">{topic.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Recent issues */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
                Recent issues
              </p>
              <div className="space-y-2">
                {recentIssues.map((issue, i) => (
                  <motion.div
                    key={issue.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <span className="text-xl">{issue.tag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {issue.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{issue.readers}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15 rounded-3xl p-8 md:p-10"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">The Seygo Weekly</p>
                      <p className="text-xs text-muted-foreground">4,800+ subscribers</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-6 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-primary/40" />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">5 min read · every Monday</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-foreground/60 mb-1.5 block">
                        Your email address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="you@example.com"
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-primary/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
                      className="w-full py-4 bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Subscribe — It's Free
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-center text-muted-foreground">
                      One email per week. Unsubscribe anytime. Zero spam.
                    </p>
                  </form>

                  <div className="mt-6 pt-6 border-t border-primary/10 grid grid-cols-3 gap-4 text-center">
                    {[
                      { value: "4.8k+", label: "Subscribers" },
                      { value: "62%", label: "Open Rate" },
                      { value: "100+", label: "Issues Sent" },
                    ].map(({ value, label }) => (
                      <div key={label}>
                        <p className="text-lg font-bold font-serif text-primary">{value}</p>
                        <p className="text-xs text-muted-foreground">{label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-primary rounded-3xl p-10 text-center text-white"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 280 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5"
                  >
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold mb-2">You're in! 🎉</h3>
                  <p className="text-white/80 mb-4">
                    Welcome to The Seygo Weekly. Your first issue lands next Monday.
                    Check your inbox for a quick welcome note.
                  </p>
                  <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm font-semibold">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    4,801 subscribers and counting
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
