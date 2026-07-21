import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/PageIntro";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes",
  description: "Réponses aux questions les plus fréquentes sur les ateliers, le diagnostic et le portail de démonstration Pléthore Réseaux.",
};

export default function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="FAQ"
        title="Ce que l'on nous demande le plus souvent."
        description="Si votre question n'est pas ici, contactez-nous directement."
      />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
