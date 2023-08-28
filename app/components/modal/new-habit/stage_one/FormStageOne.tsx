import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import CategoryBadge from "../../../utils/CategoryBadge";
import { Check, Folder, icons } from "lucide-react";
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
        <div className="w-full h-full flex flex-col gap-4">

            {/* Built-in categories */}
            <div className="flex flex-col gap-2">
                <p className="text-neutral-400 text-sm">Built-in categories</p>

                <div className="w-full h-full grid grid-cols-3 gap-1">

                    {categories.filter((item) => item.id.includes('default_')).map((item) => {
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
            </div>

            {/* Custom categories */}
            <div className="flex flex-col gap-2 relative">
                <p className="text-neutral-400 text-sm">Custom categories</p>

                {categories.length > 0 ? (
                    <div className="w-full grid grid-cols-3 gap-1">
                        {categories.filter((item) => !item.id.includes('default_')).map((item) => {
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
                ): (
                    <div className="w-full flex flex-col justify-center text-neutral-400 text-sm items-center h-32">
                        <Folder />
                        <p>There are no custom categories</p>
                    </div>
                )}
            </div>
        </div>
    )
}