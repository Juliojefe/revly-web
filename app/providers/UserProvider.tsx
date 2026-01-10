"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "@/types/user";
import AuthLoading from "@/components/AuthLoading/AuthLoading";

interface UserContextType {
  user: User | null;
  setUser: (userData: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on app start
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUserState(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setIsLoaded(true);
  }, []);

  // Wrapper so we sync context + localStorage
  const setUser = useCallback((userData: User | null) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  if (!isLoaded) {
    return <AuthLoading />;  // Prevent children from rendering until loaded
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}