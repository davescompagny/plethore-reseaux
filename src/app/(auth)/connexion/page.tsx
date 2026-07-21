import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Se connecter",
  description: "Connectez-vous à votre espace de démonstration Pléthore Réseaux.",
  robots: { index: false, follow: false },
};

export default function ConnexionPage() {
  return <LoginForm />;
}
