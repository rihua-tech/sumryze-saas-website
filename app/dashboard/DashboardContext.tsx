"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModeType = "reports" | "ai-seo";

interface DashboardContextType {
  activeMode: ModeType;
  setActiveMode: (mode: ModeType) => void;
}

const DashboardContext = createContext<DashboardContextType>({
  activeMode: "reports", // default value
  setActiveMode: () => {},
});

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeMode, setActiveMode] = useState<ModeType>("reports"); // default: reports

  return (
    <DashboardContext.Provider value={{ activeMode, setActiveMode }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
