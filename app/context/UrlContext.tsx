"use client";

import { createContext, useContext, useState } from "react";

// ✅ Define context type
type UrlContextType = {
  url: string;
  setUrl: (url: string) => void;
};

// ✅ Create context with proper type
const UrlContext = createContext<UrlContextType | undefined>(undefined);

export function UrlProvider({ children }: { children: React.ReactNode }) {
  const [url, setUrl] = useState("");

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
}

// ✅ Hook with type safety
export const useUrlContext = (): UrlContextType => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error("useUrlContext must be used within a UrlProvider");
  }
  return context;
};
