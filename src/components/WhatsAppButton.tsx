import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const message = "Olá, vim do site e gostaria de *falar no WhatsApp*!";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5547988504022?text=${encodedMessage}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp - oi, quero contratar o CRM. Pode me explicar mais sobre?"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

export default WhatsAppButton;