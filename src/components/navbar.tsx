import { Moon, Sun, Smartphone, BookOpen, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
  activeTab?: "docs" | "preview"
  onTabChange?: (tab: "docs" | "preview") => void
}

function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

export function Navbar({ isDark, onToggleTheme, activeTab = "docs", onTabChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Left branding */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight text-lg group">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-[#0051d5] via-[#007aff] to-[#5ac8fa] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Layers className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight">Shadcn-IOS</span>
              <span className="text-[10px] font-normal text-muted-foreground -mt-0.5">
                Referenced from Konsta UI
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#docs" className="text-foreground transition-colors hover:text-primary">
              Documentation
            </a>
            <a
              href="#resources"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Resources
            </a>
          </nav>
        </div>

        {/* Center / Responsive toggle for mobile */}
        <div className="flex md:hidden items-center bg-muted/60 p-1 rounded-full border border-border text-xs font-medium">
          <button
            onClick={() => onTabChange?.("docs")}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
              activeTab === "docs" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground"
            }`}
          >
            <BookOpen className="size-3.5" />
            <span>Docs</span>
          </button>
          <button
            onClick={() => onTabChange?.("preview")}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
              activeTab === "preview" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground"
            }`}
          >
            <Smartphone className="size-3.5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="hidden sm:inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-muted/80 text-muted-foreground border border-border">
            v1.0.0
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:bg-muted/50 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon className="size-4" />
            <span>GitHub</span>
          </a>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="rounded-full size-9 text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
