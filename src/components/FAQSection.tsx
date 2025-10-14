import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Como funciona o período de teste grátis?",
      answer: "Você tem 7 dias para testar todas as funcionalidades do AgentPRO gratuitamente, sem precisar cadastrar cartão de crédito. Após o período, basta escolher o plano ideal para continuar."
    },
    {
      question: "Preciso ter conhecimento técnico para usar?",
      answer: "Não! O AgentPRO foi desenvolvido para ser intuitivo e fácil de usar. Além disso, oferecemos treinamento completo para sua equipe e suporte sempre que precisar."
    },
    {
      question: "Quantos canais de atendimento posso conectar?",
      answer: "Depende do plano escolhido. No plano Starter você pode conectar até 2 números, no Business até 5, e no Enterprise números ilimitados."
    },
    {
      question: "Quais integrações estão disponíveis?",
      answer: "Integramos WhatsApp Business API, Instagram, Messenger e APIs customizadas. Novos integrações são adicionadas regularmente."
    },
    {
      question: "Os dados ficam seguros e em conformidade com a LGPD?",
      answer: "Sim! Utilizamos criptografia de ponta a ponta e seguimos todas as normas de segurança e LGPD para proteger seus dados e de seus clientes."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, não há fidelidade. Você pode cancelar sua assinatura a qualquer momento através do painel administrativo, sem burocracia."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dúvidas <span className="text-primary">Frequentes</span>
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
              onClick={() => window.open("https://wa.me/5547984147016?text=Olá! Vim da seção de FAQ do site e tenho algumas dúvidas sobre o AgentPRO.", "_blank")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors"
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