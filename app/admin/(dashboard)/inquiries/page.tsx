import { db } from "@/db";
import { reviewRequests, profiles } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function AdminInquiriesPage() {
  const inquiries = await db
    .select({
      id: reviewRequests.id,
      productName: reviewRequests.productName,
      brandName: reviewRequests.brandName,
      productImageUrl: reviewRequests.productImageUrl,
      createdAt: reviewRequests.createdAt,
      responsesCount: reviewRequests.responsesCount,
      userDisplayName: profiles.displayName,
      userEmail: profiles.email,
    })
    .from(reviewRequests)
    .leftJoin(profiles, eq(reviewRequests.userId, profiles.id))
    .orderBy(desc(reviewRequests.createdAt))
    .limit(50);

  const formatDate = (date: Date | null) => {
    if (!date) return "—";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Activity
        </p>
        <h2 className="font-cormorant text-3xl">Inquiry Activity</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Latest brand inquiries from members.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="grid grid-cols-[80px_1fr_1fr_1fr_80px] gap-4 border-b border-border bg-muted/30 px-6 py-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>Image</span>
          <span>Member</span>
          <span>Product / Brand</span>
          <span>Date</span>
          <span>Resp</span>
        </div>
        <div className="divide-y divide-border">
          {inquiries.length > 0 ? (
            inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="grid grid-cols-[80px_1fr_1fr_1fr_80px] gap-4 px-6 py-4 text-sm text-foreground hover:bg-muted/10 transition-colors items-center"
              >
                <div className="relative h-12 w-12 overflow-hidden border border-border bg-white rounded-lg">
                  {inquiry.productImageUrl ? (
                    <img 
                      src={inquiry.productImageUrl} 
                      alt={inquiry.productName} 
                      className="h-full w-full object-contain p-1"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                      No Img
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{inquiry.userDisplayName || "Anonymous"}</span>
                  <span className="text-[10px] text-muted-foreground">{inquiry.userEmail}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-black">{inquiry.productName}</span>
                  <span className="text-xs text-muted-foreground">{inquiry.brandName}</span>
                </div>
                <span className="text-muted-foreground">
                  {formatDate(inquiry.createdAt)}
                </span>
                <span className="text-muted-foreground">{inquiry.responsesCount ?? 0}</span>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-muted-foreground text-sm">
              No inquiries found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
