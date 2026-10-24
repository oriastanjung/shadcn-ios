import * as React from "react"
import { Copy, Check, ChevronLeft, ChevronRight, Terminal } from "lucide-react"
import type { NavItem } from "./docs-sidebar"
import { Button } from "@/components/ui/button"
import type { ScreenId } from "./mobile-sink"

interface DocsContentProps {
  currentSection: NavItem
  onNavigate: (section: NavItem) => void
  onOpenMobilePreview?: (screenId: ScreenId) => void
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-3 rounded-2xl bg-[#1c1d22] text-[#f8f8f2] border border-white/10 overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/30 border-b border-white/5 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Terminal className="size-3.5" />
          <span>terminal</span>
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function DocsContent({ currentSection, onNavigate, onOpenMobilePreview }: DocsContentProps) {
  // 1. KITCHEN SINK
  if (currentSection === "kitchen-sink") {
    return (
      <article className="max-w-2xl py-8 space-y-8 animate-in fade-in duration-200">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Kitchen Sink</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Interactive live preview of all Shadcn-IOS components. You can install any component shown here directly into your own project using the Shadcn CLI preset.
          </p>
        </div>

        {/* Section: Preset Quick Install */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight">Quick Install via Shadcn CLI</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            No repository cloning required. Install individual iOS components directly into your existing React, Next.js, or Vite project:
          </p>
          <CodeBlock code="npx shadcn@latest add https://raw.githubusercontent.com/oriastanjung/shadcn-ios/master/public/r/button.json" />
        </section>

        {/* Section: Install All Components */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight">Install All Components (--all)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Install all 60+ iOS components into your workspace at once with the <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">--all</code> flag:
          </p>
          <CodeBlock code="npx shadcn@latest add https://raw.githubusercontent.com/oriastanjung/shadcn-ios/master/public/r/all.json --all" />
        </section>

        {/* Section: Preset Registry Setup */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">Setup Preset in components.json</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Configure the preset registry in your <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">components.json</code> once:
          </p>

          <CodeBlock
            code={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "registries": {
    "ios": "https://shadcn-ios.dev/r"
  }
}`}
          />

          <p className="text-sm text-muted-foreground leading-relaxed">
            Then install any component using the <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">@ios</code> namespace:
          </p>
          <CodeBlock code="npx shadcn@latest add @ios/button @ios/switch @ios/card @ios/dialog" />
        </section>

        {/* Pagination Footer */}
        <div className="pt-8 border-t border-border flex items-center justify-between">
          <button
            onClick={() => onNavigate("introduction")}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Introduction</span>
          </button>
          <button
            onClick={() => onNavigate("installation")}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Installation</span>
            <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </article>
    )
  }

  // 2. INTRODUCTION
  if (currentSection === "introduction") {
    return (
      <article className="max-w-2xl py-8 space-y-8 animate-in fade-in duration-200">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Introduction</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Shadcn-IOS is a custom preset and design registry for shadcn/ui that brings touch-first iOS Cupertino design
            tokens (referenced from Konsta UI) into modern web projects.
          </p>
        </div>

        <section className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-bold text-foreground">Why Shadcn-IOS Preset?</h2>
          <p>
            Instead of cloning another codebase, install iOS-optimized components directly into your own app:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong className="text-foreground">Official Shadcn Preset</strong>: 100% compatible with <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">npx shadcn add</code> CLI.</li>
            <li><strong className="text-foreground">Authentic iOS Feel</strong>: Action pill buttons, Cupertino switches, inset card lists, and centered alerts.</li>
            <li><strong className="text-foreground">Poppins Font</strong>: Pre-configured font tokens with native system fallbacks.</li>
            <li><strong className="text-foreground">Hairline Borders (0.5px)</strong>: Subtle borders that match native iOS app contrast.</li>
            <li><strong className="text-foreground">Accessible</strong>: Built on Radix UI and Base UI with complete keyboard navigation and screen-reader support.</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-border flex items-center justify-end">
          <button
            onClick={() => onNavigate("kitchen-sink")}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Kitchen Sink</span>
            <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </article>
    )
  }

  // 3. INSTALLATION & PRESET SETUP
  if (currentSection === "installation" || currentSection === "shadcn-preset") {
    return (
      <article className="max-w-2xl py-8 space-y-8 animate-in fade-in duration-200">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Shadcn UI Preset Installation</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Install and use components via the official shadcn CLI preset. No cloning required.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight">Step 1: Initialize shadcn in Your Project</h2>
          <p className="text-sm text-muted-foreground">
            If you have not initialized shadcn yet, run:
          </p>
          <CodeBlock code="npx shadcn@latest init" />
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight">Step 2: Add Preset Registry to components.json</h2>
          <p className="text-sm text-muted-foreground">
            Open your project's <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">components.json</code> and register the preset:
          </p>
          <CodeBlock
            code={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "registries": {
    "ios": "https://shadcn-ios.dev/r"
  }
}`}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight">Step 3: Add Components</h2>
          <p className="text-sm text-muted-foreground">
            Install individual components from the preset:
          </p>
          <CodeBlock code="npx shadcn@latest add @ios/button @ios/switch @ios/card @ios/dialog @ios/sheet" />
          <p className="text-sm text-muted-foreground">
            Or install <strong>all 60+ components</strong> at once using the <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">--all</code> flag:
          </p>
          <CodeBlock code="npx shadcn@latest add @ios/all --all" />
          <p className="text-sm text-muted-foreground">
            Or directly via registry manifest URL without modifying <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">components.json</code>:
          </p>
          <CodeBlock code="npx shadcn@latest add https://raw.githubusercontent.com/oriastanjung/shadcn-ios/master/public/r/all.json --all" />
        </section>

        {/* Pagination Footer */}
        <div className="pt-8 border-t border-border flex items-center justify-between">
          <button
            onClick={() => onNavigate("kitchen-sink")}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kitchen Sink</span>
          </button>
          <button
            onClick={() => onNavigate("usage")}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Usage</span>
            <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </article>
    )
  }

  // 4. USAGE
  if (currentSection === "usage") {
    return (
      <article className="max-w-2xl py-8 space-y-8 animate-in fade-in duration-200">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Usage</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Import installed preset components into your React application.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight">Code Example</h2>
          <CodeBlock
            code={`import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

export default function SettingsView() {
  const [airplaneMode, setAirplaneMode] = React.useState(false)

  return (
    <Card className="rounded-2xl border-border">
      <CardContent className="p-4 flex items-center justify-between">
        <span className="font-medium text-sm">Airplane Mode</span>
        <Switch checked={airplaneMode} onCheckedChange={setAirplaneMode} />
      </CardContent>
    </Card>
  )`}
          />
        </section>

        {/* Pagination Footer */}
        <div className="pt-8 border-t border-border flex items-center justify-between">
          <button
            onClick={() => onNavigate("installation")}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Installation</span>
          </button>
          <button
            onClick={() => onNavigate("colors")}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Colors</span>
            <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </article>
    )
  }

  // 5. COLORS & UTILITIES
  if (currentSection === "colors" || currentSection === "theme-variants") {
    return (
      <article className="max-w-2xl py-8 space-y-8 animate-in fade-in duration-200">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">iOS Color Palette</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            System colors aligned with Apple Human Interface Guidelines and referenced from Konsta UI design tokens.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: "System Blue", hex: "#007aff", darkHex: "#0a84ff" },
            { name: "System Green", hex: "#34c759", darkHex: "#30d158" },
            { name: "System Orange", hex: "#ff9500", darkHex: "#ffd60a" },
            { name: "System Red", hex: "#ff3b30", darkHex: "#ff453a" },
            { name: "System Purple", hex: "#af52de", darkHex: "#bf5af2" },
            { name: "Background Light", hex: "#efeff4", darkHex: "#000000" },
          ].map((c) => (
            <div key={c.name} className="p-3 rounded-2xl border border-border bg-card space-y-2">
              <div className="h-10 rounded-xl" style={{ backgroundColor: c.hex }} />
              <div>
                <div className="text-xs font-semibold">{c.name}</div>
                <div className="text-[11px] text-muted-foreground font-mono">{c.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </article>
    )
  }

  // 6. DEFAULT COMPONENT VIEW
  const componentInfo: Record<string, { title: string; desc: string; screenId: ScreenId; code: string }> = {
    "action-sheet": {
      title: "Action Sheet",
      desc: "Bottom slide-up action sheet modal for presenting context actions.",
      screenId: "action-sheet",
      code: `import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"`,
    },
    badge: {
      title: "Badge",
      desc: "Rounded capsule status badges with vibrant system accent fills.",
      screenId: "badge",
      code: `<Badge variant="success">Completed</Badge>`,
    },
    breadcrumbs: {
      title: "Breadcrumbs",
      desc: "Hierarchical page navigation with iOS chevron separators.",
      screenId: "breadcrumbs",
      code: `<Breadcrumb><BreadcrumbItem href="#">Home</BreadcrumbItem></Breadcrumb>`,
    },
    button: {
      title: "Button",
      desc: "Tactile action pill button with spring active compression states.",
      screenId: "button",
      code: `<Button variant="default">Primary Action</Button>`,
    },
    card: {
      title: "Card",
      desc: "Grouped inset cards with hairline borders and smooth rounded corners.",
      screenId: "card",
      code: `<Card className="rounded-2xl"><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>`,
    },
    checkbox: {
      title: "Checkbox",
      desc: "Circular iOS checkboxes with smooth checkmark transitions.",
      screenId: "checkbox",
      code: `<Checkbox checked={isChecked} onCheckedChange={setIsChecked} />`,
    },
    dialog: {
      title: "Dialog",
      desc: "Centered alert confirmation dialog with vertical or horizontal action buttons.",
      screenId: "dialog",
      code: `<Dialog><DialogContent><DialogTitle>Confirm</DialogTitle></DialogContent></Dialog>`,
    },
    input: {
      title: "Input & Form",
      desc: "Text fields, search bars, and textareas with translucent backdrops.",
      screenId: "input",
      code: `<Input placeholder="Search..." />`,
    },
    popover: {
      title: "Popover",
      desc: "Floating contextual popover bubble for extra actions.",
      screenId: "popover",
      code: `<Popover><PopoverContent>Content</PopoverContent></Popover>`,
    },
    progress: {
      title: "Progress & Slider",
      desc: "iOS volume and brightness styled progress meters and sliders.",
      screenId: "progress",
      code: `<Slider value={[50]} max={100} />`,
    },
    radio: {
      title: "Radio Group",
      desc: "Circular single-select radio items with system check indicators.",
      screenId: "radio",
      code: `<RadioGroup value={val} onValueChange={setVal}><RadioGroupItem value="1" /></RadioGroup>`,
    },
    select: {
      title: "Select",
      desc: "Mobile native and custom select menus.",
      screenId: "select",
      code: `<NativeSelect><option value="1">Option 1</option></NativeSelect>`,
    },
    sheet: {
      title: "Sheet / Drawer",
      desc: "Swipeable bottom drawer sheet with gesture-friendly handles.",
      screenId: "sheet",
      code: `<Sheet><SheetContent side="bottom">Content</SheetContent></Sheet>`,
    },
    switch: {
      title: "Switch",
      desc: "Cupertino rounded switches with smooth thumb sliding animation.",
      screenId: "switch",
      code: `<Switch checked={active} onCheckedChange={setActive} />`,
    },
    tabs: {
      title: "Tabs",
      desc: "iOS segmented controls for quick multi-view switching.",
      screenId: "tabs",
      code: `<Tabs defaultValue="tab1"><TabsList><TabsTrigger value="tab1">Tab 1</TabsTrigger></TabsList></Tabs>`,
    },
    toast: {
      title: "Toast",
      desc: "Subtle non-intrusive floating feedback alerts.",
      screenId: "toast",
      code: `toast.success("Saved successfully!")`,
    },
  }

  const comp = componentInfo[currentSection]

  if (comp) {
    return (
      <article className="max-w-2xl py-8 space-y-8 animate-in fade-in duration-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Component</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{comp.title}</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{comp.desc}</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight">CLI Preset Installation</h2>
          <CodeBlock code={`npx shadcn@latest add https://shadcn-ios.dev/r/${comp.screenId}.json`} />
          <p className="text-xs text-muted-foreground">
            Or with configured registry namespace: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">npx shadcn add @ios/{comp.screenId}</code>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight">Usage Example</h2>
          <CodeBlock code={comp.code} />
        </section>

        <section className="p-4 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
          <div>
            <div className="font-semibold text-sm">Preview in iPhone Frame</div>
            <div className="text-xs text-muted-foreground">Test live interactions on the device frame to the right</div>
          </div>
          <Button
            size="sm"
            onClick={() => onOpenMobilePreview?.(comp.screenId)}
            className="rounded-full"
          >
            Open in Frame
          </Button>
        </section>
      </article>
    )
  }

  // Fallback for general utilities
  return (
    <article className="max-w-2xl py-8 space-y-4 animate-in fade-in duration-200">
      <h1 className="text-3xl font-extrabold tracking-tight capitalize">{currentSection.replace("-", " ")}</h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Utility documentation and integration guides for the Shadcn-IOS design system.
      </p>
    </article>
  )
}
