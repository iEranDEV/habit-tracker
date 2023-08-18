import { CalendarContext } from "@/context/CalendarContext";
import { getWeek, isSameDate } from "@/lib/date";
import { useContext } from "react";

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HabitListHeader() {

    const { selectedDate } = useContext(CalendarContext);
    const { weekStart } = getWeek(selectedDate);
    const monthDays = new Date(weekStart.getFullYear(), weekStart.getMonth(), 0).getDate();

    return (
        <div className="border-b select-none border-neutral-200 px-2 lg:px-0 bg-neutral-50 flex items-end w-full py-2 text-sm text-neutral-400">

            {/* Habit name & category */}
            <div className="hidden md:block basis-1/4">
                Habit name
            </div>

            {/* Days */}
            <div className="grow flex justify-around md:justify-between items-center">

                {Array.from({length: 7}).map((_, i) => {
                    const date = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i);
                    if(date.getDate() > monthDays) {
                        date.setDate(1);
                    }

                    return (
                        <div key={i} className={`p-3 w-12 justify-center items-center rounded-lg flex flex-col ${isSameDate(new Date(), date) && 'bg-purple-100 text-purple-500'}`}>
                            <span className="text-sm">{weekdays[i]}</span>
                            <p className="font-semibold text-lg">{date.getDate()}</p>
                        </div>
                    )
                })}

            </div>

            {/* Blank spot for additional data */}
            <div className="basis-20 hidden md:block"></div>

        </div>
    )
}