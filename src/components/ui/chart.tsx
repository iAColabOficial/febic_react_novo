import * as React from "react"
import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

// Simplified chart components for basic usage without recharts
const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <div className="chart-tooltip">{children}</div>
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    label?: string
    payload?: Array<{
      name?: string
      value?: any
      color?: string
    }>
  }
>(({ className, label, payload, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-background p-2 shadow-md",
        className
      )}
      {...props}
    >
      {label && <div className="font-medium mb-2">{label}</div>}
      {payload?.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.color && (
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
          )}
          <span>{item.name}: {item.value}</span>
        </div>
      ))}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <div className="chart-legend">{children}</div>
}

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: Array<{
      value?: string
      color?: string
    }>
  }
>(({ className, payload, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4 pt-3", className)}
      {...props}
    >
      {payload?.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: item.color }}
          />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  useChart,
}