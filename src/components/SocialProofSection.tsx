import logoClinicaOlhos from "@/assets/logo-clinica-olhos.avif";
import logoClinicaViddas from "@/assets/logo-clinica-viddas.png";
import logoAngioclinica from "@/assets/logo-angioclinica.png";
import logoClimma from "@/assets/logo-climma.png";
import logoClinicare from "@/assets/logo-clinicare.png";
import logoRacaoFacil from "@/assets/logo-racaofacil.svg";
import logoUbarana from "@/assets/logo-ubarana.png";

const SocialProofSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-xl font-semibold mb-8">Empresas que confiam no AgentPRO 🚀</p>
          <div className="overflow-hidden">
            <div className="flex animate-scroll gap-12 items-center justify-center opacity-70">
              <img src={logoClinicaOlhos} alt="Clínica Olhos" className="h-12 md:h-16 whitespace-nowrap" />
              <img src={logoClinicaViddas} alt="Clínica Viddas" className="h-12 md:h-16 whitespace-nowrap" />
              <img src={logoAngioclinica} alt="Angioclínica" className="h-12 md:h-16 whitespace-nowrap" />
              <img src={logoClimma} alt="Climma" className="h-12 md:h-16 whitespace-nowrap" />
              <img src={logoClinicare} alt="Clinicare" className="h-12 md:h-16 whitespace-nowrap" />
              <img src={logoRacaoFacil} alt="Ração Fácil" className="h-12 md:h-16 whitespace-nowrap" />
              <img src={logoUbarana} alt="Hospital Ubarana" className="h-12 md:h-16 whitespace-nowrap" />
              <img src={logoClinicaOlhos} alt="Clínica Olhos" className="h-12 md:h-16 whitespace-nowrap" />
              <img src={logoClinicaViddas} alt="Clínica Viddas" className="h-12 md:h-16 whitespace-nowrap" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
