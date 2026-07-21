"use client";

import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import { useDemoProfile } from "@/lib/demo/DemoProfileContext";
import { useAsync } from "@/hooks/useAsync";
import { listNotifications } from "@/lib/services/mockNotificationService";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { cn, formatDate } from "@/lib/utils";
import type { DemoNotification } from "@/lib/types";

export default function NotificationsPage() {
  const { profileKind } = useDemoProfile();
  const { status, data, error } = useAsync(() => listNotifications(profileKind), [profileKind]);
  const [items, setItems] = useState<DemoNotification[]>([]);

  useEffect(() => {
    // Copie locale des données chargées pour permettre le marquage "lu" optimiste
    // sans rappeler le service à chaque interaction.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (data) setItems(data);
  }, [data]);

  function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <div className="grid gap-5">
      <h1 className="text-xl font-extrabold">Notifications</h1>

      {status === "loading" ? (
        <div className="grid gap-3">
          <SkeletonCard />
        </div>
      ) : status === "error" ? (
        <p className="text-red-700">{error}</p>
      ) : items.length === 0 ? (
        <EmptyState icon={Bell} title="Aucune notification" description="Vous serez notifié ici de l'avancement de vos demandes." />
      ) : (
        <div className="grid gap-2.5">
          {items.map((n) => (
            <Card
              key={n.id}
              className={cn("flex items-start justify-between gap-3", !n.read && "border-green bg-green-soft/40")}
            >
              <div>
                <p className="font-bold text-ink">{n.title}</p>
                <p className="text-sm text-muted">{n.body}</p>
                <p className="mt-1 text-xs text-muted">{formatDate(n.createdAt)}</p>
              </div>
              {!n.read ? (
                <button
                  type="button"
                  onClick={() => markRead(n.id)}
                  aria-label="Marquer comme lue"
                  className="focus-ring flex size-8 shrink-0 items-center justify-center rounded-lg border border-line hover:bg-surface-strong"
                >
                  <Check className="size-4" />
                </button>
              ) : null}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
