"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MAIN_NAV, PROFILES_PANEL, SOLUTIONS_PANEL } from "@/lib/site-content";
import { ThemeToggle } from "./ThemeToggle";
import { NavPanel } from "./NavPanel";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const [openPanel, setOpenPanel] = useState<"solutions" | "profils" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-[color:var(--header-bg)] backdrop-blur-md">
        <div className="mx-auto flex min-h-[74px] max-w-[1160px] items-center gap-2 px-5">
          <Link href="/" aria-label="Accueil Pléthore Réseaux" className="focus-ring mr-auto flex items-center gap-2.5 font-black">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-green font-black text-white">P</span>
            <span className="hidden sm:inline">Pléthore Réseaux</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            <NavPanel
              label="Solutions"
              items={SOLUTIONS_PANEL}
              open={openPanel === "solutions"}
              onToggle={() => setOpenPanel(openPanel === "solutions" ? null : "solutions")}
              onClose={() => setOpenPanel(null)}
            />
            <NavPanel
              label="Pour qui ?"
              items={PROFILES_PANEL}
              open={openPanel === "profils"}
              onToggle={() => setOpenPanel(openPanel === "profils" ? null : "profils")}
              onClose={() => setOpenPanel(null)}
            />
            {MAIN_NAV.filter((i) => i.href !== "/diagnostic" && i.href !== "/offres").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-lg px-3 py-2.5 text-[0.94rem] font-bold opacity-80 hover:bg-green-soft hover:text-green hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link
              href="/connexion"
              className="focus-ring whitespace-nowrap rounded-lg border border-line px-4 py-2.5 text-sm font-bold hover:bg-green-soft hover:text-green"
            >
              Se connecter
            </Link>
            <Link
              href="/inscription"
              className="focus-ring whitespace-nowrap rounded-lg bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-green"
            >
              Créer mon espace
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="focus-ring flex size-10 items-center justify-center rounded-lg border border-line"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
