"use client"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useEvents } from "./event-context"

export function SeverityFilter() {
  const { filters, setFilters } = useEvents()

  const severityLevels = [
    { value: "critical", label: "Critical", color: "bg-red-500" },
    { value: "high", label: "High", color: "bg-orange-500" },
    { value: "medium", label: "Medium", color: "bg-yellow-500" },
    { value: "low", label: "Low", color: "bg-green-500" },
  ]

  const toggleSeverity = (severity: string) => {
    setFilters((prev) => ({
      ...prev,
      severity: prev.severity?.includes(severity)
        ? prev.severity.filter((s) => s !== severity)
        : [...(prev.severity || []), severity],
    }))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <AlertCircle className="h-4 w-4" />
          Severity
          {filters.severity?.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {filters.severity.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Severity Levels</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {severityLevels.map((level) => (
          <DropdownMenuItem
            key={level.value}
            className="flex items-center justify-between"
            onSelect={(e) => {
              e.preventDefault()
              toggleSeverity(level.value)
            }}
          >
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${level.color}`} />
              <span>{level.label}</span>
            </div>
            {filters.severity?.includes(level.value) && <Badge variant="secondary">Selected</Badge>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

