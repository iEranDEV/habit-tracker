import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsHabitsSkeleton() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-10" />
            ))}
        </div>
    )
}