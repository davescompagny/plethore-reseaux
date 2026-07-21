"use client";

import { useDemoProfile } from "@/lib/demo/DemoProfileContext";
import { SalonDashboard } from "@/components/portal/dashboards/SalonDashboard";
import { StructureDashboard } from "@/components/portal/dashboards/StructureDashboard";
import { BarberDashboard } from "@/components/portal/dashboards/BarberDashboard";
import { BeginnerDashboard } from "@/components/portal/dashboards/BeginnerDashboard";

export default function EspacePage() {
  const { profileKind } = useDemoProfile();

  if (profileKind === "salon") return <SalonDashboard />;
  if (profileKind === "structure") return <StructureDashboard />;
  if (profileKind === "barber") return <BarberDashboard />;
  return <BeginnerDashboard />;
}
