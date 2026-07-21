import { delay } from "./delay";
import { DEMO_PROFILES } from "@/lib/data/demoProfiles";
import type { AnyProfile, ProfileKind } from "@/lib/types";

export async function getProfile(kind: ProfileKind): Promise<AnyProfile> {
  await delay(400);
  return DEMO_PROFILES[kind];
}

export async function updateProfile(
  kind: ProfileKind,
  patch: Partial<AnyProfile>,
): Promise<AnyProfile> {
  await delay(500);
  return { ...DEMO_PROFILES[kind], ...patch } as AnyProfile;
}
