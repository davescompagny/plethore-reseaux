import type { Metadata } from "next";
import { DemoProfileProvider } from "@/lib/demo/DemoProfileContext";
import { PORTAL_PROFILE_STORAGE_KEY } from "@/lib/demo/constants";
import { PortalShell } from "@/components/portal/PortalShell";

export const metadata: Metadata = {
  title: {
    default: "Espace de démonstration",
    template: "%s — Espace de démonstration",
  },
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProfileProvider storageKey={PORTAL_PROFILE_STORAGE_KEY}>
      <PortalShell>{children}</PortalShell>
    </DemoProfileProvider>
  );
}
