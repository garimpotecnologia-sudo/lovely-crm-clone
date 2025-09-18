import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import whatsappInterface from "@/assets/whatsapp-interface.jpg";
import chatbotInterface from "@/assets/chatbot-interface.jpg";
import teamWorking from "@/assets/team-working.jpg";

const ModulesSection = () => {
  return (
    <section id="solucoes" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              CRM e WhatsApp em uma{" "}
              <span className="gradient-text">única plataforma!</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
              <strong>Gestão de conversas</strong> e canais de atendimento com{" "}
              <strong>visão de funil</strong> em uma única plataforma? Agora é possível com o{" "}
              <strong>AgentPRO CRM</strong>.
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              <strong>Potencialize o seu atendimento</strong> e tenha visibilidade e acompanhamento 
              de todas as etapas do seu processo comercial, de suporte ou de projetos,{" "}
              <strong>desde a primeira conversa.</strong>
            </p>
          </div>

          <div className="text-center mb-20">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
            >
              Agendar uma demonstração
            </Button>
          </div>

          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Com AgentPRO ao seu lado, tenha mais{" "}
              <span className="gradient-text">eficiência, produtividade e sucesso</span> garantido!
            </h2>
          </div>

          {/* Modules */}
          <div className="space-y-32">
            {/* ATENDIMENTO */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                  ATENDIMENTO
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Nosso módulo de Atendimento é <span className="gradient-text">sinônimo de simplicidade e estabilidade</span>
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Centralize as conversas de WhatsApp, Instagram Direct e Messenger em{" "}
                  <strong>uma única fila</strong>, supervisionando as suas equipes e os atendentes.
                </p>
                <Button 
                  variant="outline" 
                  className="group"
                  onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
                >
                  Saber mais sobre Atendimento
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <img 
                    src={whatsappInterface} 
                    alt="Solução de Atendimento AgentPRO" 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* CRM */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <img 
                    src={teamWorking} 
                    alt="CRM AgentPRO" 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
                  CRM
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  <span className="gradient-text">Integrado de forma impecável ao WhatsApp</span>
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  O CRM não só otimiza seu funil de vendas, mas também a gestão de tarefas,{" "}
                  <strong>colocando todas as interações cruciais ao seu alcance</strong>. 
                  Otimize o tempo de follow-up da sua equipe, acessando as conversas pelo funil.
                </p>
                <Button 
                  variant="outline" 
                  className="group"
                  onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
                >
                  Saber mais sobre CRM
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* CHATBOT */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center px-4 py-2 bg-secondary/60 text-secondary-foreground rounded-full text-sm font-medium mb-6">
                  CHATBOT
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Com uma <span className="gradient-text">configuração descomplicada</span>
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Você coloca o seu assistente virtual para trabalhar em minutos.{" "}
                  <strong>Cada resposta fornecida</strong> pelo cliente{" "}
                  <strong>torna-se parte integrante do contato</strong>, construindo uma 
                  qualificação do lead que acelera o processo de venda.
                </p>
                <Button 
                  variant="outline" 
                  className="group"
                  onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
                >
                  Saber mais sobre Chatbot
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <img 
                    src={chatbotInterface} 
                    alt="Chatbot AgentPRO" 
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;