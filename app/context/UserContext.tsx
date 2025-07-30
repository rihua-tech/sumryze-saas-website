"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  isFreeUser: boolean;
  searchCount: number;
  incrementSearch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isFreeUser] = useState(true); // mock it for now
  const [searchCount, setSearchCount] = useState(0);

  const incrementSearch = () => setSearchCount(prev => prev + 1);

  return (
    <UserContext.Provider value={{ isFreeUser, searchCount, incrementSearch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
