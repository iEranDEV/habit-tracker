'use client';

import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { CalendarContext } from "@/context/CalendarContext";
import { useUserContext } from "@/context/UserContext";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { useContext, useEffect, useState } from "react";
import Values from "values.js";
import { CheckIn } from "@prisma/client";
import { HabitWithCategory } from "@/types";
import CategoryIcon from "../settings/CategoryIcon";
import HabitListCheckIn from "./HabitListCheckIn";

type HabitListItemProps = {
    habit: HabitWithCategory
}

export default function HabitListItem({ habit }: HabitListItemProps) {
    const [checkIns, setCheckIns] = useState<Array<CheckIn> | CheckIn | undefined>(undefined);

    const { viewMode, selectedDate } = useContext(CalendarContext);
    const { user } = useUserContext();

    const weekStart = startOfWeek(selectedDate, { weekStartsOn: user?.settings.firstDayOfWeek as 0 | 1 | undefined });

    useEffect(() => {

        const syncCheckIns = async () => {
            // Check value of checkIns depending on current view mode
            if (viewMode === 'day') {
                setCheckIns(undefined);
            }
            else if (viewMode === 'week') {
                const weekStart = startOfWeek(selectedDate, { weekStartsOn: user?.settings.firstDayOfWeek as 0 | 1 | undefined });
                const weekEnd = endOfWeek(selectedDate, { weekStartsOn: user?.settings.firstDayOfWeek as 0 | 1 | undefined });
                /*
                const temp = await getCheckInsBetweenDates(habit.id, weekStart, weekEnd)
                setCheckIns(temp);
                */
            }
        }

        syncCheckIns();
    }, [viewMode, selectedDate]);

    const category = habit.category;

    return (
        <div className="grid grid-cols-10 gap-2">

            {/* Habit name */}
            <div className="flex gap-2 items-center col-span-2">
                <div className="rounded-md p-1.5" style={{ color: category.color, background: new Values(category?.color).tints(10)[7].hexString() }}>
                    <CategoryIcon name={category.icon} />
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

            {{
                'day': <p>to do</p>,
                'week': (<>
                    {Array.from({ length: 7 }).map((_, i) => (
                        <HabitListCheckIn
                            key={i}
                            habit={habit}
                            checkIns={checkIns}
                            setCheckIns={setCheckIns}
                            date={addDays(weekStart, i)}
                        />
                    ))}
                </>),
                'month': <p>to do (month)</p>
            }[viewMode]}
        </div>
    )
}