import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header onOpenPricing={() => {}} />
      <div className="flex min-h-[70vh] items-center justify-center bg-background pt-20">
        <div className="text-center px-4">
          <h1 className="text-7xl font-bold gradient-text mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Página não encontrada
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-brand-purple text-white px-6 py-3 font-medium hover:bg-brand-purple/90 transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
