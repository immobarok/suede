"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  ComposedChart,
  XAxis,
  YAxis,
  Label,
} from "recharts";
import { cn } from "@/lib/utils";
import { TrendingUp, Users, UserCheck, Activity, Zap, Calendar } from "lucide-react";

const weeklyData = [
  { date: "W1", signups: 12, trend: 8 },
  { date: "W2", signups: 18, trend: 15 },
  { date: "W3", signups: 25, trend: 22 },
  { date: "W4", signups: 22, trend: 20 },
  { date: "W5", signups: 35, trend: 30 },
  { date: "W6", signups: 42, trend: 38 },
  { date: "W7", signups: 38, trend: 35 },
  { date: "W8", signups: 45, trend: 42 },
];

const monthlyData = [
  { date: "Jan", signups: 45, trend: 40 },
  { date: "Feb", signups: 62, trend: 55 },
  { date: "Mar", signups: 88, trend: 80 },
  { date: "Apr", signups: 95, trend: 90 },
  { date: "May", signups: 120, trend: 110 },
  { date: "Jun", signups: 135, trend: 128 },
];

interface BaseStat {
  label: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

interface TrendStat extends BaseStat {
  type: "area" | "bar" | "step";
  chartData: { val: number }[];
}

interface PieStat extends BaseStat {
  type: "pie";
  chartData: { name: string; value: number; fill: string }[];
}

type StatItem = TrendStat | PieStat;

const stats: StatItem[] = [
  { 
    label: "Total Members", 
    value: "1,248", 
    change: "+12%", 
    icon: Users,
    type: "area",
    color: "from-violet-500 to-purple-600",
    chartData: [
      { val: 400 }, { val: 600 }, { val: 500 }, { val: 800 }, { val: 700 }, { val: 1248 }
    ]
  },
  { 
    label: "Active Profiles", 
    value: "1,024", 
    change: "+8%", 
    icon: UserCheck,
    type: "bar",
    color: "from-emerald-500 to-teal-600",
    chartData: [
      { val: 600 }, { val: 550 }, { val: 700 }, { val: 850 }, { val: 900 }, { val: 1024 }
    ]
  },
  { 
    label: "Consultations", 
    value: "186", 
    change: "+24%", 
    icon: Activity,
    type: "pie",
    color: "from-amber-500 to-orange-600",
    chartData: [
      { name: "Completed", value: 120, fill: "#f59e0b" },
      { name: "Pending", value: 45, fill: "#fbbf24" },
      { name: "Cancelled", value: 21, fill: "#fef3c7" },
    ]
  },
  { 
    label: "Engagement", 
    value: "42.5%", 
    change: "+5.2%", 
    icon: Zap,
    type: "step",
    color: "from-blue-500 to-indigo-600",
    chartData: [
      { val: 32 }, { val: 38 }, { val: 45 }, { val: 30 }, { val: 48 }, { val: 42.5 }
    ]
  },
];

export default function AdminGrowthPage() {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");
  const data = view === "weekly" ? weeklyData : monthlyData;

  return (
    <section className="space-y-8 pb-12">
      {/* Dynamic Header Section - Matching Overview Page */}
      

      {/* Stats Cards - Matching Overview Page Size and Structure */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6 transition-all hover:bg-card hover:shadow-md hover:border-primary/20"
          >
            <div className={cn(
              "absolute -right-4 -top-4 size-24 bg-gradient-to-br opacity-5 rounded-full blur-2xl transition-opacity group-hover:opacity-10",
              stat.color
            )} />
            
            <div className="relative flex items-start justify-between z-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <stat.icon className="size-4" />
                  <p className="text-[10px] tracking-wider font-semibold uppercase">{stat.label}</p>
                </div>
                
                <p className="font-cormorant text-3xl mb-1 group-hover:text-primary transition-colors">{stat.value}</p>
                
                <div className={cn(
                  "inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100/50",
                  stat.change.startsWith("-") && "bg-rose-50 text-rose-600 ring-rose-100/50"
                )}>
                  <TrendingUp className="size-2.5" />
                  {stat.change}
                </div>
              </div>
              
              <div className="w-16 h-10 flex-shrink-0 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  {stat.type === "area" ? (
                    <AreaChart data={stat.chartData}>
                      <Area 
                        type="monotone" 
                        dataKey="val" 
                        stroke="#8b5cf6" 
                        strokeWidth={2} 
                        fill="#8b5cf6" 
                        fillOpacity={0.1}
                        dot={false}
                      />
                    </AreaChart>
                  ) : stat.type === "bar" ? (
                    <BarChart data={stat.chartData}>
                      <Bar dataKey="val" radius={[2, 2, 2, 2]}>
                        {stat.chartData.map((_, i) => (
                          <Cell 
                            key={i} 
                            fill={i === stat.chartData.length - 1 ? "#10b981" : "#d1fae5"} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : stat.type === "pie" ? (
                    <PieChart>
                      <Pie
                        data={stat.chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={12}
                        outerRadius={18}
                        paddingAngle={4}
                      />
                    </PieChart>
                  ) : (
                    <LineChart data={stat.chartData}>
                      <Line 
                        type="stepAfter" 
                        dataKey="val" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Section - Matching Overview Page 2-Column Structure */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative overflow-hidden bg-background/40 backdrop-blur-xl rounded-2xl border border-border/50 p-8 shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-primary text-[10px] font-semibold tracking-wider uppercase mb-2">
                  Registration Metrics
                </p>
                <h3 className="font-cormorant text-2xl">Signups Velocity</h3>
              </div>
              
              <div className="flex gap-1 rounded-xl bg-secondary/50 p-1 ring-1 ring-border/50 backdrop-blur-sm">
                <button
                  onClick={() => setView("weekly")}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all",
                    view === "weekly"
                      ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Calendar className="size-3" />
                  Weekly
                </button>
                <button
                  onClick={() => setView("monthly")}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all",
                    view === "monthly"
                      ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Calendar className="size-3" />
                  Monthly
                </button>
              </div>
            </div>

            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 600 }}
                    dy={10}
                  >
                    <Label value="Time Period" offset={-5} position="insideBottom" fill="hsl(var(--muted-foreground))" fontSize={10} fontWeight={600} />
                  </XAxis>
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 600 }}
                  >
                    <Label value="Signups" angle={-90} position="insideLeft" offset={10} fill="hsl(var(--muted-foreground))" fontSize={10} fontWeight={600} />
                  </YAxis>
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted)/0.5)', radius: 8 }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-md">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
                            <p className="mt-1 text-xl font-black text-foreground">{payload[0].value} <span className="text-[10px] font-normal text-muted-foreground">new users</span></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="signups" 
                    barSize={40} 
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="signups" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-background/40 backdrop-blur-xl rounded-2xl border border-border/50 p-8 shadow-sm flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-blue-500/5 to-transparent rounded-full blur-3xl" />
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="mb-8">
              <p className="text-blue-500 text-[10px] font-semibold tracking-wider uppercase mb-2">
                Growth Insights
              </p>
              <h3 className="font-cormorant text-2xl">Strategy Summary</h3>
            </div>
            
            <div className="space-y-4 flex-1">
              {[
                { label: "Acquisition Rate", value: "+14.2%", trend: "up" },
                { label: "User Retention", value: "88.5%", trend: "up" },
                { label: "Community Growth", value: "Low", trend: "neutral" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="group flex items-center justify-between gap-4 rounded-xl bg-card/60 backdrop-blur-md border border-border/40 px-5 py-4 transition-all hover:bg-card hover:shadow-sm hover:border-primary/20"
                >
                  <div className="flex flex-col">
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-tight">{item.label}</p>
                    <p className="text-foreground text-sm font-semibold">{item.value}</p>
                  </div>
                  <div className={cn(
                    "flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary",
                    item.trend === "up" ? "text-emerald-500 bg-emerald-500/10" : "text-blue-500 bg-blue-500/10"
                  )}>
                    <TrendingUp className="size-4" />
                  </div>
                </div>
              ))}
              
              <div className="flex flex-1 min-h-[100px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-card/30 px-6 py-6 text-center">
                <p className="text-muted-foreground text-xs max-w-[150px] leading-relaxed">
                  More cohort data and conversion funnels coming soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
