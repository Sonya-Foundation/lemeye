"use client"

import { format } from "date-fns"
import { X, Navigation2, Wind, Thermometer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEvents } from "./event-context"
import { Timeline } from "./timeline"

export function EventPanel() {
  const { selectedEvent, setSelectedEvent } = useEvents()

  if (!selectedEvent) return null

  return (
    <div className="w-96 border-l bg-background">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Event Details</h2>
        <Button variant="ghost" size="icon" onClick={() => setSelectedEvent(null)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-65px)]">
        <div className="p-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
              <p className="text-sm text-muted-foreground">{format(new Date(selectedEvent.date), "PPP")}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant={selectedEvent.status === "active" ? "destructive" : "default"}>
                {selectedEvent.status}
              </Badge>
              <Badge>{selectedEvent.type}</Badge>
              <Badge variant="outline">{selectedEvent.severity}</Badge>
            </div>

            <div>
              <h4 className="font-semibold">Location</h4>
              <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
              {selectedEvent.nearestCities && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium">Nearest Cities:</p>
                  {selectedEvent.nearestCities.map((city, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Navigation2 className="h-4 w-4" />
                      {city.name} - {city.distance}km {city.direction}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedEvent.weather && (
              <div>
                <h4 className="font-semibold">Weather Conditions</h4>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    <span className="text-sm">{selectedEvent.weather.temperature}°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4" />
                    <span className="text-sm">
                      {selectedEvent.weather.windSpeed} km/h {selectedEvent.weather.windDirection}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold">Description</h4>
              <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
            </div>

            {selectedEvent.movement && (
              <div>
                <h4 className="font-semibold">Movement Details</h4>
                {selectedEvent.movement.type === "aircraft" && (
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-muted-foreground">Speed: {selectedEvent.movement.speed}</p>
                    <p className="text-sm text-muted-foreground">Direction: {selectedEvent.movement.direction}</p>
                  </div>
                )}
                {selectedEvent.movement.type === "virus" && selectedEvent.movement.spread && (
                  <div className="mt-2">
                    <Timeline
                      items={selectedEvent.movement.spread.map((item) => ({
                        time: item.time,
                        content: `Affected area: ${item.affected_area}`,
                      }))}
                    />
                  </div>
                )}
              </div>
            )}

            {selectedEvent.casualties && (
              <div>
                <h4 className="font-semibold">Casualties</h4>
                <div className="mt-2 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">Dead</p>
                    <p className="text-lg">{selectedEvent.casualties.dead}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Injured</p>
                    <p className="text-lg">{selectedEvent.casualties.injured}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Missing</p>
                    <p className="text-lg">{selectedEvent.casualties.missing}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold">Updates</h4>
              <Timeline
                items={selectedEvent.updates.map((update) => ({
                  time: update.timestamp,
                  content: update.content,
                  source: update.source,
                }))}
              />
            </div>

            {selectedEvent.sources.length > 0 && (
              <div>
                <h4 className="font-semibold">Sources</h4>
                <div className="mt-2 space-y-2">
                  {selectedEvent.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{source.icon}</span>
                        <span className="text-sm font-medium">{source.name}</span>
                      </div>
                      <Badge variant={source.reliability === "high" ? "default" : "secondary"}>
                        {source.reliability}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

