import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Tag } from "@/components/ui/Tag";
import { AUDIENCE_CARDS } from "@/lib/site-content";

export function ProfilesSection() {
  return (
    <section id="profils" className="border-y border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-[720px] px-5 text-center">
        <Eyebrow>
          <span className="mx-auto">Espaces par profil</span>
        </Eyebrow>
        <h2 className="mb-3 text-[clamp(2rem,4vw,3.1rem)] font-extrabold tracking-tight">
          Chaque public entre dans le projet par une porte différente.
        </h2>
        <p className="text-lg text-muted">
          Cette section vous oriente rapidement en fonction de votre profil sans vous perdre.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-[1160px] gap-5 px-5 sm:grid-cols-2">
        {AUDIENCE_CARDS.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="focus-ring group flex min-h-[210px] flex-col justify-between gap-5 rounded-lg border border-line bg-cream p-7 transition-all duration-200 hover:-translate-y-1 hover:border-bronze hover:shadow-soft"
          >
            <div>
              <Tag className="mb-4">{card.tag}</Tag>
              <h3 className="mb-2 text-xl font-bold">{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <span className="inline-flex items-center gap-2 font-extrabold text-bronze">
              Découvrir cet espace
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
