"use client"

import { useState, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

interface TimeSliderProps {
  startDate: Date
  endDate: Date
  currentDate: Date
  onDateChange: (date: Date) => void
}

export function TimeSlider({ startDate, endDate, currentDate, onDateChange }: TimeSliderProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [value, setValue] = useState(currentDate.getTime())

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setValue((prev) => {
          const next = prev + 1000 * 60 * 60 // Add 1 hour
          if (next > endDate.getTime()) {
            setIsPlaying(false)
            return prev
          }
          return next
        })
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, endDate])

  useEffect(() => {
    onDateChange(new Date(value))
  }, [value, onDateChange])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSkipBack = () => {
    setValue((prev) => Math.max(prev - 1000 * 60 * 60 * 24, startDate.getTime())) // Skip back 1 day
  }

  const handleSkipForward = () => {
    setValue((prev) => Math.min(prev + 1000 * 60 * 60 * 24, endDate.getTime())) // Skip forward 1 day
  }

  return (
    <div className="time-slider flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={handleSkipBack}>
        <SkipBack className="h-4 w-4 text-white" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handlePlayPause}>
        {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
      </Button>
      <Button variant="ghost" size="icon" onClick={handleSkipForward}>
        <SkipForward className="h-4 w-4 text-white" />
      </Button>
      <div className="flex-1">
        <Slider
          value={[value]}
          min={startDate.getTime()}
          max={endDate.getTime()}
          step={1000 * 60 * 60} // 1 hour steps
          onValueChange={(newValue) => setValue(newValue[0])}
        />
      </div>
      <div className="min-w-[180px] text-white">{format(new Date(value), "PPpp")}</div>
    </div>
  )
}

