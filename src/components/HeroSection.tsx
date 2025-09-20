import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Instagram } from "lucide-react";
import crmDashboard from "@/assets/crm-dashboard.jpg";
import logoHorizontal from "@/assets/logo-horizontal-light.png";

const HeroSection = () => {
  return (
    <section id="home" className="pt-20 pb-16 hero-gradient text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm font-medium mb-6">
              🚨 Cansado de perder clientes por falta de organização?
            </div>
            
            <div className="flex justify-center items-center gap-4 mb-6">
              <img 
                src={logoHorizontal} 
                alt="AgentPRO Logo" 
                className="h-12 md:h-16"
              />
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span className="gradient-text">Centralize seus atendimentos em minutos!</span>
            </h1>
            
            <h2 className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
              O CRM integrado ao WhatsApp que aumenta sua produtividade instantaneamente
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="hero-button group"
                onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Teste Grátis 14 Dias
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10"
                onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </Button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-6xl mx-auto bounce-in">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-2xl">
              <img 
                src={crmDashboard} 
                alt="Central de Atendimento AgentPRO" 
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              
              {/* Floating Social Icons */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                <Instagram className="h-6 w-6 text-pink-500" />
              </div>
              
              <div className="absolute top-1/2 -left-4">
                <div className="bg-green-500 rounded-full p-3 shadow-lg animate-pulse">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="absolute -bottom-4 left-1/4 bg-blue-500 rounded-full p-3 shadow-lg animate-bounce delay-150">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;