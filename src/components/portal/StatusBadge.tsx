import { cn } from "@/lib/utils";

const REQUEST_LABELS: Record<string, string> = {
  en_attente: "En attente",
  acceptee: "Acceptée",
  planifiee: "Planifiée",
  terminee: "Terminée",
};

const WORKSHOP_LABELS: Record<string, string> = {
  a_venir: "À venir",
  complet: "Complet",
  termine: "Terminé",
};

const TONE: Record<string, string> = {
  en_attente: "bg-bronze-soft text-bronze-strong",
  acceptee: "bg-green-soft text-green",
  planifiee: "bg-green-soft text-green",
  terminee: "bg-surface-strong text-muted",
  a_venir: "bg-green-soft text-green",
  complet: "bg-bronze-soft text-bronze-strong",
  termine: "bg-surface-strong text-muted",
};

export function StatusBadge({ status }: { status: string }) {
  const label = REQUEST_LABELS[status] ?? WORKSHOP_LABELS[status] ?? status;
  return (
    <span className={cn("inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-extrabold", TONE[status])}>
      {label}
    </span>
  );
}
