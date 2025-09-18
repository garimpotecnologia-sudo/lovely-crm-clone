import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ModulesSection from "@/components/ModulesSection";
import ExclusiveFeaturesSection from "@/components/ExclusiveFeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ModulesSection />
      <ExclusiveFeaturesSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;