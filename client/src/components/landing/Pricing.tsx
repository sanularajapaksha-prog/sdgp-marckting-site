import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Zap,
  Crown,
  Users,
  Sparkles,
  Shield,
  MapPin,
  Download,
  Bell,
  Star,
  ChevronDown,
  ChevronUp,
  Gift,
} from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Explorer",
    subtitle: "Free forever",
    price: { monthly: 0, yearly: 0 },
    icon: MapPin,
    iconColor: "text-slate-400",
    badge: null,
    gradient: "from-slate-800/80 to-slate-900/80",
    border: "border-white/10",
    buttonStyle: "bg-white/10 hover:bg-white/15 text-white",
    features: [
      { label: "Destination guides (100+)", included: true },
      { label: "Community photo wall", included: true },
      { label: "Basic trip planner (3 stops)", included: true },
      { label: "App-only navigation", included: true },
      { label: "Standard search", included: true },
      { label: "Offline maps", included: false },
      { label: "Real-time safety alerts", included: false },
      { label: "AI route optimisation", included: false },
      { label: "Priority customer support", included: false },
      { label: "Exclusive partner discounts", included: false },
    ],
  },
  {
    id: "pro",
    name: "Wanderer",
    subtitle: "Most popular",
    price: { monthly: 4.99, yearly: 3.99 },
    icon: Zap,
    iconColor: "text-violet-400",
    badge: "Most Popular",
    gradient: "from-violet-900/60 to-indigo-900/60",
    border: "border-violet-500/40",
    buttonStyle: "bg-violet-600 hover:bg-violet-700 text-white",
    features: [
      { label: "Everything in Explorer", included: true },
      { label: "Unlimited destination guides", included: true },
      { label: "Full trip planner (unlimited stops)", included: true },
      { label: "Offline maps & GPS", included: true },
      { label: "Real-time safety alerts", included: true },
      { label: "AI route optimisation", included: true },
      { label: "Priority customer support", included: false },
      { label: "Exclusive partner discounts", included: false },
      { label: "Early access to new features", included: false },
      { label: "Group trip collaboration", included: false },
    ],
  },
  {
    id: "elite",
    name: "Nomad Elite",
    subtitle: "For power travellers",
    price: { monthly: 9.99, yearly: 7.99 },
    icon: Crown,
    iconColor: "text-yellow-400",
    badge: "Best Value",
    gradient: "from-amber-900/50 to-yellow-900/30",
    border: "border-yellow-500/30",
    buttonStyle: "bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white",
    features: [
      { label: "Everything in Wanderer", included: true },
      { label: "Priority customer support 24/7", included: true },
      { label: "Exclusive partner discounts (up to 40%)", included: true },
      { label: "Early access to new features", included: true },
      { label: "Group trip collaboration (up to 8)", included: true },
      { label: "Custom trip sharing pages", included: true },
      { label: "Advanced travel analytics", included: true },
      { label: "VIP airport lounge tips", included: true },
      { label: "Dedicated travel concierge", included: true },
      { label: "Annual travel report", included: true },
    ],
  },
];

const teamPlanFeatures = [
  "Everything in Nomad Elite",
  "Centralised team dashboard",
  "Up to 50 team members",
  "Shared itinerary management",
  "Corporate invoicing & billing",
  "SSO & advanced security",
  "Dedicated account manager",
  "Custom branding options",
];

const faqs = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes — upgrade, downgrade, or cancel anytime. Changes take effect at your next billing cycle, and we pro-rate credits if you upgrade mid-cycle.",
  },
  {
    q: "Is the free Explorer plan really free forever?",
    a: "Absolutely. No credit card required, no trials, no hidden limits. Explorer is our way of letting you experience Seygo before committing.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, PayPal, and in-app purchases through Google Play and the App Store.",
  },
  {
    q: "Do you offer student or NGO discounts?",
    a: "Yes! Students get 50% off any paid plan with a valid university email. NGOs and non-profits get Wanderer free — contact us.",
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const savings = Math.round(((4.99 - 3.99) / 4.99) * 100);

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Simple Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Travel smarter,{" "}
            <span className="bg-gradient-to-r from-violet-400 to-yellow-400 bg-clip-text text-transparent">
              pay less
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
            Start free. Upgrade when you're ready. No surprise charges — ever.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                billing === "monthly"
                  ? "bg-white/10 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                billing === "yearly"
                  ? "bg-white/10 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                Save {savings}%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const price = billing === "yearly" ? plan.price.yearly : plan.price.monthly;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col p-7 rounded-3xl border bg-gradient-to-br ${plan.gradient} ${plan.border} ${
                  plan.id === "pro" ? "scale-105 shadow-2xl shadow-violet-900/30" : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                      plan.id === "pro"
                        ? "bg-violet-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{plan.name}</h3>
                      <p className="text-slate-500 text-xs">{plan.subtitle}</p>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={billing}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="flex items-end gap-1"
                    >
                      <span className="text-4xl font-black text-white">
                        {price === 0 ? "Free" : `$${price}`}
                      </span>
                      {price > 0 && (
                        <span className="text-slate-500 text-sm mb-1.5">
                          / mo
                          {billing === "yearly" && (
                            <span className="text-green-400 ml-1 text-xs">(billed yearly)</span>
                          )}
                        </span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-2.5">
                      {feat.included ? (
                        <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-slate-700 mt-0.5 shrink-0" />
                      )}
                      <span className={`text-sm ${feat.included ? "text-slate-300" : "text-slate-600"}`}>
                        {feat.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.buttonStyle}`}>
                  {price === 0 ? "Download Free" : "Get Started"}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Team plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/60 to-slate-900/60 mb-16 flex flex-col md:flex-row items-start md:items-center gap-8"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold">Team & Corporate</h3>
                <p className="text-slate-500 text-xs">For travel agencies, tour operators & businesses</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {teamPlanFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-400">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-center md:text-right">
            <div className="text-white text-2xl font-black mb-1">Custom</div>
            <p className="text-slate-500 text-sm mb-4">Tailored to your team size</p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors text-sm">
              Contact Sales
            </button>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-16 text-sm text-slate-500"
        >
          {[
            { icon: Shield, label: "SSL secured payments" },
            { icon: Download, label: "Cancel anytime" },
            { icon: Bell, label: "7-day money back" },
            { icon: Gift, label: "No hidden fees" },
            { icon: Star, label: "4.9★ rated app" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-green-400" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-white text-center mb-6">Pricing FAQ</h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-white font-medium text-sm">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
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
      </div>
    </section>
  );
}
