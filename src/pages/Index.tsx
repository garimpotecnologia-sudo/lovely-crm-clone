import { useState } from "react";
import Header, { MobileBottomBar } from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PricingModal from "@/components/PricingModal";
import ScrollAnimations from "@/components/ScrollAnimations";

const Index = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <ScrollAnimations />
      <Header onOpenPricing={() => setIsPricingModalOpen(true)} />
      <HeroSection onOpenPricing={() => setIsPricingModalOpen(true)} />
      <SocialProofSection />
      <BenefitsSection />
      <FeaturesSection />
      <PricingSection onOpenPricing={() => setIsPricingModalOpen(true)} />
      <FAQSection />
      <Footer />
      <WhatsAppButton />
      <MobileBottomBar onOpenPricing={() => setIsPricingModalOpen(true)} />
      <PricingModal 
        isOpen={isPricingModalOpen} 
        onClose={() => setIsPricingModalOpen(false)} 
      />
    </main>
  );
};

export default Index;