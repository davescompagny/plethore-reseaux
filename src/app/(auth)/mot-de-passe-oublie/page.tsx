import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  description: "Simulez une demande de réinitialisation de mot de passe.",
  robots: { index: false, follow: false },
};

export default function MotDePasseOubliePage() {
  return <ForgotPasswordForm />;
}
