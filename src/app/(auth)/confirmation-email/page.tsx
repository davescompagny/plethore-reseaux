import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Confirmation e-mail",
  description: "Étape de confirmation d'e-mail du parcours de démonstration.",
  robots: { index: false, follow: false },
};

export default function ConfirmationEmailPage() {
  return (
    <div className="w-full max-w-md rounded-lg border border-line bg-surface p-6 text-center shadow-soft sm:p-8">
      <MailCheck className="mx-auto mb-3 size-9 text-green" aria-hidden="true" />
      <h1 className="mb-2 text-xl font-extrabold">Confirmation d&apos;e-mail (démonstration)</h1>
      <p className="text-sm text-muted">
        Dans la version connectée à Supabase, un e-mail de confirmation serait envoyé avant l&apos;activation du
        compte. Cette démonstration ne créant aucun compte réel, aucun e-mail n&apos;est envoyé ici.
      </p>
      <Link
        href="/demo/espace"
        className="focus-ring mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-black px-5 font-bold text-white hover:bg-green"
      >
        Continuer vers le portail de démonstration
      </Link>
    </div>
  );
}
