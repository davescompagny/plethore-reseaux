import Link from "next/link";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { Eyebrow } from "@/components/ui/Tag";

export function DiagnosticTeaserSection() {
  return (
    <section className="border-y border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 lg:grid-cols-2 lg:gap-14">
        <div>
          <Eyebrow>Diagnostic et recommandation</Eyebrow>
          <h2 className="mb-4 text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold tracking-tight">
            Un diagnostic court pour savoir précisément où vous en êtes.
          </h2>
          <p className="mb-6 max-w-lg text-lg text-muted">
            Huit questions sur votre salon, votre équipe et votre clientèle suffisent pour obtenir une recommandation
            indicative : bootcamp découverte ou bootcamp intensif. La recommandation finale est toujours confirmée
            par Pléthore Réseaux.
          </p>
          <Link
            href="/diagnostic"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-black px-5 font-extrabold text-white hover:bg-green"
          >
            Démarrer le diagnostic
          </Link>
        </div>
        <div className="rounded-lg border border-line bg-cream p-6 shadow-soft">
          <p className="mb-4 text-xs font-extrabold uppercase tracking-wide text-muted">Exemple de résultat</p>
          <div className="mb-4 flex items-center gap-2.5 rounded-lg bg-green-soft px-4 py-3 text-green">
            <TrendingUp className="size-5 shrink-0" aria-hidden="true" />
            <span className="font-bold">Salon en progression sur le potentiel barber</span>
          </div>
          <ul className="grid gap-2.5 text-sm text-ink">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-bronze" aria-hidden="true" />
              Vous proposez déjà au moins une prestation barber.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-bronze" aria-hidden="true" />
              Une demande client déjà observable sur les prestations hommes.
            </li>
          </ul>
          <p className="mt-4 rounded-lg bg-surface-strong px-4 py-3 text-sm font-bold text-ink">
            Recommandation indicative : Bootcamp intensif 3 jours
          </p>
        </div>
      </div>
    </section>
  );
}
