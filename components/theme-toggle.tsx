'use client'
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className={`
        h-10 w-10
        text-zinc-700 dark:text-zinc-200
        hover:bg-zinc-100 dark:hover:bg-zinc-800
      `}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="h-7 w-7"/>
      ) : (
        <Moon className="h-7 w-7" />
      )}
    </Button>
  );
}
