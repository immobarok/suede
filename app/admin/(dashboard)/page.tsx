import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CircleCheck, Sparkles, Activity, Layers, Edit3, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardChart from "../components/DashboardChart";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Manage listings, users, reviews, and settings in the SUEDE admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <section className="space-y-8 pb-12">
      {/* Dynamic Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-background border border-border p-8 md:p-10 shadow-sm">
        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 p-24 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between z-10">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full backdrop-blur-md">
              <Sparkles className="size-3" />
              Admin Portal
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
              Welcome Back
            </h2>
            <p className="font-darker text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed">
              Keep the SUEDE experience aligned across the site. Review content
              changes, publish new updates, and monitor key sections from your personalized workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary" className="backdrop-blur-md bg-secondary/80 hover:bg-secondary">
              <Link href="/admin/about">Review Content</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 text-primary-foreground shadow shadow-primary/10 transition-all border-0">
              <Link href="/">
                View Live Site
                <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards with Charts */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Card 1 */}
        <div className="group relative overflow-hidden bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6 transition-all hover:bg-card hover:shadow-md hover:border-primary/20">
           <div className="absolute -right-4 -top-4 size-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
           <div className="relative flex items-start justify-between z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <Activity className="size-4" />
                <p className="text-[10px] tracking-wider font-semibold uppercase">Pending Reviews</p>
              </div>
              <p className="font-cormorant text-3xl mb-1 group-hover:text-primary transition-colors">03</p>
              <p className="text-muted-foreground text-sm">Awaiting approval</p>
            </div>
            <div className="w-12 h-12 flex-shrink-0">
              <DashboardChart type="reviews" height={48} width={48} />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative overflow-hidden bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6 transition-all hover:bg-card hover:shadow-md hover:border-blue-500/20">
           <div className="absolute -right-4 -top-4 size-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
           <div className="relative flex items-start justify-between z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <Layers className="size-4" />
                <p className="text-[10px] tracking-wider font-semibold uppercase">Active Listings</p>
              </div>
              <p className="font-cormorant text-3xl mb-1 group-hover:text-blue-500 transition-colors">128</p>
              <p className="text-muted-foreground text-sm">Across the shop</p>
            </div>
            <div className="w-20 h-10 flex-shrink-0 mt-2">
              <DashboardChart type="listings" height={40} width={80} />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group relative overflow-hidden bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6 transition-all hover:bg-card hover:shadow-md hover:border-emerald-500/20">
           <div className="absolute -right-4 -top-4 size-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
           <div className="relative flex items-start justify-between z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <Edit3 className="size-4" />
                <p className="text-[10px] tracking-wider font-semibold uppercase">New Submissions</p>
              </div>
              <p className="font-cormorant text-3xl mb-1 group-hover:text-emerald-500 transition-colors">12</p>
              <p className="text-muted-foreground text-sm">Last 7 days</p>
            </div>
            <div className="w-20 h-10 flex-shrink-0 mt-2">
              <DashboardChart type="submissions" height={40} width={80} />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="group relative overflow-hidden bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6 transition-all hover:bg-card hover:shadow-md hover:border-purple-500/20">
           <div className="absolute -right-4 -top-4 size-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
           <div className="relative flex items-start justify-between z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <ImageIcon className="size-4" />
                <p className="text-[10px] tracking-wider font-semibold uppercase">Content Updates</p>
              </div>
              <p className="font-cormorant text-3xl mb-1 group-hover:text-purple-500 transition-colors">05</p>
              <p className="text-muted-foreground text-sm">Draft changes</p>
            </div>
            <div className="w-12 h-12 flex-shrink-0">
              <DashboardChart type="updates" height={48} width={48} />
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative overflow-hidden bg-background/40 backdrop-blur-xl rounded-2xl border border-border/50 p-8 shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-primary text-[10px] font-semibold tracking-wider uppercase mb-2">
                  Focus Areas
                </p>
                <h3 className="font-cormorant text-2xl">Content Workflow</h3>
              </div>
              <Button asChild variant="outline" size="sm" className="rounded-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-card">
                <Link href="/admin/about">Open Control</Link>
              </Button>
            </div>
            <div className="space-y-4">
              {[
                "Finalize the new Mission statement draft.",
                "Approve the updated Values copy for publication.",
                "Verify hero imagery selections for consistency.",
              ].map((item, i) => (
                <div
                  key={item}
                  className="group flex items-center gap-4 rounded-xl bg-card/60 backdrop-blur-md border border-border/40 px-5 py-4 transition-all hover:bg-card hover:shadow-sm hover:border-primary/20"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <CircleCheck className="size-4" />
                  </div>
                  <p className="text-foreground text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-background/40 backdrop-blur-xl rounded-2xl border border-border/50 p-8 shadow-sm flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-blue-500/5 to-transparent rounded-full blur-3xl" />
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="mb-8">
              <p className="text-blue-500 text-[10px] font-semibold tracking-wider uppercase mb-2">
                Quick Actions
              </p>
              <h3 className="font-cormorant text-2xl">Manage Key Sections</h3>
            </div>
            
            <div className="space-y-4 flex-1 flex flex-col">
              <Link
                href="/admin/about"
                className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-border/50 bg-card/60 px-5 py-5 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center gap-4 z-10">
                  <span className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm group-hover:rotate-6 transition-transform">
                    <Sparkles className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold mb-1">About Page Control</p>
                    <p className="text-muted-foreground text-xs">
                      Hero, Mission, Story, Values
                    </p>
                  </div>
                </div>
                <div className="relative z-10 flex size-8 items-center justify-center rounded-full bg-background border border-border group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-colors">
                  <ArrowUpRight className="size-4" />
                </div>
              </Link>

              <div className="flex flex-1 min-h-[140px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-card/30 px-6 py-6 text-center transition-colors hover:border-border hover:bg-card/50">
                <Activity className="size-6 text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground text-sm max-w-[200px] leading-relaxed">
                  More admin modules coming soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;