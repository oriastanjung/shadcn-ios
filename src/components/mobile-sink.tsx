import * as React from "react"
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Layers,
  Sliders,
  Type,
  SquareCheck,
  CircleDot,
  ToggleLeft,
  CreditCard,
  MessageSquare,
  Sparkles,
  Search,
  Bell,
  Trash2,
  Share2,
  Bookmark,
  Info,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { NativeSelect } from "@/components/ui/native-select"

export type ScreenId =
  | "home"
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

interface MobileSinkProps {
  activeScreen?: ScreenId
  onScreenChange?: (screen: ScreenId) => void
  isDark?: boolean
  onToggleDark?: () => void
  accentColor?: string
  onChangeAccent?: (color: string) => void
}

export function MobileSink({
  activeScreen = "home",
  onScreenChange,
  isDark = false,
  onToggleDark,
  accentColor = "#007aff",
  onChangeAccent,
}: MobileSinkProps) {
  const [internalScreen, setInternalScreen] = React.useState<ScreenId>(activeScreen)
  const [themeMode, setThemeMode] = React.useState<"ios" | "material">("ios")
  const [sliderVal, setSliderVal] = React.useState([65])
  const [radioVal, setRadioVal] = React.useState("option-1")
  const [switch1, setSwitch1] = React.useState(true)
  const [switch2, setSwitch2] = React.useState(false)
  const [checkbox1, setCheckbox1] = React.useState(true)
  const [checkbox2, setCheckbox2] = React.useState(false)
  const [showColorPicker, setShowColorPicker] = React.useState(false)

  // In-frame modal states (confined strictly to the phone chassis)
  const [isActionSheetOpen, setIsActionSheetOpen] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [inFrameToast, setInFrameToast] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (activeScreen && activeScreen !== internalScreen) {
      setInternalScreen(activeScreen)
    }
  }, [activeScreen])

  const navigateTo = (screen: ScreenId) => {
    setInternalScreen(screen)
    onScreenChange?.(screen)
  }

  const goBack = () => {
    navigateTo("home")
  }

  const showToast = (message: string) => {
    setInFrameToast(message)
    setTimeout(() => {
      setInFrameToast(null)
    }, 2400)
  }

  const colors = [
    { name: "Blue", value: "#007aff" },
    { name: "Teal", value: "#30b0c7" },
    { name: "Green", value: "#34c759" },
    { name: "Purple", value: "#af52de" },
    { name: "Indigo", value: "#5856d6" },
  ]

  const componentsList: { id: ScreenId; title: string; icon: React.ReactNode; color: string }[] = [
    { id: "action-sheet", title: "Action Sheet", icon: <Layers className="size-4" />, color: "#007aff" },
    { id: "badge", title: "Badge", icon: <Sparkles className="size-4" />, color: "#30b0c7" },
    { id: "breadcrumbs", title: "Breadcrumbs", icon: <ChevronRight className="size-4" />, color: "#5856d6" },
    { id: "button", title: "Button", icon: <CreditCard className="size-4" />, color: "#007aff" },
    { id: "card", title: "Card", icon: <CreditCard className="size-4" />, color: "#5856d6" },
    { id: "checkbox", title: "Checkbox", icon: <SquareCheck className="size-4" />, color: "#34c759" },
    { id: "dialog", title: "Dialog", icon: <MessageSquare className="size-4" />, color: "#007aff" },
    { id: "input", title: "Inputs & Form", icon: <Type className="size-4" />, color: "#007aff" },
    { id: "popover", title: "Popover", icon: <Info className="size-4" />, color: "#af52de" },
    { id: "progress", title: "Progress & Slider", icon: <Sliders className="size-4" />, color: "#30d158" },
    { id: "radio", title: "Radio Group", icon: <CircleDot className="size-4" />, color: "#007aff" },
    { id: "select", title: "Select", icon: <ChevronRight className="size-4" />, color: "#5856d6" },
    { id: "sheet", title: "Sheet / Drawer", icon: <Layers className="size-4" />, color: "#007aff" },
    { id: "switch", title: "Switch", icon: <ToggleLeft className="size-4" />, color: "#34c759" },
    { id: "tabs", title: "Tabs", icon: <Layers className="size-4" />, color: "#5856d6" },
    { id: "toast", title: "Toast", icon: <Bell className="size-4" />, color: "#30b0c7" },
  ]

  return (
    <div
      className="relative flex-1 flex flex-col text-sm antialiased select-none"
      style={{ "--primary": accentColor } as React.CSSProperties}
    >
      {/* IN-FRAME TOAST NOTIFICATION (Under Dynamic Island) */}
      {inFrameToast && (
        <div className="absolute top-2 inset-x-4 z-50 flex justify-center animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 rounded-full bg-card/95 text-foreground backdrop-blur-md border border-border shadow-lg flex items-center gap-2 text-xs font-semibold">
            <Check className="size-3.5 text-primary stroke-[3]" />
            <span>{inFrameToast}</span>
          </div>
        </div>
      )}

      {/* Phone Navigation Bar */}
      {internalScreen === "home" ? (
        <div className="px-5 pt-3 pb-2">
          <h1 className="text-2xl font-bold tracking-tight">Shadcn-IOS</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Referenced from Konsta UI</p>
        </div>
      ) : (
        <div className="sticky top-0 z-20 flex items-center justify-between px-3 py-2.5 bg-background/80 backdrop-blur-md border-b border-border">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-primary font-medium text-sm active:opacity-60 transition-opacity"
          >
            <ChevronLeft className="size-5 -ml-1.5" />
            <span>Back</span>
          </button>
          <span className="font-semibold text-sm capitalize">
            {componentsList.find((c) => c.id === internalScreen)?.title || internalScreen}
          </span>
          <div className="w-12" />
        </div>
      )}

      {/* Screen Body */}
      <div className="flex-1 px-4 py-3 space-y-4 pb-8">
        {internalScreen === "home" && (
          <>
            {/* Theme Selection Group */}
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
                Design Theme
              </div>
              <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-sm">
                <button
                  onClick={() => setThemeMode("ios")}
                  className="w-full flex items-center justify-between px-4 py-3 text-left active:bg-muted/40 transition-colors"
                >
                  <span className="font-medium text-foreground">iOS Theme</span>
                  {themeMode === "ios" && <Check className="size-4 text-primary stroke-[2.5]" />}
                </button>
                <button
                  onClick={() => setThemeMode("material")}
                  className="w-full flex items-center justify-between px-4 py-3 text-left active:bg-muted/40 transition-colors"
                >
                  <span className="font-medium text-foreground">Material Theme</span>
                  {themeMode === "material" && <Check className="size-4 text-primary stroke-[2.5]" />}
                </button>
              </div>
            </div>

            {/* Dark Mode & Accent Color Inset Group */}
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
                Preferences
              </div>
              <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-medium text-foreground">Dark Mode</span>
                  <Switch checked={isDark} onCheckedChange={onToggleDark} />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left active:bg-muted/40 transition-colors"
                  >
                    <span className="font-medium text-foreground">Accent Color</span>
                    <div className="flex items-center gap-2">
                      <div className="size-4 rounded-full ring-2 ring-background" style={{ backgroundColor: accentColor }} />
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  </button>
                  {showColorPicker && (
                    <div className="px-4 py-2 bg-muted/30 flex items-center justify-around border-t border-border">
                      {colors.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => {
                            onChangeAccent?.(c.value)
                            setShowColorPicker(false)
                          }}
                          className={`size-6 rounded-full flex items-center justify-center transition-transform ${
                            accentColor === c.value ? "scale-115 ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                          }`}
                          style={{ backgroundColor: c.value }}
                        >
                          {accentColor === c.value && <Check className="size-3 text-white stroke-[3]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Components Inset List */}
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
                Components
              </div>
              <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-sm">
                {componentsList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 text-left active:bg-muted/40 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="size-7 rounded-[8px] flex items-center justify-center text-white shrink-0 shadow-xs"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.icon}
                      </div>
                      <span className="font-medium text-foreground text-sm">{item.title}</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 1. BUTTON DETAIL */}
        {internalScreen === "button" && (
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-4 border border-border space-y-3 shadow-sm">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Standard Variants</div>
              <div className="space-y-2">
                <Button className="w-full">Default Action</Button>
                <Button variant="secondary" className="w-full">Secondary Button</Button>
                <Button variant="outline" className="w-full">Outline Button</Button>
                <Button variant="ghost" className="w-full">Ghost Pill</Button>
                <Button variant="destructive" className="w-full">Destructive Action</Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 border border-border space-y-3 shadow-sm">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Sizes & Icons</div>
              <div className="flex items-center justify-between gap-2">
                <Button size="sm" className="flex-1">Small</Button>
                <Button size="default" className="flex-1">Medium</Button>
                <Button size="lg" className="flex-1">Large</Button>
              </div>
              <Button className="w-full flex items-center justify-center gap-2">
                <Sparkles className="size-4" />
                <span>With Icon</span>
              </Button>
            </div>
          </div>
        )}

        {/* 2. SWITCH DETAIL */}
        {internalScreen === "switch" && (
          <div className="space-y-4">
            <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="font-medium">Airplane Mode</div>
                  <div className="text-xs text-muted-foreground">Disable wireless connections</div>
                </div>
                <Switch checked={switch1} onCheckedChange={setSwitch1} />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="font-medium">Wi-Fi</div>
                  <div className="text-xs text-muted-foreground">Automatic network connection</div>
                </div>
                <Switch checked={switch2} onCheckedChange={setSwitch2} />
              </div>
              <div className="flex items-center justify-between px-4 py-3 opacity-50">
                <div>
                  <div className="font-medium">Bluetooth (Disabled)</div>
                  <div className="text-xs text-muted-foreground">Disabled control state</div>
                </div>
                <Switch disabled checked={false} />
              </div>
            </div>
          </div>
        )}

        {/* 3. CHECKBOX DETAIL */}
        {internalScreen === "checkbox" && (
          <div className="space-y-4">
            <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-sm">
              <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-xs text-muted-foreground">Real-time alerts</div>
                </div>
                <Checkbox checked={checkbox1} onCheckedChange={(v) => setCheckbox1(!!v)} />
              </label>
              <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
                <div>
                  <div className="font-medium">Weekly Newsletter</div>
                  <div className="text-xs text-muted-foreground">Digest of top articles</div>
                </div>
                <Checkbox checked={checkbox2} onCheckedChange={(v) => setCheckbox2(!!v)} />
              </label>
            </div>
          </div>
        )}

        {/* 4. RADIO DETAIL */}
        {internalScreen === "radio" && (
          <div className="space-y-4">
            <RadioGroup value={radioVal} onValueChange={setRadioVal}>
              <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden shadow-sm">
                <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
                  <span className="font-medium">Instant Payment (Apple Pay)</span>
                  <RadioGroupItem value="option-1" />
                </label>
                <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
                  <span className="font-medium">Credit or Debit Card</span>
                  <RadioGroupItem value="option-2" />
                </label>
                <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
                  <span className="font-medium">Bank Transfer</span>
                  <RadioGroupItem value="option-3" />
                </label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* 5. INPUT & FORM DETAIL */}
        {internalScreen === "input" && (
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-4 border border-border space-y-3 shadow-sm">
              <div className="text-xs font-semibold uppercase text-muted-foreground">iOS Text Inputs</div>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input placeholder="Search apps or files..." className="pl-9" />
                </div>
                <Input placeholder="Full Name" defaultValue="John Appleseed" />
                <Input placeholder="Email Address" type="email" defaultValue="user@apple.com" />
                <Textarea placeholder="Additional notes (multi-line)..." rows={3} />
              </div>
            </div>
          </div>
        )}

        {/* 6. BADGE DETAIL */}
        {internalScreen === "badge" && (
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-4 border border-border space-y-3 shadow-sm">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Capsule Badges</div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Critical</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
          </div>
        )}

        {/* 7. PROGRESS & SLIDER */}
        {internalScreen === "progress" && (
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-4 border border-border space-y-4 shadow-sm">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span>Audio Volume</span>
                  <span>{sliderVal[0]}%</span>
                </div>
                <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span>Download Progress</span>
                  <span>78%</span>
                </div>
                <Progress value={78} />
              </div>
            </div>
          </div>
        )}

        {/* 8. DIALOG DETAIL (IN-FRAME ONLY) */}
        {internalScreen === "dialog" && (
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-4 border border-border space-y-3 shadow-sm">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Cupertino Dialog</div>
              <p className="text-xs text-muted-foreground">
                Opens an iOS modal dialog strictly confined inside this device frame.
              </p>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => setIsDialogOpen(true)}
              >
                Open Delete Dialog
              </Button>
            </div>
          </div>
        )}

        {/* 9. ACTION SHEET DETAIL (IN-FRAME ONLY) */}
        {internalScreen === "action-sheet" && (
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-4 border border-border space-y-3 shadow-sm">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Action Sheet</div>
              <p className="text-xs text-muted-foreground">
                Opens a slide-up iOS action sheet strictly confined inside this device frame.
              </p>
              <Button
                className="w-full"
                onClick={() => setIsActionSheetOpen(true)}
              >
                Open Action Sheet
              </Button>
            </div>
          </div>
        )}

        {/* 10. TABS DETAIL */}
        {internalScreen === "tabs" && (
          <div className="space-y-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="archive">Archive</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-3">
                <div className="bg-card rounded-2xl p-4 border border-border text-center text-xs text-muted-foreground">
                  Displaying all workspace items
                </div>
              </TabsContent>
              <TabsContent value="favorites" className="mt-3">
                <div className="bg-card rounded-2xl p-4 border border-border text-center text-xs text-muted-foreground">
                  Your bookmarked items
                </div>
              </TabsContent>
              <TabsContent value="archive" className="mt-3">
                <div className="bg-card rounded-2xl p-4 border border-border text-center text-xs text-muted-foreground">
                  Archived files history
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* 11. CARD DETAIL */}
        {internalScreen === "card" && (
          <div className="space-y-3">
            <Card className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Apple Music</CardTitle>
                <CardDescription className="text-xs">Listen to over 100 million songs</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Lossless audio with Spatial Audio support.
              </CardContent>
            </Card>
          </div>
        )}

        {/* 12. BREADCRUMBS DETAIL */}
        {internalScreen === "breadcrumbs" && (
          <div className="space-y-3">
            <div className="bg-card rounded-2xl p-4 border border-border">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        )}

        {/* 13. SELECT DETAIL */}
        {internalScreen === "select" && (
          <div className="space-y-3">
            <div className="bg-card rounded-2xl p-4 border border-border space-y-2">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Native Select iOS</div>
              <NativeSelect defaultValue="en">
                <option value="en">English (US)</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="ja">Japanese</option>
              </NativeSelect>
            </div>
          </div>
        )}

        {/* 14. POPOVER DETAIL (IN-FRAME ONLY) */}
        {internalScreen === "popover" && (
          <div className="space-y-3">
            <div className="bg-card rounded-2xl p-4 border border-border space-y-3">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Popover Info</div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              >
                {isPopoverOpen ? "Close Popover" : "Toggle In-Frame Popover"}
              </Button>
              {isPopoverOpen && (
                <div className="p-3 rounded-2xl bg-card border border-border text-xs shadow-md animate-in fade-in-0 duration-150">
                  <div className="font-semibold mb-1">Account Info</div>
                  <div className="text-muted-foreground">
                    Shadcn-IOS delivers high-fidelity iOS aesthetics inside your React app.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 15. SHEET / DRAWER (IN-FRAME ONLY) */}
        {internalScreen === "sheet" && (
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-4 border border-border space-y-3 shadow-sm">
              <div className="text-xs font-semibold uppercase text-muted-foreground">Bottom Drawer</div>
              <Button className="w-full" onClick={() => setIsDrawerOpen(true)}>
                Open Bottom Drawer
              </Button>
            </div>
          </div>
        )}

        {/* 16. TOAST DETAIL (IN-FRAME ONLY) */}
        {internalScreen === "toast" && (
          <div className="space-y-3">
            <div className="bg-card rounded-2xl p-4 border border-border space-y-2">
              <div className="text-xs font-semibold uppercase text-muted-foreground">In-Frame Feedback Toast</div>
              <Button
                className="w-full"
                onClick={() => showToast("Changes saved successfully!")}
              >
                Trigger Success Toast
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => showToast("Network connected")}
              >
                Trigger Info Toast
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* IN-FRAME MODAL OVERLAYS (STRICTLY CONTAINED TO PHONE CHASSIS) */}
      {/* ------------------------------------------------------------- */}

      {/* 1. In-Frame Action Sheet */}
      {isActionSheetOpen && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end p-2.5 animate-in fade-in duration-200">
          <div className="w-full space-y-2 animate-in slide-in-from-bottom duration-250">
            {/* Action Group */}
            <div className="bg-card/95 rounded-2xl border border-border divide-y divide-border overflow-hidden text-center shadow-lg">
              <div className="py-2.5 px-4 text-xs font-medium text-muted-foreground">
                Actions for File
              </div>
              <button
                onClick={() => {
                  setIsActionSheetOpen(false)
                  showToast("Link copied to clipboard")
                }}
                className="w-full py-3 px-4 text-sm font-medium text-primary active:bg-muted/40 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="size-4" />
                <span>Share Link</span>
              </button>
              <button
                onClick={() => {
                  setIsActionSheetOpen(false)
                  showToast("Added to Favorites")
                }}
                className="w-full py-3 px-4 text-sm font-medium text-primary active:bg-muted/40 transition-colors flex items-center justify-center gap-2"
              >
                <Bookmark className="size-4" />
                <span>Save to Favorites</span>
              </button>
              <button
                onClick={() => {
                  setIsActionSheetOpen(false)
                  showToast("File deleted")
                }}
                className="w-full py-3 px-4 text-sm font-medium text-destructive active:bg-muted/40 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="size-4" />
                <span>Delete File</span>
              </button>
            </div>

            {/* Cancel Button */}
            <div className="bg-card/95 rounded-2xl border border-border overflow-hidden shadow-lg">
              <button
                onClick={() => setIsActionSheetOpen(false)}
                className="w-full py-3 px-4 text-sm font-semibold text-primary active:bg-muted/40 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. In-Frame Alert Dialog */}
      {isDialogOpen && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-[270px] bg-card/95 rounded-3xl border border-border p-5 text-center shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div>
              <div className="font-bold text-base text-foreground">Delete This File?</div>
              <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                This action cannot be undone. Are you sure you want to proceed?
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <Button
                variant="destructive"
                className="w-full rounded-xl"
                onClick={() => {
                  setIsDialogOpen(false)
                  showToast("File removed")
                }}
              >
                Delete
              </Button>
              <Button
                variant="secondary"
                className="w-full rounded-xl"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 3. In-Frame Drawer Sheet */}
      {isDrawerOpen && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-card rounded-t-3xl border-t border-border p-4 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-250">
            <div className="flex items-center justify-between pb-1 border-b border-border">
              <div className="font-semibold text-sm">Workspace Drawer</div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              This drawer is rendered 100% inside the phone frame without leaking onto the parent browser window.
            </div>
            <Button className="w-full" onClick={() => setIsDrawerOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
