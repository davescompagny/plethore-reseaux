"use client";

import { useState } from "react";
import { useDemoProfile } from "@/lib/demo/DemoProfileContext";
import { useAsync } from "@/hooks/useAsync";
import { getProfile, updateProfile } from "@/lib/services/mockProfileService";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, TextInput } from "@/components/ui/form";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import type { AnyProfile } from "@/lib/types";

const LABELS: Record<string, string> = {
  salonName: "Nom du salon",
  city: "Ville",
  teamSize: "Taille de l'équipe",
  mainNeed: "Besoin principal",
  goal: "Objectif",
  structureName: "Nom de la structure",
  structureType: "Type de structure",
  audience: "Public accompagné",
  participants: "Participants",
  workshopWanted: "Atelier recherché",
  status: "Statut",
  experienceYears: "Années d'expérience",
  interventionArea: "Zone d'intervention",
  availability: "Disponibilités",
  portfolioUrl: "Portfolio",
  level: "Niveau",
  supportWanted: "Accompagnement recherché",
};

const EDITABLE_FIELDS: Record<string, string[]> = {
  salon: ["salonName", "city", "goal"],
  structure: ["structureName", "city", "workshopWanted"],
  barber: ["interventionArea", "availability", "portfolioUrl"],
  debutant: ["city", "goal", "supportWanted"],
};

export default function ProfilPage() {
  const { profileKind } = useDemoProfile();
  const { push } = useToast();
  const { status, data, error, reload } = useAsync(() => getProfile(profileKind), [profileKind]);
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  if (status === "loading" || !data) {
    return status === "error" ? <p className="text-red-700">{error}</p> : <SkeletonCard />;
  }

  const profile = data as unknown as Record<string, unknown>;
  const entries = Object.entries(profile).filter(([key]) => key !== "kind" && LABELS[key]);
  const editableKeys = EDITABLE_FIELDS[profileKind];

  function openEdit() {
    const initial: Record<string, string> = {};
    editableKeys.forEach((key) => {
      initial[key as string] = String(profile[key as string] ?? "");
    });
    setFormValues(initial);
    setEditing(true);
  }

  async function handleSave() {
    setSaving(true);
    await updateProfile(profileKind, formValues as Partial<AnyProfile>);
    setSaving(false);
    setEditing(false);
    push("Profil mis à jour (démonstration).");
    reload();
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-extrabold">Mon profil</h1>
        <Button onClick={openEdit}>Modifier mon profil</Button>
      </div>

      <Card>
        <dl className="grid gap-3 sm:grid-cols-2">
          {entries.map(([key, value]) => (
            <div key={key}>
              <dt className="text-xs font-extrabold uppercase tracking-wide text-muted">{LABELS[key]}</dt>
              <dd className="font-semibold text-ink">
                {Array.isArray(value) ? value.join(", ") : String(value ?? "—") || "—"}
              </dd>
            </div>
          ))}
        </dl>
      </Card>

      <Modal open={editing} onClose={() => setEditing(false)} title="Modifier mon profil">
        <div className="grid gap-4">
          {editableKeys.map((key) => (
            <Field key={key as string} label={LABELS[key as string]} htmlFor={key as string}>
              <TextInput
                id={key as string}
                value={formValues[key as string] ?? ""}
                onChange={(e) => setFormValues((prev) => ({ ...prev, [key as string]: e.target.value }))}
              />
            </Field>
          ))}
          <Button onClick={handleSave} disabled={saving} className="w-fit">
            {saving ? "Enregistrement…" : "Enregistrer"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
