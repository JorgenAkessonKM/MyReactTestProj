import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  email: string;
  [k: string]: any;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setToken: (token: string | null) => void;
  getAuthHeader: () => { Authorization: string } | null;
};

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function makeFakeToken(email: string) {
  return btoa(`${email}:${Date.now()}`);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const t = localStorage.getItem(TOKEN_KEY);
      const u = localStorage.getItem(USER_KEY);
      if (t) setTokenState(t);
      if (u) setUser(JSON.parse(u));
    } catch (err) {
      // ignore
    }
  }, []);

  const persistToken = (t: string | null) => {
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
    setTokenState(t);
  };

  const persistUser = (u: User | null) => {
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
    else localStorage.removeItem(USER_KEY);
    setUser(u);
  };

  const login = async (email: string, password: string) => {
    // Replace with real API call. Here we simulate and store a token.
    await new Promise((r) => setTimeout(r, 400));
    const t = makeFakeToken(email);
    persistToken(t);
    persistUser({ email });
  };

  const signup = async (email: string, password: string) => {
    // Replace with real API call. Simulate registration and set token.
    await new Promise((r) => setTimeout(r, 500));
    const t = makeFakeToken(email);
    persistToken(t);
    persistUser({ email });
  };

  const logout = () => {
    persistToken(null);
    persistUser(null);
  };

  const setToken = (t: string | null) => {
    persistToken(t);
  };

  const getAuthHeader = () =>
    token ? { Authorization: `Bearer ${token}` } : null;

  const value: AuthContextType = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    signup,
    logout,
    setToken,
    getAuthHeader,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
