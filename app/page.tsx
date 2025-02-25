import dynamic from "next/dynamic"
import { Suspense } from "react"
import { EventPanel } from "@/components/event-panel"
import { TopBar } from "@/components/top-bar"
import { EventProvider } from "@/components/event-context"
import { LoadingMap } from "@/components/loading-map"
import { SettingsPanel } from "@/components/settings-panel"
import { SourcesPanel } from "@/components/sources-panel"

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <LoadingMap />,
})

export default function Page() {
  return (
    <EventProvider>
      <main className="flex h-screen w-full overflow-hidden">
        <div className="relative flex-1">
          <TopBar />
          <Suspense fallback={<LoadingMap />}>
            <Map />
          </Suspense>
        </div>
        <div className="flex">
          <EventPanel />
          <SourcesPanel />
          <SettingsPanel />
        </div>
      </main>
    </EventProvider>
  )
}

