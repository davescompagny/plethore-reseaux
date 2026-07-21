import { delay } from "./delay";
import { DEMO_USERS } from "@/lib/data/demoProfiles";
import type { DemoUser, ProfileKind } from "@/lib/types";

/**
 * Démonstration uniquement : aucun mot de passe n'est jamais stocké,
 * ni ici ni côté client. Ce service simule la latence d'un vrai backend
 * pour que l'UI (loading / succès / erreur) soit déjà prête pour Supabase.
 */

export interface SignUpInput {
  firstName: string;
  lastName: string;
  email: string;
  profileKind: ProfileKind;
}

export async function signUp(input: SignUpInput): Promise<DemoUser> {
  await delay(700);
  return {
    id: `demo-${Date.now()}`,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    profileKind: input.profileKind,
    createdAt: new Date().toISOString(),
  };
}

export async function signIn(email: string, profileKind: ProfileKind = "salon"): Promise<DemoUser> {
  await delay(600);
  const base = DEMO_USERS[profileKind];
  return { ...base, email: email || base.email };
}

export async function signOut(): Promise<void> {
  await delay(200);
}

export async function requestPasswordReset(email: string): Promise<{ email: string }> {
  await delay(600);
  return { email };
}
