"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type UrlContextType = {
  /** Raw value from the search bar (trimmed). */
  url: string;
  /** Update the URL in context. Passing an empty/whitespace string clears it. */
  setUrl: (url: string) => void;
};

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export function UrlProvider({ children }: { children: React.ReactNode }) {
  // IMPORTANT: start EMPTY in all environments so cards default to demo/sample mode
  const [url, setUrlState] = useState<string>("");

  // Normalize + memoize setter
  const setUrl = useCallback((next: string) => {
    setUrlState((next ?? "").trim());
  }, []);

  const value = useMemo<UrlContextType>(() => ({ url, setUrl }), [url, setUrl]);

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
}

export function useUrlContext(): UrlContextType {
  const ctx = useContext(UrlContext);
  if (!ctx) throw new Error("useUrlContext must be used within a UrlProvider");
  return ctx;
}
