import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import logoHorizontalDark from "@/assets/logo-horizontal-dark.png";
import logoHorizontalLight from "@/assets/logo-horizontal-light.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Integrações", href: "#integracoes" },
    { label: "Demonstrações", href: "#demonstracoes" },
    { label: "Blog", href: "#blog" },
    { label: "Planos", href: "#planos" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={logoHorizontalDark} 
              alt="AgentPRO CRM" 
              className="h-8 w-auto dark:hidden"
            />
            <img 
              src={logoHorizontalLight} 
              alt="AgentPRO CRM" 
              className="h-8 w-auto hidden dark:block"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <a href="#teste-gratis">Teste Grátis</a>
            </Button>
            <Button variant="default" asChild>
              <a href="#contato">Falar com Especialista</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a 
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" asChild>
                  <a href="#teste-gratis">Teste Grátis</a>
                </Button>
                <Button variant="default" asChild>
                  <a href="#contato">Falar com Especialista</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

// Mobile bottom bar component
export const MobileBottomBar = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank");
  };

  const scrollToPlans = () => {
    document.getElementById('precos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 md:hidden">
      <div className="grid grid-cols-2 gap-1 p-2">
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm font-medium">WhatsApp</span>
        </button>
        <button
          onClick={scrollToPlans}
          className="flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-purple/90 text-white py-3 px-4 rounded-lg transition-colors"
        >
          <span className="text-sm font-medium">Ver Planos</span>
        </button>
      </div>
    </div>
  );
};