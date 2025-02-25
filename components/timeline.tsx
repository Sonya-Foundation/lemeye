interface TimelineItem {
  time: string
  content: string
  source?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative mt-2 space-y-4 pl-4">
      {items.map((item, index) => (
        <div key={index} className="relative pb-4">
          <div className="absolute -left-2 top-2 h-2 w-2 rounded-full bg-primary" />
          {index !== items.length - 1 && <div className="absolute -left-[5px] top-4 h-full w-[1px] bg-border" />}
          <div className="space-y-1">
            <time className="text-xs text-muted-foreground">{new Date(item.time).toLocaleString()}</time>
            <p className="text-sm">{item.content}</p>
            {item.source && <p className="text-xs text-muted-foreground">Source: {item.source}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

