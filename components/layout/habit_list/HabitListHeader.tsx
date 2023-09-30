'use client';

import { CalendarContext } from "@/context/CalendarContext";
import { useUserSettings } from "@/context/UserContext";
import { WEEKDAYS_SHORT, weekdays } from "@/lib/date";
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
        <>
            {{
                'day': <p>to do</p>,
                'week': (
                    <div className="grid grid-cols-10 gap-2">
                        <div className="flex items-end col-span-2">
                            <p className="text-sm text-muted-foreground">Habit name</p>
                        </div>
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
                    </div>
                ),
                'month': (
                    <div className="grid grid-cols-10 gap-2">
                        <div className="flex items-end col-span-2">
                            <p className="text-sm text-muted-foreground">Habit name</p>
                        </div>
                        <div className="grid col-span-8 grid-cols-31 gap-1">
                            {Array.from({ length: endOfMonth(monthStart).getDate() }).map((_, i) => (
                                <div key={i} className="w-full flex justify-center select-none relative">
                                    <p className="text-sm font-semibold">{i + 1}</p>

                                    {isToday(addDays(monthStart, i)) && (
                                        <div className="absolute h-2 w-full bg-primary rounded-full -bottom-5"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div >
                )
            }[viewMode]}
        </>
    )
}