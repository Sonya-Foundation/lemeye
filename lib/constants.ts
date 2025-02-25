export const DEFAULT_MAP_CENTER: [number, number] = [35.2433, 38.9637]
export const DEFAULT_MAP_ZOOM = 5

export const EVENT_TYPES = [
  "military",
  "virus",
  "protest",
  "war",
  "humanitarian",
  "security",
  "infrastructure",
] as const

export const EVENT_STATUSES = ["active", "resolved", "critical", "monitoring"] as const

export const EVENT_SEVERITIES = ["low", "medium", "high", "critical"] as const

