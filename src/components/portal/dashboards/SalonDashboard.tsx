"use client";

import { useState } from "react";
import { CalendarDays, ClipboardList, TrendingUp, Users2 } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { getProfile } from "@/lib/services/mockProfileService";
import { listRequests } from "@/lib/services/mockRequestService";
import { getNextWorkshop } from "@/lib/services/mockWorkshopService";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { InfoCard } from "@/components/portal/InfoCard";
import { NewRequestModal } from "@/components/portal/NewRequestModal";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils";
import type { SalonProfile, WorkshopRequest } from "@/lib/types";

export function SalonDashboard() {
  const profileState = useAsync(() => getProfile("salon"), []);
  const requestsState = useAsync(() => listRequests("salon"), []);
  const workshopState = useAsync(() => getNextWorkshop(), []);
  const [modalOpen, setModalOpen] = useState(false);
  const [extraRequests, setExtraRequests] = useState<WorkshopRequest[]>([]);

  if (profileState.status === "loading") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }
  if (profileState.status === "error" || !profileState.data) {
    return <p className="text-red-700">{profileState.error}</p>;
  }

  const profile = profileState.data as SalonProfile;
  const requests = [...extraRequests, ...(requestsState.data ?? [])];

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-line bg-surface p-5">
        <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-muted">Bonjour</p>
        <h1 className="mb-4 text-xl font-extrabold">{profile.salonName} · {profile.city}</h1>
        <ProgressBar value={profile.diagnosticProgress} label="Progression du diagnostic" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard icon={TrendingUp} title="Recommandation">
          Bootcamp intensif 3 jours — objectif : {profile.goal}
        </InfoCard>
        <InfoCard icon={ClipboardList} title="Demande en cours">
          {requests[0]?.label ?? "Aucune demande en cours"}
        </InfoCard>
        <InfoCard icon={CalendarDays} title="Prochain atelier">
          {workshopState.data ? `${workshopState.data.title} — ${formatDate(workshopState.data.date)}` : "Aucun atelier programmé"}
        </InfoCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <InfoCard icon={Users2} title={`Équipe (${profile.teamSize} personnes)`}>
          <div className="flex flex-wrap gap-1.5">
            {profile.currentServices.map((s) => (
              <span key={s} className="rounded-full bg-surface-strong px-2.5 py-1 text-xs font-semibold text-ink">
                {s}
              </span>
            ))}
          </div>
        </InfoCard>
        <InfoCard icon={ClipboardList} title="Prochaines étapes">
          <ul className="grid gap-1.5">
            <li>Confirmer les places au bootcamp intensif</li>
            <li>{profile.mainNeed}</li>
          </ul>
        </InfoCard>
      </div>

      <Button className="w-fit" onClick={() => setModalOpen(true)}>
        Demander un accompagnement
      </Button>

      <NewRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        profileKind="salon"
        defaultLabel="Accompagnement complémentaire"
        onCreated={(req) => setExtraRequests((prev) => [req, ...prev])}
      />
    </div>
  );
}
