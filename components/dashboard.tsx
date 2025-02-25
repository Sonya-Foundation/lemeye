"use client"

import { Bar, Line } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { useEvents } from "./event-context"

export function Dashboard() {
  const { events } = useEvents()

  // Calculate statistics
  const eventsByType = events.reduce(
    (acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const eventsBySeverity = events.reduce(
    (acc, event) => {
      acc[event.severity] = (acc[event.severity] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const totalCasualties = events.reduce(
    (acc, event) => {
      if (event.casualties) {
        acc.dead += event.casualties.dead
        acc.injured += event.casualties.injured
        acc.missing += event.casualties.missing
      }
      return acc
    },
    { dead: 0, injured: 0, missing: 0 },
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Events by Type</CardTitle>
          <CardDescription>Distribution of events across different categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-[200px]"
            config={{
              events: {
                label: "Events",
              },
            }}
          >
            <Bar
              data={Object.entries(eventsByType).map(([type, count]) => ({
                type,
                events: count,
              }))}
              dataKey="events"
            />
            <ChartTooltip />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Severity Distribution</CardTitle>
          <CardDescription>Event count by severity level</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="h-[200px]"
            config={{
              events: {
                label: "Events",
              },
            }}
          >
            <Line
              data={Object.entries(eventsBySeverity).map(([severity, count]) => ({
                severity,
                events: count,
              }))}
              dataKey="events"
            />
            <ChartTooltip />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Casualties Overview</CardTitle>
          <CardDescription>Total casualties across all events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{totalCasualties.dead}</div>
              <div className="text-sm text-muted-foreground">Dead</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{totalCasualties.injured}</div>
              <div className="text-sm text-muted-foreground">Injured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalCasualties.missing}</div>
              <div className="text-sm text-muted-foreground">Missing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

