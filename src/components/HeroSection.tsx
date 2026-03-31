import { Button } from "@/components/ui/button";
import { Heart, Calendar, MessageSquare, Shield } from "lucide-react";
import crmInterface from "@/assets/crm-interface-new.png";
import crmFunilVendas from "@/assets/crm-funil-vendas.png";
import automationFlow from "@/assets/automation-flow.png";

interface HeroSectionProps {
  onOpenPricing: () => void;
  onStartTrial?: () => void;
}

const HeroSection = ({ onOpenPricing, onStartTrial }: HeroSectionProps) => {
  return (
    <>
      <section id="home" className="pt-32 pb-16 hero-gradient text-white overflow-hidden relative">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8 animate-fadeInUp">
                <Heart className="w-3.5 h-3.5 text-pink-300" />
                <span className="text-sm text-white/90 font-medium">+2.800 clínicas e empresas de saúde confiam no AgentPRO</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                A plataforma de atendimento
                <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                  {" "}inteligente para clínicas
                </span>
                <br className="hidden md:block" />
                e empresas de saúde
              </h1>

              <p className="text-base md:text-lg lg:text-xl font-light mb-10 max-w-2xl mx-auto text-white/80 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                Centralize o atendimento ao paciente, automatize agendamentos e acompanhe toda a jornada do seu público com IA — do primeiro contato ao pós-consulta.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                <Button
                  size="lg"
                  onClick={() => onStartTrial?.()}
                  variant="hero"
                  className="text-sm md:text-base px-8 py-5 h-auto font-semibold hero-button"
                >
                  Testar grátis por 7 dias
                </Button>
                <Button
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById("pricing");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-sm md:text-base px-8 py-5 h-auto font-semibold bg-white/[0.08] border border-white/20 text-white hover:bg-white/[0.15] backdrop-blur-sm"
                >
                  Ver planos para clínicas
                </Button>
              </div>

              <p className="text-sm text-white/50 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                Sem cartão de crédito · Ideal para clínicas, consultórios e hospitais
              </p>

              {/* Mini feature pills */}
              <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
                {[
                  { icon: Calendar, text: "Agendamento inteligente" },
                  { icon: MessageSquare, text: "WhatsApp integrado" },
                  { icon: Shield, text: "LGPD compliant" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1.5">
                    <item.icon className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="text-xs text-white/70">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-12 bg-background relative">
        <div className="orb orb-3" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto bounce-in">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="relative group rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img src={crmInterface} alt="Central de Atendimento ao Paciente" className="w-full h-auto rounded-2xl" />
              </div>

              <div className="relative group rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img src={automationFlow} alt="Automação de Fluxos Clínicos" className="w-full h-auto rounded-2xl" />
              </div>

              <div className="relative group rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 md:col-span-2">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img src={crmFunilVendas} alt="Funil de Pacientes - CRM AgentPRO" className="w-full h-auto rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
