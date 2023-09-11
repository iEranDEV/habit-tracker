import { CalendarContext } from "@/context/CalendarContext";
import { Habit } from "@/types";
import { useContext } from "react";

type HabitListItemProps = {
    habit: Habit
}

export default function HabitListItem({ habit }: HabitListItemProps) {

    const { viewMode } = useContext(CalendarContext);

    return (
        <>
            {{
                'day': <p>to do</p>,
                'week': (
                    <div>{habit.name}</div>
                ),
                'month': <p>to do (month)</p>
            }[viewMode]}
        </>
    )
}