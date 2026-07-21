import { delay } from "./delay";
import { DEMO_NOTIFICATIONS } from "@/lib/data/demoNotifications";
import type { DemoNotification, ProfileKind } from "@/lib/types";

export async function listNotifications(kind: ProfileKind): Promise<DemoNotification[]> {
  await delay(350);
  return DEMO_NOTIFICATIONS[kind];
}
