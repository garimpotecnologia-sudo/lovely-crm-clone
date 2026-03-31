import { Button } from "@/components/ui/button";
import { Bot, Users, BookOpen, Plug, Settings, Clock, Zap, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";
import PricingModal from "@/components/PricingModal";
import SignupDialog from "@/components/signup/SignupDialog";
import type { Plan } from "@/types/plans";
const AIAgents = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsSignupOpen(true);
  };
  const features = [{
    icon: Users,
    title: "Colabore com agentes especializados",
    description: "Conecte múltiplos agentes, cada um com uma função específica (venda, suporte, qualificação de leads etc.), e deixe que eles atuem em conjunto dentro da mesma conversa."
  }, {
    icon: Bot,
    title: "Supervisão automática de conversas",
    description: "Um agente supervisor monitora em tempo real, identifica a intenção e redireciona para o agente ideal. Isso eleva a precisão e reduz erros (ou 'alucinações' de IA)."
  }, {
    icon: BookOpen,
    title: "Treinamento com seu conteúdo real",
    description: "Use sua base (manuais, catálogos, FAQs) para treinar os agentes e garantir respostas alinhadas à sua marca e à sua oferta."
  }, {
    icon: Plug,
    title: "Integração sem esforço",
    description: "Conecte com seus sistemas via API ou importe sua base de conhecimento direto na plataforma. Fluxos contextuais garantem conversas inteligentes e escaláveis."
  }, {
    icon: Settings,
    title: "Você no controle das LLMs",
    description: "Escolha ou experimente a LLM que melhor balanceia custo e performance — sem depender exclusivamente da nossa infraestrutura."
  }, {
    icon: Clock,
    title: "Atendimento 24/7 com contexto real",
    description: "Com fluxos e base conectada, automatize o atendimento sem perder contexto, com precisão e personalização alinhadas à jornada do cliente."
  }, {
    icon: Zap,
    title: "Comece rápido, evolua sempre",
    description: "Configure agentes, conecte conhecimento e ative atendimentos inteligentes em minutos — dentro do seu CRM."
  }];
  return <div className="min-h-screen bg-background">
      <Header onOpenPricing={() => setIsPricingModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-primary/10 via-accent/5 to-background flex items-center min-h-[600px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Agentes inteligentes nativos no seu <span className="gradient-text">CRM</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Monte uma equipe de IA dentro do seu CRM – sem depender de programadores.
            </p>
            <Button size="lg" onClick={() => {
            const message = "Olá, vim do site e gostaria de *conhecer os agentes inteligentes*!";
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/5547988504022?text=${encodedMessage}`, "_blank");
          }} className="text-lg px-8 py-6 h-auto">
              Conhecer agentes inteligentes
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-[8px]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => <div key={idx} className="bg-card border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Configure agentes, conecte conhecimento e ative atendimentos inteligentes
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Em minutos — dentro do seu CRM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => {
            const message = "Olá, vim do site e gostaria de *agendar demonstração*!";
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/5547988504022?text=${encodedMessage}`, "_blank");
          }} className="bg-white text-primary hover:bg-gray-100">
              Agendar demonstração
            </Button>
            <Button size="lg" onClick={() => setIsPricingModalOpen(true)} className="bg-white text-primary hover:bg-gray-100">
              Ver planos
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <PricingModal isOpen={isPricingModalOpen} onClose={() => setIsPricingModalOpen(false)} onSelectPlan={handleSelectPlan} />
      <SignupDialog isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} initialPlan={selectedPlan} />
    </div>;
};
export default AIAgents;