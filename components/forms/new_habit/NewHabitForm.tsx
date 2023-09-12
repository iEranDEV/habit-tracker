import { createContext, useContext, useState } from "react";
import NewHabitCategoryForm from "./NewHabitCategory";
import NewHabitTypeForm from "./NewHabitType";
import NewHabitDetailsForm from "./NewHabitDetails";
import { Habit } from "@/types";
import NewHabitTimeForm from "./NewHabitTime";
import { Timestamp } from "firebase/firestore";
import { addHabit } from "@/firebase/db/habit";
import { UserContext } from "@/context/UserContext";

const defaultHabit: Habit = {
    id: '',
    name: '',
    type: 'default',
    description: '',
    category: 'default_other',
    createdAt: Timestamp.now(),
    frequency: [],
    startDate: Timestamp.fromDate(new Date()),
    endDate: undefined,
    details: undefined,
    createdBy: ''
};

export const NewHabitFormContext = createContext({
    stage: 0,
    setStage: (stage: number) => { },
    data: defaultHabit,
    setData: (data: any) => { },
    submit: (habit: Habit) => { }
});

type NewHabitFormProps = {
    setOpen: Function
}

export default function NewHabitForm({ setOpen }: NewHabitFormProps) {
    const [stage, setStage] = useState(0);

    const { user, habits, setHabits } = useContext(UserContext);

    const [data, setData] = useState<Habit>({ ...defaultHabit, createdBy: user.id });

    const submit = async (habit: Habit) => {
        setData(habit);

        const { result, error } = await addHabit(habit);

        if (result) {
            setHabits([...habits, result]);
            setOpen(false);
        }
    }

    return (
        <NewHabitFormContext.Provider value={{ stage, setStage, data, setData, submit }}>
            <div className="relative">

                {
                    {
                        0: <NewHabitCategoryForm />,
                        1: <NewHabitTypeForm />,
                        2: <NewHabitDetailsForm />,
                        3: <NewHabitTimeForm />
                    }[stage] || <p>loading</p>
                }

                <div className="absolute bottom-4 flex gap-2 left-1/2 -translate-x-1/2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className={`rounded-full transition-all h-2 ${stage > i ? 'bg-primary w-2' : (stage === i ? 'bg-primary w-4' : 'bg-border w-2')}`}
                        ></div>
                    ))}
                </div>

            </div>
        </NewHabitFormContext.Provider >
    )
}