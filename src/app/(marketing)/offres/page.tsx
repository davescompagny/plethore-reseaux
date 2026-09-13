import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/PageIntro";
import { OffersSection } from "@/components/marketing/OffersSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export const metadata: Metadata = {
  title: "Offres — Diagnostic, atelier découverte et atelier intensif",
  description:
    "Découvrez les trois offres Pléthore Réseaux : diagnostic salon, atelier découverte et atelier intensif pour structurer votre offre barber.",
};

export default function OffresPage() {
  return (
    <>
      <PageIntro
        eyebrow="Nos offres"
        title="Trois formats, un seul objectif : une offre barber crédible."
        description="Du premier échange à l'atelier intensif, chaque étape est pensée pour rester utile même si vous ne réservez qu'un diagnostic."
      />
      <OffersSection />
      <FinalCtaSection />
    </>
  );
}
