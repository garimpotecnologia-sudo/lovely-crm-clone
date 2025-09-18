import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Instagram } from "lucide-react";
import crmDashboard from "@/assets/crm-dashboard.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="pt-20 pb-16 hero-gradient text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16 fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">CRM</span> via WhatsApp
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-4xl mx-auto">
              Para as <span className="font-semibold text-brand-magenta">conversas</span> e o{" "}
              <span className="font-semibold text-brand-magenta">negócio</span> andarem juntos
            </h2>
            
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-white/90">
              <strong>Conecte</strong> suas equipes com clientes e leads através de uma{" "}
              <strong>plataforma integrada ao WhatsApp</strong>, Instagram Direct e Facebook Messenger
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="hero-button group"
                onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Assistir Demonstração
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