"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEvents } from "./event-context"
import { getEventIcon, getEventColor } from "@/lib/utils"
import { SYRIA_BORDER_COORDINATES } from "@/lib/data"
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/lib/constants"
import * as turf from "@turf/turf"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export default function Map() {
  const mapContainer = useRef(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({})
  const animationRef = useRef<number>()
  const { events, setSelectedEvent, settings } = useEvents()
  const [mapLoaded, setMapLoaded] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${settings.mapStyle}-v11`,
      center: DEFAULT_MAP_CENTER,
      zoom: DEFAULT_MAP_ZOOM,
      accessToken: MAPBOX_TOKEN,
    })

    map.current.addControl(new mapboxgl.NavigationControl())

    map.current.on("load", () => {
      setMapLoaded(true)
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      map.current?.remove()
    }
  }, [settings.mapStyle])

  // Add Syria border when map is loaded
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Add Syria border source and layer
    if (!map.current.getSource("syria-border")) {
      map.current.addSource("syria-border", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: SYRIA_BORDER_COORDINATES,
          },
        },
      })

      map.current.addLayer({
        id: "syria-border-line",
        type: "line",
        source: "syria-border",
        paint: {
          "line-color": "#FF0000",
          "line-width": 2,
          "line-dasharray": [2, 2],
        },
      })
    }
  }, [mapLoaded])

  // Add movement paths and animations
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    events.forEach((event) => {
      if (event.movement?.type === "aircraft" && event.movement.path) {
        const pathId = `path-${event.id}`
        const pointId = `point-${event.id}`

        // Add the path line
        if (!map.current.getSource(pathId)) {
          map.current.addSource(pathId, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: event.movement.path,
              },
            },
          })

          map.current.addLayer({
            id: pathId,
            type: "line",
            source: pathId,
            paint: {
              "line-color": "#007cbf",
              "line-width": 2,
              "line-dasharray": [2, 1],
            },
          })
        }

        // Add moving point
        if (!map.current.getSource(pointId)) {
          map.current.addSource(pointId, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: event.movement.path[0],
              },
            },
          })

          map.current.addLayer({
            id: pointId,
            type: "symbol",
            source: pointId,
            layout: {
              "icon-image": "airport-15",
              "icon-rotate": ["get", "bearing"],
              "icon-rotation-alignment": "map",
              "icon-allow-overlap": true,
              "icon-ignore-placement": true,
            },
          })

          // Animate the point
          let start = 0
          const animate = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = (timestamp - start) % 20000 // 20-second loop
            const phase = progress / 20000

            const path = event.movement!.path!
            const pointAlong = turf.along(turf.lineString(path), turf.length(turf.lineString(path)) * phase, {
              units: "kilometers",
            })

            if (map.current?.getSource(pointId)) {
              ;(map.current.getSource(pointId) as mapboxgl.GeoJSONSource).setData({
                type: "Feature",
                properties: {
                  bearing: 0, // Calculate actual bearing if needed
                },
                geometry: pointAlong.geometry,
              })
            }

            animationRef.current = requestAnimationFrame(animate)
          }

          animationRef.current = requestAnimationFrame(animate)
        }
      }

      // Add heatmap for virus spread
      if (event.movement?.type === "virus" && event.affectedZone?.type === "heatmap") {
        const heatmapId = `heatmap-${event.id}`

        if (!map.current.getSource(heatmapId)) {
          map.current.addSource(heatmapId, {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: event.affectedZone.coordinates.map((coord) => ({
                type: "Feature",
                properties: {
                  intensity: event.affectedZone?.intensity || 1,
                },
                geometry: {
                  type: "Point",
                  coordinates: coord,
                },
              })),
            },
          })

          map.current.addLayer({
            id: heatmapId,
            type: "heatmap",
            source: heatmapId,
            paint: {
              "heatmap-weight": ["get", "intensity"],
              "heatmap-intensity": 1,
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(0,0,0,0)",
                0.2,
                "#fee08b",
                0.4,
                "#fdae61",
                0.6,
                "#f46d43",
                0.8,
                "#d53e4f",
                1,
                "#980043",
              ],
              "heatmap-radius": 30,
            },
          })
        }
      }
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [events, mapLoaded])

  // Update markers and zones when events change
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Remove existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove())
    markersRef.current = {}

    // Remove existing zone layers and sources
    events.forEach((event) => {
      const zoneId = `zone-${event.id}`
      const pathId = `path-${event.id}`
      const pointId = `point-${event.id}`
      const heatmapId = `heatmap-${event.id}`

      if (map.current?.getLayer(zoneId)) {
        map.current.removeLayer(zoneId)
      }
      if (map.current?.getSource(zoneId)) {
        map.current.removeSource(zoneId)
      }

      if (map.current?.getLayer(pathId)) {
        map.current.removeLayer(pathId)
      }
      if (map.current?.getSource(pathId)) {
        map.current.removeSource(pathId)
      }

      if (map.current?.getLayer(pointId)) {
        map.current.removeLayer(pointId)
      }
      if (map.current?.getSource(pointId)) {
        map.current.removeSource(pointId)
      }

      if (map.current?.getLayer(heatmapId)) {
        map.current.removeLayer(heatmapId)
      }
      if (map.current?.getSource(heatmapId)) {
        map.current.removeSource(heatmapId)
      }
    })

    // Add new markers and zones
    events.forEach((event) => {
      // Create marker
      const el = document.createElement("div")
      el.className = "marker"
      el.innerHTML = getEventIcon(event.type, event.subtype)
      el.style.color = getEventColor(event.status)
      el.style.fontSize = "24px"

      const marker = new mapboxgl.Marker({ element: el }).setLngLat(event.coordinates).addTo(map.current!)

      marker.getElement().addEventListener("click", () => {
        setSelectedEvent(event)
      })

      markersRef.current[event.id] = marker

      // Add affected zone if exists
      if (settings.showZones && event.affectedZone) {
        const zoneId = `zone-${event.id}`

        try {
          if (event.affectedZone.type === "circle") {
            map.current.addSource(zoneId, {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: event.affectedZone.coordinates[0],
                },
              },
            })

            map.current.addLayer({
              id: zoneId,
              type: "circle",
              source: zoneId,
              paint: {
                "circle-radius": event.affectedZone.radius / 100,
                "circle-color": event.affectedZone.color,
                "circle-opacity": 0.5,
              },
            })
          }
        } catch (error) {
          console.error(`Error adding zone for event ${event.id}:`, error)
        }
      }
    })
  }, [events, setSelectedEvent, settings.showZones, mapLoaded])

  // Update map style when settings change
  useEffect(() => {
    if (!map.current || !mapLoaded) return
    map.current.setStyle(`mapbox://styles/mapbox/${settings.mapStyle}-v11`)
  }, [settings.mapStyle, mapLoaded])

  return (
    <div className="h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  )
}

