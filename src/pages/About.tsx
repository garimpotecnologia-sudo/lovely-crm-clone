import { Button } from "@/components/ui/button";
import { Target, Heart, Rocket, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";
import PricingModal from "@/components/PricingModal";
import scMap from "@/assets/sc-map.png";
const About = () => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const values = [{
    icon: Target,
    title: "14 anos de mercado",
    description: "14 anos entregando soluções tecnológicas que geram impacto real. Vamos levar seu CRM a um novo nível."
  }, {
    icon: Heart,
    title: "Relacionamento verdadeiro",
    description: "Não somos apenas um fornecedor. Somos seu parceiro de sucesso, disponível sempre que precisar"
  }, {
    icon: Rocket,
    title: "Inovação constante",
    description: "Sempre na vanguarda da tecnologia para oferecer as melhores ferramentas do mercado"
  }, {
    icon: Shield,
    title: "Transparência total",
    description: "Sem planos com armadilhas, sem taxas ocultas. Você tem total controle e clareza do que está pagando"
  }];
  return <div className="min-h-screen bg-background">
      <Header onOpenPricing={() => setIsPricingModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Somos seu <span className="text-primary">verdadeiro parceiro</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              No AgentPRO você encontra o parceiro que resolve os desafios do seu negócio com as soluções simples que você precisa
            </p>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        
      </section>

      {/* Values Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, idx) => <div key={idx} className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
              Deixamos o que é velho e sem sentido no passado
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🚫</div>
                <h3 className="font-bold mb-3">Anuidades deveriam ser proibidas</h3>
                <p className="text-sm text-muted-foreground">
                  Talvez você ainda ache normal ser refém de planos de mensalidade
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="font-bold mb-3">Sem truques ou asteriscos</h3>
                <p className="text-sm text-muted-foreground">
                  Não enganamos você na renovação de serviços como outras empresas fazem
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-bold mb-3">Não faz sentido perder seu foco</h3>
                <p className="text-sm text-muted-foreground">
                  Não fique na fila do suporte quando o site do seu cliente está fora do ar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Vamos crescer juntos?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato e descubra como podemos ajudar seu negócio a alcançar novos patamares
          </p>
          <Button size="lg" onClick={() => window.open("https://wa.me/5547984147016?text=Olá! Quero conhecer mais sobre o AgentPRO!", "_blank")}>
            Falar com nossa equipe
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <PricingModal isOpen={isPricingModalOpen} onClose={() => setIsPricingModalOpen(false)} onSelectPlan={() => {}} />
    </div>;
};
export default About;