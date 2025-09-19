import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface CTAButtonProps {
  text?: string;
  message?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
}

const CTAButton = ({ 
  text = "Quero começar agora!",
  message = "oi, quero contratar o CRM. Pode me explicar mais sobre?",
  className = "",
  variant = "default",
  size = "lg"
}: CTAButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5547984147016?text=${encodedMessage}`, "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      className={`hero-button group ${className}`}
      variant={variant}
      size={size}
    >
      <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
      {text}
    </Button>
  );
};

export default CTAButton;