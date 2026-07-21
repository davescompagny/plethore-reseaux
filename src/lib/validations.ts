import { z } from "zod";

export const diagnosticSchema = z.object({
  salonName: z.string().trim().min(2, "Indiquez le nom de votre salon."),
  city: z.string().trim().min(2, "Indiquez votre ville."),
  teamSize: z
    .number({ message: "Indiquez la taille de votre équipe." })
    .int()
    .min(1, "L'équipe doit compter au moins 1 personne.")
    .max(50),
  currentServices: z.array(z.string()).min(1, "Sélectionnez au moins une prestation actuelle."),
  observedDemand: z.enum(["faible", "moyenne", "forte"], {
    message: "Indiquez le niveau de demande observé.",
  }),
  difficulties: z.array(z.string()).min(1, "Sélectionnez au moins une difficulté."),
  priorityGoals: z.array(z.string()).min(1, "Sélectionnez au moins un objectif prioritaire."),
  availability: z.enum(["semaine", "week-end", "flexible"], {
    message: "Indiquez votre disponibilité.",
  }),
});

export type DiagnosticFormValues = z.infer<typeof diagnosticSchema>;

export const accountStepSchema = z
  .object({
    firstName: z.string().trim().min(1, "Prénom requis."),
    lastName: z.string().trim().min(1, "Nom requis."),
    email: z.email("E-mail invalide."),
    password: z.string().min(8, "8 caractères minimum."),
    confirmPassword: z.string().min(8, "8 caractères minimum."),
    acceptTerms: z.boolean().refine((v) => v === true, "Acceptez les conditions."),
    acceptPrivacy: z.boolean().refine((v) => v === true, "Acceptez la politique de confidentialité."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export type AccountStepValues = z.infer<typeof accountStepSchema>;

export const profileKindSchema = z.enum(["salon", "structure", "barber", "debutant"]);

export const salonDetailsSchema = z.object({
  salonName: z.string().trim().min(2, "Nom du salon requis."),
  city: z.string().trim().min(2, "Ville requise."),
  teamSize: z.number().int().min(1).max(50),
  currentServices: z.string().trim().min(2, "Décrivez vos prestations actuelles."),
  goal: z.string().trim().min(2, "Indiquez votre objectif."),
});

export type SalonDetailsValues = z.infer<typeof salonDetailsSchema>;

export const structureDetailsSchema = z.object({
  structureName: z.string().trim().min(2, "Nom de la structure requis."),
  structureType: z.string().trim().min(2, "Type de structure requis."),
  city: z.string().trim().min(2, "Ville requise."),
  audience: z.string().trim().min(2, "Public accompagné requis."),
  participants: z.number().int().min(1).max(500),
  workshopWanted: z.string().trim().min(2, "Atelier recherché requis."),
});

export type StructureDetailsValues = z.infer<typeof structureDetailsSchema>;

export const barberDetailsSchema = z.object({
  status: z.string().trim().min(2, "Statut requis."),
  experienceYears: z.number().int().min(0).max(60),
  specialties: z.string().trim().min(2, "Spécialités requises."),
  interventionArea: z.string().trim().min(2, "Zone d'intervention requise."),
  availability: z.string().trim().min(2, "Disponibilités requises."),
  portfolioUrl: z.union([z.url("URL invalide."), z.literal("")]).optional(),
});

export type BarberDetailsValues = z.infer<typeof barberDetailsSchema>;

export const beginnerDetailsSchema = z.object({
  city: z.string().trim().min(2, "Ville requise."),
  level: z.string().trim().min(2, "Niveau requis."),
  goal: z.string().trim().min(2, "Objectif requis."),
  availability: z.string().trim().min(2, "Disponibilités requises."),
  supportWanted: z.string().trim().min(2, "Accompagnement recherché requis."),
});

export type BeginnerDetailsValues = z.infer<typeof beginnerDetailsSchema>;

export const loginSchema = z.object({
  email: z.email("E-mail invalide."),
  password: z.string().min(1, "Mot de passe requis."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom requis."),
  email: z.email("E-mail invalide."),
  salonName: z.string().trim().optional(),
  city: z.string().trim().optional(),
  message: z.string().trim().min(10, "Décrivez votre demande (10 caractères minimum)."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
