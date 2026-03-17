import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Minus, Zap } from "lucide-react";

const features = [
  { label: "Sri Lanka–specific locations", group: "Discovery" },
  { label: "Locally verified hidden gems", group: "Discovery" },
  { label: "Community-contributed spots", group: "Discovery" },
  { label: "Offline maps & navigation", group: "Navigation" },
  { label: "Sri Lankan road-specific routing", group: "Navigation" },
  { label: "Emergency SOS button", group: "Safety" },
  { label: "Verified local guide network", group: "Safety" },
  { label: "Cultural context & history", group: "Experience" },
  { label: "Free to use, no ads", group: "Experience" },
  { label: "New gems added weekly", group: "Experience" },
];

type Status = "yes" | "no" | "partial";

const apps: {
  name: string;
  tag: string;
  highlight: boolean;
  color: string;
  values: Status[];
}[] = [
  {
    name: "Seygo",
    tag: "Best for Sri Lanka",
    highlight: true,
    color: "text-primary",
    values: [
      "yes", "yes", "yes",
      "yes", "yes",
      "yes", "yes",
      "yes", "yes", "yes",
    ],
  },
  {
    name: "Google Maps",
    tag: "General maps",
    highlight: false,
    color: "text-blue-600",
    values: [
      "partial", "no", "no",
      "yes", "partial",
      "no", "no",
      "no", "yes", "no",
    ],
  },
  {
    name: "TripAdvisor",
    tag: "Tourist reviews",
    highlight: false,
    color: "text-green-600",
    values: [
      "partial", "no", "no",
      "no", "no",
      "no", "no",
      "partial", "no", "partial",
    ],
  },
  {
    name: "Generic Travel App",
    tag: "Global focus",
    highlight: false,
    color: "text-muted-foreground",
    values: [
      "no", "no", "no",
      "partial", "no",
      "no", "no",
      "no", "no", "no",
    ],
  },
];

function StatusIcon({ status }: { status: Status }) {
  if (status === "yes")
    return (
      <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
      </div>
    );
  if (status === "no")
    return (
      <div className="w-7 h-7 bg-muted rounded-full flex items-center justify-center mx-auto">
        <X className="w-3.5 h-3.5 text-muted-foreground/40" strokeWidth={2.5} />
      </div>
    );
  return (
    <div className="w-7 h-7 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto">
      <Minus className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.5} />
    </div>
  );
}

export default function Comparison() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const groups = Array.from(new Set(features.map((feature) => feature.group)));
  const total = features.length;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
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
            <Zap className="w-3.5 h-3.5" />
            Why Seygo Wins
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Seygo vs{" "}
            <span className="text-primary italic">everything else</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Generic travel apps are built for the world. Seygo is built for Sri Lanka —
            and that makes all the difference.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="overflow-x-auto rounded-3xl border border-border shadow-xl"
        >
          <table className="w-full min-w-[640px]">
            {/* Column headers */}
            <thead>
              <tr>
                <th className="text-left p-5 bg-muted/40 text-sm font-semibold text-muted-foreground border-b border-border w-48">
                  Feature
                </th>
                {apps.map((app) => (
                  <th
                    key={app.name}
                    className={`p-5 text-center border-b border-border ${
                      app.highlight ? "bg-primary/5" : "bg-muted/40"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {app.highlight && (
                        <span className="text-[10px] font-bold bg-primary text-white px-2.5 py-0.5 rounded-full mb-1">
                          {app.tag}
                        </span>
                      )}
                      <span className={`text-sm font-bold ${app.color}`}>{app.name}</span>
                      {!app.highlight && (
                        <span className="text-[10px] text-muted-foreground">{app.tag}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {groups.map((group) => (
                <>
                  {/* Group header */}
                  <tr key={`group-${group}`}>
                    <td
                      colSpan={apps.length + 1}
                      className="px-5 py-2.5 bg-muted/20 text-xs font-bold text-muted-foreground uppercase tracking-widest border-t border-border"
                    >
                      {group}
                    </td>
                  </tr>
                  {features
                    .filter((f) => f.group === group)
                    .map((feature, fi) => (
                      <motion.tr
                        key={feature.label}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: fi * 0.05 + 0.3 }}
                        className="border-t border-border hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-5 py-4 text-sm text-foreground/80 font-medium">
                          {feature.label}
                        </td>
                        {apps.map((app) => {
                          const featureIndex = features.indexOf(feature);
                          return (
                            <td
                              key={app.name}
                              className={`py-4 text-center ${app.highlight ? "bg-primary/[0.02]" : ""}`}
                            >
                              <StatusIcon status={app.values[featureIndex]} />
                            </td>
                          );
                        })}
                      </motion.tr>
                    ))}
                </>
              ))}
            </tbody>

            {/* Footer row — score */}
            <tfoot>
              <tr className="border-t-2 border-border">
                <td className="px-5 py-4 text-sm font-bold text-foreground bg-muted/40">
                  Total Score
                </td>
                {apps.map((app) => {
                  const score = app.values.filter((v) => v === "yes").length;
                  const partial = app.values.filter((v) => v === "partial").length;
                  return (
                    <td
                      key={app.name}
                      className={`py-4 text-center ${app.highlight ? "bg-primary/5" : "bg-muted/40"}`}
                    >
                      <span className={`text-xl font-bold font-serif ${app.color}`}>
                        {score + partial * 0.5}/{total}
                      </span>
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-muted-foreground"
        >
          {[
            { status: "yes" as Status, label: "Fully Supported" },
            { status: "partial" as Status, label: "Partial Support" },
            { status: "no" as Status, label: "Not Available" },
          ].map(({ status, label }) => (
            <div key={label} className="flex items-center gap-2">
              <StatusIcon status={status} />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
