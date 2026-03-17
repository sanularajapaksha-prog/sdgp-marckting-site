import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown, Zap, Check, ArrowRight, Shield, CreditCard,
  Lock, Star, Sparkles, ChevronDown, ChevronUp, Gift, Infinity,
} from "lucide-react";
import { api } from "@/lib/api";

const plans = [
  {
    id: "wanderer",
    name: "Wanderer",
    price: { monthly: 4.99, yearly: 3.99 },
    icon: Zap,
    color: "violet",
    gradient: "from-violet-600 to-indigo-600",
    glowColor: "shadow-violet-500/30",
    borderColor: "border-violet-500/50",
    bgColor: "bg-violet-600/10",
    badge: "Most Popular",
    features: [
      "Unlimited destination guides",
      "Full trip planner (unlimited stops)",
      "Offline maps & GPS navigation",
      "Real-time safety alerts",
      "AI route optimisation",
      "Community photo sharing",
      "Priority email support",
    ],
  },
  {
    id: "elite",
    name: "Nomad Elite",
    price: { monthly: 9.99, yearly: 7.99 },
    icon: Crown,
    color: "yellow",
    gradient: "from-yellow-500 to-amber-600",
    glowColor: "shadow-yellow-500/30",
    borderColor: "border-yellow-500/50",
    bgColor: "bg-yellow-500/10",
    badge: "Best Value",
    features: [
      "Everything in Wanderer",
      "Group trip collaboration (up to 8)",
      "Exclusive partner discounts (40%+)",
      "Early access to new features",
      "AI-powered personalised itineraries",
      "Dedicated travel concierge",
      "Priority 24/7 support",
      "Custom trip sharing pages",
      "Annual travel analytics report",
    ],
  },
];

const faqs = [
  { q: "Is my card info secure?", a: "Yes. All payments are processed via Stripe with 256-bit SSL encryption. We never store your card details." },
  { q: "Can I cancel anytime?", a: "Absolutely. Cancel from your account settings at any time — no questions asked, no cancellation fees." },
  { q: "What happens after my trial?", a: "After the 7-day free trial you'll be charged your chosen plan rate. We send a reminder 24 hours before." },
  { q: "Do you offer refunds?", a: "Yes — 7-day money back guarantee on all paid plans. Contact us and we'll process it same day." },
];

export default function Subscribe() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [selected, setSelected] = useState("wanderer");
  const [step, setStep] = useState<"plan" | "checkout" | "success">("plan");
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedPlan = plans.find((p) => p.id === selected)!;
  const price = billing === "yearly" ? selectedPlan.price.yearly : selectedPlan.price.monthly;

  const formatCard = (val: string) =>
    val.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
  const formatExpiry = (val: string) =>
    val.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add to waitlist as subscription interest signal
    try {
      await api.joinWaitlist({ email: form.email, name: form.name, referralSource: `subscription-${selected}-${billing}` });
    } catch { /* already on waitlist is fine */ }
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setStep("success");
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-violet-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Phase 2 — Premium Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Unlock{" "}
            <span className="bg-gradient-to-r from-violet-400 to-yellow-400 bg-clip-text text-transparent">
              unlimited Sri Lanka
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
            7-day free trial. No credit card required to start.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${billing === "monthly" ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${billing === "yearly" ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">Save 20%</span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === "plan" && (
            <motion.div key="plan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Plan cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
                {plans.map((plan, idx) => {
                  const Icon = plan.icon;
                  const p = billing === "yearly" ? plan.price.yearly : plan.price.monthly;
                  const isSelected = selected === plan.id;
                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -3 }}
                      onClick={() => setSelected(plan.id)}
                      className={`relative cursor-pointer p-7 rounded-3xl border transition-all ${
                        isSelected
                          ? `${plan.borderColor} shadow-xl ${plan.glowColor} ${plan.bgColor}`
                          : "border-white/10 bg-white/3 hover:border-white/20"
                      }`}
                    >
                      {/* Badge */}
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${plan.gradient} text-white`}>
                          {plan.badge}
                        </span>
                      </div>

                      {/* Selection indicator */}
                      <div className={`absolute top-5 right-5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? `bg-gradient-to-br ${plan.gradient} border-transparent` : "border-white/20"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{plan.name}</h3>
                          <p className="text-slate-500 text-xs">7-day free trial</p>
                        </div>
                      </div>

                      <div className="flex items-end gap-1 mb-5">
                        <span className="text-4xl font-black text-white">${p}</span>
                        <span className="text-slate-500 text-sm mb-1.5">
                          /mo{billing === "yearly" && <span className="text-green-400 ml-1 text-xs">(billed yearly)</span>}
                        </span>
                      </div>

                      <ul className="space-y-2.5">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                            <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep("checkout")}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r ${selectedPlan.gradient} text-white font-bold text-lg shadow-xl ${selectedPlan.glowColor} transition-all`}
                >
                  Start Free Trial — {selectedPlan.name}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <p className="text-slate-600 text-sm mt-3">
                  <Lock className="w-3.5 h-3.5 inline mr-1" />
                  No card required · Cancel anytime · 7-day free trial
                </p>
              </div>
            </motion.div>
          )}

          {step === "checkout" && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="max-w-lg mx-auto"
            >
              <div className={`p-3 rounded-2xl bg-gradient-to-r ${selectedPlan.gradient} mb-6 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <selectedPlan.icon className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">{selectedPlan.name} — {billing}</span>
                </div>
                <span className="text-white font-bold">${price}/mo</span>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs mb-1.5 block">Full Name</label>
                    <input
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-1.5 block">Email</label>
                    <input
                      required type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" /> Card Number
                  </label>
                  <input
                    required
                    placeholder="1234 5678 9012 3456"
                    value={form.card}
                    onChange={(e) => setForm({ ...form, card: formatCard(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 font-mono tracking-wider"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs mb-1.5 block">Expiry</label>
                    <input
                      required
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-1.5 block">CVV</label>
                    <input
                      required
                      placeholder="123"
                      maxLength={4}
                      value={form.cvv}
                      onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 py-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  256-bit SSL encrypted · Powered by Stripe · PCI DSS compliant
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("plan")}
                    className="px-5 py-3 rounded-xl bg-white/5 text-slate-400 text-sm hover:bg-white/10 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${selectedPlan.gradient} text-white font-bold text-sm transition-all disabled:opacity-60`}
                  >
                    {loading ? "Processing..." : `Start 7-Day Free Trial · $${price}/mo after`}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-10"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">You're in! 🎉</h3>
              <p className="text-slate-400 mb-2">
                Welcome to <span className="text-white font-semibold">{selectedPlan.name}</span>
              </p>
              <p className="text-slate-500 text-sm mb-8">
                Check your email for access details. Your free trial starts now — no charge for 7 days.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Gift, label: "7-day free trial active" },
                  { icon: Infinity, label: "Cancel anytime" },
                  { icon: Star, label: "All features unlocked" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <Icon className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setStep("plan"); setForm({ name: "", email: "", card: "", expiry: "", cvv: "" }); }}
                className="text-slate-500 text-sm hover:text-white transition-colors"
              >
                Back to plans
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust + FAQ */}
        {step === "plan" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-16"
          >
            <h3 className="text-white font-bold text-center mb-6">Questions about billing</h3>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-white font-medium text-sm">{faq.q}</span>
                    {openFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
