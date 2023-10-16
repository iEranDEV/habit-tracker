import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsCategoriesSkeleton() {

    return (
        <div className="space-y-6" >
            <div>
                <h3 className="text-lg font-medium">Built-in categories</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your categories.
                </p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="w-full h-10" />
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-lg font-medium">Custom categories</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your categories.
                    </p>
                </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <Skeleton key={i} className="w-full h-10" />
                    ))}
                </div>
            </div>
        </div>
    )
}