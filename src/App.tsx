import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Moon, Sun } from "lucide-react"

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [toggleChecked, setToggleChecked] = useState(true)
  const [sliderVal, setSliderVal] = useState([65])
  const [radioVal, setRadioVal] = useState("option-1")

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors p-4 sm:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex items-center justify-between pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Shadcn-IOS</h1>
            <p className="text-sm text-muted-foreground">
              Konsta UI iOS style and design tokens built for shadcn components.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
        </header>

        <Tabs defaultValue="components" className="w-full">
          <TabsList>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="forms">Form Controls</TabsTrigger>
            <TabsTrigger value="dialogs">Dialogs</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>iOS action pills with smooth tap states</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Rounded capsule badges</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Badge variant="default">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress & Sliders</CardTitle>
                <CardDescription>Smooth range and track bars</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="mb-2 text-sm font-medium">Progress Bar</div>
                  <Progress value={65} />
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium">Range Slider ({sliderVal[0]}%)</div>
                  <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forms" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Inputs & Controls</CardTitle>
                <CardDescription>Cupertino-styled switches, radios, and inputs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Text Field</label>
                  <Input placeholder="Enter your text here..." />
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/60">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Notification Toggle</div>
                    <div className="text-xs text-muted-foreground">Receive push notifications</div>
                  </div>
                  <Switch checked={toggleChecked} onCheckedChange={setToggleChecked} />
                </div>

                <div className="flex items-center gap-3 py-2 border-b border-border/60">
                  <Checkbox id="terms" defaultChecked />
                  <label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                    Circular iOS Checkbox
                  </label>
                </div>

                <div className="py-2">
                  <div className="mb-3 text-sm font-medium">Radio Group</div>
                  <RadioGroup value={radioVal} onValueChange={setRadioVal} className="gap-3">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="option-1" id="r1" />
                      <label htmlFor="r1" className="text-sm font-medium cursor-pointer">
                        First Selection
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="option-2" id="r2" />
                      <label htmlFor="r2" className="text-sm font-medium cursor-pointer">
                        Second Selection
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dialogs" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Modal Sheet & Dialog</CardTitle>
                <CardDescription>Backdrop blur and rounded-3xl sheets</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Action</DialogTitle>
                      <DialogDescription>
                        This is an iOS-style alert dialog with glass backdrop and smooth corner curves.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="default">Done</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="pt-8 text-center text-xs text-muted-foreground">
          Shadcn-IOS · Konsta UI Theme Tokens &amp; Tailwind CSS
        </footer>
      </div>
    </div>
  )
}
