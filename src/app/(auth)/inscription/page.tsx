import type { Metadata } from "next";
import { SignupWizard } from "@/components/forms/SignupWizard";

export const metadata: Metadata = {
  title: "Créer mon espace",
  description: "Créez votre espace de démonstration Pléthore Réseaux en quatre étapes.",
  robots: { index: false, follow: false },
};

export default function InscriptionPage() {
  return <SignupWizard />;
}
