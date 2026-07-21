"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ProfileKind } from "@/lib/types";

/**
 * Contexte isolé pour le sélecteur de démonstration Salon / Structure / Barber / Débutant.
 * Ne stocke qu'une préférence d'affichage en sessionStorage (jamais de mot de passe
 * ni de donnée sensible). Ce fichier peut être supprimé sans toucher aux composants
 * une fois la vraie authentification Supabase branchée : il suffira de remplacer
 * useDemoProfile() par la session réelle de l'utilisateur.
 */

const STORAGE_KEY_PREFIX = "plethore-demo-profile";

interface DemoProfileContextValue {
  profileKind: ProfileKind;
  setProfileKind: (kind: ProfileKind) => void;
}

const DemoProfileContext = createContext<DemoProfileContextValue | null>(null);

function isProfileKind(value: string | null): value is ProfileKind {
  return value === "salon" || value === "structure" || value === "barber" || value === "debutant";
}

export function DemoProfileProvider({
  children,
  storageKey = "default",
  initialKind = "salon",
}: {
  children: ReactNode;
  storageKey?: string;
  initialKind?: ProfileKind;
}) {
  const [profileKind, setProfileKindState] = useState<ProfileKind>(initialKind);
  const fullKey = `${STORAGE_KEY_PREFIX}:${storageKey}`;

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(fullKey);
      // Lecture client-only après montage : évite un mismatch d'hydratation SSR,
      // la mise à jour d'état ici est donc volontaire malgré la règle set-state-in-effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (isProfileKind(stored)) setProfileKindState(stored);
    } catch {
      // sessionStorage indisponible : on reste sur la valeur par défaut
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setProfileKind(kind: ProfileKind) {
    setProfileKindState(kind);
    try {
      window.sessionStorage.setItem(fullKey, kind);
    } catch {
      // ignore
    }
  }

  return (
    <DemoProfileContext.Provider value={{ profileKind, setProfileKind }}>
      {children}
    </DemoProfileContext.Provider>
  );
}

export function useDemoProfile() {
  const ctx = useContext(DemoProfileContext);
  if (!ctx) {
    throw new Error("useDemoProfile doit être utilisé à l'intérieur d'un DemoProfileProvider");
  }
  return ctx;
}
