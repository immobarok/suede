"use client";

import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

// Sample data - replace with your actual API data
const weeklyData = [
  { date: "Week 1", signups: 12 },
  { date: "Week 2", signups: 18 },
  { date: "Week 3", signups: 25 },
  { date: "Week 4", signups: 22 },
  { date: "Week 5", signups: 35 },
  { date: "Week 6", signups: 42 },
  { date: "Week 7", signups: 38 },
  { date: "Week 8", signups: 45 },
];

const monthlyData = [
  { date: "Jan", signups: 45 },
  { date: "Feb", signups: 62 },
  { date: "Mar", signups: 88 },
  { date: "Apr", signups: 95 },
  { date: "May", signups: 120 },
  { date: "Jun", signups: 135 },
];

const chartConfig = {
  signups: {
    label: "New Signups",
    color: "hsl(var(--foreground))",
  },
};

export default function AdminGrowthPage() {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");
  const data = view === "weekly" ? weeklyData : monthlyData;

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Insights
        </p>
        <h2 className="font-cormorant text-3xl">Growth Panel</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Track member signups over time and compare weekly vs monthly growth.
        </p>
      </div>

      {/* Chart Card */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Signups Over Time</p>
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setView("weekly")}
              className={cn(
                "rounded-full border px-3 py-1 transition-all duration-200",
                view === "weekly"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50"
              )}
            >
              Weekly
            </button>
            <button
              onClick={() => setView("monthly")}
              className={cn(
                "rounded-full border px-3 py-1 transition-all duration-200",
                view === "monthly"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50"
              )}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="mt-6 h-64 w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="signupGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
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
                    className="rounded-xl border-border bg-card"
                  />
                )}
              />
              <Area
                type="monotone"
                dataKey="signups"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                fill="url(#signupGradient)"
                dot={{ fill: "hsl(var(--foreground))", strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, fill: "hsl(var(--foreground))" }}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Members with complete profiles", value: "1,248" },
          { label: "Members with incomplete profiles", value: "432" },
          { label: "Members who used consultation", value: "186" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-3 font-cormorant text-3xl">{stat.value}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>+12% from last period</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}