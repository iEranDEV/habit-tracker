import Values from "values.js"
import { HabitWithData } from "@/types"
import CategoryIcon from "../category/CategoryIcon"

interface HabitItemProps {
    habit: HabitWithData
}

export default function HabitItem({ habit }: HabitItemProps) {

    return (
        <div className="flex gap-4 items-center">
            <div className="rounded-md p-1.5" style={{ color: habit.category.color, background: new Values(habit.category.color).tints(10)[7].hexString() }}>
                <CategoryIcon name={habit.category.icon} size={20} />
            </div>
            <p>{habit.name}</p>
        </div>
    )
}