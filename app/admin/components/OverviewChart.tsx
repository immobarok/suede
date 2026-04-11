"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface ChartData {
  date: string;
  signups: number;
}

interface OverviewChartProps {
  data?: ChartData[];
  className?: string;
}

const defaultData: ChartData[] = [
  { date: "Mon", signups: 12 },
  { date: "Tue", signups: 18 },
  { date: "Wed", signups: 25 },
  { date: "Thu", signups: 22 },
  { date: "Fri", signups: 35 },
  { date: "Sat", signups: 42 },
  { date: "Sun", signups: 38 },
];

const chartConfig = {
  signups: {
    label: "New Signups",
    color: "hsl(var(--foreground))",
  },
};

export function OverviewChart({
  data = defaultData,
  className,
}: OverviewChartProps) {
  const [view, setView] = useState<"week" | "month">("week");

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-cormorant text-xl">Member Growth</p>
          <p className="text-muted-foreground text-xs">New signups over time</p>
        </div>
        <div className="border-border flex gap-1 rounded-lg border p-1">
          <button
            onClick={() => setView("week")}
            className={cn(
              "rounded-md px-3 py-1 text-xs transition-all",
              view === "week"
                ? "bg-foreground text-background"
                : "hover:bg-muted text-muted-foreground",
            )}
          >
            Week
          </button>
          <button
            onClick={() => setView("month")}
            className={cn(
              "rounded-md px-3 py-1 text-xs transition-all",
              view === "month"
                ? "bg-foreground text-background"
                : "hover:bg-muted text-muted-foreground",
            )}
          >
            Month
          </button>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="overviewGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--foreground))"
                stopOpacity={0.1}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--foreground))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
          />
          <ChartTooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                label={label}
                className="border-border bg-card rounded-xl font-sans"
              />
            )}
          />
          <Area
            type="monotone"
            dataKey="signups"
            stroke="hsl(var(--foreground))"
            strokeWidth={1.5}
            fill="url(#overviewGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "hsl(var(--foreground))" }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
