"use client";

import { useTheme } from "next-themes";
import { Button } from "./button";
import { MoonStarIcon, SunMediumIcon } from "lucide-react";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        return theme === "light" ? setTheme("dark") : setTheme("light");
      }}
    >
      {theme === "light" ? <MoonStarIcon /> : <SunMediumIcon />}
    </Button>
  );
}
