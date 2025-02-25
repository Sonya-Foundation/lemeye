"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"
import type { Event, Settings } from "@/types"
import { EXAMPLE_EVENTS } from "@/lib/data"

interface EventContextType {
  selectedEvent: Event | null
  setSelectedEvent: (event: Event | null) => void
  events: Event[]
  setEvents: (events: Event[]) => void
  filters: {
    type: string[]
    dateRange: [Date | null, Date | null]
    searchQuery: string
  }
  setFilters: (filters: any) => void
  settings: Settings
  setSettings: (settings: Settings) => void
  visiblePanels: {
    settings: boolean
    sources: boolean
  }
  togglePanel: (panel: "settings" | "sources") => void
}

const EventContext = createContext<EventContextType | undefined>(undefined)

const DEFAULT_SETTINGS: Settings = {
  theme: "system",
  mapStyle: "dark",
  showZones: true,
  showBorders: true,
  showHeatmap: true,
  language: "en",
  notifications: true,
  autoRefresh: true,
  refreshInterval: 30000,
}

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [events, setEvents] = useState<Event[]>(EXAMPLE_EVENTS)
  const [filters, setFilters] = useState({
    type: [],
    dateRange: [null, null],
    searchQuery: "",
  })
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [visiblePanels, setVisiblePanels] = useState({
    settings: false,
    sources: false,
  })

  const togglePanel = useCallback((panel: "settings" | "sources") => {
    setVisiblePanels((prev) => ({
      ...prev,
      [panel]: !prev[panel],
    }))
  }, [])

  return (
    <EventContext.Provider
      value={{
        selectedEvent,
        setSelectedEvent,
        events,
        setEvents,
        filters,
        setFilters,
        settings,
        setSettings,
        visiblePanels,
        togglePanel,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventContext)
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider")
  }
  return context
}

