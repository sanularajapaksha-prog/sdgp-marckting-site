import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Reviews from "@/components/landing/Reviews";
import Team from "@/components/landing/Team";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <Reviews />
      <Team />
      <Footer />
    </div>
  );
}
