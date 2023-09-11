import { CalendarContext } from "@/context/CalendarContext";
import { UserContext } from "@/context/UserContext"
import { useContext } from "react"
import HabitListHeader from "./HabitListHeader";
import { Separator } from "@/components/ui/separator";
import HabitListItem from "./HabitListItem";

export default function HabitList() {

    const { habits } = useContext(UserContext);
    const { viewMode } = useContext(CalendarContext);

    return (
        <div className="space-y-2">
            <HabitListHeader />
            <Separator />
            <div className="space-y-2">
                {habits.map((item) => (
                    <HabitListItem key={item.id} habit={item} />
                ))}
            </div>
        </div>
    )
}