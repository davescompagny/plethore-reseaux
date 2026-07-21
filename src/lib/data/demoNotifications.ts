import type { DemoNotification, ProfileKind } from "@/lib/types";

export const DEMO_NOTIFICATIONS: Record<ProfileKind, DemoNotification[]> = {
  salon: [
    {
      id: "n-salon-1",
      title: "Bootcamp confirmé",
      body: "Votre session du 18 août à Créteil est confirmée pour 2 personnes.",
      createdAt: "2026-07-05T14:00:00.000Z",
      read: false,
    },
    {
      id: "n-salon-2",
      title: "Recommandation disponible",
      body: "Votre recommandation de diagnostic est prête dans l'onglet Documents.",
      createdAt: "2026-06-21T09:00:00.000Z",
      read: true,
    },
  ],
  structure: [
    {
      id: "n-structure-1",
      title: "Demande reçue",
      body: "Votre demande d'atelier image de soi a bien été reçue.",
      createdAt: "2026-07-12T10:05:00.000Z",
      read: false,
    },
  ],
  barber: [
    {
      id: "n-barber-1",
      title: "Nouvelle proposition",
      body: "Une proposition d'intervention est en attente de votre réponse.",
      createdAt: "2026-07-14T10:05:00.000Z",
      read: false,
    },
  ],
  debutant: [
    {
      id: "n-debutant-1",
      title: "Demande acceptée",
      body: "Votre demande de participation au bootcamp découverte a été acceptée.",
      createdAt: "2026-07-09T10:00:00.000Z",
      read: false,
    },
  ],
};
