export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  users: string;
  price: number;
  priceFormatted: string;
  period: string;
  activationFee: number;
  activationFeeFormatted: string;
  channels: string;
  allFeatures: PlanFeature[];
  buttonText: string;
  popular: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    users: "3 usuários",
    price: 487,
    priceFormatted: "R$ 487",
    period: "/mês",
    activationFee: 1090,
    activationFeeFormatted: "R$ 1.090,00",
    channels: "WhatsApp",
    allFeatures: [
      { name: "Central de Atendimento básica", included: true },
      { name: "2 Chatbots de Atendimento", included: true },
      { name: "1 Chatbot de Automação", included: true },
      { name: "10 Etiquetas", included: true },
      { name: "Relatórios básicos", included: true },
      { name: "Funis (Kanban)", included: false },
      { name: "Campos Personalizados", included: false },
      { name: "Disparo em Massa", included: false },
      { name: "Webhook", included: false },
      { name: "API", included: false },
    ],
    buttonText: "Quero este plano",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    users: "5 usuários",
    price: 687,
    priceFormatted: "R$ 687",
    period: "/mês",
    activationFee: 1490,
    activationFeeFormatted: "R$ 1.490,00",
    channels: "WhatsApp + Instagram + Messenger",
    allFeatures: [
      { name: "Central de Atendimento completa", included: true },
      { name: "3 Chatbots de Atendimento", included: true },
      { name: "2 Chatbots de Automação", included: true },
      { name: "Etiquetas ilimitadas", included: true },
      { name: "2 Funis (Kanban)", included: true },
      { name: "Campos Personalizados ilimitados", included: true },
      { name: "Disparo de Campanhas", included: true },
      { name: "Webhook", included: false },
      { name: "API", included: false },
    ],
    buttonText: "Quero este plano",
    popular: true,
  },
  {
    id: "plus",
    name: "Plus+",
    users: "10 usuários",
    price: 987,
    priceFormatted: "R$ 987",
    period: "/mês",
    activationFee: 1990,
    activationFeeFormatted: "R$ 1.990,00",
    channels: "Todos os canais",
    allFeatures: [
      { name: "Central de Atendimento completa", included: true },
      { name: "5 Chatbots de Atendimento", included: true },
      { name: "3 Chatbots de Automação", included: true },
      { name: "5 Funis (Kanban)", included: true },
      { name: "Campos Personalizados ilimitados", included: true },
      { name: "Disparo de Campanhas", included: true },
      { name: "Webhook", included: true },
      { name: "API", included: true },
      { name: "Carteiras de Cliente", included: true },
    ],
    buttonText: "Quero este plano",
    popular: false,
  },
  {
    id: "advanced",
    name: "Advanced",
    users: "20 usuários",
    price: 1487,
    priceFormatted: "R$ 1.487",
    period: "/mês",
    activationFee: 2499,
    activationFeeFormatted: "R$ 2.499,00",
    channels: "Todos os canais",
    allFeatures: [
      { name: "Central de Atendimento completa", included: true },
      { name: "10 Chatbots de Atendimento", included: true },
      { name: "4 Chatbots de Automação", included: true },
      { name: "10 Funis (Kanban)", included: true },
      { name: "Campos Personalizados ilimitados", included: true },
      { name: "Disparo de Campanhas", included: true },
      { name: "Webhook", included: true },
      { name: "API", included: true },
      { name: "Carteiras de Cliente", included: true },
      { name: "Gerente de sucesso dedicado", included: true },
      { name: "Suporte prioritário 24/7", included: true },
    ],
    buttonText: "Quero este plano",
    popular: false,
  },
];
