import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import logoHorizontalLight from "@/assets/logo-horizontal-light.png";
import logoHorizontalDark from "@/assets/logo-horizontal-dark.png";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  onOpenPricing: () => void;
}

const Header = ({ onOpenPricing }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }, 100);
  };

  const menuItems = [
    { label: "Início", section: "home" },
    { label: "Recursos", section: "features" },
    { label: "Planos", section: "pricing" },
    { label: "FAQ", section: "faq" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img 
                src={logoHorizontalDark} 
                alt="AgentPRO Logo" 
                className="h-16 dark:hidden"
              />
              <img 
                src={logoHorizontalLight} 
                alt="AgentPRO Logo" 
                className="h-16 hidden dark:block"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <button
                      onClick={() => scrollToSection("home")}
                      className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Home
                    </button>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <button
                      onClick={() => scrollToSection("ai-agents")}
                      className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Agentes Inteligentes
                    </button>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <button
                      onClick={() => scrollToSection("pricing")}
                      className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Planos
                    </button>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <button
                      onClick={() => scrollToSection("faq")}
                      className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      FAQ
                    </button>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      to="/sobre"
                      className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Empresa
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                onClick={() => {
                  const message = "Olá, vim do site e gostaria de *testar grátis*!";
                  const encodedMessage = encodeURIComponent(message);
                  window.open(`https://wa.me/5547988504022?text=${encodedMessage}`, "_blank");
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Testar grátis
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={() => {
                    scrollToSection("ai-agents");
                    setIsMenuOpen(false);
                  }}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
                >
                  Agentes Inteligentes
                </button>
                {menuItems.map((item) => (
                  <button
                    key={item.section}
                    onClick={() => {
                      scrollToSection(item.section);
                      setIsMenuOpen(false);
                    }}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
                <Link 
                  to="/sobre"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre nós
                </Link>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button 
                    onClick={() => {
                      const message = "Olá, vim do site e gostaria de *testar grátis*!";
                      const encodedMessage = encodeURIComponent(message);
                      window.open(`https://wa.me/5547988504022?text=${encodedMessage}`, "_blank");
                      setIsMenuOpen(false);
                    }}
                  >
                    Testar grátis
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

// Mobile bottom bar component
interface MobileBottomBarProps {
  onOpenPricing: () => void;
}

export const MobileBottomBar = ({ onOpenPricing }: MobileBottomBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 md:hidden">
      <div className="grid grid-cols-2 gap-1 p-2">
        <button
          onClick={() => {
            const message = "Olá, vim do site e gostaria de *falar no WhatsApp*!";
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/5547988504022?text=${encodedMessage}`, "_blank");
          }}
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm font-medium">WhatsApp</span>
        </button>
        <button
          onClick={() => {
            const message = "Olá, vim do site e gostaria de *ver planos*!";
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/5547988504022?text=${encodedMessage}`, "_blank");
          }}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-lg transition-colors"
        >
          <span className="text-sm font-medium">Ver Planos</span>
        </button>
      </div>
    </div>
  );
};
