'use client';

import { Dispatch, SetStateAction, createContext, useState } from "react";
import NewHabitCategoryForm from "./NewHabitStage1";
import NewHabitTypeForm from "./NewHabitStage2";
import NewHabitDetailsForm from "./NewHabitStage3";
import NewHabitTimeForm from "./NewHabitStage4";
import { Habit } from "@prisma/client";

export const NewHabitFormContext = createContext<{
    stage: number,
    setStage: Dispatch<SetStateAction<number>>,
    data: Partial<Habit>,
    setData: Dispatch<SetStateAction<Partial<Habit>>>,
} | undefined>(undefined);

type NewHabitFormProps = {
    setOpen: Function
}

export default function NewHabitForm({ setOpen }: NewHabitFormProps) {
    const [stage, setStage] = useState(0);
    const [data, setData] = useState<Partial<Habit>>({});

    return (
        <NewHabitFormContext.Provider value={{ stage, setStage, data, setData }}>
            <div className="relative">

                {
                    {
                        0: <NewHabitCategoryForm />,
                        1: <NewHabitTypeForm />,
                        2: <NewHabitDetailsForm />,
                        3: <NewHabitTimeForm setOpen={setOpen} />
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