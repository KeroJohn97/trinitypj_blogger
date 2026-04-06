"use client"
import React, { createContext, useContext, useState } from "react"

interface NavigationGuardType {
  isDirty: boolean
  setIsDirty: (dirty: boolean) => void
}

const NavigationGuardContext = createContext<NavigationGuardType | undefined>(undefined)

export function NavigationGuardProvider({ children }: { children: React.ReactNode }) {
  const [isDirty, setIsDirty] = useState(false)

  return (
    <NavigationGuardContext.Provider value={{ isDirty, setIsDirty }}>
      {children}
    </NavigationGuardContext.Provider>
  )
}

export const useNavigationGuard = () => {
  const context = useContext(NavigationGuardContext)
  if (!context) throw new Error("useNavigationGuard must be used within NavigationGuardProvider")
  return context
}