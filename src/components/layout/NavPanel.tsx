"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useDismiss } from "@/hooks/useDismiss";

export interface NavPanelItem {
  title: string;
  description: string;
  href: string;
}

export function NavPanel({
  label,
  items,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  items: NavPanelItem[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, open, onClose);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="focus-ring rounded-lg px-3 py-2.5 text-[0.94rem] font-bold opacity-80 hover:bg-green-soft hover:text-green hover:opacity-100"
      >
        {label}
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-30 mt-2 grid w-[min(560px,90vw)] -translate-x-1/2 grid-cols-2 gap-1.5 rounded-lg border border-line bg-surface p-3 shadow-soft"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={onClose}
              className="focus-ring group flex flex-col gap-1 rounded-md p-3 hover:bg-green-soft"
            >
              <span className="flex items-center justify-between font-bold text-ink group-hover:text-green">
                {item.title}
                <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
              </span>
              <span className="text-sm text-muted">{item.description}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
