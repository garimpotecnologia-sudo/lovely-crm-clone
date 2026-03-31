import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onOpenPricing={() => {}} />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Termos de Serviço</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Última atualização: Março de 2026
          </p>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Objeto
              </h2>
              <p>
                Estes Termos de Serviço regulam o uso da plataforma CRM
                AGENTPRO, um sistema de gestão de relacionamento com clientes
                integrado a canais de comunicação como WhatsApp, Instagram e
                Messenger, com funcionalidades de automação e inteligência
                artificial.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Planos e Pagamento
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Os planos são cobrados mensalmente via PIX ou cartão de
                  crédito através da plataforma Asaas
                </li>
                <li>
                  A taxa de ativação é cobrada uma única vez no primeiro
                  pagamento
                </li>
                <li>
                  O não pagamento pode resultar na suspensão temporária do
                  acesso
                </li>
                <li>
                  Alterações de plano podem ser solicitadas a qualquer momento
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Obrigações do Usuário
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fornecer informações verdadeiras e atualizadas</li>
                <li>Manter a confidencialidade de suas credenciais de acesso</li>
                <li>
                  Utilizar a plataforma em conformidade com a legislação
                  vigente
                </li>
                <li>
                  Não utilizar a plataforma para envio de spam ou conteúdo
                  ilegal
                </li>
                <li>
                  Respeitar as políticas de uso do WhatsApp e demais canais
                  integrados
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Cancelamento
              </h2>
              <p>
                O cancelamento pode ser solicitado a qualquer momento. Após o
                cancelamento, o acesso permanece ativo até o final do período já
                pago. A taxa de ativação não é reembolsável. Dados poderão ser
                exportados antes do encerramento da conta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Disponibilidade do Serviço
              </h2>
              <p>
                Nos esforçamos para manter a plataforma disponível 24/7, porém
                não garantimos disponibilidade ininterrupta. Manutenções
                programadas serão comunicadas com antecedência. Não nos
                responsabilizamos por indisponibilidades causadas por fatores
                externos (provedores de internet, Meta/WhatsApp, etc).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Propriedade Intelectual
              </h2>
              <p>
                Todo o conteúdo, design, código e funcionalidades da plataforma
                CRM AGENTPRO são de propriedade exclusiva da Garimpo
                Tecnologia. O uso da plataforma não confere ao usuário qualquer
                direito de propriedade intelectual sobre a mesma.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Limitação de Responsabilidade
              </h2>
              <p>
                A AgentPRO não se responsabiliza por danos indiretos,
                incidentais ou consequenciais decorrentes do uso ou
                impossibilidade de uso da plataforma. Nossa responsabilidade
                total está limitada ao valor pago pelo usuário nos últimos 12
                meses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Foro
              </h2>
              <p>
                Fica eleito o foro da Comarca de Balneário Camboriú/SC para
                dirimir quaisquer questões oriundas destes termos, com renúncia
                expressa a qualquer outro, por mais privilegiado que seja.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
