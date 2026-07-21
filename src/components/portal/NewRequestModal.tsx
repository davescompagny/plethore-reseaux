"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Field, TextInput, Textarea } from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { createRequest } from "@/lib/services/mockRequestService";
import type { ProfileKind, WorkshopRequest } from "@/lib/types";

export function NewRequestModal({
  open,
  onClose,
  profileKind,
  defaultLabel,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  profileKind: ProfileKind;
  defaultLabel: string;
  onCreated: (request: WorkshopRequest) => void;
}) {
  const { push } = useToast();
  const [label, setLabel] = useState(defaultLabel);
  const [detail, setDetail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim() || !detail.trim()) {
      setError("Merci de compléter l'intitulé et les détails de votre demande.");
      return;
    }
    setError(null);
    setSubmitting(true);
    const created = await createRequest(profileKind, label.trim(), detail.trim());
    setSubmitting(false);
    onCreated(created);
    push("Votre demande de démonstration a bien été enregistrée.");
    setDetail("");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Nouvelle demande">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Field label="Intitulé" htmlFor="request-label">
          <TextInput id="request-label" value={label} onChange={(e) => setLabel(e.target.value)} />
        </Field>
        <Field label="Détails" htmlFor="request-detail" error={error ?? undefined}>
          <Textarea
            id="request-detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Décrivez votre besoin…"
          />
        </Field>
        <Button type="submit" disabled={submitting} className="w-fit">
          {submitting ? "Envoi…" : "Envoyer la demande"}
        </Button>
      </form>
    </Modal>
  );
}
