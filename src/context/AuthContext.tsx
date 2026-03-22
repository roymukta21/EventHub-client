"use client";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { mockUsers } from "../data/users";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar: string;
  bio: string;
  phone: string;
  location: string;
  joinedAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  updateUser: (updates: Partial<AuthUser>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("eventhub_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("eventhub_user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password,
    );
    if (!found) return { success: false, error: "Invalid email or password" };
    const authUser: AuthUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
      avatar: found.avatar,
      bio: found.bio,
      phone: found.phone,
      location: found.location,
      joinedAt: found.joinedAt,
    };
    setUser(authUser);
    localStorage.setItem("eventhub_user", JSON.stringify(authUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eventhub_user");
  };

  const register = async (name: string, email: string, _password: string) => {
    if (mockUsers.find((u) => u.email === email))
      return { success: false, error: "Email already in use" };
    const newUser: AuthUser = {
      id: Date.now(),
      name,
      email,
      role: "user",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      bio: "",
      phone: "",
      location: "",
      joinedAt: new Date().toISOString().split("T")[0],
    };
    setUser(newUser);
    localStorage.setItem("eventhub_user", JSON.stringify(newUser));
    return { success: true };
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("eventhub_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
