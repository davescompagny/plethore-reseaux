import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function experienceLabel(years: number) {
  if (years === 0) return "Débutant";
  return `${years} an${years > 1 ? "s" : ""} d'expérience`;
}
