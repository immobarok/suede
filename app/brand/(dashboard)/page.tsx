import { 
  Package, 
  TrendingUp, 
  MessageSquare, 
  Eye, 
  ArrowUpRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BrandDashboardPage() {
  const stats = [
    {
      title: "Total Views",
      value: "12,482",
      change: "+12.5%",
      icon: Eye,
    },
    {
      title: "Inquiries",
      value: "48",
      change: "+8.2%",
      icon: MessageSquare,
    },
    {
      title: "Product Reach",
      value: "85%",
      change: "+2.4%",
      icon: TrendingUp,
    },
    {
      title: "Active Listings",
      value: "24",
      change: "0%",
      icon: Package,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-1">
          Overview
        </h2>
        <h1 className="text-3xl font-serif italic text-black">
          Welcome back, <span className="not-italic font-bold">Kikiola.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-black/5 shadow-sm rounded-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                {stat.title}
              </CardTitle>
              <stat.icon className="size-4 text-black/20" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-[10px] text-green-600 font-bold flex items-center mt-1">
                <ArrowUpRight className="size-3 mr-0.5" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-black/5 shadow-sm rounded-none">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-black/[0.02]">
            <p className="text-black/40 text-sm italic">Analytics visualization will appear here.</p>
          </CardContent>
        </Card>

        <Card className="border-black/5 shadow-sm rounded-none">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">
              Recent Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 items-start pb-4 border-b border-black/5 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-black/5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Customer Name</p>
                    <p className="text-xs text-black/60 line-clamp-2">
                      Interested in your latest collection. Can you provide more details about the...
                    </p>
                    <p className="text-[10px] text-black/40 pt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-none uppercase text-[10px] font-bold tracking-widest h-10">
                View All Inquiries
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
