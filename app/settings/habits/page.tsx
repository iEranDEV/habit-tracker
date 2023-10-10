import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import NewHabitDialog from "@/components/shared/NewHabit/NewHabitDialog";
import { getHabitsByUser } from "@/lib/habit";
import { Habit } from "@prisma/client";
import { HabitWithData } from "@/types";
import { Shapes } from "lucide-react";
import HabitSettingsItem from "@/components/settings/habits/HabitSettingsItem";

export default async function SettingsHabits() {

    const session = await getServerSession(authOption);
    const habits = await getHabitsByUser(session?.user.id);

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {habits.length > 0 ? habits.map((item: HabitWithData) => (
                    <HabitSettingsItem key={item.id} item={item} />
                )) : (
                    <div className="w-full col-span-2 flex items-center flex-col text-sm text-muted-foreground">
                        <Shapes size={20} />
                        <span>There are no habits</span>
                    </div>
                )}
            </div>
        </div >
    )
}