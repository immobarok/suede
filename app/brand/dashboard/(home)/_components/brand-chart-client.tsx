"use client"

import { MessageSquare } from "lucide-react";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  XAxis, 
  YAxis,
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "May 7", reviews: 10 },
  { date: "May 14", reviews: 22 },
  { date: "May 21", reviews: 18 },
  { date: "May 28", reviews: 25 },
  { date: "June 4", reviews: 32 },
  { date: "June 11", reviews: 28 },
  { date: "June 18", reviews: 45 },
  { date: "June 25", reviews: 35 },
  { date: "July 2", reviews: 20 },
  { date: "July 9", reviews: 25 },
  { date: "July 16", reviews: 35 },
  { date: "July 23", reviews: 22 },
  { date: "July 30", reviews: 20 },
  { date: "Aug 6", reviews: 38 },
  { date: "Aug 13", reviews: 32 },
];

const chartConfig = {
  reviews: {
    label: "Reviews",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function BrandChartClient() {
  return (
    <Card className="border-0 shadow-none bg-transparent rounded-none">
      <CardHeader className="px-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black/5 rounded-sm flex items-center justify-center">
            <MessageSquare size={16} className="text-black/60" />
          </div>
          <CardTitle className="text-xl font-medium tracking-tight">Review Count Overtime</CardTitle>
        </div>
        <span className="text-[10px] text-black/40 uppercase font-bold tracking-widest">Last 90 days</span>
      </CardHeader>
      <CardContent className="px-0 pt-10">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-reviews)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-reviews)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={true} horizontal={true} strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "rgba(0,0,0,0.4)" }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "rgba(0,0,0,0.4)" }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="reviews"
              stroke="var(--color-reviews)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorReviews)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
