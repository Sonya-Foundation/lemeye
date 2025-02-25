"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { LayerControls } from "./layer-controls"
import { SeverityFilter } from "./severity-filter"
import { DateFilter } from "./date-filter"
import { CommandButton } from "./command-button"
import { useEvents } from "./event-context"

export function TopBar() {
  const { filters, setFilters, togglePanel } = useEvents()
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div className="absolute left-4 right-4 top-4 z-10">
      <div className="flex items-center gap-2 rounded-lg bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative flex-1">
          <Search
            className={`absolute left-2 top-2.5 h-4 w-4 transition-colors ${
              searchFocused ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        <DateFilter />
        <SeverityFilter />
        <LayerControls />

        <div className="flex items-center gap-1">
          <CommandButton
            icon={<span className="text-lg">📊</span>}
            label="Dashboard"
            selected={filters.showDashboard}
            onClick={() => togglePanel("dashboard")}
          />
          <CommandButton
            icon={<span className="text-lg">⚙️</span>}
            label="Settings"
            selected={filters.showSettings}
            onClick={() => togglePanel("settings")}
          />
          <CommandButton
            icon={<span className="text-lg">📡</span>}
            label="Sources"
            selected={filters.showSources}
            onClick={() => togglePanel("sources")}
          />
        </div>
      </div>
    </div>
  )
}

