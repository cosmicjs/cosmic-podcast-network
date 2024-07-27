"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <button
      className="p-2 flex flex-col justify-center"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="mb-2 m-auto h-[1.5rem] w-[1.3rem] text-black dark:text-white dark:hidden" />
      <Moon className="mb-2 m-auto hidden size-5  dark:block" />
      <div className="text-sm m-auto">Theme</div>
    </button>
  );
}
