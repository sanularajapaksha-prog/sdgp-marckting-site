import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import AppExplorer from "@/components/landing/AppExplorer";
import Destinations from "@/components/landing/Destinations";
import SafetyHighlight from "@/components/landing/SafetyHighlight";
import Press from "@/components/landing/Press";
import Awards from "@/components/landing/Awards";
import Community from "@/components/landing/Community";
import VideoDemo from "@/components/landing/VideoDemo";
import Comparison from "@/components/landing/Comparison";
import Partners from "@/components/landing/Partners";
import SocialProofTicker from "@/components/landing/SocialProofTicker";
import Mission from "@/components/landing/Mission";
import Reviews from "@/components/landing/Reviews";
import Waitlist from "@/components/landing/Waitlist";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import Countdown from "@/components/landing/Countdown";
import Newsletter from "@/components/landing/Newsletter";
import DownloadCTA from "@/components/landing/DownloadCTA";
import TripPlanner from "@/components/landing/TripPlanner";
import Blog from "@/components/landing/Blog";
import Pricing from "@/components/landing/Pricing";
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
      <AppExplorer />
      <Destinations />
      <SafetyHighlight />
      <Press />
      <Awards />
      <Community />
      <VideoDemo />
      <Comparison />
      <Partners />
      <SocialProofTicker />
      <Mission />
      <Reviews />
      <Waitlist />
      <FAQ />
      <Contact />
      <Countdown />
      <Newsletter />
      <DownloadCTA />
      <TripPlanner />
      <Blog />
      <Pricing />
      <Team />
      <Footer />
    </div>
  );
}
