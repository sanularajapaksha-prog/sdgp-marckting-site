import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Destinations from "@/components/landing/Destinations";
import Press from "@/components/landing/Press";
import Awards from "@/components/landing/Awards";
import Community from "@/components/landing/Community";
import VideoDemo from "@/components/landing/VideoDemo";
import Comparison from "@/components/landing/Comparison";
import Partners from "@/components/landing/Partners";
import Mission from "@/components/landing/Mission";
import Reviews from "@/components/landing/Reviews";
import FAQ from "@/components/landing/FAQ";
import DownloadCTA from "@/components/landing/DownloadCTA";
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
      <Press />
      <Awards />
      <Community />
      <VideoDemo />
      <Comparison />
      <Partners />
      <Mission />
      <Reviews />
      <FAQ />
      <DownloadCTA />
      <Team />
      <Footer />
    </div>
  );
}
