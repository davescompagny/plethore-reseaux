"use client";

import { useState } from "react";
import { ClipboardList, Plus } from "lucide-react";
import { useDemoProfile } from "@/lib/demo/DemoProfileContext";
import { useAsync } from "@/hooks/useAsync";
import { listRequests } from "@/lib/services/mockRequestService";
import { listRenforts } from "@/lib/services/mockRenfortService";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { NewRequestModal } from "@/components/portal/NewRequestModal";
import { PortfolioPreviewCard } from "@/components/portal/PortfolioPreviewCard";
import { formatDate } from "@/lib/utils";
import type { WorkshopRequest } from "@/lib/types";

export default function DemandesPage() {
  const { profileKind } = useDemoProfile();
  const { status, data, error } = useAsync(() => listRequests(profileKind), [profileKind]);
  const renfortsState = useAsync(() => listRenforts(), []);
  const renfortById = new Map((renfortsState.data ?? []).map((r) => [r.id, r]));
  const [extra, setExtra] = useState<WorkshopRequest[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const requests = [...extra, ...(data ?? [])];

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-extrabold">Mes demandes</h1>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="size-4" /> Nouvelle demande
        </Button>
      </div>

      {status === "loading" ? (
        <div className="grid gap-3">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : status === "error" ? (
        <p className="text-red-700">{error}</p>
      ) : requests.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="Aucune demande pour le moment"
          description="Vos demandes d'accompagnement ou d'atelier apparaîtront ici."
          action={<Button onClick={() => setModalOpen(true)}>Créer une demande</Button>}
        />
      ) : (
        <div className="grid gap-3">
          {requests.map((req) => {
            const renfort = req.renfortId ? renfortById.get(req.renfortId) : undefined;
            return (
            <Card key={req.id} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className={renfort ? "min-w-0 flex-1" : undefined}>
                <p className="font-bold text-ink">{req.label}</p>
                <p className="text-sm text-muted">{req.detail}</p>
                {renfort ? (
                  <>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {renfort.competences.map((c) => (
                        <span key={c} className="rounded-full bg-surface-strong px-2.5 py-1 text-xs font-semibold text-ink">
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3">
                      <PortfolioPreviewCard />
                    </div>
                  </>
                ) : null}
                <p className="mt-1 text-xs text-muted">Créée le {formatDate(req.createdAt)}</p>
              </div>
              <StatusBadge status={req.status} />
            </Card>
            );
          })}
        </div>
      )}

      <NewRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        profileKind={profileKind}
        defaultLabel="Nouvelle demande"
        onCreated={(req) => setExtra((prev) => [req, ...prev])}
      />
    </div>
  );
}
