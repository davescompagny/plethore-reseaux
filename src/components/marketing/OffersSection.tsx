import Link from "next/link";
import { Eyebrow, Tag } from "@/components/ui/Tag";
import { COMPLEMENTARY_OFFERS, OFFERS } from "@/lib/site-content";

type Offer = (typeof OFFERS)[number];

export function OffersSection() {
  return (
    <section id="offres" className="scroll-mt-20 bg-band py-20 text-white sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="mb-9 grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-end lg:gap-11">
          <div>
            <Eyebrow tone="dark">Nos offres</Eyebrow>
            <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-extrabold tracking-tight">
              Des profils de coiffeurs pour renforcer votre équipe.
            </h2>
          </div>
          <p className="text-lg text-white/72">
            Nous vous proposons des profils de coiffeurs en montée de compétences pour renforcer vos équipes :
            alternants, stagiaires, employés — des profils adaptés selon vos besoins. Le diagnostic salon et les
            ateliers de pratique restent disponibles en services complémentaires, jamais imposés.
          </p>
        </div>
        <div className="grid gap-4.5 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
        <h3 className="mt-12 mb-5 text-xl font-bold sm:text-2xl">Services complémentaires</h3>
        <div className="grid gap-4.5 md:grid-cols-2">
          {COMPLEMENTARY_OFFERS.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article
      id={offer.id}
      className="flex scroll-mt-24 flex-col justify-between gap-5 rounded-lg border border-white/12 bg-band-card p-6"
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
        href={offer.href}
        className="focus-ring flex min-h-11 w-full items-center justify-center rounded-lg bg-bronze font-bold text-white hover:bg-bronze-strong"
      >
        {offer.cta}
      </Link>
    </article>
  );
}
