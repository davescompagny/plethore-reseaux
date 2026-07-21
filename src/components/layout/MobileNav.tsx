"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { MAIN_NAV, PROFILES_PANEL, SOLUTIONS_PANEL } from "@/lib/site-content";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-cream" role="dialog" aria-modal="true" aria-label="Menu de navigation">
      <div className="flex min-h-16 items-center justify-between border-b border-line px-5">
        <span className="font-black">Menu</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="focus-ring flex size-10 items-center justify-center rounded-lg border border-line"
        >
          <X className="size-5" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-5 py-6">
        <MobileGroup title="Solutions" items={SOLUTIONS_PANEL} onNavigate={onClose} />
        <MobileGroup title="Pour qui ?" items={PROFILES_PANEL} onNavigate={onClose} />
        <ul className="mt-2 grid gap-1 border-t border-line pt-4">
          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="focus-ring block rounded-lg px-3 py-3 text-lg font-bold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="grid gap-3 border-t border-line p-5">
        <Link
          href="/connexion"
          onClick={onClose}
          className="focus-ring flex min-h-12 items-center justify-center rounded-lg border border-line font-bold"
        >
          Se connecter
        </Link>
        <Link
          href="/inscription"
          onClick={onClose}
          className="focus-ring flex min-h-12 items-center justify-center rounded-lg bg-black font-bold text-white"
        >
          Créer mon espace
        </Link>
      </div>
    </div>
  );
}

function MobileGroup({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: { title: string; href: string }[];
  onNavigate: () => void;
}) {
  return (
    <div className="mb-4">
      <p className="mb-2 px-3 text-xs font-extrabold uppercase tracking-wide text-muted">{title}</p>
      <ul className="grid gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="focus-ring block rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-green-soft"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
