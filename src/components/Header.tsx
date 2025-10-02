import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import logoHorizontalDark from "@/assets/logo-horizontal-dark.png";
import logoHorizontalLight from "@/assets/logo-horizontal-light.png";

interface HeaderProps {
  onOpenPricing: () => void;
}

const Header = ({ onOpenPricing }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "FAQ", href: "#faq" },
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
              className="h-32 w-auto dark:hidden"
            />
            <img 
              src={logoHorizontalLight} 
              alt="AgentPRO CRM" 
              className="h-32 w-auto hidden dark:block"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" onClick={onOpenPricing}>
              Ver Planos
            </Button>
            <Button variant="default" asChild>
              <a href="https://wa.me/5547984147016?text=Olá! Cliquei no botão 'Falar no WhatsApp' no cabeçalho do site. Quero saber mais sobre o CRM AgentPRO!" target="_blank">
                Falar no WhatsApp
              </a>
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
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" onClick={() => { onOpenPricing(); setIsMenuOpen(false); }}>
                  Ver Planos
                </Button>
                <Button variant="default" asChild>
                  <a href="https://wa.me/5547984147016?text=Olá! Cliquei no botão 'Falar no WhatsApp' no menu mobile. Quero saber mais sobre o CRM AgentPRO!" target="_blank">
                    Falar no WhatsApp
                  </a>
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
interface MobileBottomBarProps {
  onOpenPricing: () => void;
}

export const MobileBottomBar = ({ onOpenPricing }: MobileBottomBarProps) => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5547984147016?text=Olá! Cliquei no botão 'WhatsApp' na barra inferior mobile. Quero saber mais sobre o CRM AgentPRO!", "_blank");
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
          onClick={onOpenPricing}
          className="flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-purple/90 text-white py-3 px-4 rounded-lg transition-colors"
        >
          <span className="text-sm font-medium">Ver Planos</span>
        </button>
      </div>
    </div>
  );
};