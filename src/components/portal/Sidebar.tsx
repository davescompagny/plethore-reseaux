"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileSwitcher } from "./ProfileSwitcher";
import { signOut } from "@/lib/services/mockAuthService";

export const NAV_ITEMS = [
  { href: "/demo/espace", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/demo/espace/profil", label: "Profil", icon: UserCircle },
  { href: "/demo/espace/demandes", label: "Demandes", icon: ClipboardList },
  { href: "/demo/espace/ateliers", label: "Ateliers", icon: CalendarDays },
  { href: "/demo/espace/documents", label: "Documents", icon: FileText },
  { href: "/demo/espace/notifications", label: "Notifications", icon: Bell },
  { href: "/demo/espace/parametres", label: "Paramètres", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-6 border-r border-line bg-surface p-5 lg:flex">
      <Link href="/" className="focus-ring flex items-center gap-2.5 font-black">
        <span className="grid size-8 place-items-center rounded-lg bg-green text-sm font-black text-white">P</span>
        Pléthore Réseaux
      </Link>

      <ProfileSwitcher />

      <nav className="grid gap-1" aria-label="Navigation du portail">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "focus-ring flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors duration-150",
                active ? "bg-green-soft text-green" : "text-ink hover:bg-surface-strong",
              )}
            >
              <item.icon className="size-4.5 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="focus-ring mt-auto flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted hover:bg-surface-strong hover:text-ink"
      >
        <LogOut className="size-4.5 shrink-0" aria-hidden="true" />
        Se déconnecter
      </button>
    </aside>
  );
}
