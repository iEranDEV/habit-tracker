import HabitListHeader from "./HabitListHeader";
import HabitListItem from "./HabitListItem";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getHabitsByUser } from "@/lib/habit";
import { CopySlash } from "lucide-react";

export default async function HabitList() {

    const session = await getServerSession(authOption);
    const habits = await getHabitsByUser(session?.user.id);

    return (
        <div>
            <HabitListHeader />
            <div className="space-y-2 mt-4">
                <TooltipProvider>
                    {habits.length > 0 ? (
                        <>
                            {habits.map((item) => (
                                <>
                                    <HabitListItem key={item.id} habit={item} />
                                </>
                            ))}
                        </>
                    ) : (
                        <div className="py-10 flex flex-col justify-center items-center gap-4 text-muted-foreground">
                            <CopySlash />
                            <p>You don&apos;t have any habits yet!</p>
                        </div>
                    )}
                </TooltipProvider>
            </div>
        </div>
    )
}