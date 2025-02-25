export interface EventSource {
  id: string
  type: "telegram" | "twitter" | "news" | "official"
  name: string
  url: string
  icon: string
  reliability: "high" | "medium" | "low"
  lastUpdate: string
}

export type EventType = "military" | "virus" | "protest" | "war" | "humanitarian" | "security" | "infrastructure"

export type MovementType = {
  type: "aircraft" | "ground" | "virus" | "none"
  path?: [number, number][]
  speed?: string
  direction?: string
  spread?: {
    time: string
    affected_area: string
  }[]
}

export interface Event {
  id: string
  title: string
  location: string
  date: string
  type: EventType
  subtype?: string
  description: string
  status: "active" | "resolved" | "critical" | "monitoring"
  severity: "low" | "medium" | "high" | "critical"
  coordinates: [number, number]
  movement?: MovementType
  affectedZone?: {
    type: "circle" | "polygon" | "heatmap"
    coordinates: number[][]
    radius?: number
    color: string
    intensity?: number
  }
  sources: EventSource[]
  updates: {
    timestamp: string
    content: string
    source?: string
  }[]
  casualties?: {
    dead: number
    injured: number
    missing: number
  }
  weather?: {
    temperature: number
    windSpeed: number
    windDirection: string
    condition: string
  }
  nearestCities?: {
    name: string
    distance: number
    direction: string
  }[]
  tags: string[]
  verified: boolean
}

export interface Settings {
  theme: "light" | "dark" | "system"
  mapStyle: "satellite" | "streets" | "dark"
  showZones: boolean
  showBorders: boolean
  showHeatmap: boolean
  language: "en" | "tr"
  notifications: boolean
  autoRefresh: boolean
  refreshInterval: number
}

