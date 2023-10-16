import NewHabitDialog from "@/components/shared/habit/NewHabitDialog";
import { Separator } from "@/components/ui/separator";

export default function SettingsHabitsLayout({ children }: { children: JSX.Element }) {

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-lg font-medium">Your habits</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your habits and see your statistics.
                    </p>
                </div>
                <NewHabitDialog />
            </div>
            <Separator />
            {children}
        </div >
    )
}