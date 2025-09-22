import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Crown, X } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const handlePlanClick = (planName: string) => {
    const message = `Olá! Cliquei no plano ${planName} no modal de funcionalidades completas. Quero saber mais sobre este plano e como contratar!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5547984147016?text=${encodedMessage}`, "_blank");
  };

  const plans = ["Essential", "Pro", "Plus+", "Advanced"];

  const renderCheckOrValue = (value: any) => {
    if (value === true) return <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />;
    if (value === false || value === "—" || value === null) return <span className="text-muted-foreground text-center">—</span>;
    return <span className="text-center text-sm font-medium">{value}</span>;
  };

  const features = [
    {
      category: "CANAIS",
      items: [
        { name: "Usuários Inclusos", values: ["03", "05", "10", "20"] },
        { name: "Canais", values: ["WhatsApp", "WhatsApp + Instagram + Messenger", "Todos os canais", "Todos os canais"] }
      ]
    },
    {
      category: "ADICIONAIS",
      items: [
        { name: "Usuário Adicional", values: ["R$ 107/mês", "R$ 87/mês", "R$ 57/mês", "R$ 47/mês"] },
        { name: "WhatsApp Adicional", values: ["R$ 89/mês", "R$ 89/mês", "R$ 89/mês", "R$ 89/mês"] },
        { name: "Direct ou Messenger Adicional", values: ["R$ 69/mês", "R$ 69/mês", "R$ 69/mês", "R$ 69/mês"] },
        { name: "Pagamentos", values: ["R$ 99/mês", "R$ 99/mês", "R$ 99/mês", "R$ 99/mês"] }
      ]
    },
    {
      category: "ATIVAÇÃO",
      items: [
        { name: "Taxa de Implantação", values: ["R$ 1.090,00", "R$ 1.490,00", "R$ 1.990,00", "R$ 2.499,00"] },
        { name: "WhatsApp Adicional", values: ["R$ 99", "R$ 99", "R$ 99", "R$ 99"] },
        { name: "Direct ou Messenger Adicional", values: ["R$ 69", "R$ 69", "R$ 69", "R$ 69"] }
      ]
    },
    {
      category: "INBOX",
      items: [
        { name: "Central de Atendimento", values: [true, true, true, true] },
        { name: "Criação de Setores", values: [true, true, true, true] },
        { name: "Fila de Espera", values: [true, true, true, true] },
        { name: "Resultado dos atendimentos", values: [true, true, true, true] },
        { name: "Modelo de Mensagens", values: [true, true, true, true] },
        { name: "Respostas Rápidas", values: [true, true, true, true] },
        { name: "Conclusão em massa de atendimento", values: [true, true, true, true] },
        { name: "Tempo de segurança para envio de Mensagem", values: [true, true, true, true] },
        { name: "Transferir Conversas", values: [true, true, true, true] },
        { name: "Permissões específicas para usuários", values: [true, true, true, true] },
        { name: "Supervisão de Conversas", values: [true, true, true, true] },
        { name: "Distribuição automática de atendimento", values: [false, false, true, true] }
      ]
    },
    {
      category: "GESTÃO DE CONTATOS",
      items: [
        { name: "Etiquetas", values: ["10", "Ilimitado", "Ilimitado", "Ilimitado"] },
        { name: "Campos Personalizados", values: [false, "Ilimitado", "Ilimitado", "Ilimitado"] },
        { name: "Histórico de Conversas", values: [true, true, true, true] },
        { name: "Importação de Contatos", values: [true, true, true, true] },
        { name: "Rastrear Origem dos Leads", values: [true, true, true, true] },
        { name: "Tracking de Navegação do Site", values: [true, true, true, true] },
        { name: "Carteiras de Cliente", values: [false, false, true, true] }
      ]
    },
    {
      category: "GESTÃO DE RESULTADOS",
      items: [
        { name: "Relatórios de Atendimento", values: [true, true, true, true] },
        { name: "Monitoramento em tempo real", values: [true, true, true, true] },
        { name: "Dashboard de Indicadores", values: [true, true, true, true] }
      ]
    },
    {
      category: "CRM",
      items: [
        { name: "Funis (Kanban)", values: [false, "2", "5", "10"] },
        { name: "Etapas Personalizadas", values: [false, true, true, true] },
        { name: "Exportação de Dados", values: [false, true, true, true] },
        { name: "Campos Personalizados", values: [false, true, true, true] },
        { name: "Quantidade de Funis", values: [false, "2", "5", "10"] },
        { name: "Base de Contatos", values: [false, "Ilimitada", "Ilimitada", "Ilimitada"] },
        { name: "Disparo em Massa", values: [false, true, true, true] }
      ]
    },
    {
      category: "AUTOMAÇÃO E INTEGRAÇÕES",
      items: [
        { name: "Chatbot de Atendimento", values: ["2", "3", "5", "10"] },
        { name: "Chatbot de Automação", values: ["1", "2", "2", "4"] },
        { name: "Chatbot com Webhooks", values: [false, false, true, true] },
        { name: "Sequência", values: ["1", "2", "2", "4"] },
        { name: "Botão do WhatsApp", values: [true, true, true, true] },
        { name: "Webhook", values: [false, false, true, true] },
        { name: "API", values: [false, false, true, true] },
        { name: "Componente Make.com", values: [false, false, true, true] }
      ]
    },
    {
      category: "AUTOMAÇÃO ILIMITADAS",
      items: [
        { name: "Chatbots, sequências e integrações ilimitadas", values: ["147/mês", "147/mês", "147/mês", "147/mês"] }
      ]
    },
    {
      category: "DISPARO EM MASSA",
      items: [
        { name: "Disparo de Campanhas", values: [false, true, true, true] },
        { name: "Segmento de Público", values: [false, true, true, true] },
        { name: "Disparo de Chatbot Ativos", values: [false, true, true, true] },
        { name: "Efetividade da Base de Contatos", values: [false, true, true, true] },
        { name: "Relatório", values: [false, true, true, true] }
      ]
    },
    {
      category: "SUPORTE",
      items: [
        { name: "Suporte por WhatsApp", values: [true, true, true, true] },
        { name: "Sucesso do Cliente", values: [true, true, true, true] }
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-2">
            <span className="gradient-text">Tabela Completa</span> de Funcionalidades
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Compare todos os recursos disponíveis em cada plano
          </p>
        </DialogHeader>

        {/* Pricing Headers */}
        <div className="grid grid-cols-5 gap-2 mb-6 bg-muted/50 p-4 rounded-lg">
          <div className="text-sm font-semibold text-muted-foreground">Funcionalidades</div>
          {plans.map((plan, index) => (
            <div key={plan} className="text-center">
              <div className={`font-bold text-lg ${index === 1 ? 'text-brand-magenta' : 'text-foreground'}`}>
                {plan}
                {index === 1 && <Crown className="h-4 w-4 inline ml-1 text-brand-magenta" />}
              </div>
              <div className="text-xs text-muted-foreground">
                {index === 0 && "R$ 487/mês"}
                {index === 1 && "R$ 687/mês"}
                {index === 2 && "R$ 987/mês"}
                {index === 3 && "R$ 1.487/mês"}
              </div>
            </div>
          ))}
        </div>

        {/* Features Table */}
        <div className="space-y-4">
          {features.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border rounded-lg overflow-hidden">
              <div className="bg-brand-purple text-white p-3">
                <h3 className="font-bold text-sm">{section.category}</h3>
              </div>
              <div className="divide-y">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="grid grid-cols-5 gap-2 p-3 hover:bg-muted/50">
                    <div className="text-sm font-medium text-foreground pr-4">
                      {item.name}
                    </div>
                    {item.values.map((value, valueIndex) => (
                      <div key={valueIndex} className="flex justify-center items-center">
                        {renderCheckOrValue(value)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {plans.map((planName, index) => (
            <Button
              key={planName}
              className={`py-3 ${
                index === 1 
                  ? 'hero-button' 
                  : 'bg-brand-purple text-white hover:bg-brand-purple/90'
              }`}
              onClick={() => handlePlanClick(planName)}
            >
              Quero {planName}
            </Button>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-6 bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <h4 className="font-semibold text-foreground mb-2">Precificação de conversas (cobradas pela Meta):</h4>
          <div className="space-y-1">
            <p>• Conversa receptiva: ilimitado</p>
            <p>• Conversa de marketing: US$ 0,0625</p>
            <p>• Conversa de utilidade: US$ 0,0068</p>
            <p className="text-xs italic mt-2">Nota: Valores cobrados pela Meta; podem variar conforme política da Meta. Cada conversa é contabilizada em janelas de 24h.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;