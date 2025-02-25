"use client"

import { useEffect, useRef } from "react"

interface WeatherOverlayProps {
  condition: "clear" | "rain" | "storm" | "fog"
  intensity?: number
}

export function WeatherOverlay({ condition, intensity = 1 }: WeatherOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || condition !== "rain") return

    const container = containerRef.current
    const dropCount = Math.floor(50 * intensity)

    // Clear existing drops
    container.innerHTML = ""

    // Create rain drops
    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement("div")
      drop.className = "weather-rain"
      drop.style.left = `${Math.random() * 100}%`
      drop.style.animationDelay = `${Math.random() * 2}s`
      container.appendChild(drop)
    }
  }, [condition, intensity])

  if (condition === "clear") return null

  return (
    <div ref={containerRef} className="weather-overlay">
      {condition === "fog" && (
        <div
          className="absolute inset-0"
          style={{
            background: `rgba(255, 255, 255, ${0.3 * intensity})`,
            backdropFilter: `blur(${4 * intensity}px)`,
          }}
        />
      )}
      {condition === "storm" && (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(transparent, rgba(0, 0, 0, 0.4))",
            animation: "storm 4s infinite",
          }}
        />
      )}
    </div>
  )
}

