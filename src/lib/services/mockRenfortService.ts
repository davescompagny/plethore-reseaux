import { delay } from "./delay";
import { DEMO_RENFORTS } from "@/lib/data/demoRenforts";
import type { DemoRenfort } from "@/lib/types";

export async function listRenforts(): Promise<DemoRenfort[]> {
  await delay(400);
  return DEMO_RENFORTS;
}
