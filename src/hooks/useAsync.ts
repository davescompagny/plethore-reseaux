"use client";

import { useEffect, useRef, useState } from "react";
import type { AsyncState } from "@/lib/types";

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): AsyncState<T> & { reload: () => void } {
  const [state, setState] = useState<AsyncState<T>>({ status: "loading" });
  const [reloadKey, setReloadKey] = useState(0);
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  });

  useEffect(() => {
    let cancelled = false;
    // Data-fetching effect: the loading state must be reset here because the
    // fetch itself only starts once the effect runs (deps changed or reload()).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ status: "loading" });
    fnRef
      .current()
      .then((data) => {
        if (!cancelled) setState({ status: "success", data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", error: "Une erreur est survenue. Réessayez." });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey]);

  return { ...state, reload: () => setReloadKey((k) => k + 1) };
}
