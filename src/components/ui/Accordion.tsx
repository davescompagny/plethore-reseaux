"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({
  question,
  answer,
  defaultOpen,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group rounded-lg border border-line bg-surface open:border-bronze"
      open={defaultOpen}
    >
      <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-ink [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-bronze transition-transform duration-200 group-open:rotate-180",
          )}
          aria-hidden="true"
        />
      </summary>
      <div className="px-5 pb-5 text-muted">{answer}</div>
    </details>
  );
}
