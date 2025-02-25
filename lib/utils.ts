export function getEventIcon(type: string, subtype?: string) {
  switch (type) {
    case "war":
      return subtype === "military-operation" ? "🎯" : "💥"
    case "protest":
      return "⚠️"
    case "disaster":
      return "🌋"
    case "political":
      return "🏛️"
    case "humanitarian":
      return "🏥"
    case "security":
      return "🚨"
    case "infrastructure":
      return "🏗️"
    default:
      return "📍"
  }
}

export function getEventColor(status: string) {
  switch (status) {
    case "ongoing":
      return "#ff0000"
    case "resolved":
      return "#00ff00"
    case "critical":
      return "#ff00ff"
    case "monitoring":
      return "#ffff00"
    default:
      return "#ffffff"
  }
}

export function getEventTypeColor(type: string) {
  switch (type) {
    case "war":
      return "bg-red-500"
    case "protest":
      return "bg-yellow-500"
    case "disaster":
      return "bg-orange-500"
    case "political":
      return "bg-blue-500"
    case "humanitarian":
      return "bg-green-500"
    case "security":
      return "bg-purple-500"
    case "infrastructure":
      return "bg-gray-500"
    default:
      return "bg-slate-500"
  }
}

