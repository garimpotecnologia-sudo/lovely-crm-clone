import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5547984147016?text=Olá! Cliquei no botão flutuante do WhatsApp. Quero saber mais sobre o CRM AgentPRO!", "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-[blink_3s_infinite] hover:animate-none hover:scale-110"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp - oi, quero contratar o CRM. Pode me explicar mais sobre?"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

export default WhatsAppButton;