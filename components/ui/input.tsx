"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  futuristic?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, futuristic = false, ...props }, ref) => {
    const { resolvedTheme } = useTheme()
    const [isFocused, setIsFocused] = useState(false)

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            icon && "pl-10",
            futuristic && "border-primary/30 focus:border-primary",
            futuristic && resolvedTheme === "dark" && isFocused && "cyber-glow",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {futuristic && (
          <div 
            className={cn(
              "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/50 to-accent/50 transition-all duration-300",
              isFocused ? "w-full" : "w-0"
            )}
          />
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }