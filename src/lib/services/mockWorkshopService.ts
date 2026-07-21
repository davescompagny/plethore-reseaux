import { delay } from "./delay";
import { DEMO_WORKSHOPS } from "@/lib/data/demoWorkshops";
import type { Workshop, WorkshopKind } from "@/lib/types";

export async function listWorkshops(): Promise<Workshop[]> {
  await delay(400);
  return DEMO_WORKSHOPS;
}

export async function listWorkshopsByKind(kind: WorkshopKind): Promise<Workshop[]> {
  await delay(400);
  return DEMO_WORKSHOPS.filter((w) => w.kind === kind);
}

export async function getNextWorkshop(): Promise<Workshop | undefined> {
  await delay(300);
  return DEMO_WORKSHOPS.find((w) => w.status === "a_venir");
}
