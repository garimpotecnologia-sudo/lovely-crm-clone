import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Zap, BarChart3, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";
import PricingModal from "@/components/PricingModal";

const Products = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const products = [
    {
      id: "crm",
      name: "CRM Inteligente",
      description: "Gerencie seus clientes e vendas de forma intuitiva",
      longDescription: "Sistema completo de CRM integrado ao WhatsApp que centraliza todos os seus contatos, conversas e oportunidades de venda em um único lugar.",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Gestão completa de contatos",
        "Funil de vendas visual",
        "Histórico de conversas",
        "Tags e segmentação",
        "Relatórios em tempo real"
      ],
      link: "/produtos/crm"
    },
    {
      id: "whatsapp",
      name: "WhatsApp Multicanal",
      description: "Atenda múltiplos WhatsApp em uma única plataforma",
      longDescription: "Conecte quantos números de WhatsApp precisar e gerencie todos os atendimentos em uma interface centralizada e profissional.",
      icon: MessageCircle,
      color: "from-green-500 to-emerald-500",
      features: [
        "Múltiplos números conectados",
        "Atendimento em equipe",
        "Respostas rápidas",
        "Chatbot integrado",
        "Mensagens em massa"
      ],
      link: "/produtos/whatsapp"
    },
    {
      id: "automacao",
      name: "Automação Inteligente",
      description: "Automatize processos e ganhe produtividade",
      longDescription: "Crie fluxos automatizados para qualificar leads, nutrir relacionamentos e fechar vendas no piloto automático.",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      features: [
        "Fluxos de automação visuais",
        "Integração com Make e N8N",
        "Gatilhos personalizados",
        "IA para atendimento",
        "Sequências de mensagens"
      ],
      link: "/produtos/automacao"
    },
    {
      id: "analytics",
      name: "Analytics & Relatórios",
      description: "Dados e insights para tomar melhores decisões",
      longDescription: "Dashboards completos com métricas de atendimento, vendas e performance da equipe em tempo real.",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      features: [
        "Dashboards em tempo real",
        "Métricas de conversão",
        "Performance da equipe",
        "Relatórios customizados",
        "Exportação de dados"
      ],
      link: "/produtos/analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenPricing={() => setIsPricingModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Produtos feitos para <span className="text-primary">seu sucesso</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Soluções completas para automatizar seu atendimento, vender mais e crescer seu negócio
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group relative bg-card border rounded-3xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6`}>
                  <product.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <p className="text-sm mb-6">{product.longDescription}</p>
                
                <ul className="space-y-2 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                  variant="outline"
                  onClick={() => setIsPricingModalOpen(true)}
                >
                  Conhecer produto
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para transformar seu atendimento?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comece hoje mesmo e veja seus resultados crescerem
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setIsPricingModalOpen(true)}
              className="bg-white text-primary hover:bg-gray-100"
            >
              Ver planos
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.open("https://wa.me/5547984147016?text=Olá! Quero conhecer os produtos do AgentPRO!", "_blank")}
              className="border-white text-white hover:bg-white/10"
            >
              Falar com consultor
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <PricingModal 
        isOpen={isPricingModalOpen} 
        onClose={() => setIsPricingModalOpen(false)} 
      />
    </div>
  );
};

export default Products;
