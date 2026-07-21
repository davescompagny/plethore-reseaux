import type { DemoDocument, ProfileKind } from "@/lib/types";

export const DEMO_DOCUMENTS: Record<ProfileKind, DemoDocument[]> = {
  salon: [
    {
      id: "doc-salon-1",
      title: "Recommandation diagnostic — Salon Karine Coiffure",
      kind: "recommandation",
      createdAt: "2026-06-21T09:00:00.000Z",
    },
    {
      id: "doc-salon-2",
      title: "Support bootcamp intensif — techniques prioritaires",
      kind: "support",
      createdAt: "2026-07-05T09:00:00.000Z",
    },
  ],
  structure: [
    {
      id: "doc-structure-1",
      title: "Convention d'intervention — Maison de quartier Belleville",
      kind: "convention",
      createdAt: "2026-06-10T09:00:00.000Z",
    },
  ],
  barber: [
    {
      id: "doc-barber-1",
      title: "Charte d'intervention barber partenaire",
      kind: "convention",
      createdAt: "2026-03-20T09:00:00.000Z",
    },
  ],
  debutant: [
    {
      id: "doc-debutant-1",
      title: "Guide d'orientation métier — démonstration",
      kind: "support",
      createdAt: "2026-06-02T09:00:00.000Z",
    },
  ],
};
