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
  return <section id="home" className="pt-32 pb-20 hero-gradient text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16 fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Automatize seu atendimento<br />
              <span className="text-white/90">e venda mais com IA</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light mb-10 max-w-3xl mx-auto text-white/90">
              CRM inteligente integrado ao WhatsApp que centraliza seus atendimentos, 
              automatiza processos e aumenta suas vendas
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={onOpenPricing} 
                className="hero-button group bg-white text-primary hover:bg-gray-100 text-lg px-10 py-6 h-auto"
              >
                Agendar demonstração
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => window.open("https://wa.me/5547984147016?text=Olá! Quero saber mais sobre o AgentPRO!", "_blank")} 
                className="text-white border-white/30 hover:bg-white/10 text-lg px-10 py-6 h-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com consultor
              </Button>
            </div>
            
            <p className="text-sm text-white/70">
              ✨ Teste grátis por 7 dias • Sem cartão de crédito
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-6xl mx-auto bounce-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-2xl">
                <img src={crmInterface} alt="Central de Atendimento AgentPRO" className="w-full h-auto rounded-2xl shadow-xl" />
                
                {/* Floating Social Icons */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                  <Instagram className="h-6 w-6 text-pink-500" />
                </div>
                
                <div className="absolute top-1/2 -left-4">
                  <div className="bg-green-500 rounded-full p-3 shadow-lg animate-pulse">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-2xl">
                <img src={plataformaAtendimento} alt="Plataforma de Atendimento AgentPRO" className="w-full h-auto rounded-2xl shadow-xl" />
                
                <div className="absolute -bottom-4 left-1/4 bg-blue-500 rounded-full p-3 shadow-lg animate-bounce delay-150">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-2xl">
                <img src={automationFlow} alt="Automação de Fluxos AgentPRO" className="w-full h-auto rounded-2xl shadow-xl" />
                
                <div className="absolute top-1/4 -right-4 bg-purple-500 rounded-full p-3 shadow-lg animate-pulse delay-300">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-2xl">
                <img src={crmFunilVendas} alt="Funil de Vendas CRM AgentPRO" className="w-full h-auto rounded-2xl shadow-xl" />
                
                <div className="absolute -top-4 left-1/4 bg-orange-500 rounded-full p-3 shadow-lg animate-bounce delay-500">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;