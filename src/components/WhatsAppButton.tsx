import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-button"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp - oi, quero contratar o CRM. Pode me explicar mais sobre?"
    >
      <MessageCircle className="h-8 w-8" />
    </button>
  );
};

export default WhatsAppButton;