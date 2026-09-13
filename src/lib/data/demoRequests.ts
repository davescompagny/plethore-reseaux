import type { DemoRenfort, ProfileKind, WorkshopRequest } from "@/lib/types";
import { DEMO_RENFORTS } from "@/lib/data/demoRenforts";
import { experienceLabel } from "@/lib/utils";

function renfort(id: string): DemoRenfort {
  const found = DEMO_RENFORTS.find((r) => r.id === id);
  if (!found) throw new Error(`Profil de renfort inconnu : ${id}`);
  return found;
}

function propositionLabel(renfortId: string) {
  const r = renfort(renfortId);
  return `Proposition de profil — ${r.prenom} ${r.initiale}.`;
}

function propositionDetail(renfortId: string) {
  const r = renfort(renfortId);
  return `${experienceLabel(r.experienceAnnees)} · ${r.statut} · ${r.zone}`;
}

export const DEMO_REQUESTS: Record<ProfileKind, WorkshopRequest[]> = {
  salon: [
    {
      id: "r-salon-1",
      profileKind: "salon",
      renfortId: "rf-1",
      label: propositionLabel("rf-1"),
      detail: propositionDetail("rf-1"),
      status: "planifiee",
      createdAt: "2026-07-01T10:00:00.000Z",
      updatedAt: "2026-07-05T14:00:00.000Z",
    },
    {
      id: "r-salon-3",
      profileKind: "salon",
      renfortId: "rf-2",
      label: propositionLabel("rf-2"),
      detail: propositionDetail("rf-2"),
      status: "terminee",
      createdAt: "2026-06-12T10:00:00.000Z",
      updatedAt: "2026-06-12T10:00:00.000Z",
    },
    {
      id: "r-salon-2",
      profileKind: "salon",
      label: "Recommandation diagnostic",
      detail: "Recommandation générée après le diagnostic du 20 juin.",
      status: "terminee",
      createdAt: "2026-06-20T09:00:00.000Z",
      updatedAt: "2026-06-21T09:00:00.000Z",
    },
  ],
  structure: [
    {
      id: "r-structure-1",
      profileKind: "structure",
      label: "Atelier image de soi",
      detail: "Demande d'atelier pour 12 participants, en attente de confirmation de date.",
      status: "en_attente",
      createdAt: "2026-07-12T10:00:00.000Z",
      updatedAt: "2026-07-12T10:00:00.000Z",
    },
  ],
  barber: [
    {
      id: "r-barber-1",
      profileKind: "barber",
      label: "Proposition de mission — Atelier Créteil",
      detail: "Proposition d'intervention comme barber encadrant, en attente de votre réponse.",
      status: "en_attente",
      createdAt: "2026-07-14T10:00:00.000Z",
      updatedAt: "2026-07-14T10:00:00.000Z",
    },
  ],
  debutant: [
    {
      id: "r-debutant-1",
      profileKind: "debutant",
      label: "Demande de participation — Atelier de pratique",
      detail: "Demande envoyée, en attente de place disponible sur une prochaine session.",
      status: "acceptee",
      createdAt: "2026-07-08T10:00:00.000Z",
      updatedAt: "2026-07-09T10:00:00.000Z",
    },
  ],
};
