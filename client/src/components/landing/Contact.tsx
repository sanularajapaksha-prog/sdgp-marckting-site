import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, User, Send, Check, MapPin, Clock, Phone, HelpCircle } from "lucide-react";
import { api } from "@/lib/api";

const contactReasons = [
  "General Enquiry",
  "Partnership Opportunity",
  "Press & Media",
  "Technical Support",
  "Bug Report",
  "Feature Request",
  "Become a Local Guide",
  "Other",
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@seygo.it.com",
    sub: "We reply within 24 hours",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Colombo, Sri Lanka",
    sub: "UTC+5:30 (IST)",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "Mon – Fri, 9am – 6pm",
    sub: "Sri Lanka Standard Time",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Phone,
    label: "Social",
    value: "@seygo.app",
    sub: "Instagram · Facebook · X",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", reason: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email || !form.email.includes("@")) newErrors.email = "Valid email required";
    if (!form.reason) newErrors.reason = "Please select a reason";
    if (!form.message.trim() || form.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await api.sendContact({
        name: form.name,
        email: form.email,
        subject: form.reason || "General Enquiry",
        message: form.message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrors({ message: err.message || "Failed to send. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  };

  return (
    <section id="contact" className="py-24 bg-gray-50/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-5 border border-primary/20">
            <MessageSquare className="w-3.5 h-3.5" />
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            We'd love to{" "}
            <span className="text-primary italic">hear from you</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Whether you have a question, a partnership idea, or just want to say hello —
            our team is here and always happy to respond.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-11 h-11 ${info.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <info.icon className={`w-5 h-5 ${info.color}`} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground/60 mb-0.5">
                    {info.label}
                  </p>
                  <p className="text-sm font-bold text-foreground">{info.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{info.sub}</p>
                </div>
              </motion.div>
            ))}

            {/* FAQ link */}
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">Check our FAQ first</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Your question might already be answered in our FAQ section.
                  </p>
                  <a href="#faq" className="text-xs font-bold text-primary hover:underline">
                    Browse FAQ →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl border border-gray-100 shadow-lg p-7 md:p-9 space-y-5"
                >
                  <h3 className="text-xl font-serif font-bold text-foreground">Send us a message</h3>

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1.5 block">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="John Silva"
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 ${
                            errors.name ? "border-rose-300" : "border-gray-200 focus:border-primary/40"
                          }`}
                        />
                      </div>
                      {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1.5 block">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@example.com"
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 ${
                            errors.email ? "border-rose-300" : "border-gray-200 focus:border-primary/40"
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1.5 block">
                      Reason for contact *
                    </label>
                    <select
                      value={form.reason}
                      onChange={(e) => update("reason", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 ${
                        errors.reason ? "border-rose-300" : "border-gray-200 focus:border-primary/40"
                      } ${!form.reason ? "text-muted-foreground" : "text-foreground"}`}
                    >
                      <option value="" disabled>Select a reason...</option>
                      {contactReasons.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    {errors.reason && <p className="text-xs text-rose-500 mt-1">{errors.reason}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1.5 block">
                      Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-gray-50 resize-none ${
                        errors.message ? "border-rose-300" : "border-gray-200 focus:border-primary/40"
                      }`}
                    />
                    <div className="flex items-center justify-between mt-1">
                      {errors.message
                        ? <p className="text-xs text-rose-500">{errors.message}</p>
                        : <span />
                      }
                      <span className="text-xs text-muted-foreground">{form.message.length}/500</span>
                    </div>
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 280 }}
                    className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-5"
                  >
                    <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Message sent!</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Thanks for reaching out, {form.name.split(" ")[0]}. Our team will get back to you
                    at <span className="font-semibold text-foreground">{form.email}</span> within 24 hours.
                  </p>
                  <button
                    onClick={() => { setForm({ name: "", email: "", reason: "", message: "" }); setSubmitted(false); }}
                    className="text-sm text-primary font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
