"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, LogOut, Menu, Settings, X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ProfileSwitcher } from "./ProfileSwitcher";
import { NAV_ITEMS } from "./Sidebar";
import { useDemoProfile } from "@/lib/demo/DemoProfileContext";
import { DEMO_USERS } from "@/lib/data/demoProfiles";
import { DEMO_NOTIFICATIONS } from "@/lib/data/demoNotifications";
import { signOut } from "@/lib/services/mockAuthService";
import { cn } from "@/lib/utils";

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { profileKind } = useDemoProfile();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = DEMO_USERS[profileKind];
  const unread = DEMO_NOTIFICATIONS[profileKind].filter((n) => !n.read).length;
  const currentLabel = NAV_ITEMS.find((i) => i.href === pathname)?.label ?? "Tableau de bord";

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  return (
    <>
      <header className="sticky top-0 z-10 flex min-h-16 items-center gap-3 border-b border-line bg-surface px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Ouvrir la navigation"
          className="focus-ring flex size-10 items-center justify-center rounded-lg border border-line lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <nav aria-label="Fil d'Ariane" className="hidden text-sm font-semibold text-muted sm:block">
          Espace démonstration <span aria-hidden="true">/</span> <span className="text-ink">{currentLabel}</span>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/demo/espace/notifications"
            aria-label={`Notifications${unread > 0 ? ` (${unread} non lues)` : ""}`}
            className="focus-ring relative flex size-10 items-center justify-center rounded-lg border border-line hover:bg-green-soft hover:text-green"
          >
            <Bell className="size-4.5" aria-hidden="true" />
            {unread > 0 ? (
              <span className="absolute -right-1 -top-1 grid size-4.5 place-items-center rounded-full bg-bronze text-[10px] font-extrabold text-white">
                {unread}
              </span>
            ) : null}
          </Link>
          <details className="relative">
            <summary className="focus-ring flex cursor-pointer list-none items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 [&::-webkit-details-marker]:hidden">
              <span className="grid size-7 place-items-center rounded-full bg-green text-xs font-extrabold text-white">
                {user.firstName[0]}
                {user.lastName[0]}
              </span>
              <span className="hidden text-sm font-bold sm:inline">{user.firstName}</span>
            </summary>
            <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-line bg-surface p-1.5 shadow-soft">
              <p className="truncate px-3 py-1.5 text-xs text-muted">{user.email}</p>
              <Link href="/demo/espace/parametres" className="focus-ring flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-surface-strong">
                <Settings className="size-4" aria-hidden="true" /> Paramètres
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="focus-ring flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-muted hover:bg-surface-strong hover:text-ink"
              >
                <LogOut className="size-4" aria-hidden="true" /> Se déconnecter
              </button>
            </div>
          </details>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-30 flex flex-col bg-cream lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation du portail">
          <div className="flex min-h-16 items-center justify-between border-b border-line px-5">
            <span className="font-black">Menu</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer le menu"
              className="focus-ring flex size-10 items-center justify-center rounded-lg border border-line"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <div className="mb-5">
              <ProfileSwitcher />
            </div>
            <nav className="grid gap-1" aria-label="Navigation du portail">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "focus-ring flex items-center gap-2.5 rounded-lg px-3 py-3 text-base font-semibold",
                      active ? "bg-green-soft text-green" : "text-ink",
                    )}
                  >
                    <item.icon className="size-5 shrink-0" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="border-t border-line p-5">
            <button
              type="button"
              onClick={handleLogout}
              className="focus-ring flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-line font-bold"
            >
              <LogOut className="size-4.5" /> Se déconnecter
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
