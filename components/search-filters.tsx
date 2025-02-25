"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useEvents } from "./event-context"

const EVENT_TYPES = ["war", "protest", "disaster", "political"]

export function SearchFilters() {
  const { filters, setFilters } = useEvents()

  const toggleType = (type: string) => {
    setFilters((prev: any) => ({
      ...prev,
      type: prev.type.includes(type) ? prev.type.filter((t: string) => t !== type) : [...prev.type, type],
    }))
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          className="pl-8"
          value={filters.searchQuery}
          onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {EVENT_TYPES.map((type) => (
          <Badge
            key={type}
            variant={filters.type.includes(type) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleType(type)}
          >
            {type}
          </Badge>
        ))}
      </div>
    </div>
  )
}

