import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { CalendarContext } from "@/context/CalendarContext";
import { UserContext } from "@/context/UserContext";
import { Habit } from "@/types";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { icons } from "lucide-react";
import { useContext } from "react";
import Values from "values.js";

type HabitListItemProps = {
    habit: Habit
}

export default function HabitListItem({ habit }: HabitListItemProps) {

    const { viewMode } = useContext(CalendarContext);
    const { categories } = useContext(UserContext);

    const category = categories.find((item) => item.id === habit.category);
    const CategoryIcon = icons[category?.icon as keyof typeof icons];

    return (
        <>
            {{
                'day': <p>to do</p>,
                'week': (
                    <div className="grid grid-cols-10 gap-2">

                        {/* Habit name */}
                        <div className="flex gap-2 items-center col-span-2">
                            <div className="rounded-md p-1.5" style={{ color: category?.color, background: new Values(category?.color).tints(10)[7].hexString() }}>
                                <CategoryIcon size={20} />
                            </div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <p className="truncate">{habit.name}</p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{habit.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Check ins */}
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className="w-full flex justify-center">
                                <div className="w-10 h-10 rounded-md bg-muted">

                                </div>
                            </div>
                        ))}
                    </div>
                ),
                'month': <p>to do (month)</p>
            }[viewMode]}
        </>
    )
}