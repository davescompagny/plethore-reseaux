import { Eyebrow } from "@/components/ui/Tag";
import { IMPACT } from "@/lib/site-content";

export function ImpactSection() {
  return (
    <section id="impact" className="scroll-mt-20 bg-band py-20 text-white sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="mb-9 grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-end lg:gap-11">
          <div>
            <Eyebrow tone="dark">{IMPACT.eyebrow}</Eyebrow>
            <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-extrabold tracking-tight">{IMPACT.title}</h2>
          </div>
          <p className="text-lg text-white/72">{IMPACT.description}</p>
        </div>
        <div className="grid gap-4.5 md:grid-cols-3">
          {IMPACT.cards.map((card) => (
            <article key={card.title} className="rounded-lg border border-white/12 bg-band-card p-6">
              <h3 className="mb-2.5 text-xl font-bold">{card.title}</h3>
              <p className="text-white/72">{card.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-r-lg border-l-4 border-bronze bg-bronze/[0.16] px-4 py-3.5 text-sm text-[#e0c49b]">
          {IMPACT.legalNote}
        </div>
      </div>
    </section>
  );
}
