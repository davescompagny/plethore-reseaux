"use client";

import { useState } from "react";
import { Compass, GraduationCap, Lightbulb } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { getProfile } from "@/lib/services/mockProfileService";
import { listWorkshops } from "@/lib/services/mockWorkshopService";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { InfoCard } from "@/components/portal/InfoCard";
import { NewRequestModal } from "@/components/portal/NewRequestModal";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils";
import type { BeginnerProfile, WorkshopRequest } from "@/lib/types";

export function BeginnerDashboard() {
  const profileState = useAsync(() => getProfile("debutant"), []);
  const workshopsState = useAsync(() => listWorkshops(), []);
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

  const profile = profileState.data as BeginnerProfile;
  const accessible = (workshopsState.data ?? []).filter((w) => w.kind === "decouverte" && w.status === "a_venir");

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-line bg-surface p-5">
        <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-muted">{profile.city}</p>
        <h1 className="mb-4 text-xl font-extrabold">Niveau : {profile.level}</h1>
        <ProgressBar value={profile.progress} label="Votre progression" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard icon={Compass} title="Objectif">
          {profile.goal}
        </InfoCard>
        <InfoCard icon={GraduationCap} title="Ateliers accessibles">
          {accessible.length > 0 ? (
            <ul className="grid gap-1.5">
              {accessible.map((w) => (
                <li key={w.id}>{w.title} — {formatDate(w.date)}</li>
              ))}
            </ul>
          ) : (
            "Aucun bootcamp découverte disponible pour l'instant."
          )}
        </InfoCard>
        <InfoCard icon={Lightbulb} title="Conseil">
          {profile.supportWanted}
        </InfoCard>
      </div>

      <Button className="w-fit" onClick={() => setModalOpen(true)}>
        Demander à participer
      </Button>

      <NewRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        profileKind="debutant"
        defaultLabel="Demande de participation"
        onCreated={(req) => setExtraRequests((prev) => [req, ...prev])}
      />
      {extraRequests.length > 0 ? (
        <p className="text-sm text-muted">Dernière demande envoyée : {extraRequests[0].label}</p>
      ) : null}
    </div>
  );
}
