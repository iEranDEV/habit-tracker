import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import NewHabitDialog from "@/components/shared/NewHabit/NewHabitDialog";

export default async function SettingsCategories() {

    const session = await getServerSession(authOption);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Habits</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your categories.
                </p>
            </div>
            <Separator />
            <p>habit list</p>
            <NewHabitDialog />
        </div >
    )
}