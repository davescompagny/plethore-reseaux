"use client";

import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ToastItem {
  id: string;
  title: string;
  tone: "success" | "error";
}

interface ToastContextValue {
  push: (title: string, tone?: ToastItem["tone"]) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((title: string, tone: ToastItem["tone"] = "success") => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setItems((prev) => [...prev, { id, title, tone }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:right-4 sm:left-auto"
      >
        {items.map((item) => (
          <div
            key={item.id}
            role="status"
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-center gap-2.5 rounded-lg border px-4 py-3 text-sm font-semibold shadow-soft",
              item.tone === "success"
                ? "border-green/20 bg-surface text-green"
                : "border-red-300 bg-surface text-red-700",
            )}
          >
            {item.tone === "success" ? (
              <CheckCircle2 className="size-4.5 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="size-4.5 shrink-0" aria-hidden="true" />
            )}
            <span className="flex-1">{item.title}</span>
            <button
              type="button"
              aria-label="Fermer la notification"
              onClick={() => setItems((prev) => prev.filter((t) => t.id !== item.id))}
              className="focus-ring rounded p-0.5 opacity-60 hover:opacity-100"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast doit être utilisé à l'intérieur d'un ToastProvider");
  return ctx;
}
