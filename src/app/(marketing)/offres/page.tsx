import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/PageIntro";
import { OffersSection } from "@/components/marketing/OffersSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export const metadata: Metadata = {
  title: "Offres — Profils de coiffeurs, diagnostic et ateliers",
  description:
    "Pléthore Réseaux propose aux salons des profils de coiffeurs en montée de compétences — alternants, stagiaires, employés — avec, en services complémentaires, un diagnostic salon et des ateliers de pratique.",
};

export default function OffresPage() {
  return (
    <>
      <PageIntro
        eyebrow="Nos offres"
        title="Des profils pour renforcer votre équipe, des services pour la faire progresser."
        description="Vous choisissez le profil qui correspond à votre besoin ; le diagnostic et les ateliers de pratique restent disponibles en complément."
      />
      <OffersSection />
      <FinalCtaSection />
    </>
  );
}
