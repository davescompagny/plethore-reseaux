import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageIntro } from "@/components/marketing/PageIntro";
import { Card } from "@/components/ui/Card";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export const metadata: Metadata = {
  title: "Pour les débutants et particuliers",
  description: "Débutants et particuliers non professionnels : découvrez les ateliers Pléthore Réseaux et évaluez une orientation vers le métier de barber.",
};

const STEPS = [
  "Un atelier découverte pour tester votre intérêt et vos gestes de base",
  "Un cadre pédagogique clair, sans certification à la clé",
  "Des conseils d'orientation métier honnêtes",
  "Aucune promesse d'embauche ou de reconversion garantie",
];

export default function DebutantsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Débutants et particuliers"
        title="Testez le métier avant de vous engager."
        description="Vous débutez, vous n'êtes pas professionnel de la coiffure et vous voulez découvrir le métier de barber ou simplement participer à un atelier."
      />
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1160px] gap-10 px-5 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Ce que vous pouvez attendre</h2>
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
                Participer à un atelier
              </Link>
              <Link href="/contact" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg border border-line px-5 font-extrabold hover:bg-green-soft hover:text-green">
                Poser une question
              </Link>
            </div>
          </div>
          <Card>
            <h3 className="mb-2 text-lg font-bold">Honnêteté avant tout</h3>
            <p>
              Les ateliers Pléthore Réseaux ne sont pas des formations diplômantes. Ils permettent de découvrir des
              gestes de base et d&apos;échanger sur le métier, pas d&apos;obtenir une certification ou un emploi
              garanti.
            </p>
          </Card>
        </div>
      </section>
      <FinalCtaSection />
    </>
  );
}
