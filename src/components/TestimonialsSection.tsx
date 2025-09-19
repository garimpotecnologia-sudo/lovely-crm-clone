import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      company: "TechSolutions Ltda",
      role: "CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      testimonial: "O AgentPRO revolucionou nosso atendimento. Aumentamos nossa conversão em 40% em apenas 2 meses!",
      result: "+40% conversão",
      rating: 5
    },
    {
      name: "Maria Silva",
      company: "Fashionista Store",
      role: "Diretora Comercial",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      testimonial: "Nunca mais perdemos um cliente! O sistema integrado nos deu total controle sobre todos os atendimentos.",
      result: "0% perda de leads",
      rating: 5
    }
  ];

  const partners = [
    "TechSolutions",
    "Fashionista Store", 
    "AutoMax Veículos",
    "InnovaCorp",
    "DigitalPlus",
    "MegaStore"
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Nossos Clientes <span className="gradient-text">Aprovam</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Veja os resultados reais que empresas como a sua estão alcançando
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="feature-card text-center">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-brand-magenta mx-auto mb-6" />
                
                {/* Rating */}
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial */}
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.testimonial}"
                </p>

                {/* Result Highlight */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-6">
                  <span className="text-green-700 dark:text-green-300 font-semibold">
                    Resultado: {testimonial.result}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm font-medium text-brand-purple">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Partners Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8 text-foreground">
              Empresas que confiam no AgentPRO
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-4 text-center border border-border/50"
                >
                  <span className="text-sm font-semibold text-muted-foreground">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h4 className="text-2xl font-bold mb-4 text-foreground">
              Junte-se aos nossos clientes de sucesso!
            </h4>
            <Button
              size="lg"
              className="hero-button"
              onClick={() => window.open("https://wa.me/5547984147016?text=oi%2C%20quero%20contratar%20o%20CRM.%20Pode%20me%20explicar%20mais%20sobre%3F", "_blank")}
            >
              Teste Grátis 14 Dias
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;