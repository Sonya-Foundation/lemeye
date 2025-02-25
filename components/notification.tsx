"use client"

import { useEffect } from "react"
import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationProps {
  title: string
  message: string
  type: "info" | "warning" | "error"
  onClose: () => void
}

export function Notification({ title, message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`notification fixed right-4 top-4 z-50 w-96 rounded-lg border p-4 shadow-lg
        ${type === "error" ? "border-red-600 bg-red-50" : ""}
        ${type === "warning" ? "border-yellow-600 bg-yellow-50" : ""}
        ${type === "info" ? "border-blue-600 bg-blue-50" : ""}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          className={`h-5 w-5 ${
            type === "error" ? "text-red-600" : type === "warning" ? "text-yellow-600" : "text-blue-600"
          }`}
        />
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <Button variant="ghost" size="icon" className="-m-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

