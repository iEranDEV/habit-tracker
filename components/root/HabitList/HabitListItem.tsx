'use client';

import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { CalendarContext } from "@/context/CalendarContext";
import { useUserSettings } from "@/context/UserContext";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { addDays, endOfMonth, isSameDay, startOfMonth, startOfWeek } from "date-fns";
import { useContext, useState } from "react";
import { HabitWithData } from "@/types";
import HabitListCheckIn from "./HabitListCheckIn";
import HabitItem from "@/components/shared/habit/HabitItem";

type HabitListItemProps = {
    habit: HabitWithData
}

export default function HabitListItem({ habit }: HabitListItemProps) {
    const [checkIns, setCheckIns] = useState([...habit.checkIns]);

    const { viewMode, selectedDate } = useContext(CalendarContext);
    const { settings } = useUserSettings();

    const weekStart = startOfWeek(selectedDate, { weekStartsOn: settings?.firstDayOfWeek as 0 | 1 | undefined });
    const monthStart = startOfMonth(selectedDate);

    return (
        <div className="flex sm:grid flex-col grid-cols-9 gap-2 max-sm:pb-2">

            {/* Habit name */}
            <div className="col-span-2 max-sm:px-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div>
                            <HabitItem habit={habit} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{habit.name}</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            {{
                'day': <p>to do</p>,
                'week': (<div className="col-span-7 grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <HabitListCheckIn
                            key={i}
                            habit={habit}
                            setCheckIns={setCheckIns}
                            checkIns={checkIns}
                            checkIn={checkIns.find((item) => isSameDay(item.date, addDays(weekStart, i)))}
                            date={addDays(weekStart, i)}
                        />
                    ))}
                </div>),
                'month': (<div className="col-span-7 grid grid-cols-31 gap-1">
                    {Array.from({ length: endOfMonth(monthStart).getDate() }).map((_, i) => (
                        <HabitListCheckIn
                            key={i}
                            habit={habit}
                            setCheckIns={setCheckIns}
                            checkIns={checkIns}
                            checkIn={checkIns.find((item) => isSameDay(item.date, addDays(monthStart, i)))}
                            date={addDays(monthStart, i)}
                        />
                    ))}
                </div>)
            }[viewMode]}
        </div>
    )
}