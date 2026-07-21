import { Eyebrow } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { PROBLEM } from "@/lib/site-content";

export function ProblemSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="mb-9 grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-end lg:gap-11">
          <div>
            <Eyebrow>Le problème</Eyebrow>
            <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-extrabold tracking-tight">{PROBLEM.title}</h2>
          </div>
          <p className="text-lg text-muted">{PROBLEM.description}</p>
        </div>
        <div className="grid gap-4.5 md:grid-cols-3">
          {PROBLEM.cards.map((card) => (
            <Card key={card.title}>
              <h3 className="mb-2.5 text-xl font-bold">{card.title}</h3>
              <p>{card.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
