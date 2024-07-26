"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/cosmic/elements/Button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="dark:hover:bg-black"
    >
      <Sun className="h-[1.5rem] w-[1.3rem] text-black dark:text-white dark:hidden" />
      <Moon className="hidden size-5 text-black dark:text-white dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
