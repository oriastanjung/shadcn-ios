import * as React from "react"
import { Navbar } from "./components/navbar"
import { DocsSidebar, type NavItem } from "./components/docs-sidebar"
import { DocsContent } from "./components/docs-content"
import { PhoneFrame } from "./components/phone-frame"
import { MobileSink, type ScreenId } from "./components/mobile-sink"

export default function App() {
  const [isDark, setIsDark] = React.useState(false)
  const [phoneDark, setPhoneDark] = React.useState(false)
  const [accentColor, setAccentColor] = React.useState("#007aff")
  const [currentSection, setCurrentSection] = React.useState<NavItem>("kitchen-sink")
  const [phoneScreen, setPhoneScreen] = React.useState<ScreenId>("home")
  const [activeMobileTab, setActiveMobileTab] = React.useState<"docs" | "preview">("docs")

  const toggleGlobalTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    setPhoneDark(nextDark)
    document.documentElement.classList.toggle("dark", nextDark)
  }

  const togglePhoneTheme = () => {
    setPhoneDark(!phoneDark)
  }

  const handleSidebarSelect = (item: NavItem) => {
    setCurrentSection(item)
    const componentScreens: ScreenId[] = [
      "action-sheet",
      "badge",
      "breadcrumbs",
      "button",
      "card",
      "checkbox",
      "dialog",
      "input",
      "popover",
      "progress",
      "radio",
      "select",
      "sheet",
      "switch",
      "tabs",
      "toast",
    ]
    if (componentScreens.includes(item as ScreenId)) {
      setPhoneScreen(item as ScreenId)
    } else if (item === "kitchen-sink") {
      setPhoneScreen("home")
    }
  }

  const handleOpenMobilePreview = (screenId: ScreenId) => {
    setPhoneScreen(screenId)
    setActiveMobileTab("preview")
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-primary/20 selection:text-primary">
      {/* Top Navigation Bar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleGlobalTheme}
        activeTab={activeMobileTab}
        onTabChange={setActiveMobileTab}
      />

      {/* Main 3-Column / Responsive Layout */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex gap-8 lg:gap-12 items-start justify-between min-h-[calc(100vh-4rem)]">
          {/* Left Sidebar (Desktop / Tablet) */}
          <div className="hidden lg:block">
            <DocsSidebar currentSection={currentSection} onSelect={handleSidebarSelect} />
          </div>

          {/* Middle Docs Content */}
          <div
            className={`flex-1 min-w-0 ${
              activeMobileTab === "docs" ? "block" : "hidden lg:block"
            }`}
          >
            {/* Mobile Sidebar Selector on small screens */}
            <div className="lg:hidden pt-4 pb-2 border-b border-border">
              <DocsSidebar currentSection={currentSection} onSelect={handleSidebarSelect} />
            </div>

            <DocsContent
              currentSection={currentSection}
              onNavigate={handleSidebarSelect}
              onOpenMobilePreview={handleOpenMobilePreview}
            />
          </div>

          {/* Right Phone Frame Preview (Sticky on desktop, toggleable on mobile) */}
          <div
            className={`py-8 xl:py-10 shrink-0 sticky top-16 self-start ${
              activeMobileTab === "preview" ? "w-full flex justify-center lg:w-auto" : "hidden xl:block"
            }`}
          >
            <PhoneFrame isDark={phoneDark}>
              <MobileSink
                activeScreen={phoneScreen}
                onScreenChange={setPhoneScreen}
                isDark={phoneDark}
                onToggleDark={togglePhoneTheme}
                accentColor={accentColor}
                onChangeAccent={setAccentColor}
              />
            </PhoneFrame>
          </div>
        </div>
      </main>
    </div>
  )
}
