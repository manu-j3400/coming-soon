import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import TechCard from "@/components/TechCard";
import WaitlistSection from "@/components/WaitlistSection";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <TechCard />
        <WaitlistSection />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
