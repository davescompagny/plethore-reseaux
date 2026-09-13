"use client";

import { useEffect } from "react";
import { Briefcase, CalendarDays, MapPin, Sparkles, Users } from "lucide-react";
import { useDemoProfile } from "@/lib/demo/DemoProfileContext";
import { useAsync } from "@/hooks/useAsync";
import { listWorkshops } from "@/lib/services/mockWorkshopService";
import { listRenforts } from "@/lib/services/mockRenfortService";
import { Card } from "@/components/ui/Card";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatDate } from "@/lib/utils";
import type { DemoRenfort } from "@/lib/types";

export default function AteliersPage() {
  const { profileKind } = useDemoProfile();
  if (profileKind === "salon") return <RenfortsView />;
  return <AteliersView />;
}

function AteliersView() {
  const { status, data, error } = useAsync(() => listWorkshops(), []);

  return (
    <div className="grid gap-5">
      <h1 className="text-xl font-extrabold">Ateliers</h1>

      {status === "loading" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : status === "error" ? (
        <p className="text-red-700">{error}</p>
      ) : !data || data.length === 0 ? (
        <EmptyState icon={CalendarDays} title="Aucun atelier" description="Aucun atelier n'est programmé pour le moment." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {data.map((w) => (
            <Card key={w.id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold text-ink">{w.title}</h2>
                <StatusBadge status={w.status} />
              </div>
              <div className="grid gap-1.5 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4 shrink-0" aria-hidden="true" /> {formatDate(w.date)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0" aria-hidden="true" /> {w.city}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="size-4 shrink-0" aria-hidden="true" /> {w.seatsTaken} / {w.seatsTotal} places
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function RenfortsView() {
  const { status, data, error } = useAsync(() => listRenforts(), []);

  useEffect(() => {
    const wanted = "Renforts — Espace de démonstration — Pléthore Réseaux";
    const previous = document.title;
    const apply = () => {
      if (document.title !== wanted) document.title = wanted;
    };
    apply();
    // Next.js réapplique le titre des metadata après l'hydratation : on le réécrit dès qu'il change.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      document.title = previous;
    };
  }, []);

  return (
    <div className="grid gap-5">
      <h1 className="text-xl font-extrabold">Renforts</h1>

      {status === "loading" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : status === "error" ? (
        <p className="text-red-700">{error}</p>
      ) : !data || data.length === 0 ? (
        <EmptyState icon={Users} title="Aucun renfort" description="Aucun profil n'est disponible pour le moment." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {data.map((r) => (
            <RenfortCard key={r.id} renfort={r} />
          ))}
        </div>
      )}
    </div>
  );
}

function experienceLabel(years: number) {
  if (years === 0) return "Débutant";
  return `${years} an${years > 1 ? "s" : ""} d'expérience`;
}

function RenfortCard({ renfort }: { renfort: DemoRenfort }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-bold text-ink">
          {renfort.prenom} {renfort.initiale}.
        </h2>
        <StatusBadge status={renfort.statutCarte} />
      </div>
      <div className="grid gap-1.5 text-sm text-muted">
        <span className="flex items-center gap-2">
          <Briefcase className="size-4 shrink-0" aria-hidden="true" /> {renfort.statut} · {experienceLabel(renfort.experienceAnnees)}
        </span>
      </div>
      <div>
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-green-soft text-green">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <h3 className="font-bold text-ink">Compétences</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {renfort.competences.map((c) => (
            <span key={c} className="rounded-full bg-surface-strong px-2.5 py-1 text-xs font-semibold text-ink">
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-green-soft text-green">
          <MapPin className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-bold text-ink">Zone d&apos;intervention</h3>
          <p className="text-sm text-muted">{renfort.zone}</p>
        </div>
      </div>
      <ProgressBar value={renfort.niveauGlobal} label="Niveau global" />
    </Card>
  );
}
