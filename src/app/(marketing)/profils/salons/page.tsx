import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageIntro } from "@/components/marketing/PageIntro";
import { Card } from "@/components/ui/Card";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export const metadata: Metadata = {
  title: "Pour les salons de coiffure",
  description: "Salons de coiffure : des profils de coiffeurs en montée de compétences (alternants, stagiaires, employés) pour renforcer votre équipe, avec diagnostic et ateliers en complément.",
};

const STEPS = [
  "Des profils de coiffeurs en montée de compétences : alternants, stagiaires, employés",
  "Un diagnostic court de votre offre homme actuelle (service complémentaire)",
  "Des ateliers de pratique encadrés par un barber professionnel (service complémentaire)",
  "Un suivi terrain : réseaux sociaux, pratique sur modèles",
];

export default function SalonsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Salons de coiffure"
        title="Renforcez votre équipe avec des profils adaptés à vos besoins."
        description="Vous êtes salon de coiffure indépendant et vous voulez capter plus de clientèle masculine. Nous vous proposons des profils de coiffeurs en montée de compétences pour renforcer vos équipes : alternants, stagiaires, employés — des profils adaptés selon vos besoins."
      />
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1160px] gap-10 px-5 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Ce que vous obtenez</h2>
            <ul className="grid gap-3">
              {STEPS.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-ink">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green" aria-hidden="true" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-bronze px-5 font-extrabold text-white hover:bg-bronze-strong">
                Demander un profil
              </Link>
              <Link href="/inscription" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg border border-line px-5 font-extrabold hover:bg-green-soft hover:text-green">
                Créer mon espace salon
              </Link>
            </div>
          </div>
          <Card>
            <h3 className="mb-2 text-lg font-bold">Important</h3>
            <p>
              Les ateliers Pléthore Réseaux ne sont pas des formations diplômantes ou certifiantes. Aucun résultat
              commercial n&apos;est garanti ; l&apos;accompagnement dépend du contexte de votre salon, de votre équipe
              et de l&apos;exécution.
            </p>
          </Card>
        </div>
      </section>
      <FinalCtaSection />
    </>
  );
}
