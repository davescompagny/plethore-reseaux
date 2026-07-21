import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/PageIntro";
import { OffersSection } from "@/components/marketing/OffersSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export const metadata: Metadata = {
  title: "Offres — Diagnostic, bootcamp découverte et bootcamp intensif",
  description:
    "Découvrez les trois offres Pléthore Réseaux : diagnostic salon, bootcamp découverte 1 jour et bootcamp intensif 3 jours pour structurer votre offre barber.",
};

export default function OffresPage() {
  return (
    <>
      <PageIntro
        eyebrow="Nos offres"
        title="Trois formats, un seul objectif : une offre barber crédible."
        description="Du premier échange au bootcamp intensif, chaque étape est pensée pour rester utile même si vous ne réservez qu'un diagnostic."
      />
      <OffersSection />
      <FinalCtaSection />
    </>
  );
}
