// components/skeletons/TableSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeletons({ rows = 10, columns = 5 }) {
  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="space-y-2">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-4 w-5" />
            {
                [...Array(columns)].map((_,c) => (
                <Skeleton key={c} className="h-4 w-1/5" />
                ))
            }
          </div>
        ))}
      </div>
    </div>
  );
}
