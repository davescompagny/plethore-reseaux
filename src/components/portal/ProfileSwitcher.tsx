"use client";

import { useDemoProfile } from "@/lib/demo/DemoProfileContext";
import { cn } from "@/lib/utils";
import type { ProfileKind } from "@/lib/types";

const KINDS: { kind: ProfileKind; label: string }[] = [
  { kind: "salon", label: "Salon" },
  { kind: "structure", label: "Structure" },
  { kind: "barber", label: "Barber" },
  { kind: "debutant", label: "Débutant" },
];

/**
 * Sélecteur de démonstration isolé : à supprimer (ou remplacer par la session
 * Supabase réelle) sans toucher au reste du portail lors du branchement backend.
 */
export function ProfileSwitcher() {
  const { profileKind, setProfileKind } = useDemoProfile();

  return (
    <div role="tablist" aria-label="Profil de démonstration" className="grid grid-cols-2 gap-1 rounded-lg bg-surface-strong p-1">
      {KINDS.map((item) => (
        <button
          key={item.kind}
          role="tab"
          type="button"
          aria-selected={profileKind === item.kind}
          onClick={() => setProfileKind(item.kind)}
          className={cn(
            "focus-ring rounded-md py-2 text-xs font-bold transition-colors duration-150",
            profileKind === item.kind ? "bg-green text-white" : "text-muted hover:text-ink",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
