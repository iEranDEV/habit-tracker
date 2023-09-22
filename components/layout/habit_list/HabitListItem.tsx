import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { CalendarContext } from "@/context/CalendarContext";
import { UserContext } from "@/context/UserContext";
import { isSameDate } from "@/lib/date";
import { CheckIn, Habit } from "@/types";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { icons } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Values from "values.js";
import HabitListCheckIn from "./HabitListCheckIn";
import { Skeleton } from "@/components/ui/skeleton";

type HabitListItemProps = {
    habit: Habit
}

export default function HabitListItem({ habit }: HabitListItemProps) {
    const [checkIns, setCheckIns] = useState<Array<CheckIn> | CheckIn | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const { viewMode, selectedDate } = useContext(CalendarContext);
    const { categories, user } = useContext(UserContext);
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: user?.settings.firstDayOfWeek });

    useEffect(() => {

        const syncCheckIns = async () => {
            setLoading(true);
            // Check value of checkIns depending on current view mode
            if (viewMode === 'day') {
                setCheckIns(undefined);
            }
            else if (viewMode === 'week') {
                const weekStart = startOfWeek(selectedDate, { weekStartsOn: user?.settings.firstDayOfWeek });
                const weekEnd = endOfWeek(selectedDate, { weekStartsOn: user?.settings.firstDayOfWeek });
                const temp = await getCheckInsBetweenDates(habit.id, weekStart, weekEnd)
                setCheckIns(temp);
            }
            setLoading(false);
        }

        syncCheckIns();
    }, [viewMode, selectedDate]);

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

                        {!loading ? <>
                            {/* Check ins */}
                            {Array.from({ length: 7 }).map((_, i) => (
                                <HabitListCheckIn
                                    key={i}
                                    habit={habit}
                                    checkIns={checkIns}
                                    setCheckIns={setCheckIns}
                                    date={addDays(weekStart, i)}
                                />
                            ))}
                        </> : <>
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} className="w-full flex justify-center">
                                    <Skeleton className="h-10 w-10"></Skeleton>
                                </div>
                            ))}
                        </>}
                    </div>
                ),
                'month': <p>to do (month)</p>
            }[viewMode]}
        </>
    )
}