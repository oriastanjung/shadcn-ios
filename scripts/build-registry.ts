import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const UI_DIR = join(import.meta.dirname, "../src/components/ui")
const OUT_DIR = join(import.meta.dirname, "../public/r")
const CSS_PATH = join(import.meta.dirname, "../src/index.css")

mkdirSync(OUT_DIR, { recursive: true })

const files = readdirSync(UI_DIR).filter((f) => f.endsWith(".tsx"))
const items: Array<{
  name: string
  type: string
  files: Array<{ path: string; content: string; type: string }>
  dependencies: string[]
}> = []

for (const file of files) {
  const name = file.replace(/\.tsx$/, "")
  const filePath = join(UI_DIR, file)
  const content = readFileSync(filePath, "utf-8")

  const deps: string[] = ["class-variance-authority", "clsx", "tailwind-merge"]
  if (content.includes('from "radix-ui"')) deps.push("radix-ui")
  if (content.includes('from "lucide-react"')) deps.push("lucide-react")
  if (content.includes('from "cmdk"')) deps.push("cmdk")
  if (content.includes('from "vaul"')) deps.push("vaul")
  if (content.includes('from "sonner"')) deps.push("sonner")
  if (content.includes('from "input-otp"')) deps.push("input-otp")
  if (content.includes('from "@base-ui/react"')) deps.push("@base-ui/react")
  if (content.includes('from "recharts"')) deps.push("recharts")
  if (content.includes('from "react-day-picker"')) deps.push("react-day-picker")
  if (content.includes('from "embla-carousel-react"')) deps.push("embla-carousel-react")

  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:ui",
    files: [
      {
        path: `components/ui/${file}`,
        content,
        type: "registry:ui",
      },
    ],
    dependencies: Array.from(new Set(deps)),
  }

  writeFileSync(join(OUT_DIR, `${name}.json`), JSON.stringify(registryItem, null, 2))
  items.push(registryItem)
}

const cssContent = readFileSync(CSS_PATH, "utf-8")
const themeItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "theme",
  type: "registry:theme",
  files: [
    {
      path: "index.css",
      content: cssContent,
      type: "registry:theme",
    },
  ],
}
writeFileSync(join(OUT_DIR, "theme.json"), JSON.stringify(themeItem, null, 2))

const allItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "all",
  type: "registry:ui",
  description: "Install all Shadcn-IOS components at once.",
  registryDependencies: items.map((i) => i.name),
  files: [],
  dependencies: Array.from(new Set(items.flatMap((i) => i.dependencies))),
}
writeFileSync(join(OUT_DIR, "all.json"), JSON.stringify(allItem, null, 2))

const registryIndex = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "shadcn-ios",
  description: "Konsta UI iOS style and tokens preset for shadcn.",
  homepage: "https://github.com/oriastanjung/shadcn-ios",
  items,
}

writeFileSync(join(OUT_DIR, "index.json"), JSON.stringify(registryIndex, null, 2))
console.log(`Generated ${items.length + 2} registry items in ${OUT_DIR}`)
