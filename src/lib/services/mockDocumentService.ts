import { delay } from "./delay";
import { DEMO_DOCUMENTS } from "@/lib/data/demoDocuments";
import type { DemoDocument, ProfileKind } from "@/lib/types";

export async function listDocuments(kind: ProfileKind): Promise<DemoDocument[]> {
  await delay(400);
  return DEMO_DOCUMENTS[kind];
}
