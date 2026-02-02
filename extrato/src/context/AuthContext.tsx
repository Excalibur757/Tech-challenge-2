"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  userName: string | null;
  loading: boolean;
  login: (token: string, userName: string) => void;
  logout: () => void;
};


const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUserName(storedUser);
    }
    setLoading(false);
  }, []);

  function login(token: string, userName: string) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", userName);
    setToken(token);
    setUserName(userName);
  }

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setToken(null);
    setUserName(null);
  }

  return (
    <AuthContext.Provider value={{ token, userName, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be usado dentro do AuthProvider");
  return ctx;
}
