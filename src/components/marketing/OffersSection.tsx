import Link from "next/link";
import { Eyebrow, Tag } from "@/components/ui/Tag";
import { OFFERS } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function OffersSection() {
  return (
    <section id="offres" className="scroll-mt-20 bg-band py-20 text-white sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="mb-9 grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-end lg:gap-11">
          <div>
            <Eyebrow tone="dark">Nos offres</Eyebrow>
            <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-extrabold tracking-tight">
              Des ateliers pratiques, pas un cursus certifiant.
            </h2>
          </div>
          <p className="text-lg text-white/72">
            Le parcours reste volontairement simple : on clarifie le besoin, on teste une journée sur le terrain,
            puis on passe au bootcamp intensif si le salon veut structurer une vraie offre barber.
          </p>
        </div>
        <div className="grid gap-4.5 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <article
              key={offer.id}
              id={offer.id}
              className={cn(
                "flex scroll-mt-24 flex-col justify-between gap-5 rounded-lg border p-6",
                offer.id === "intensif" ? "border-bronze bg-band-card" : "border-white/12 bg-band-card",
              )}
            >
              <div>
                <Tag className="mb-4 bg-bronze/20 text-[#e0bd8d]">{offer.tag}</Tag>
                <h3 className="mb-2.5 text-xl font-bold">{offer.title}</h3>
                <p className="text-white/72">{offer.description}</p>
                <ul className="mt-4 grid gap-2.5 text-sm text-white/80">
                  {offer.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-0.5 font-bold text-bronze" aria-hidden="true">
                        ✓
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className="focus-ring flex min-h-11 w-full items-center justify-center rounded-lg bg-bronze font-bold text-white hover:bg-bronze-strong"
              >
                {offer.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
