import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full bg-green-soft px-2.5 py-1 text-xs font-extrabold text-green",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "mb-4 inline-flex items-center gap-2.5 text-xs font-extrabold tracking-[0.11em] uppercase before:h-0.5 before:w-8 before:bg-bronze",
        tone === "dark" ? "text-green-tint" : "text-green",
      )}
    >
      {children}
    </span>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full bg-bronze-soft px-2.5 py-1 text-xs font-extrabold text-bronze-strong",
        className,
      )}
    >
      Démonstration
    </span>
  );
}
