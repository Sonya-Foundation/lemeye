"use client"

import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useEvents } from "./event-context"

export function DateFilter() {
  const { filters, setFilters } = useEvents()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarIcon className="h-4 w-4" />
          {filters.dateRange[0] ? (
            filters.dateRange[1] ? (
              <>
                {format(filters.dateRange[0], "LLL dd, y")} - {format(filters.dateRange[1], "LLL dd, y")}
              </>
            ) : (
              format(filters.dateRange[0], "LLL dd, y")
            )
          ) : (
            "Pick a date"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="range"
          selected={{
            from: filters.dateRange[0] || undefined,
            to: filters.dateRange[1] || undefined,
          }}
          onSelect={(range) =>
            setFilters((prev) => ({
              ...prev,
              dateRange: [range?.from || null, range?.to || null],
            }))
          }
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

