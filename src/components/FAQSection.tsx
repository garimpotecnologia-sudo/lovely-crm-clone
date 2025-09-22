import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Quais integrações estão disponíveis?",
      answer: "Integramos WhatsApp Business API, Instagram, Messenger, além de sistemas de pagamento e APIs customizadas conforme o plano."
    },
    {
      question: "Vocês oferecem suporte para implantação?",
      answer: "Sim! Todos os planos incluem suporte para configuração inicial e treinamento da equipe."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, não há fidelidade. Você pode cancelar sua assinatura a qualquer momento através do painel administrativo."
    },
    {
      question: "Os dados ficam seguros e em conformidade com a LGPD?",
      answer: "Absolutamente. Utilizamos criptografia de ponta e seguimos todas as normas de segurança e LGPD para proteger os dados."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Dúvidas <span className="gradient-text">Frequentes</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Tire suas dúvidas sobre o AgentPRO
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="feature-card border-none faq-item"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Não encontrou sua dúvida? Fale conosco!
            </p>
            <button
              onClick={() => window.open("https://wa.me/5547984147016?text=Olá! Vim da seção de FAQ do site e tenho algumas dúvidas sobre o AgentPRO. Podem me ajudar?", "_blank")}
              className="bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Tirar Dúvidas no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;