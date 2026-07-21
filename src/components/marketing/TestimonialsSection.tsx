import Link from "next/link";
import { MessageSquareQuote } from "lucide-react";
import { Eyebrow } from "@/components/ui/Tag";

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="mx-auto max-w-[640px] text-center">
          <Eyebrow>
            <span className="mx-auto">Témoignages</span>
          </Eyebrow>
          <h2 className="mb-4 text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold tracking-tight">
            Les premiers retours seront publiés ici.
          </h2>
        </div>
        <div className="mx-auto mt-8 flex max-w-[640px] flex-col items-center gap-4 rounded-lg border border-dashed border-line bg-surface px-6 py-12 text-center">
          <MessageSquareQuote className="size-8 text-muted" aria-hidden="true" />
          <p className="max-w-md text-muted">
            Pléthore Réseaux n&apos;affiche pas de témoignage inventé. Cette section sera complétée avec de vrais
            retours de salons, structures et barbers dès qu&apos;ils seront disponibles.{" "}
            <span className="font-semibold text-ink">[À valider par Pléthore Réseaux]</span>
          </p>
          <Link href="/contact" className="focus-ring font-extrabold text-bronze hover:underline">
            Vous avez testé un atelier ? Partagez votre retour
          </Link>
        </div>
      </div>
    </section>
  );
}
