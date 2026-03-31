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
      answer:
        "Você tem 7 dias para testar todas as funcionalidades do AgentPRO gratuitamente, sem precisar cadastrar cartão de crédito. Após o período, basta escolher o plano ideal para continuar.",
    },
    {
      question: "Preciso ter conhecimento técnico para usar?",
      answer:
        "Não! O AgentPRO foi desenvolvido para ser intuitivo e fácil de usar. Além disso, oferecemos treinamento completo para sua equipe e suporte sempre que precisar.",
    },
    {
      question: "Quantos canais de atendimento posso conectar?",
      answer:
        "Depende do plano escolhido. No plano Essential você conecta WhatsApp, no Pro adiciona Instagram e Messenger, e nos planos Plus+ e Advanced todos os canais disponíveis.",
    },
    {
      question: "Quais integrações estão disponíveis?",
      answer:
        "Integramos WhatsApp Business API, Instagram, Messenger e APIs customizadas. Novos integrações são adicionadas regularmente.",
    },
    {
      question: "Os dados ficam seguros e em conformidade com a LGPD?",
      answer:
        "Sim! Utilizamos criptografia de ponta a ponta e seguimos todas as normas de segurança e LGPD para proteger seus dados e de seus clientes.",
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer:
        "Sim, não há fidelidade. Você pode cancelar sua assinatura a qualquer momento, sem burocracia.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="mesh-bg absolute inset-0 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-brand-purple uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
              Dúvidas <span className="gradient-text">Frequentes</span>
            </h2>
            <p className="text-muted-foreground">
              Tire suas dúvidas sobre o AgentPRO
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/50 px-6 transition-all duration-300 hover:border-brand-purple/20 data-[state=open]:border-brand-purple/30 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold text-foreground text-[15px]">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed pb-2 text-sm">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="text-center mt-14">
            <p className="text-muted-foreground mb-4 text-sm">
              Não encontrou sua dúvida?
            </p>
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/5547984147016?text=Olá! Vim da seção de FAQ do site e tenho algumas dúvidas sobre o AgentPRO.",
                  "_blank"
                )
              }
              className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5"
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
