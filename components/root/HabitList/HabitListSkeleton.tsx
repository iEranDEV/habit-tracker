import { Skeleton } from "@/components/ui/skeleton";

export default function HabitListSkeleton() {

    return (
        <div className="space-y-2 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-8" />
            ))}
        </div>
    )
}