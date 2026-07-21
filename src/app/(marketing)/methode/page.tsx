import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/PageIntro";
import { MethodSection } from "@/components/marketing/MethodSection";
import { DiagnosticTeaserSection } from "@/components/marketing/DiagnosticTeaserSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export const metadata: Metadata = {
  title: "Méthode — Diagnostic, bootcamp terrain, suivi",
  description:
    "La méthode Pléthore Réseaux en trois étapes : diagnostic et recommandation, bootcamp terrain, suivi et amélioration continue.",
};

export default function MethodePage() {
  return (
    <>
      <PageIntro
        eyebrow="Méthode"
        title="Un parcours simple pour éviter de perdre du temps."
        description="Comprendre vite, tester proprement et construire une offre barber crédible dans votre salon."
      />
      <MethodSection />
      <DiagnosticTeaserSection />
      <FinalCtaSection />
    </>
  );
}
