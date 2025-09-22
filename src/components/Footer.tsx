import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import logoHorizontalLight from "@/assets/logo-horizontal-light.png";

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <img 
                src={logoHorizontalLight} 
                alt="AgentPRO CRM" 
                className="h-10 w-auto mb-6"
              />
              <p className="text-white/80 mb-6 leading-relaxed">
                Conecte suas equipes com clientes e leads através de uma plataforma 
                integrada ao WhatsApp, Instagram Direct e Facebook Messenger.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-brand-magenta" />
                  <span>+55 47 98414-7016</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-brand-magenta" />
                  <span>contato@agentpro.com.br</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-brand-magenta" />
                  <span>Brasil</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Links Rápidos</h3>
              <div className="space-y-3">
                <a href="#home" className="block text-white/80 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Home
                </a>
                <a href="#funcionalidades" className="block text-white/80 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#funcionalidades')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Funcionalidades
                </a>
                <a href="#depoimentos" className="block text-white/80 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#depoimentos')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Depoimentos
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contato</h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.open("https://wa.me/5547984147016?text=Olá! Cliquei no link do WhatsApp no rodapé do site. Quero saber mais sobre o CRM AgentPRO!", "_blank")}
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  <span>WhatsApp</span>
                </button>
                <a href="#depoimentos" className="block text-white/80 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#depoimentos')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Depoimentos
                </a>
                <a href="#faq" className="block text-white/80 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  FAQ
                </a>
                <a href="#precos" className="block text-white/80 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#precos')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Preços
                </a>
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
    </footer>
  );
};

export default Footer;