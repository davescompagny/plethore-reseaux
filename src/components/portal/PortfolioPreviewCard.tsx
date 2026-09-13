import type { ReactNode } from "react";
import { Image as ImageIcon } from "lucide-react";
import { InfoCard } from "@/components/portal/InfoCard";

export function PortfolioPreviewCard({ portfolioUrl, action }: { portfolioUrl?: string; action?: ReactNode }) {
  return (
    <InfoCard icon={ImageIcon} title="Aperçu du portfolio">
      {portfolioUrl ? (
        <a href={portfolioUrl} className="font-semibold text-bronze hover:underline" target="_blank" rel="noopener noreferrer">
          {portfolioUrl}
        </a>
      ) : (
        "Aucun portfolio renseigné pour le moment."
      )}
      {action ? <div className="mt-3">{action}</div> : null}
    </InfoCard>
  );
}
