import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CircleCheck, Sparkles } from "lucide-react";
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
    <section className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
            Admin Portal
          </p>
          <h2 className="font-cormorant text-4xl">Welcome Back</h2>
          <p className="font-darker text-muted-foreground max-w-2xl text-sm">
            Keep the SUEDE experience aligned across the site. Review content
            changes, publish new updates, and monitor key sections from this
            workspace.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/admin/about">Review About Content</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/spec">Open Admin Spec</Link>
          </Button>
          <Button asChild>
            <Link href="/">
              View Live Site
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards with Charts */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Pending Reviews Card */}
        <div className="border-border bg-card rounded-2xl border p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
                Pending Reviews
              </p>
              <p className="font-cormorant mt-3 text-3xl">03</p>
              <p className="text-muted-foreground mt-2 text-sm">Awaiting approval</p>
            </div>
            <div className="w-12 h-12">
              <DashboardChart type="reviews" height={48} width={48} />
            </div>
          </div>
        </div>

        {/* Active Listings Card */}
        <div className="border-border bg-card rounded-2xl border p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
                Active Listings
              </p>
              <p className="font-cormorant mt-3 text-3xl">128</p>
              <p className="text-muted-foreground mt-2 text-sm">Across the shop</p>
            </div>
            <div className="w-20 h-10">
              <DashboardChart type="listings" height={40} width={80} />
            </div>
          </div>
        </div>

        {/* New Submissions Card */}
        <div className="border-border bg-card rounded-2xl border p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
                New Submissions
              </p>
              <p className="font-cormorant mt-3 text-3xl">12</p>
              <p className="text-muted-foreground mt-2 text-sm">Last 7 days</p>
            </div>
            <div className="w-20 h-10">
              <DashboardChart type="submissions" height={40} width={80} />
            </div>
          </div>
        </div>

        {/* Content Updates Card */}
        <div className="border-border bg-card rounded-2xl border p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
                Content Updates
              </p>
              <p className="font-cormorant mt-3 text-3xl">05</p>
              <p className="text-muted-foreground mt-2 text-sm">Draft changes</p>
            </div>
            <div className="w-12 h-12">
              <DashboardChart type="updates" height={48} width={48} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="border-border bg-card rounded-3xl border p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
                Focus Areas
              </p>
              <h3 className="font-cormorant mt-2 text-2xl">Content Workflow</h3>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/about">Open About Control</Link>
            </Button>
          </div>
          <div className="mt-6 space-y-4">
            {[
              "Finalize the new Mission statement draft.",
              "Approve the updated Values copy for publication.",
              "Verify hero imagery selections for consistency.",
            ].map((item) => (
              <div
                key={item}
                className="border-border bg-background flex items-center gap-3 rounded-xl border px-4 py-3"
              >
                <CircleCheck className="text-muted-foreground size-4" />
                <p className="text-foreground text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border bg-card rounded-3xl border p-6 shadow-sm">
          <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
            Quick Actions
          </p>
          <h3 className="font-cormorant mt-2 text-2xl">Manage Key Sections</h3>
          <div className="mt-6 space-y-3">
            <Link
              href="/admin/about"
              className="border-border bg-background hover:border-foreground/30 flex items-center justify-between rounded-2xl border px-4 py-4 transition"
            >
              <div className="flex items-center gap-3">
                <span className="bg-secondary text-secondary-foreground flex size-9 items-center justify-center rounded-full">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">About Page Control</p>
                  <p className="text-muted-foreground text-xs">
                    Hero, Mission, Story, Values
                  </p>
                </div>
              </div>
              <ArrowUpRight className="text-muted-foreground size-4" />
            </Link>
            <div className="border-border bg-background text-muted-foreground rounded-2xl border border-dashed px-4 py-4 text-sm">
              More admin tools are coming soon. Tell me which module you want to
              add next.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;