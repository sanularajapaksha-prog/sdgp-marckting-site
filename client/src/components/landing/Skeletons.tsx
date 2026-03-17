import { motion } from "framer-motion";

// ─── Shimmer base ─────────────────────────────────────────────────────────────

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-100 rounded-xl ${className}`}
    >
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
      />
    </div>
  );
}

// ─── Section skeleton (generic) ───────────────────────────────────────────────

export function SectionSkeleton() {
  return (
    <div className="py-24 container mx-auto px-6">
      <div className="text-center mb-12 space-y-4">
        <Shimmer className="h-5 w-28 mx-auto rounded-full" />
        <Shimmer className="h-10 w-80 mx-auto" />
        <Shimmer className="h-5 w-64 mx-auto" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Shimmer className="h-40 w-full rounded-3xl" />
            <Shimmer className="h-5 w-3/4" />
            <Shimmer className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Hero skeleton ────────────────────────────────────────────────────────────

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-6">
        <Shimmer className="h-6 w-36 mx-auto rounded-full" />
        <div className="space-y-3">
          <Shimmer className="h-16 w-full" />
          <Shimmer className="h-16 w-5/6 mx-auto" />
          <Shimmer className="h-16 w-4/5 mx-auto" />
        </div>
        <Shimmer className="h-5 w-96 mx-auto" />
        <div className="flex justify-center gap-4">
          <Shimmer className="h-12 w-36 rounded-full" />
          <Shimmer className="h-12 w-36 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─── Team card skeleton ───────────────────────────────────────────────────────

export function TeamSkeleton() {
  return (
    <div className="py-24 container mx-auto px-6">
      <div className="text-center mb-12 space-y-4">
        <Shimmer className="h-5 w-24 mx-auto rounded-full" />
        <Shimmer className="h-10 w-72 mx-auto" />
        <Shimmer className="h-4 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-3xl overflow-hidden border border-gray-100">
            <Shimmer className="h-40 w-full rounded-none" />
            <div className="p-5 space-y-3">
              <Shimmer className="h-5 w-36 mx-auto" />
              <Shimmer className="h-4 w-48 mx-auto" />
              <div className="flex justify-center gap-2 pt-2">
                {[...Array(3)].map((_, j) => (
                  <Shimmer key={j} className="h-7 w-7 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Reviews skeleton ─────────────────────────────────────────────────────────

export function ReviewsSkeleton() {
  return (
    <div className="py-24 overflow-hidden space-y-4">
      <div className="text-center mb-10 space-y-3">
        <Shimmer className="h-5 w-28 mx-auto rounded-full" />
        <Shimmer className="h-10 w-72 mx-auto" />
      </div>
      {[...Array(2)].map((_, row) => (
        <div key={row} className="flex gap-4 px-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="shrink-0 w-72 space-y-3 bg-gray-50 rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <Shimmer className="h-10 w-10 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Shimmer className="h-4 w-24" />
                  <Shimmer className="h-3 w-16" />
                </div>
              </div>
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-4 w-5/6" />
              <Shimmer className="h-4 w-4/6" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Destinations skeleton ────────────────────────────────────────────────────

export function DestinationsSkeleton() {
  return (
    <div className="py-24 container mx-auto px-6">
      <div className="text-center mb-10 space-y-4">
        <Shimmer className="h-5 w-32 mx-auto rounded-full" />
        <Shimmer className="h-10 w-80 mx-auto" />
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <Shimmer key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Shimmer className={`w-full rounded-3xl ${i % 3 === 0 ? "h-80" : "h-52"}`} />
            <Shimmer className="h-4 w-3/4" />
            <Shimmer className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ skeleton ─────────────────────────────────────────────────────────────

export function FAQSkeleton() {
  return (
    <div className="py-24 container mx-auto px-6 max-w-3xl">
      <div className="text-center mb-10 space-y-4">
        <Shimmer className="h-5 w-24 mx-auto rounded-full" />
        <Shimmer className="h-10 w-64 mx-auto" />
        <Shimmer className="h-10 w-full rounded-2xl" />
      </div>
      <div className="space-y-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="border border-gray-100 rounded-2xl p-5 space-y-2">
            <Shimmer className="h-5 w-full" />
            {i % 3 === 0 && (
              <>
                <Shimmer className="h-4 w-5/6" />
                <Shimmer className="h-4 w-4/6" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Stats skeleton ───────────────────────────────────────────────────────────

export function StatsSkeleton() {
  return (
    <div className="py-16 container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="text-center space-y-2">
            <Shimmer className="h-10 w-20 mx-auto rounded-xl" />
            <Shimmer className="h-8 w-16 mx-auto" />
            <Shimmer className="h-3 w-24 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Contact skeleton ─────────────────────────────────────────────────────────

export function ContactSkeleton() {
  return (
    <div className="py-24 container mx-auto px-6">
      <div className="text-center mb-12 space-y-4">
        <Shimmer className="h-5 w-28 mx-auto rounded-full" />
        <Shimmer className="h-10 w-72 mx-auto" />
      </div>
      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-2xl">
              <Shimmer className="h-10 w-10 rounded-xl shrink-0" />
              <div className="space-y-2 flex-1">
                <Shimmer className="h-4 w-24" />
                <Shimmer className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Shimmer className="h-12 rounded-xl" />
            <Shimmer className="h-12 rounded-xl" />
          </div>
          <Shimmer className="h-12 rounded-xl" />
          <Shimmer className="h-32 rounded-xl" />
          <Shimmer className="h-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
