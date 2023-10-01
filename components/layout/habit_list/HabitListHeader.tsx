'use client';

import { CalendarContext } from "@/context/CalendarContext";
import { useUserSettings } from "@/context/UserContext";
import { WEEKDAYS_SHORT, weekdays } from "@/lib/date";
import { Separator } from "@radix-ui/react-select";
import { addDays, endOfMinute, endOfMonth, isToday, startOfMonth, startOfWeek } from "date-fns";
import { useContext } from "react";

export default function HabitListHeader() {

    const { viewMode, selectedDate } = useContext(CalendarContext);
    const { settings } = useUserSettings();

    const weekStart = startOfWeek(selectedDate, { weekStartsOn: settings?.firstDayOfWeek as any });
    const monthStart = startOfMonth(selectedDate);

    const week = Array.from({ length: 7 }, (_, i) => {
        return addDays(weekStart, i);
    });

    return (
        <div className="space-y-4 sticky top-[104px] sm:top-14 bg-background pt-4">
            <div className="grid max-sm:grid-cols-7 max-sm:px-2 grid-cols-9 gap-1 sm:gap-2">
                <div className="flex items-end col-span-2 max-sm:hidden">
                    <p className="text-sm text-muted-foreground">Habit name</p>
                </div>
                {{
                    'day': <p>to do</p>,
                    'week': (<>
                        {week.map((val) => (
                            <div key={val.toString()} className="w-full flex justify-center relative">
                                <div className="bg-muted rounded-md h-20 w-16 flex flex-col justify-center items-center gap-2">
                                    <p className="font-bold text-xl">{val.getDate()}</p>
                                    <span className="text-muted-foreground text-sm">{WEEKDAYS_SHORT[weekdays.indexOf(val.getDay())]}</span>
                                </div>

                                {isToday(val) && (
                                    <div className="absolute h-2 w-10 bg-primary rounded-full -bottom-5"></div>
                                )}
                            </div>
                        ))}
                    </>),
                    'month': (<div className="grid col-span-7 grid-cols-31 gap-1">
                        {Array.from({ length: endOfMonth(monthStart).getDate() }).map((_, i) => (
                            <div key={i} className="w-full flex justify-center select-none relative">
                                <p className="text-sm font-semibold">{i + 1}</p>

                                {isToday(addDays(monthStart, i)) && (
                                    <div className="absolute h-2 w-full bg-primary rounded-full -bottom-5"></div>
                                )}
                            </div>
                        ))}
                    </div>)
                }[viewMode]}
            </div>
            <Separator className="h-[1px] bg-border" />
        </div>
    )
}