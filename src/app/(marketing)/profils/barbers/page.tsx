import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageIntro } from "@/components/marketing/PageIntro";
import { Card } from "@/components/ui/Card";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export const metadata: Metadata = {
  title: "Pour les barbers et partenaires",
  description: "Barbers professionnels et partenaires terrain : rejoignez le réseau Pléthore Réseaux pour encadrer des ateliers et des bootcamps.",
};

const STEPS = [
  "Un profil avec vos spécialités, votre zone d'intervention et vos disponibilités",
  "Des propositions de mission sur des bootcamps et ateliers",
  "Un cadre d'intervention clair avec les salons et structures partenaires",
  "Aucune promesse de volume d'activité garanti",
];

export default function BarbersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Barbers et partenaires"
        title="Rejoignez un réseau terrain, pas une plateforme anonyme."
        description="Vous êtes barber professionnel, indépendant ou en montée en compétence, et vous souhaitez intervenir sur des bootcamps et ateliers Pléthore Réseaux."
      />
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1160px] gap-10 px-5 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Ce que propose le réseau</h2>
            <ul className="grid gap-3">
              {STEPS.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-ink">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green" aria-hidden="true" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/inscription" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-bronze px-5 font-extrabold text-white hover:bg-bronze-strong">
                Rejoindre le réseau
              </Link>
              <Link href="/contact" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg border border-line px-5 font-extrabold hover:bg-green-soft hover:text-green">
                Nous contacter
              </Link>
            </div>
          </div>
          <Card>
            <h3 className="mb-2 text-lg font-bold">Statut et cadre</h3>
            <p>
              Les interventions se font dans un cadre défini avec chaque partenaire (statut, rémunération,
              périmètre) discuté directement avec vous. Ce site ne constitue pas une offre d&apos;emploi salarié.
            </p>
          </Card>
        </div>
      </section>
      <FinalCtaSection />
    </>
  );
}
