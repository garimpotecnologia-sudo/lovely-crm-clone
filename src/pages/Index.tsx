import { useState } from "react";
import Header, { MobileBottomBar } from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import AIAgentsSection from "@/components/AIAgentsSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PricingModal from "@/components/PricingModal";
import SignupDialog from "@/components/signup/SignupDialog";
import ScrollAnimations from "@/components/ScrollAnimations";
import type { Plan } from "@/types/plans";

const Index = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsSignupOpen(true);
  };

  return (
    <main className="min-h-screen bg-background pb-16 md:pb-0">
      <ScrollAnimations />
      <Header onOpenPricing={() => setIsPricingModalOpen(true)} />
      <HeroSection onOpenPricing={() => setIsPricingModalOpen(true)} />
      <SocialProofSection />
      <AIAgentsSection />
      <BenefitsSection />
      <FeaturesSection />
      <PricingSection
        onOpenPricing={() => setIsPricingModalOpen(true)}
        onSelectPlan={handleSelectPlan}
      />
      <FAQSection />
      <Footer />
      <WhatsAppButton />
      <MobileBottomBar onOpenPricing={() => setIsPricingModalOpen(true)} />
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onSelectPlan={handleSelectPlan}
      />
      <SignupDialog
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        initialPlan={selectedPlan}
      />
    </main>
  );
};

export default Index;
