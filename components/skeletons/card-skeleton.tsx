import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="relative">
      <div className="group relative isolate flex min-h-105 items-end gap-0 bg-transparent px-4 pt-0 pb-0 text-black md:px-4">
        {/* Background Image Area Skeleton */}
        <div className="absolute inset-0 z-0 flex items-end">
          <Skeleton className="h-full w-full animate-pulse bg-black/5" />
        </div>

        {/* Content Skeleton (Right-aligned to match card) */}
        <div className="relative z-10 flex min-h-105 flex-1 flex-col items-end justify-end gap-4 pb-0 text-end">
          {/* Description skeleton */}
          <div className="flex w-full max-w-40 flex-col items-end gap-2">
            <Skeleton
              className="h-4 w-full animate-pulse bg-black/15"
              style={{ animationDelay: "0.1s" }}
            />
            <Skeleton
              className="h-4 w-5/6 animate-pulse bg-black/15"
              style={{ animationDelay: "0.2s" }}
            />
            <Skeleton
              className="h-4 w-4/6 animate-pulse bg-black/15"
              style={{ animationDelay: "0.3s" }}
            />
          </div>

          {/* Rating Stars skeleton */}
          <div className="flex items-end justify-end gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-5 w-5 animate-pulse rounded-full bg-black/15"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              />
            ))}
          </div>

          {/* Reviews & Followers skeleton */}
          <Skeleton
            className="h-4 w-24 animate-pulse bg-black/15"
            style={{ animationDelay: "0.9s" }}
          />
          <Skeleton
            className="h-4 w-28 animate-pulse bg-black/15"
            style={{ animationDelay: "1s" }}
          />

          {/* Button skeleton */}
          <Skeleton
            className="h-9 w-24 animate-pulse rounded-none bg-black/15"
            style={{ animationDelay: "1.1s" }}
          />
        </div>

        {/* Rotated Brand Name & Icon Skeleton (Left side) */}
        <div className="absolute bottom-0 left-10 flex flex-col items-center gap-2 pb-4 md:left-20">
          <Skeleton
            className="h-40 w-8 animate-pulse bg-black/15"
            style={{ animationDelay: "0.1s" }}
          />
          <Skeleton
            className="h-5 w-5 animate-pulse rounded-full bg-black/15"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>
    </div>
  );
}
