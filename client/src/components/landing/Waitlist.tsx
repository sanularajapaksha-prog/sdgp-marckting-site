import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Sparkles, Users, ArrowRight, Check, Gift, Zap, Star } from "lucide-react";

const perks = [
  { icon: Gift, text: "3 months Premium — free", color: "text-secondary" },
  { icon: Zap, text: "Early access to beta features", color: "text-violet-500" },
  { icon: Star, text: "Founding Explorer badge", color: "text-amber-500" },
  { icon: Users, text: "Private community invite", color: "text-primary" },
];

const recentSignups = [
  { name: "Kavinda M.", country: "🇱🇰", time: "2m ago" },
  { name: "Sarah J.", country: "🇬🇧", time: "5m ago" },
  { name: "David C.", country: "🇸🇬", time: "8m ago" },
  { name: "Amara P.", country: "🇱🇰", time: "11m ago" },
  { name: "Emma T.", country: "🇦🇺", time: "14m ago" },
];

const totalSpots = 500;
const takenSpots = 347;

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const progressPct = Math.round((takenSpots / totalSpots) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <section id="waitlist" className="py-24 relative overflow-hidden bg-background">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 text-secondary-foreground text-xs font-bold tracking-widest uppercase mb-5 border border-secondary/30">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              Limited Early Access
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
              Be first to{" "}
              <span className="text-primary italic">explore</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join the waitlist and get exclusive early access to Seygo's premium features —
              plus rewards just for being an early believer.
            </p>
          </motion.div>

          {/* Spots progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">
                Early access spots claimed
              </span>
              <span className="text-sm font-bold text-primary">
                {takenSpots} / {totalSpots}
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${progressPct}%` } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-primary to-teal-400 rounded-full"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Only <span className="font-bold text-rose-500">{totalSpots - takenSpots} spots</span> remaining — don't miss out.
            </p>
          </motion.div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-3 mb-8"
          >
            {perks.map((perk, i) => (
              <motion.div
                key={perk.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm"
              >
                <perk.icon className={`w-5 h-5 ${perk.color} shrink-0`} />
                <span className="text-sm font-medium text-foreground">{perk.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Form / Success */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 md:p-8"
              >
                <h3 className="text-lg font-serif font-bold text-foreground mb-1">
                  Claim your early access spot
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Enter your email and we'll notify you the moment access opens.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1.5 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all bg-gray-50"
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-rose-500 mt-1.5">{error}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Reserving your spot...
                      </>
                    ) : (
                      <>
                        Reserve My Spot — Free
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-center text-muted-foreground">
                    No spam, ever. Unsubscribe anytime. We respect your privacy.
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-primary rounded-3xl p-8 text-center text-white shadow-xl shadow-primary/25"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-primary" strokeWidth={2.5} />
                </motion.div>
                <h3 className="text-2xl font-serif font-bold mb-2">You're on the list! 🎉</h3>
                <p className="text-white/80 mb-4">
                  We've reserved your early access spot. You'll be among the first to experience
                  Seygo's full premium features when we launch.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm font-semibold">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  Your perks are waiting for you
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent signups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <p className="text-xs text-center text-muted-foreground mb-4 font-semibold uppercase tracking-wide">
              Recent signups
            </p>
            <div className="flex flex-col gap-2">
              {recentSignups.map((signup, i) => (
                <motion.div
                  key={signup.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{signup.country}</span>
                    <span className="text-sm font-semibold text-foreground">{signup.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-xs text-muted-foreground">{signup.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
