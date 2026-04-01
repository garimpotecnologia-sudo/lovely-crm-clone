import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logoHorizontalDark from "@/assets/logo-horizontal-dark.png";

const LoginRedirect = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onOpenPricing={() => {}} />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-md text-center">
          <img
            src={logoHorizontalDark}
            alt="AgentPRO CRM"
            className="h-14 mx-auto mb-8"
          />

          <h1 className="text-2xl font-bold text-foreground mb-3">
            Acessar CRM AGENTPRO
          </h1>
          <p className="text-muted-foreground mb-8">
            Clique no botão abaixo para acessar a plataforma do CRM AGENTPRO.
          </p>

          <div className="space-y-3">
            <Button
              className="w-full hero-button py-4 gap-2 text-base"
              onClick={() =>
                window.open("https://agentprocrm.com.br", "_blank")
              }
            >
              Entrar no CRM
              <ExternalLink className="h-4 w-4" />
            </Button>

            <Link to="/">
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao site
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            Ainda não tem conta?{" "}
            <Link to="/#pricing" className="text-brand-purple hover:underline">
              Veja nossos planos
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginRedirect;
