import { Button } from "@/components/ui/button";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      company: "TechSolutions Ltda",
      role: "CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "O AgentPRO revolucionou nosso atendimento. Aumentamos nossa conversão em 40% em apenas 2 meses!",
      result: "+40% conversão",
      rating: 5,
    },
    {
      name: "Maria Silva",
      company: "Fashionista Store",
      role: "Diretora Comercial",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "Nunca mais perdemos um cliente! O sistema integrado nos deu total controle sobre todos os atendimentos.",
      result: "0% perda de leads",
      rating: 5,
    },
  ];

  const partners = [
    "TechSolutions",
    "Fashionista Store",
    "AutoMax Veículos",
    "InnovaCorp",
    "Digital Plus",
    "Sales Pro",
  ];

  return (
    <section id="depoimentos" className="py-24 relative overflow-hidden">
      <div className="mesh-bg absolute inset-0 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-purple uppercase tracking-widest mb-3">
              Depoimentos
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-foreground tracking-tight">
              Nossos Clientes{" "}
              <span className="gradient-text">Aprovam</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Resultados reais que empresas como a sua estão alcançando
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto stagger-children">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="feature-card group"
              >
                {/* Quote Icon */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 flex items-center justify-center mb-5">
                  <Quote className="h-5 w-5 text-brand-magenta" />
                </div>

                {/* Rating */}
                <div className="flex space-x-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Testimonial */}
                <p className="text-foreground/80 mb-6 leading-relaxed text-[15px]">
                  "{testimonial.testimonial}"
                </p>

                {/* Result Highlight */}
                <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-3 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-green-700 dark:text-green-300 font-semibold text-sm">
                    {testimonial.result}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-purple/10"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Partners */}
          <div className="text-center mb-16">
            <p className="text-sm text-muted-foreground mb-6 font-medium">
              Empresas que confiam no AgentPRO
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 items-center max-w-3xl mx-auto">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-card/50 rounded-lg py-2.5 px-3 text-center border border-border/30 transition-all duration-300 hover:border-brand-purple/20"
                >
                  <span className="text-xs font-semibold text-muted-foreground">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4 text-foreground">
              Junte-se aos nossos clientes de sucesso
            </h4>
            <Button
              size="lg"
              className="hero-button"
              onClick={() =>
                window.open(
                  "https://wa.me/5547984147016?text=Olá! Cliquei no botão da seção de depoimentos. Quero saber mais sobre o CRM AgentPRO!",
                  "_blank"
                )
              }
            >
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
