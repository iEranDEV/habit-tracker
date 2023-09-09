import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UserContext } from "@/context/UserContext";
import { Category } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Check, icons } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Values from "values.js";

const selectedElement = (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="p-1 bg-primary rounded-md text-primary-foreground"
    >
        <Check size={16} />
    </motion.div>
)

function NewHabitCategoryFormItem({ item, selected, setSelected }: { item: Category, selected: string, setSelected: Function }) {
    const Icon = icons[item.icon as keyof typeof icons];

    return (
        <div
            onClick={() => setSelected(item.id)}
            className="cursor-pointer flex group justify-between items-center hover:bg-accent p-1 rounded-lg"
        >
            <div className="flex gap-4 items-center">
                <div className="rounded-md p-1.5" style={{ color: item.color, background: new Values(item.color).tints(10)[7].hexString() }}>
                    <Icon size={20} />
                </div>
                <p>{item.name}</p>
            </div>

            <AnimatePresence>
                {selected === item.id && selectedElement}
            </AnimatePresence>
        </div>
    )
}

export default function NewHabitCategoryForm({ stage, setStage }: { stage: number, setStage: Function }) {
    const methods = useFormContext();

    const [selected, setSelected] = useState(methods.getValues('category') || 'default_other')

    useEffect(() => {
        if (selected) {
            methods.setValue('category', selected);
        }
    }, [selected, methods])

    const { categories } = useContext(UserContext);

    const customCategories = categories.filter((item) => item.createdBy !== '').sort((a, b) => a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime());

    return (
        <div className="space-y-6">
            <div className="space-y-2" >
                <Label>Select category</Label>
                <div className="grid grid-cols-2 gap-2">
                    {categories.filter((item) => item.createdBy === '').map((item) => (
                        <NewHabitCategoryFormItem key={item.id} item={item} selected={selected} setSelected={setSelected} />
                    ))}
                </div>
                {customCategories.length > 0 && <Separator />}
                <div className="grid grid-cols-2 gap-2">
                    {customCategories.map((item) => (
                        <NewHabitCategoryFormItem key={item.id} item={item} selected={selected} setSelected={setSelected} />
                    ))}
                </div>
            </div >

            <DialogFooter >
                <Button type="button" onClick={(e) => {
                    e.preventDefault();
                    setStage(stage + 1);
                }}>Continue</Button>
            </DialogFooter >
        </div>
    )
}