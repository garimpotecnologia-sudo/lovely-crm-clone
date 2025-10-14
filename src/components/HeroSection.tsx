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
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Gestão de conversas, gestão de funil, agendamentos.<br />
              <span className="text-white/90">Um CRM inteligente integrado ao seu WhatsApp.</span>
            </h1>
            
            <p className="text-lg md:text-xl font-light mb-10 max-w-3xl mx-auto text-white/90">
              Quem usa ferramenta de auxílio no WhatsApp aumenta a performance de produtividade digital em no mínimo 35%.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button 
                size="lg" 
                onClick={onOpenPricing} 
                className="bg-white text-brand-purple hover:bg-gray-100 text-lg px-10 py-6 h-auto font-semibold"
              >
                Agendar demonstração
              </Button>
              
              <Button 
                size="lg" 
                onClick={() => window.open("https://wa.me/5547984147016?text=Olá! Quero saber mais sobre o AgentPRO!", "_blank")} 
                className="bg-white text-brand-purple hover:bg-gray-100 text-lg px-10 py-6 h-auto font-semibold"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
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