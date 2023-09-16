import { CalendarContext } from "@/context/CalendarContext";
import { UserContext } from "@/context/UserContext";
import { WEEKDAYS_SHORT, weekdays } from "@/lib/date";
import { addDays, isToday, startOfWeek } from "date-fns";
import { useContext } from "react";

export default function HabitListHeader() {

    const { viewMode, selectedDate } = useContext(CalendarContext);
    const { user } = useContext(UserContext);

    const weekStart = startOfWeek(selectedDate, { weekStartsOn: user?.settings.firstDayOfWeek });

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
                'month': <p>to do (month)</p>
            }[viewMode]}
        </>
    )
}