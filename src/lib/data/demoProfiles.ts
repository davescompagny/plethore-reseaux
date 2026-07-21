import type {
  BarberProfile,
  BeginnerProfile,
  DemoUser,
  ProfileKind,
  SalonProfile,
  StructureProfile,
} from "@/lib/types";

export const DEMO_USERS: Record<ProfileKind, DemoUser> = {
  salon: {
    id: "user-salon-demo",
    firstName: "Karine",
    lastName: "Diallo",
    email: "karine.demo@plethore-reseaux.fr",
    profileKind: "salon",
    createdAt: "2026-05-12T09:00:00.000Z",
  },
  structure: {
    id: "user-structure-demo",
    firstName: "Nadia",
    lastName: "Belkacem",
    email: "nadia.demo@plethore-reseaux.fr",
    profileKind: "structure",
    createdAt: "2026-04-02T09:00:00.000Z",
  },
  barber: {
    id: "user-barber-demo",
    firstName: "Yohan",
    lastName: "Fontaine",
    email: "yohan.demo@plethore-reseaux.fr",
    profileKind: "barber",
    createdAt: "2026-03-18T09:00:00.000Z",
  },
  debutant: {
    id: "user-debutant-demo",
    firstName: "Sami",
    lastName: "Ouedraogo",
    email: "sami.demo@plethore-reseaux.fr",
    profileKind: "debutant",
    createdAt: "2026-06-01T09:00:00.000Z",
  },
};

export const DEMO_SALON_PROFILE: SalonProfile = {
  kind: "salon",
  salonName: "Salon Karine Coiffure",
  city: "Créteil",
  teamSize: 4,
  currentServices: ["Coupe homme classique", "Shampoing", "Coloration", "Brushing"],
  mainNeed: "Structurer une offre barber crédible pour capter la clientèle masculine du quartier.",
  goal: "Ajouter skin fade et taper fade au catalogue d'ici 2 mois.",
  diagnosticProgress: 60,
};

export const DEMO_STRUCTURE_PROFILE: StructureProfile = {
  kind: "structure",
  structureName: "Maison de quartier Belleville",
  structureType: "Association d'insertion socio-professionnelle",
  city: "Paris 20e",
  audience: "Jeunes de 16 à 25 ans en recherche d'emploi ou de réorientation",
  participants: 12,
  workshopWanted: "Atelier image de soi + initiation coupe encadrée par un barber",
};

export const DEMO_BARBER_PROFILE: BarberProfile = {
  kind: "barber",
  status: "Indépendant",
  experienceYears: 5,
  specialties: ["Skin fade", "Dégradés afro", "Taille de barbe", "Design"],
  interventionArea: "Île-de-France",
  availability: "Week-ends et certains jours en semaine",
  portfolioUrl: "",
  profileCompletion: 45,
};

export const DEMO_BEGINNER_PROFILE: BeginnerProfile = {
  kind: "debutant",
  city: "Montreuil",
  level: "Grand débutant",
  goal: "Évaluer une reconversion vers le métier de barber",
  availability: "Soirs et week-ends",
  supportWanted: "Initiation pratique et orientation métier",
  progress: 20,
};

export const DEMO_PROFILES = {
  salon: DEMO_SALON_PROFILE,
  structure: DEMO_STRUCTURE_PROFILE,
  barber: DEMO_BARBER_PROFILE,
  debutant: DEMO_BEGINNER_PROFILE,
};
