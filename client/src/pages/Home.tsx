import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Destinations from "@/components/landing/Destinations";
import Mission from "@/components/landing/Mission";
import Reviews from "@/components/landing/Reviews";
import FAQ from "@/components/landing/FAQ";
import Team from "@/components/landing/Team";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Destinations />
      <Mission />
      <Reviews />
      <FAQ />
      <Team />
      <Footer />
    </div>
  );
}
