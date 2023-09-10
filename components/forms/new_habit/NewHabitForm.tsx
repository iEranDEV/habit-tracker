import { createContext, useState } from "react";
import NewHabitCategoryForm from "./NewHabitCategory";
import NewHabitTypeForm from "./NewHabitType";
import NewHabitDetailsForm from "./NewHabitDetails";
import { Habit } from "@/types";
import NewHabitTimeForm from "./NewHabitTime";

export const NewHabitFormContext = createContext({
    stage: 0,
    setStage: (stage: number) => { },
    data: {} as Partial<Habit>,
    setData: (data: any) => { }
});

export default function NewHabitForm() {
    const [stage, setStage] = useState(0);
    const [data, setData] = useState<Partial<Habit>>({})

    return (
        <NewHabitFormContext.Provider value={{ stage, setStage, data, setData }}>
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