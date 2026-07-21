import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/PageIntro";
import { DiagnosticWizard } from "@/components/forms/DiagnosticWizard";

export const metadata: Metadata = {
  title: "Diagnostic salon",
  description: "Répondez à huit questions courtes pour obtenir une recommandation indicative entre bootcamp découverte et bootcamp intensif.",
};

export default function DiagnosticPage() {
  return (
    <>
      <PageIntro
        eyebrow="Diagnostic salon"
        title="Huit questions pour clarifier votre potentiel barber."
        description="Vos réponses restent dans votre navigateur pour cette démonstration. Comptez environ trois minutes."
      />
      <section className="py-16 sm:py-20">
        <div className="px-5">
          <DiagnosticWizard />
        </div>
      </section>
    </>
  );
}
