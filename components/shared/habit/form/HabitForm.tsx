import { createContext, useState } from "react";
import { Habit } from "@prisma/client";
import { HabitWithData } from "@/types";
import NewHabitCategoryForm from "@/components/shared/habit/form/stages/HabitFormStage1";
import NewHabitTypeForm from "@/components/shared/habit/form/stages/HabitFormStage2";
import NewHabitDetailsForm from "@/components/shared/habit/form/stages/HabitFormStage3";
import NewHabitTimeForm from "@/components/shared/habit/form/stages/HabitFormStage4";
import { useRouter } from "next/navigation";

export const HabitFormContext = createContext<{
    stage: number,
    setStage: Function,
    data: Partial<Habit>,
    setData: Function,
}>({
    stage: 0,
    setStage: (stage: number) => { },
    data: {},
    setData: (data: Partial<Habit>) => { }
});

interface HabitFormProps {
    habit?: HabitWithData,
    edit?: boolean,
    setOpen: Function
}

export default function HabitForm({ habit, edit, setOpen }: HabitFormProps) {
    const [stage, setStage] = useState(0);
    const [data, setData] = useState<Partial<Habit>>(habit || {});

    const router = useRouter();

    return (
        <HabitFormContext.Provider value={{ stage, setStage, data, setData }}>
            <div className="relative">

                {
                    {
                        0: <NewHabitCategoryForm />,
                        1: <NewHabitTypeForm />,
                        2: <NewHabitDetailsForm />,
                        3: <NewHabitTimeForm setOpen={setOpen} edit={edit} />
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
        </HabitFormContext.Provider>
    )
}