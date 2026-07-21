import Link from "next/link";
import { Bell, FileText, LayoutDashboard, Users2 } from "lucide-react";
import { Eyebrow } from "@/components/ui/Tag";

const FEATURES = [
  { icon: LayoutDashboard, label: "Un tableau de bord adapté à votre profil" },
  { icon: FileText, label: "Vos documents et recommandations centralisés" },
  { icon: Users2, label: "Le suivi de vos demandes et ateliers" },
  { icon: Bell, label: "Des notifications sur l'avancement de vos dossiers" },
];

export function PortalDemoSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 lg:grid-cols-2 lg:gap-14">
        <div>
          <Eyebrow>Démonstration du portail</Eyebrow>
          <h2 className="mb-4 text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold tracking-tight">
            Un espace pensé pour chaque profil, pas un simple formulaire.
          </h2>
          <p className="mb-6 max-w-lg text-lg text-muted">
            Salons, structures, barbers et débutants n&apos;ont pas les mêmes priorités. Le portail de démonstration
            adapte le contenu, les raccourcis et les prochaines étapes selon votre profil.
          </p>
          <ul className="mb-7 grid gap-3">
            {FEATURES.map((f) => (
              <li key={f.label} className="flex items-center gap-3 text-ink">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-green-soft text-green">
                  <f.icon className="size-4.5" aria-hidden="true" />
                </span>
                <span className="font-semibold">{f.label}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/inscription"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-bronze px-5 font-extrabold text-white hover:bg-bronze-strong"
          >
            Créer mon espace de démonstration
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-line shadow-soft">
          <div className="flex items-center gap-1.5 border-b border-line bg-surface-strong px-4 py-3">
            <span className="size-2.5 rounded-full bg-bronze/60" />
            <span className="size-2.5 rounded-full bg-green/50" />
            <span className="size-2.5 rounded-full bg-muted/40" />
            <span className="ml-3 text-xs font-semibold text-muted">plethore-reseaux.fr/demo/espace</span>
          </div>
          <div className="grid grid-cols-[80px_1fr] bg-surface sm:grid-cols-[120px_1fr]">
            <div className="border-r border-line p-3">
              <div className="mb-2 h-2.5 w-3/4 rounded bg-surface-strong" />
              <div className="grid gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className={`h-2 rounded bg-surface-strong ${i === 0 ? "bg-green-soft" : ""}`} />
                ))}
              </div>
            </div>
            <div className="p-4">
              <div className="mb-3 h-3 w-1/2 rounded bg-surface-strong" />
              <div className="mb-4 grid grid-cols-2 gap-2">
                <div className="h-14 rounded-lg bg-green-soft" />
                <div className="h-14 rounded-lg bg-bronze-soft" />
              </div>
              <div className="grid gap-2">
                <div className="h-8 rounded-lg bg-surface-strong" />
                <div className="h-8 rounded-lg bg-surface-strong" />
                <div className="h-8 w-2/3 rounded-lg bg-surface-strong" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
