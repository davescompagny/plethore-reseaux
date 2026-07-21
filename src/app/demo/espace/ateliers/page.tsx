"use client";

import { CalendarDays, MapPin, Users } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { listWorkshops } from "@/lib/services/mockWorkshopService";
import { Card } from "@/components/ui/Card";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { formatDate } from "@/lib/utils";

export default function AteliersPage() {
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
