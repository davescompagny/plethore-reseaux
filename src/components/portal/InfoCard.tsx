import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <div className="mb-2.5 flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-green-soft text-green">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <h3 className="font-bold text-ink">{title}</h3>
      </div>
      <div className="text-sm text-muted">{children}</div>
    </Card>
  );
}
