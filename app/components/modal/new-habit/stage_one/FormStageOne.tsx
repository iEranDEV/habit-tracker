import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import CategoryBadge from "../../../utils/CategoryBadge";
import { Check, icons } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function FormStageOne() {

    const methods = useFormContext();

    const [selected, setSelected] = useState(methods.getValues('category') !== undefined ? methods.getValues('category') : 'default_other');
    const { categories } = useContext(UserContext);

    useEffect(() => {
        methods.register('category');
    }, []);

    useEffect(() => {
        methods.setValue('category', selected);
    }, [selected])

    return (
        <div className="grid grid-cols-3 gap-1">
            {categories.map((item) => {
                const LucideIcon = icons[item.icon as keyof typeof icons];

                return (
                    <div onClick={() => {
                        setSelected(item.id)
                    }} key={item.id} className={`group w-full p-1 flex gap-2 items-center rounded-lg relative truncate ${selected === item.id && 'brightness-95'} bg-neutral-50 cursor-pointer hover:brightness-95`}>
                        <CategoryBadge icon={<LucideIcon size={16} />} color={item.color} />
                        <p>{item.name}</p>
                        {selected === item.id && (
                            <div className="absolute bg-purple-200 text-purple-500 rounded-lg p-2 aspect-square right-0 top-1/2 -translate-y-1/2 mr-2">
                                <Check size={16} />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}