import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Success = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "Pro";

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenPricing={() => {}} />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-14 w-14 text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-3">
            Pagamento confirmado!
          </h1>
          <p className="text-muted-foreground mb-8">
            Sua assinatura do plano <strong>{plan}</strong> foi ativada com
            sucesso. Você já pode acessar o CRM AGENTPRO.
          </p>

          <div className="space-y-3">
            <Button
              className="w-full hero-button py-3 gap-2"
              onClick={() =>
                window.open("https://app.agentpro.com.br", "_blank")
              }
            >
              Acessar meu CRM
              <ExternalLink className="h-4 w-4" />
            </Button>

            <Link to="/">
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao site
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Success;
