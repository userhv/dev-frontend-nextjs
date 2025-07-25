"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[40px] min-h-[40px]"
      aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  );
};
