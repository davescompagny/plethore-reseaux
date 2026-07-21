import { Eyebrow } from "@/components/ui/Tag";
import { METHOD_STEPS } from "@/lib/site-content";

export function MethodSection() {
  return (
    <section id="methode" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="mb-9 grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-end lg:gap-11">
          <div>
            <Eyebrow>Méthode</Eyebrow>
            <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-extrabold tracking-tight">
              Un parcours simple pour éviter de perdre du temps.
            </h2>
          </div>
          <p className="text-lg text-muted">
            L&apos;objectif est de comprendre vite, tester proprement et construire une offre barber crédible dans
            votre salon.
          </p>
        </div>
        <ol className="grid gap-3.5">
          {METHOD_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[42px_1fr] items-start gap-4 rounded-lg border border-line bg-surface p-5 sm:grid-cols-[56px_1fr]"
            >
              <span className="grid size-10.5 place-items-center rounded-lg bg-green font-extrabold text-white sm:size-14">
                {i + 1}
              </span>
              <div>
                <h3 className="mb-1.5 text-lg font-bold sm:text-xl">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
