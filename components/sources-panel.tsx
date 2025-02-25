"use client"

import { RssIcon, CheckCircle, AlertCircle, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEvents } from "./event-context"

export function SourcesPanel() {
  const { events, visiblePanels, togglePanel } = useEvents()

  if (!visiblePanels.sources) return null

  // Collect all unique sources from events
  const sources = events.reduce((acc, event) => {
    event.sources.forEach((source) => {
      if (!acc.find((s) => s.id === source.id)) {
        acc.push(source)
      }
    })
    return acc
  }, [] as EventSource[])

  return (
    <div className="w-80 border-l bg-background">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <RssIcon className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Event Sources</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={() => togglePanel("sources")}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-65px)]">
        <div className="p-4 space-y-4">
          {sources.map((source) => (
            <div key={source.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{source.icon}</span>
                  <span className="font-medium">{source.name}</span>
                </div>
                <Badge variant={source.reliability === "high" ? "default" : "secondary"}>
                  {source.reliability === "high" ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
                  {source.reliability}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Last update: {new Date(source.lastUpdate).toLocaleString()}
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline mt-2 inline-block"
              >
                View Source
              </a>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

