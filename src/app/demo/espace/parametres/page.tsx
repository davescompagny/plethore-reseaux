"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useDemoProfile } from "@/lib/demo/DemoProfileContext";
import { DEMO_USERS } from "@/lib/data/demoProfiles";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/Tag";
import { signOut } from "@/lib/services/mockAuthService";

export default function ParametresPage() {
  const router = useRouter();
  const { profileKind } = useDemoProfile();
  const user = DEMO_USERS[profileKind];

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  return (
    <div className="grid gap-5">
      <h1 className="text-xl font-extrabold">Paramètres</h1>

      <Card>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="font-bold text-ink">Compte de démonstration</h2>
          <DemoBadge />
        </div>
        <p className="text-sm text-muted">
          {user.firstName} {user.lastName} · {user.email}
        </p>
        <p className="mt-2 text-sm text-muted">
          Les informations de cet espace ne sont conservées que le temps de votre session de navigation. Aucune
          donnée n&apos;est stockée sur un serveur à ce stade.
        </p>
      </Card>

      <Card>
        <h2 className="mb-2 font-bold text-ink">Apparence</h2>
        <p className="text-sm text-muted">
          Le mode clair / nuit se règle depuis l&apos;icône en haut de l&apos;écran et s&apos;applique à
          l&apos;ensemble du site.
        </p>
      </Card>

      <Button variant="outline" onClick={handleLogout} className="w-fit">
        <LogOut className="size-4" /> Se déconnecter
      </Button>
    </div>
  );
}
