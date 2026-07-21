import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageIntro } from "@/components/marketing/PageIntro";
import { Card } from "@/components/ui/Card";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export const metadata: Metadata = {
  title: "Pour les associations et structures",
  description: "Associations et structures sociales : accueillez un atelier image de soi ou d'initiation coupe encadré par un barber.",
};

const STEPS = [
  "Un échange sur le public accompagné et le format souhaité",
  "Une proposition d'atelier adaptée (image de soi, initiation coupe)",
  "Un barber professionnel encadrant l'intervention",
  "Un cadre clair, sans promesse de résultat social ou professionnel garanti",
];

export default function StructuresPage() {
  return (
    <>
      <PageIntro
        eyebrow="Associations et structures"
        title="Accueillez un atelier pensé pour votre public."
        description="Vous accompagnez des jeunes, des personnes en réinsertion ou en recherche d'orientation et souhaitez proposer un atelier concret autour de l'image de soi ou de la coupe."
      />
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1160px] gap-10 px-5 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Comment ça se passe</h2>
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
                Proposer un atelier
              </Link>
              <Link href="/inscription" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg border border-line px-5 font-extrabold hover:bg-green-soft hover:text-green">
                Créer mon espace structure
              </Link>
            </div>
          </div>
          <Card>
            <h3 className="mb-2 text-lg font-bold">Cadre et moyens</h3>
            <p>
              Les actions solidaires (coupes solidaires, ateliers image de soi) sont réalisées selon les moyens
              disponibles et le cadre défini avec chaque structure partenaire. Elles s&apos;inscrivent dans un
              projet business avec une dimension utile, pas dans une promesse de résultat social garanti.
            </p>
          </Card>
        </div>
      </section>
      <FinalCtaSection />
    </>
  );
}
