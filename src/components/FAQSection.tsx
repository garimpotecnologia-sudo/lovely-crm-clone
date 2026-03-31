import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "O AgentPRO funciona para qualquer tipo de clínica?",
      answer:
        "Sim! Atendemos clínicas médicas, odontológicas, estéticas, veterinárias, psicológicas, fisioterapia e mais. A plataforma se adapta ao fluxo de atendimento da sua especialidade.",
    },
    {
      question: "Como funciona o agendamento pelo WhatsApp?",
      answer:
        "O paciente envia uma mensagem e o chatbot com IA identifica a intenção (agendar, remarcar, cancelar). Ele verifica a agenda em tempo real, sugere horários disponíveis e confirma automaticamente — sem intervenção da recepção.",
    },
    {
      question: "Os dados dos pacientes ficam seguros?",
      answer:
        "Absolutamente. Utilizamos criptografia de ponta a ponta e seguimos todas as normas da LGPD. Os dados de saúde dos pacientes são tratados com o mais alto nível de segurança.",
    },
    {
      question: "Preciso de equipe técnica para implantar?",
      answer:
        "Não. A implantação é guiada e nossa equipe de sucesso do cliente acompanha todo o processo. A maioria das clínicas está operando em menos de 48 horas.",
    },
    {
      question: "Posso integrar com meu sistema de gestão ou prontuário?",
      answer:
        "Sim! Oferecemos API e webhooks para integrar com sistemas como Totvs, MV, iClinic, Doctoralia e outros. Nos planos Plus+ e Advanced a integração é nativa.",
    },
    {
      question: "Como funciona o trial de 7 dias?",
      answer:
        "Você testa todas as funcionalidades gratuitamente por 7 dias, sem precisar de cartão de crédito. Se gostar, escolhe um plano. Se não, a conta é encerrada automaticamente sem cobrança.",
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
              Tudo que você precisa saber antes de transformar o atendimento da sua clínica
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
              Ainda tem dúvidas? Fale com nosso time especializado em saúde
            </p>
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/5547984147016?text=Olá! Vim da seção de FAQ e tenho dúvidas sobre o AgentPRO para minha clínica.",
                  "_blank"
                )
              }
              className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5"
            >
              Falar com especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
