import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Shield } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const CTASection = () => {
  return (
    <section className="py-20 hero-gradient text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Free Trial Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Aproveite o <span className="text-brand-magenta">Teste Grátis</span>{" "}
              por 14 Dias e revolucione sua empresa!
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-3xl mx-auto">
              Experimente nossa plataforma e transforme seu atendimento.
            </p>
            
            {/* Countdown Timer */}
            <CountdownTimer targetHours={48} />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="hero-button group"
                onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
              >
                <Clock className="mr-2 h-5 w-5" />
                Quero fazer o teste grátis!
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-lg">14 dias totalmente grátis</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-lg">Sem compromisso</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-lg">Suporte completo</span>
              </div>
            </div>
          </div>

          {/* WhatsApp API Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-6">
                <Shield className="mr-2 h-4 w-4" />
                API OFICIAL WHATSAPP
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Tenha todas as vantagens da API Oficial do WhatsApp
              </h3>
              <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
                Maior segurança e confiabilidade para seu negócio. Evite bloqueio permanente 
                do seu número e utilize a API Oficial para profissionalizar o seu atendimento.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-green-400 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Máxima Segurança</h4>
                  <p className="text-sm text-white/80">Proteja seu número contra bloqueios</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">100% Confiável</h4>
                  <p className="text-sm text-white/80">API oficial diretamente do WhatsApp</p>
                </div>
                <div className="text-center">
                  <Clock className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">24/7 Disponível</h4>
                  <p className="text-sm text-white/80">Atendimento ininterrupto</p>
                </div>
              </div>

              <Button 
                size="lg" 
                className="hero-button"
                onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
              >
                Quero saber mais!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;