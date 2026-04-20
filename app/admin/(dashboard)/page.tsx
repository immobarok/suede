import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Sparkles, 
  Activity, 
  Edit3, 
  Users,
  UserCheck,
  Zap,
  Clock,
  MessageSquare,
  ClipboardList,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  MoreHorizontal
} from "lucide-react";
import { db } from "@/db";
import { 
  profiles, 
  reviews, 
  reviewRequests, 
  consultationSessions, 
  brandSuggestions, 
  platformFeedback, 
  brandContactRequests 
} from "@/db/schema";
import { count, eq, isNotNull, sql } from "drizzle-orm";
import { cn, formatDuration } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard | SUEDE",
  description: "Real-time platform analytics and operational overview",
  robots: { index: false, follow: false },
};

// Sparkline Component (inline for the example)
function Sparkline({ data, color = "blue" }: { data: number[]; color?: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 80 - 10; // 10% padding
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-12 w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon 
          points={`0,100 ${points} 100,100`} 
          fill={`url(#grad-${color})`} 
          className={`text-${color}-500`}
        />
        <polyline 
          points={points} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`text-${color}-500`}
        />
      </svg>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // Data fetching (same as before)
  const [memberStats] = await db.select({
    total: count(),
    newWeek: sql<number>`count(*) filter (where ${profiles.createdAt} >= ${weekAgo})`,
    newMonth: sql<number>`count(*) filter (where ${profiles.createdAt} >= ${monthAgo})`,
    complete: sql<number>`count(*) filter (where ${profiles.bustCm} is not null and ${profiles.waistCm} is not null and ${profiles.hipsCm} is not null)`,
  }).from(profiles);

  const [consultationStat] = await db.select({ count: count() }).from(consultationSessions);
  
  const [avgOnboardingStat] = await db.select({
    avgMs: sql<number>`AVG(EXTRACT(EPOCH FROM (${profiles.measurementsCompletedAt} - ${profiles.createdAt})) * 1000)`
  }).from(profiles).where(isNotNull(profiles.measurementsCompletedAt));

  const [reviewStat] = await db.select({ total: count() }).from(reviews);
  const [inquiryStat] = await db.select({ total: count() }).from(reviewRequests);

  const [avgFirstReviewStat] = await db.execute(sql`
    SELECT AVG(EXTRACT(EPOCH FROM (r.first_review_at - p.created_at)) * 1000) as avg_ms
    FROM profiles p
    JOIN (SELECT user_id, MIN(created_at) as first_review_at FROM reviews GROUP BY user_id) r 
    ON p.id = r.user_id
  `);

  const [avgFirstInquiryStat] = await db.execute(sql`
    SELECT AVG(EXTRACT(EPOCH FROM (i.first_inquiry_at - p.created_at)) * 1000) as avg_ms
    FROM profiles p
    JOIN (SELECT user_id, MIN(created_at) as first_inquiry_at FROM review_requests GROUP BY user_id) i 
    ON p.id = i.user_id
  `);

  const [avgFormReviewStat] = await db.select({
    avgMs: sql<number>`AVG(EXTRACT(EPOCH FROM (${reviews.createdAt} - ${reviews.reviewStartedAt})) * 1000)`
  }).from(reviews).where(isNotNull(reviews.reviewStartedAt));

  const [avgFormInquiryStat] = await db.select({
    avgMs: sql<number>`AVG(EXTRACT(EPOCH FROM (${reviewRequests.createdAt} - ${reviewRequests.inquiryStartedAt})) * 1000)`
  }).from(reviewRequests).where(isNotNull(reviewRequests.inquiryStartedAt));

  const [pendingSuggestions] = await db.select({ count: count() }).from(brandSuggestions).where(eq(brandSuggestions.status, 'pending'));
  const [unreadFeedback] = await db.select({ count: count() }).from(platformFeedback).where(eq(platformFeedback.status, 'new'));
  const [unreadContact] = await db.select({ count: count() }).from(brandContactRequests).where(eq(brandContactRequests.status, 'new'));

  // Mock trend data for sparklines (replace with real data)
  const memberTrend = [820, 950, 1020, 1080, 1150, 1180, 1220, memberStats.total];
  const reviewTrend = [150, 180, 220, 280, 340, 380, 420, reviewStat.total];

  return (
    <section className="space-y-8 pb-20 max-w-full mx-auto">
      
      {/* Modern Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">Insights</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg">
            Real-time monitoring of member growth, content engagement, and operational queues.
          </p>
        </div>
        
        <div className="flex items-center gap-3 text-xs font-medium">
          {/* <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            System Operational
          </span> */}
          <span className="text-muted-foreground">
            Updated {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {/* Large Card - Total Members */}
        <div className="md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-background border border-indigo-500/20 p-6 lg:p-8 group hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-500" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/25">
                  <Users className="size-5" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Total Members</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full text-xs font-semibold">
                <TrendingUp className="size-3" />
                +{memberStats.newWeek} this week
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-2">
                {memberStats.total.toLocaleString()}
              </div>
              <div className="h-16 mt-4 text-indigo-500">
                <Sparkline data={memberTrend} color="indigo" />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
              <span>{memberStats.complete} complete profiles</span>
              <span>{((memberStats.complete / memberStats.total) * 100).toFixed(1)}% completion rate</span>
            </div>
          </div>
        </div>

        {/* Medium Card - Content Activity */}
        <div className="md:col-span-1 lg:col-span-1 relative overflow-hidden rounded-3xl bg-card border border-border p-6 group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <Edit3 className="size-4" />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">
                +12%
              </span>
            </div>
            
            <div className="text-3xl font-bold text-foreground mb-1">{reviewStat.total}</div>
            <div className="text-sm text-muted-foreground mb-4">Total Reviews</div>
            
            <div className="h-10 text-emerald-500">
              <Sparkline data={reviewTrend} color="emerald" />
            </div>
          </div>
        </div>

        {/* Medium Card - Inquiries */}
        <div className="md:col-span-1 lg:col-span-1 relative overflow-hidden rounded-3xl bg-card border border-border p-6 group hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <MessageSquare className="size-4" />
              </div>
              <span className="text-xs font-medium text-amber-600 bg-amber-500/10 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            
            <div className="text-3xl font-bold text-foreground mb-1">{inquiryStat.total}</div>
            <div className="text-sm text-muted-foreground mb-4">Total Inquiries</div>
            
            <div className="flex items-center gap-2 mt-4">
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-amber-500 rounded-full" />
              </div>
              <span className="text-xs text-muted-foreground">65% response rate</span>
            </div>
          </div>
        </div>

        {/* Small Cards - Quick Stats Row */}
        <div className="md:col-span-3 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { 
              label: "New This Week", 
              value: memberStats.newWeek, 
              icon: Activity, 
              color: "blue",
              trend: "up"
            },
            { 
              label: "Consultations", 
              value: consultationStat.count, 
              icon: Zap, 
              color: "violet",
              trend: "neutral"
            },
            { 
              label: "Avg Setup Time", 
              value: formatDuration(avgOnboardingStat?.avgMs), 
              icon: Clock, 
              color: "rose",
              trend: "down"
            },
            { 
              label: "Complete Profiles", 
              value: memberStats.complete, 
              icon: UserCheck, 
              color: "emerald",
              trend: "up"
            },
          ].map((stat) => (
            <div key={stat.label} className="relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur border border-border p-4 hover:bg-card transition-colors group">
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  "p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-600",
                  stat.color === "blue" && "bg-blue-500/10 text-blue-600",
                  stat.color === "violet" && "bg-violet-500/10 text-violet-600",
                  stat.color === "rose" && "bg-rose-500/10 text-rose-600",
                  stat.color === "emerald" && "bg-emerald-500/10 text-emerald-600",
                )}>
                  <stat.icon className="size-4" />
                </div>
                {stat.trend === "up" && <TrendingUp className="size-3 text-emerald-500" />}
                {stat.trend === "down" && <TrendingDown className="size-3 text-rose-500" />}
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Performance Metrics - Time Based */}
        <div className="md:col-span-2 lg:col-span-2 rounded-3xl bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Performance Metrics</h3>
            </div>
            <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { label: "First Review Lag", value: formatDuration((avgFirstReviewStat as any)[0]?.avg_ms), desc: "Signup to first review" },
              { label: "First Inquiry Lag", value: formatDuration((avgFirstInquiryStat as any)[0]?.avg_ms), desc: "Signup to first inquiry" },
              { label: "Review Form Time", value: formatDuration(avgFormReviewStat?.avgMs), desc: "Start to submission" },
              { label: "Inquiry Form Time", value: formatDuration(avgFormInquiryStat?.avgMs), desc: "Start to submission" },
            ].map((metric, i) => (
              <div key={metric.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <div className="text-sm font-medium">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono">{metric.value}</div>
                  <div className={cn(
                    "text-[10px]",
                    i < 2 ? "text-amber-600" : "text-emerald-600"
                  )}>
                    {i < 2 ? "Needs attention" : "Optimal"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Queue - Actionable Cards */}
        <div className="md:col-span-1 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Operational Queue</h3>
            <span className="text-xs text-muted-foreground">{pendingSuggestions.count + unreadFeedback.count + unreadContact.count} pending</span>
          </div>
          
          <div className="grid gap-3">
            {[ 
              { 
                label: "Brand Suggestions", 
                value: pendingSuggestions.count, 
                href: "/admin/brands?tab=suggestions", 
                desc: "Community requests awaiting approval",
                icon: ClipboardList,
                color: "indigo",
                urgent: pendingSuggestions.count > 5
              },
              { 
                label: "Platform Feedback", 
                value: unreadFeedback.count, 
                href: "/admin/feedback", 
                desc: "Unread improvement ideas",
                icon: MessageSquare,
                color: "amber",
                urgent: unreadFeedback.count > 10
              },
              { 
                label: "Contact Requests", 
                value: unreadContact.count, 
                href: "/admin/contacts", 
                desc: "New brand partnership inquiries",
                icon: AlertCircle,
                color: "rose",
                urgent: unreadContact.count > 3
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:shadow-md",
                  item.value > 0 
                    ? "bg-card border-border hover:border-${item.color}-500/30" 
                    : "bg-secondary/30 border-transparent opacity-60",
                  item.color === "indigo" && item.value > 0 && "hover:border-indigo-500/30 hover:bg-indigo-500/5",
                  item.color === "amber" && item.value > 0 && "hover:border-amber-500/30 hover:bg-amber-500/5",
                  item.color === "rose" && item.value > 0 && "hover:border-rose-500/30 hover:bg-rose-500/5",
                )}
              >
                <div className={cn(
                  "flex size-10 items-center justify-center rounded-xl shrink-0 transition-colors",
                  item.color === "indigo" && "bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white",
                  item.color === "amber" && "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
                  item.color === "rose" && "bg-rose-500/10 text-rose-600 group-hover:bg-rose-500 group-hover:text-white",
                )}>
                  <item.icon className="size-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{item.label}</span>
                    {item.urgent && (
                      <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  {item.value > 0 ? (
                    <span className={cn(
                      "px-2.5 py-1 text-xs font-bold rounded-full",
                      item.color === "indigo" && "bg-indigo-500 text-white",
                      item.color === "amber" && "bg-amber-500 text-white",
                      item.color === "rose" && "bg-rose-500 text-white",
                    )}>
                      {item.value}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">0</span>
                  )}
                  <ArrowUpRight className={cn(
                    "size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    item.color === "indigo" && "text-indigo-500",
                    item.color === "amber" && "text-amber-500",
                    item.color === "rose" && "text-rose-500",
                  )} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
