import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export type NavItem =
  | "introduction"
  | "kitchen-sink"
  | "installation"
  | "usage"
  | "shadcn-preset"
  | "colors"
  | "theme-variants"
  | "hairlines"
  | "safe-areas"
  | "touch-ripple"
  | "typography"
  | "action-sheet"
  | "badge"
  | "breadcrumbs"
  | "button"
  | "card"
  | "checkbox"
  | "dialog"
  | "input"
  | "popover"
  | "progress"
  | "radio"
  | "select"
  | "sheet"
  | "switch"
  | "tabs"
  | "toast"

interface DocsSidebarProps {
  currentSection: NavItem
  onSelect: (item: NavItem) => void
}

export function DocsSidebar({ currentSection, onSelect }: DocsSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

  const sections: {
    title: string
    items: { id: NavItem; label: string }[]
  }[] = [
    {
      title: "Getting Started",
      items: [
        { id: "introduction", label: "Introduction" },
        { id: "kitchen-sink", label: "Kitchen Sink" },
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "shadcn-preset", label: "Shadcn UI Preset" },
      ],
    },
    {
      title: "Utilities",
      items: [
        { id: "colors", label: "Colors" },
        { id: "theme-variants", label: "Theme Variants" },
        { id: "hairlines", label: "Hairlines" },
        { id: "safe-areas", label: "Safe Areas" },
        { id: "touch-ripple", label: "Touch Ripple" },
        { id: "typography", label: "Typography" },
      ],
    },
    {
      title: "Components",
      items: [
        { id: "action-sheet", label: "Action Sheet" },
        { id: "badge", label: "Badge" },
        { id: "breadcrumbs", label: "Breadcrumbs" },
        { id: "button", label: "Button" },
        { id: "card", label: "Card" },
        { id: "checkbox", label: "Checkbox" },
        { id: "dialog", label: "Dialog" },
        { id: "input", label: "Input & Form" },
        { id: "popover", label: "Popover" },
        { id: "progress", label: "Progress & Slider" },
        { id: "radio", label: "Radio Group" },
        { id: "select", label: "Select" },
        { id: "sheet", label: "Sheet / Drawer" },
        { id: "switch", label: "Switch" },
        { id: "tabs", label: "Tabs" },
        { id: "toast", label: "Toast" },
      ],
    },
  ]

  const filteredSections = sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0)

  return (
    <aside className="w-64 shrink-0 py-6 pr-6 border-r border-border min-h-[calc(100vh-4rem)]">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Search docs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 text-xs rounded-xl bg-muted/40 border-border/80 focus-visible:bg-background"
        />
      </div>

      <nav className="space-y-6 text-sm">
        {filteredSections.map((section) => (
          <div key={section.title} className="space-y-1.5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              {section.title}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = currentSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-primary/12 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
