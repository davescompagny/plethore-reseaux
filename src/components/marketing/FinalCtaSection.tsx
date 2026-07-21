import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="bg-green py-16 text-white sm:py-20">
      <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-6 px-5 text-center">
        <h2 className="max-w-2xl text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold tracking-tight">
          Prêt à savoir si votre salon peut capter plus de demande barber ?
        </h2>
        <p className="max-w-xl text-lg text-white/76">
          Un diagnostic court suffit pour démarrer. Aucun engagement, aucun résultat garanti — juste un plan clair.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/diagnostic"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-bronze px-6 font-extrabold text-white hover:bg-bronze-strong"
          >
            Demander un diagnostic
          </Link>
          <Link
            href="/contact"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 font-extrabold text-black hover:bg-bronze-soft"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
