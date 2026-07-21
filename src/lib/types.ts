export type ProfileKind = "salon" | "structure" | "barber" | "debutant";

export interface DemoUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileKind: ProfileKind;
  createdAt: string;
}

export interface SalonProfile {
  kind: "salon";
  salonName: string;
  city: string;
  teamSize: number;
  currentServices: string[];
  mainNeed: string;
  goal: string;
  diagnosticProgress: number;
}

export interface StructureProfile {
  kind: "structure";
  structureName: string;
  structureType: string;
  city: string;
  audience: string;
  participants: number;
  workshopWanted: string;
}

export interface BarberProfile {
  kind: "barber";
  status: string;
  experienceYears: number;
  specialties: string[];
  interventionArea: string;
  availability: string;
  portfolioUrl?: string;
  profileCompletion: number;
}

export interface BeginnerProfile {
  kind: "debutant";
  city: string;
  level: string;
  goal: string;
  availability: string;
  supportWanted: string;
  progress: number;
}

export type AnyProfile =
  | SalonProfile
  | StructureProfile
  | BarberProfile
  | BeginnerProfile;

export type DiagnosticMaturity = "demarrage" | "en_progression" | "avance";

export interface DiagnosticAnswers {
  salonName: string;
  city: string;
  teamSize: number;
  currentServices: string[];
  observedDemand: string;
  difficulties: string[];
  priorityGoals: string[];
  availability: string;
}

export interface DiagnosticResult {
  maturity: DiagnosticMaturity;
  maturityLabel: string;
  strengths: string[];
  improvementAreas: string[];
  recommendation: "diagnostic" | "decouverte" | "intensif";
  recommendationLabel: string;
}

export type RequestStatus = "en_attente" | "acceptee" | "planifiee" | "terminee";

export interface WorkshopRequest {
  id: string;
  profileKind: ProfileKind;
  label: string;
  detail: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

export type WorkshopKind =
  | "diagnostic"
  | "decouverte"
  | "intensif"
  | "atelier_structure";

export interface Workshop {
  id: string;
  title: string;
  kind: WorkshopKind;
  date: string;
  city: string;
  seatsTotal: number;
  seatsTaken: number;
  status: "a_venir" | "complet" | "termine";
}

export interface DemoDocument {
  id: string;
  title: string;
  kind: "recommandation" | "support" | "convention" | "facture_demo";
  createdAt: string;
}

export interface DemoNotification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface AsyncState<T> {
  status: "idle" | "loading" | "success" | "error";
  data?: T;
  error?: string;
}
