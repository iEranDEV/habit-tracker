import { CalendarContext } from "@/context/CalendarContext";
import { UserContext } from "@/context/UserContext"
import { useContext } from "react"
import HabitListHeader from "./HabitListHeader";
import { Separator } from "@/components/ui/separator";
import HabitListItem from "./HabitListItem";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function HabitList() {

    const { habits } = useContext(UserContext);
    const { viewMode } = useContext(CalendarContext);

    return (
        <div className="space-y-4">
            <HabitListHeader />
            <Separator />
            <div className="space-y-2">
                <TooltipProvider>
                    {habits.length > 0 ? (
                        <>
                            {habits.map((item) => (
                                <HabitListItem key={item.id} habit={item} />
                            ))}
                        </>
                    ) : (
                        <div className="bg-muted">no habits</div>
                    )}
                </TooltipProvider>
                {/*
                <div className="grid grid-cols-10 gap-2">
                    <div className="col-span-2">test</div>
                    <div className="col-span-8">
                        <div className="grid grid-cols-[repeat(31,_minmax(0,_1fr))] gap-1">
                            {Array.from({ length: 31 }).map((_, i) => (
                                <div key={i} className="w-full aspect-square bg-red-500"></div>
                            ))}
                        </div>
                    </div>
                </div>
                */}
            </div>
        </div>
    )
}