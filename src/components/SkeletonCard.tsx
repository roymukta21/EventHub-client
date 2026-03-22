import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div
      className="bg-card rounded-2xl overflow-hidden border border-border flex flex-col h-full"
      data-ocid="skeleton.loading_state"
    >
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 flex flex-col flex-1 gap-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-1 mt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-3.5 w-3.5" />
          ))}
        </div>
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex items-center justify-between mt-auto pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
