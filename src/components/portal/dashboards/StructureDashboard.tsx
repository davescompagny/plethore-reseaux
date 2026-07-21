"use client";

import { useState } from "react";
import { CalendarDays, FileText, Users2 } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { getProfile } from "@/lib/services/mockProfileService";
import { listRequests } from "@/lib/services/mockRequestService";
import { listWorkshopsByKind } from "@/lib/services/mockWorkshopService";
import { listDocuments } from "@/lib/services/mockDocumentService";
import { Button } from "@/components/ui/Button";
import { InfoCard } from "@/components/portal/InfoCard";
import { NewRequestModal } from "@/components/portal/NewRequestModal";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils";
import type { StructureProfile, WorkshopRequest } from "@/lib/types";

export function StructureDashboard() {
  const profileState = useAsync(() => getProfile("structure"), []);
  const requestsState = useAsync(() => listRequests("structure"), []);
  const workshopsState = useAsync(() => listWorkshopsByKind("atelier_structure"), []);
  const documentsState = useAsync(() => listDocuments("structure"), []);
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

  const profile = profileState.data as StructureProfile;
  const requests = [...extraRequests, ...(requestsState.data ?? [])];
  const nextIntervention = workshopsState.data?.find((w) => w.status === "a_venir");

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-line bg-surface p-5">
        <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-muted">Structure</p>
        <h1 className="text-xl font-extrabold">{profile.structureName} · {profile.city}</h1>
        <p className="mt-1 text-sm text-muted">{profile.structureType}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard icon={Users2} title="Public accompagné">
          {profile.audience} — {profile.participants} participants
        </InfoCard>
        <InfoCard icon={FileText} title="Demande d'atelier">
          {requests[0]?.label ?? profile.workshopWanted}
        </InfoCard>
        <InfoCard icon={CalendarDays} title="Prochaine intervention">
          {nextIntervention ? `${nextIntervention.title} — ${formatDate(nextIntervention.date)}` : "Aucune intervention programmée"}
        </InfoCard>
      </div>

      <InfoCard icon={FileText} title="Documents">
        {documentsState.data && documentsState.data.length > 0 ? (
          <ul className="grid gap-1.5">
            {documentsState.data.map((doc) => (
              <li key={doc.id}>{doc.title}</li>
            ))}
          </ul>
        ) : (
          "Aucun document pour le moment."
        )}
      </InfoCard>

      <Button className="w-fit" onClick={() => setModalOpen(true)}>
        Proposer un atelier
      </Button>

      <NewRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        profileKind="structure"
        defaultLabel="Proposition d'atelier"
        onCreated={(req) => setExtraRequests((prev) => [req, ...prev])}
      />
    </div>
  );
}
