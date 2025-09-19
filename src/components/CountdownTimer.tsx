import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetHours?: number;
}

const CountdownTimer = ({ targetHours = 48 }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Calculate target time (48 hours from now by default)
    const targetTime = new Date().getTime() + (targetHours * 60 * 60 * 1000);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetHours]);

  return (
    <div className="bg-red-500/20 border border-red-400 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Clock className="h-6 w-6 text-red-300" />
        <span className="text-red-300 font-semibold">Oferta por Tempo Limitado!</span>
      </div>
      
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
          Restam apenas:
        </div>
        
        <div className="flex justify-center space-x-4 mb-4">
          <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs text-white/80">horas</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs text-white/80">min</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 min-w-[60px]">
            <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs text-white/80">seg</div>
          </div>
        </div>
        
        <div className="text-red-300 text-sm">
          As vagas para onboarding gratuito acabam rápido, garanta a sua agora!
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;