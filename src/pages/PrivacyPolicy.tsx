import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onOpenPricing={() => {}} />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Política de Privacidade</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Última atualização: Março de 2026
          </p>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Coleta de Dados
              </h2>
              <p>
                A AgentPRO CRM coleta informações pessoais que você nos fornece
                diretamente, como nome, e-mail, telefone, CPF/CNPJ e dados da
                empresa ao contratar nossos serviços. Também coletamos dados de
                uso automaticamente, como endereço IP, tipo de navegador e
                páginas acessadas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Uso dos Dados
              </h2>
              <p>Utilizamos seus dados para:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Fornecer e manter nossos serviços de CRM</li>
                <li>Processar pagamentos e gerenciar assinaturas</li>
                <li>Enviar comunicações sobre o serviço</li>
                <li>Melhorar a experiência do usuário</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Compartilhamento de Dados
              </h2>
              <p>
                Não vendemos seus dados pessoais. Podemos compartilhar
                informações com prestadores de serviço que nos auxiliam na
                operação (processadores de pagamento como Asaas, provedores de
                infraestrutura), sempre sob acordos de confidencialidade.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Armazenamento e Segurança
              </h2>
              <p>
                Seus dados são armazenados em servidores seguros com
                criptografia. Implementamos medidas técnicas e organizacionais
                adequadas para proteger suas informações contra acesso não
                autorizado, alteração ou destruição.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Seus Direitos (LGPD)
              </h2>
              <p>
                De acordo com a Lei Geral de Proteção de Dados (Lei nº
                13.709/2018), você tem direito a:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Confirmar a existência de tratamento dos seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Solicitar correção de dados incompletos ou desatualizados</li>
                <li>Solicitar a eliminação de dados desnecessários</li>
                <li>Revogar o consentimento a qualquer momento</li>
                <li>Solicitar portabilidade dos dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Cookies
              </h2>
              <p>
                Utilizamos cookies essenciais para o funcionamento do site e
                cookies analíticos para entender como você interage com nossa
                plataforma. Você pode gerenciar suas preferências de cookies
                através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Contato
              </h2>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta
                política, entre em contato conosco:
              </p>
              <ul className="list-none space-y-1 mt-2">
                <li>
                  <strong>E-mail:</strong> contato@agentpro.com.br
                </li>
                <li>
                  <strong>Telefone:</strong> +55 47 9 8859-4022
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
