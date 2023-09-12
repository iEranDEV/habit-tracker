import { CalendarContext } from "@/context/CalendarContext";
import { WEEKDAYS_SHORT, getWeek, weekdays } from "@/lib/date";
import { endOfMonth, isToday } from "date-fns";
import { useContext } from "react";

export default function HabitListHeader() {

    const { viewMode, selectedDate } = useContext(CalendarContext);

    const { weekStart, weekEnd } = getWeek(selectedDate);
    const lastDayOfMonth = endOfMonth(weekStart);

    const week = Array.from({ length: 7 }, (_, i) => {
        const temp = new Date(weekStart);
        temp.setDate(weekStart.getDate() + i);
        if (temp.getDate() > lastDayOfMonth.getDate()) {
            temp.setDate(1 + i);
        }
        return temp;
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