import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getHabitsByUser } from "@/lib/habit";
import { HabitWithData } from "@/types";
import { Shapes } from "lucide-react";
import HabitSettingsItem from "@/components/settings/habit/HabitSettingsItem";

export default async function SettingsHabits() {

    const session = await getServerSession(authOption);
    const habits = await getHabitsByUser(session?.user.id);

    return (
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
    )
}