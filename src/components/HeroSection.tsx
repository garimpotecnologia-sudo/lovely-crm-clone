import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram } from "lucide-react";
import crmInterface from "@/assets/crm-interface-new.png";
import plataformaAtendimento from "@/assets/plataforma-atendimento.png";
import crmFunilVendas from "@/assets/crm-funil-vendas.png";
import automationFlow from "@/assets/automation-flow.png";
interface HeroSectionProps {
  onOpenPricing: () => void;
}
const HeroSection = ({
  onOpenPricing
}: HeroSectionProps) => {
  return <>
    <section id="home" className="pt-32 pb-12 hero-gradient text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center fade-in-up">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Um CRM inteligente que conecta sua equipe, seus clientes e seu WhatsApp em um único fluxo automatizado.
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl font-light mb-3 max-w-3xl mx-auto text-white/90">
              Centralize mensagens, agendamentos e funil de vendas com Inteligência Artificial.
            </p>
            
            <p className="text-sm md:text-base lg:text-lg mb-10 max-w-3xl mx-auto text-white/80">
              Mais produtividade, menos esforço — crescimento garantido.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button 
                size="lg" 
                onClick={onOpenPricing} 
                variant="hero"
                className="text-base md:text-lg px-8 md:px-10 py-5 md:py-6 h-auto font-semibold"
              >
                Agendar demonstração
              </Button>
              
              <Button 
                size="lg" 
                onClick={onOpenPricing} 
                variant="hero"
                className="text-base md:text-lg px-8 md:px-10 py-5 md:py-6 h-auto font-semibold"
              >
                Falar com consultor
              </Button>
            </div>
            
            <p className="text-sm text-white/70">
              ✨ Teste grátis por 7 dias • Sem cartão de crédito
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Dashboard Preview - Outside gradient background */}
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bounce-in">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-2xl">
              <img src={crmInterface} alt="Central de Atendimento AgentPRO" className="w-full h-auto rounded-2xl shadow-xl" />
            </div>
            
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-2xl">
              <img src={automationFlow} alt="Automação de Fluxos AgentPRO" className="w-full h-auto rounded-2xl shadow-xl" />
            </div>
            
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-2xl md:col-span-2">
              <img src={crmFunilVendas} alt="Funil de Vendas CRM AgentPRO" className="w-full h-auto rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>;
};
export default HeroSection;