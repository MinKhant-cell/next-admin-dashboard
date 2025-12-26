'use client'
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      aria-label="Toggle theme"
      className={`p-2 rounded cursor-pointer
        text-zinc-700 dark:text-zinc-200 
        hover:bg-zinc-100 dark:hover:bg-zinc-800
      `}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun width="20" height="20"/>
      ) : (
        <Moon width="20" height="20" />
      )}
    </div>
  );
}
