"use client";

import { createContext, useContext, useState } from "react";

// ✅ Define context type
type UrlContextType = {
  url: string;
  setUrl: (url: string) => void;
};

// ✅ Create context with proper type
const UrlContext = createContext<UrlContextType | undefined>(undefined);

// ✅ Export the provider
export function UrlProvider({ children }: { children: React.ReactNode }) {
  // ✅ Rule: Default value only in development
  const isDev = process.env.NODE_ENV === "development";
  const [url, setUrl] = useState(isDev ? "https://example.com" : "");

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
