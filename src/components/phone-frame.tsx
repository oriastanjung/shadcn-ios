import * as React from "react"
import { Wifi, Battery, Signal } from "lucide-react"

interface PhoneFrameProps {
  children: React.ReactNode
  isDark?: boolean
}

export function PhoneFrame({ children, isDark = false }: PhoneFrameProps) {
  return (
    <div className="relative mx-auto flex flex-col items-center">
      {/* Outer Titanium Chassis */}
      <div className="relative w-[370px] h-[750px] rounded-[52px] bg-[#1a1a1c] p-3 shadow-2xl ring-1 ring-white/20 shadow-black/40 select-none">
        {/* Subtle Edge Reflection */}
        <div className="absolute inset-x-8 top-0 h-px bg-white/20 pointer-events-none" />

        {/* Inner Bezel */}
        <div
          className={`relative w-full h-full rounded-[42px] overflow-hidden flex flex-col ${
            isDark ? "dark bg-black text-white" : "bg-[#efeff4] text-black"
          }`}
        >
          {/* iOS Status Bar */}
          <div className="relative z-30 flex items-center justify-between px-7 pt-3.5 pb-2 text-xs font-semibold tracking-tight">
            <span>9:41</span>
            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-3 -translate-x-1/2 w-24 h-6 bg-black rounded-full flex items-center justify-end pr-2.5 shadow-sm">
              <div className="size-2 rounded-full bg-[#111] ring-1 ring-white/10" />
            </div>
            <div className="flex items-center gap-1.5 opacity-90">
              <Signal className="size-3.5 fill-current" />
              <Wifi className="size-3.5" />
              <Battery className="size-4" />
            </div>
          </div>

          {/* Screen Scrollable Viewport */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            {children}
          </div>

          {/* Home Indicator */}
          <div className="py-2 flex justify-center shrink-0">
            <div className="w-32 h-1 rounded-full bg-current opacity-30" />
          </div>
        </div>
      </div>
    </div>
  )
}
