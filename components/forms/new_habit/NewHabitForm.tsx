'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import NewHabitCategoryForm from "./NewHabitCategory";
import NewHabitTypeForm from "./NewHabitType";
import NewHabitDetailsForm from "./NewHabitDetails";
import NewHabitTimeForm from "./NewHabitTime";
import { $Enums, Habit, Prisma } from "@prisma/client";

export const NewHabitFormContext = createContext<{
    stage: number,
    setStage: Dispatch<SetStateAction<number>>,
    data: Partial<Habit>,
    setData: Dispatch<SetStateAction<Partial<Habit>>>,
    submit: Function
} | undefined>(undefined);

type NewHabitFormProps = {
    setOpen: Function
}

export default function NewHabitForm({ setOpen }: NewHabitFormProps) {
    const [stage, setStage] = useState(0);

    const [data, setData] = useState<Partial<Habit>>({});

    const submit = async (habit: Habit) => {
        /*setData(habit);

        const { result, error } = await addHabit(habit);

        if (result) {
            setHabits([...habits, result]);
            setOpen(false);
        }*/
    }

    {/* 1: <NewHabitTypeForm />,
                        2: <NewHabitDetailsForm />,
                        3: <NewHabitTimeForm /> */}

    return (
        <NewHabitFormContext.Provider value={{ stage, setStage, data, setData, submit }}>
            <div className="relative">

                {
                    {
                        0: <NewHabitCategoryForm />,
                        1: <NewHabitTypeForm />,
                        2: <NewHabitDetailsForm />,
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