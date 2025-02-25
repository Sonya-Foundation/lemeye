import type React from "react"
interface CommandButtonProps {
  icon: React.ReactNode
  label: string
  selected?: boolean
  onClick?: () => void
}

export function CommandButton({ icon, label, selected, onClick }: CommandButtonProps) {
  return (
    <button
      className={`command-center-button flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
        selected ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
      data-state={selected ? "selected" : "default"}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

