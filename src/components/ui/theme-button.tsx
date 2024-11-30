"use client"

import * as React from "react"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light") 
  }

  return (
    <div className="w-[80px] justify-start gap-2 px-2 flex items-center">
      <Button
        variant="outline"
        size="default"
        className="flex-1"
        onClick={toggleTheme}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className="ml-auto data-[state=checked]:bg-primary"
      />
    </div>
  )
}

