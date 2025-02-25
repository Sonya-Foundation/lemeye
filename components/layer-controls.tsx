"use client"

import { Layers, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEvents } from "./event-context"

export function LayerControls() {
  const { settings, setSettings } = useEvents()

  const layers = [
    { id: "borders", label: "Borders", key: "showBorders" },
    { id: "zones", label: "Affected Zones", key: "showZones" },
    { id: "heatmap", label: "Heatmaps", key: "showHeatmap" },
    { id: "weather", label: "Weather", key: "showWeather" },
    { id: "paths", label: "Movement Paths", key: "showPaths" },
  ] as const

  const toggleLayer = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Layers className="h-4 w-4" />
          Layers
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Map Layers</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {layers.map((layer) => (
            <DropdownMenuItem
              key={layer.id}
              className="flex items-center justify-between"
              onSelect={(e) => {
                e.preventDefault()
                toggleLayer(layer.key as keyof typeof settings)
              }}
            >
              <span>{layer.label}</span>
              {settings[layer.key as keyof typeof settings] ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

