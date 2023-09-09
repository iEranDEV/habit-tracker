import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UserContext } from "@/context/UserContext";
import { Category } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Check, icons } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Values from "values.js";
import { NewHabitFormContext } from "./NewHabitForm";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function NewHabitCategoryForm() {

    const { data, setData, stage, setStage } = useContext(NewHabitFormContext);

    const formSchema = z.object({
        category: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: data.category || 'default_other'
        }
    });

    const [selected, setSelected] = useState(data.category || 'default_other')

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setData({ ...data, ...values });
        setStage(stage + 1);
    }

    useEffect(() => {
        if (selected) {
            form.setValue('category', selected);
        }
    }, [selected, form])

    const { categories } = useContext(UserContext);

    const customCategories = categories.filter((item) => item.createdBy !== '').sort((a, b) => a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime());

    return (
        <Form {...form}>

            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >

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
                    <Button type="submit">Continue</Button>
                </DialogFooter >

            </form>

        </Form>
    )
}