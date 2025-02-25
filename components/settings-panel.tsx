"use client"

import { Settings, Map, Eye, Bell, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEvents } from "./event-context"

export function SettingsPanel() {
  const { settings, setSettings, visiblePanels, togglePanel } = useEvents()

  if (!visiblePanels.settings) return null

  return (
    <div className="w-80 border-l bg-background">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={() => togglePanel("settings")}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Map className="h-4 w-4" />
            <div className="flex-1">
              <Label htmlFor="mapStyle">Map Style</Label>
              <Select
                value={settings.mapStyle}
                onValueChange={(value: any) => setSettings({ ...settings, mapStyle: value })}
              >
                <SelectTrigger id="mapStyle">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="satellite">Satellite</SelectItem>
                  <SelectItem value="streets">Streets</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Eye className="h-4 w-4" />
              <Label htmlFor="showZones">Show Affected Zones</Label>
            </div>
            <Switch
              id="showZones"
              checked={settings.showZones}
              onCheckedChange={(checked) => setSettings({ ...settings, showZones: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Map className="h-4 w-4" />
              <Label htmlFor="showBorders">Show Borders</Label>
            </div>
            <Switch
              id="showBorders"
              checked={settings.showBorders}
              onCheckedChange={(checked) => setSettings({ ...settings, showBorders: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Bell className="h-4 w-4" />
              <Label htmlFor="notifications">Notifications</Label>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <RefreshCw className="h-4 w-4" />
              <Label htmlFor="autoRefresh">Auto Refresh</Label>
            </div>
            <Switch
              id="autoRefresh"
              checked={settings.autoRefresh}
              onCheckedChange={(checked) => setSettings({ ...settings, autoRefresh: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

