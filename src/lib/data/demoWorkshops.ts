import type { Workshop } from "@/lib/types";

export const DEMO_WORKSHOPS: Workshop[] = [
  {
    id: "w-1",
    title: "Bootcamp intensif 3 jours — Skin fade & barbe",
    kind: "intensif",
    date: "2026-08-18",
    city: "Créteil",
    seatsTotal: 6,
    seatsTaken: 4,
    status: "a_venir",
  },
  {
    id: "w-2",
    title: "Bootcamp découverte 1 jour",
    kind: "decouverte",
    date: "2026-08-05",
    city: "Paris",
    seatsTotal: 8,
    seatsTaken: 8,
    status: "complet",
  },
  {
    id: "w-3",
    title: "Atelier image de soi — structures partenaires",
    kind: "atelier_structure",
    date: "2026-09-02",
    city: "Paris 20e",
    seatsTotal: 15,
    seatsTaken: 6,
    status: "a_venir",
  },
  {
    id: "w-4",
    title: "Diagnostic collectif — salons indépendants",
    kind: "diagnostic",
    date: "2026-07-10",
    city: "Montreuil",
    seatsTotal: 10,
    seatsTaken: 10,
    status: "termine",
  },
];
