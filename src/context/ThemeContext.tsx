"use client";

import { createContext, useContext } from "react";
import { useTheme as useNextTheme } from "next-themes";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  themes: string[];
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, themes } = useNextTheme();

  return (
    <ThemeContext.Provider
      value={{ theme: theme || "light", setTheme, themes }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
