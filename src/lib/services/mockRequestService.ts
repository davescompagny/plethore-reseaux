import { delay } from "./delay";
import { DEMO_REQUESTS } from "@/lib/data/demoRequests";
import type { ProfileKind, WorkshopRequest } from "@/lib/types";

export async function listRequests(kind: ProfileKind): Promise<WorkshopRequest[]> {
  await delay(400);
  return DEMO_REQUESTS[kind];
}

export async function createRequest(
  kind: ProfileKind,
  label: string,
  detail: string,
): Promise<WorkshopRequest> {
  await delay(600);
  return {
    id: `req-${Date.now()}`,
    profileKind: kind,
    label,
    detail,
    status: "en_attente",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
