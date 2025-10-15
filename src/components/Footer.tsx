import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import logoHorizontalLight from "@/assets/logo-horizontal-light.png";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }, 100);
  };
  return <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <img src={logoHorizontalLight} alt="AgentPRO CRM" className="h-10 w-auto mb-6" />
              <p className="text-white/80 mb-6 leading-relaxed">
                Automatize seu atendimento com CRM inteligente integrado ao WhatsApp. 
                Gerencie clientes, venda mais e economize tempo com automação.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+55 47 9 8859- 4022</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>contato@agentpro.com.br</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Brasil</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Produtos</h3>
              <div className="space-y-3">
                
                <button onClick={() => scrollToSection("features")} className="block text-white/80 hover:text-white transition-colors text-left">
                  CRM Inteligente
                </button>
                <button onClick={() => scrollToSection("features")} className="block text-white/80 hover:text-white transition-colors text-left">
                  WhatsApp Multicanal
                </button>
                <button onClick={() => scrollToSection("features")} className="block text-white/80 hover:text-white transition-colors text-left">
                  Automação
                </button>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Empresa</h3>
              <div className="space-y-3">
                <Link to="/sobre" className="block text-white/80 hover:text-white transition-colors">
                  Sobre nós
                </Link>
                <button onClick={() => scrollToSection("pricing")} className="block text-white/80 hover:text-white transition-colors text-left">
                  Planos e Preços
                </button>
                <button onClick={() => scrollToSection("faq")} className="block text-white/80 hover:text-white transition-colors text-left">
                  FAQ
                </button>
                
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-white/60">
              © 2024 AgentPRO CRM. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;