"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, ClipboardList, Compass, Scissors } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DemoBadge } from "@/components/ui/Tag";
import { DEMO_PROFILES, DEMO_USERS } from "@/lib/data/demoProfiles";
import { DEMO_REQUESTS } from "@/lib/data/demoRequests";
import { DEMO_WORKSHOPS } from "@/lib/data/demoWorkshops";
import type { ProfileKind } from "@/lib/types";

const KINDS: { kind: ProfileKind; label: string }[] = [
  { kind: "salon", label: "Salon" },
  { kind: "structure", label: "Structure" },
  { kind: "barber", label: "Barber" },
  { kind: "debutant", label: "Débutant" },
];

const NEXT_STEPS: Record<ProfileKind, string[]> = {
  salon: ["Confirmer les 2 places au bootcamp du 18 août", "Lister les prestations à ajouter au menu"],
  structure: ["Recevoir la proposition de date d'atelier", "Confirmer le nombre de participants"],
  barber: ["Répondre à la proposition de mission", "Compléter le profil et les disponibilités"],
  debutant: ["Confirmer la place au bootcamp découverte", "Préparer les questions d'orientation métier"],
};

function progressFor(kind: ProfileKind): number | null {
  const profile = DEMO_PROFILES[kind];
  if (profile.kind === "salon") return profile.diagnosticProgress;
  if (profile.kind === "barber") return profile.profileCompletion;
  if (profile.kind === "debutant") return profile.progress;
  return null;
}

export function PortalPreview() {
  const [kind, setKind] = useState<ProfileKind>("salon");
  const user = DEMO_USERS[kind];
  const request = DEMO_REQUESTS[kind][0];
  const nextWorkshop = DEMO_WORKSHOPS.find((w) => w.status === "a_venir");
  const progress = progressFor(kind);

  return (
    <div className="min-w-0 rounded-xl border border-white/15 bg-white/[0.07] p-5 shadow-soft backdrop-blur">
      <div
        role="tablist"
        aria-label="Choisir un profil de démonstration"
        className="mb-4 grid grid-cols-4 gap-1 rounded-lg bg-black/20 p-1"
      >
        {KINDS.map((item) => (
          <button
            key={item.kind}
            role="tab"
            type="button"
            aria-selected={kind === item.kind}
            onClick={() => setKind(item.kind)}
            className={cn(
              "focus-ring rounded-md py-2 text-xs font-bold transition-colors duration-150 sm:text-sm",
              kind === item.kind ? "bg-white text-black" : "text-white/70 hover:text-white",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg bg-[color:var(--color-surface)] p-4 text-ink sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Bonjour</p>
            <p className="font-extrabold">{user.firstName} {user.lastName}</p>
          </div>
          <DemoBadge />
        </div>

        {progress !== null ? (
          <ProgressBar
            value={progress}
            label={kind === "barber" ? "Profil complété" : "Progression du diagnostic"}
            className="mb-4"
          />
        ) : (
          <div className="mb-4 rounded-lg bg-green-soft px-3 py-2.5 text-sm font-semibold text-green">
            12 participants suivis pour la Maison de quartier Belleville
          </div>
        )}

        <div className="grid min-w-0 gap-2.5">
          <PreviewRow icon={ClipboardList} title="Demande en cours" detail={request.label} />
          {nextWorkshop ? (
            <PreviewRow
              icon={CalendarDays}
              title="Prochain atelier"
              detail={`${nextWorkshop.title} — ${formatDate(nextWorkshop.date)}`}
            />
          ) : null}
          <PreviewRow icon={Compass} title="Prochaine étape" detail={NEXT_STEPS[kind][0]} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
          <Link href="/demo/espace" className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-2 text-xs font-bold text-white hover:bg-green">
            <Scissors className="size-3.5" aria-hidden="true" />
            Ouvrir mon espace
          </Link>
          <Link href="/demo/espace/ateliers" className="focus-ring rounded-lg border border-line px-3 py-2 text-xs font-bold hover:bg-green-soft hover:text-green">
            Voir les ateliers
          </Link>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof ClipboardList;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-lg border border-line bg-cream px-3 py-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-bronze" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wide text-muted">{title}</p>
        <p className="truncate text-sm font-semibold text-ink">{detail}</p>
      </div>
    </div>
  );
}
