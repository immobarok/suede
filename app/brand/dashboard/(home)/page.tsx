import { 
  MessageSquare, 
  Star, 
  Ruler, 
  ThumbsUp, 
  Eye,
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";
import { BrandChart } from "./_components/brand-chart";

const stats = [
  {
    title: "Total Review Count",
    value: "1,248",
    subtitle: "Total reviews",
    icon: MessageSquare,
  },
  {
    title: "Average Overall Rating",
    value: "4.6",
    unit: "Out of 5",
    subtitle: "Total reviews",
    icon: Star,
  },
  {
    title: "Average Sizing Accuracy",
    value: "4.6",
    unit: "Out of 5",
    subtitle: "Total reviews",
    icon: Ruler,
  },
  {
    title: "Recommend Rate",
    value: "92%",
    subtitle: "Of reviewers recommends",
    icon: ThumbsUp,
  },
  {
    title: "Brand Page Views",
    value: "1,541",
    subtitle: "Total page views",
    icon: Eye,
  },
];

const highestRated = [
  {
    rank: 1,
    name: "Flowy Dress",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder-product-1.jpg",
  },
  {
    rank: 2,
    name: "The Nyomi Maxi",
    rating: 4.7,
    reviews: 100,
    image: "/placeholder-product-2.jpg",
  },
];

const lowestRated = [
  {
    rank: 1,
    name: "Flowy Dress",
    rating: 2.1,
    reviews: 45,
    image: "/placeholder-product-1.jpg",
  },
  {
    rank: 2,
    name: "The Nyomi Maxi",
    rating: 1.5,
    reviews: 62,
    image: "/placeholder-product-2.jpg",
  },
];

export default async function BrandDashboardPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-cormorant font-semibold text-black">
          Good Morning, <span className="italic">Kikiola</span>
        </h1>
        <p className="text-black/40 text-sm font-light">
          Here's the quiet pulse of your brand on Suede this week.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 border-t border-black/5 py-8 gap-8 md:gap-0 divide-x divide-black/5">
        {stats.map((stat, i) => (
          <div key={stat.title} className={`space-y-6 ${i === 0 ? "" : "md:pl-8"} ${i === 4 ? "" : "md:pr-8"}`}>
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/20">
                {stat.title}
              </p>
              <div className="w-10 h-10 bg-black/[0.03] rounded-sm flex items-center justify-center">
                <stat.icon size={18} className="text-black/40" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
                {stat.unit && <span className="text-[10px] text-black/40 font-bold uppercase tracking-widest">{stat.unit}</span>}
              </div>
              <p className="text-[11px] text-black/40 font-medium">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart Column (Client Component) */}
        <div className="lg:col-span-7">
          <BrandChart />
        </div>

        {/* Product Lists Column */}
        <div className="lg:col-span-5 space-y-8">
          {/* Highest Rated */}
          <Card className="border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-black/80">Highest Rated Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {highestRated.map((product) => (
                <div key={product.rank} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                      {product.rank}
                    </div>
                    <div className="w-12 h-12 bg-black/5 rounded-sm relative overflow-hidden">
                      <div className="w-full h-full bg-stone-200" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">{product.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4].map((s) => <Star key={s} size={10} fill="currentColor" className="text-black" />)}
                          <Star size={10} className="text-black/20" />
                        </div>
                        <span className="text-[10px] text-black/40 font-medium">{product.rating} ({product.reviews} Reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-green-600/80">{product.rating}/5</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="h-px bg-black/5 mx-6"/>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-black/80">Lowest Rated Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {lowestRated.map((product) => (
                <div key={product.rank} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                      {product.rank}
                    </div>
                    <div className="w-12 h-12 bg-black/5 rounded-sm relative overflow-hidden">
                      <div className="w-full h-full bg-stone-200" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">{product.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2].map((s) => <Star key={s} size={10} fill="currentColor" className="text-black" />)}
                          {[3, 4, 5].map((s) => <Star key={s} size={10} className="text-black/20" />)}
                        </div>
                        <span className="text-[10px] text-black/40 font-medium">{product.rating} ({product.reviews} Reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-red-500/80">{product.rating}/5</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
