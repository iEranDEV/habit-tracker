import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Values from "values.js";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryIcon from "@/components/shared/category/CategoryIcon";
import { useSession } from "next-auth/react";
import { Category } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { HabitFormContext } from "@/components/shared/habit/form/HabitForm";
import { ScrollArea } from "@/components/ui/scroll-area";

function NewHabitCategoryFormItem({ item, selected, setSelected }: { item: Category, selected: string, setSelected: Function }) {

    return (
        <div
            onClick={() => setSelected(item.id)}
            className="cursor-pointer flex group justify-between items-center hover:bg-accent p-1 rounded-lg"
        >
            <div className="flex gap-4 items-center">
                <div className="rounded-md p-1.5" style={{ color: item.color, background: new Values(item.color).tints(10)[7].hexString() }}>
                    <CategoryIcon name={item.icon} />
                </div>
                <p>{item.name}</p>
            </div>

            <AnimatePresence>
                {selected === item.id && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="p-1 bg-primary rounded-md text-primary-foreground"
                    >
                        <Check size={16} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function NewHabitCategoryForm() {
    const [categories, setCategories] = useState(Array<Category>());
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const result = await fetch('/api/category');
            const json = await result.json();
            setCategories(json);
            setLoading(false);
        }

        fetchCategories();
    }, []);

    const ctx = useContext(HabitFormContext);
    const { data, setData, stage, setStage } = ctx;

    const [selected, setSelected] = useState(data.categoryId || '65095e1364a380fd978471f4');

    const formSchema = z.object({
        categoryId: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: data.categoryId || '65095e1364a380fd978471f4'
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setData({ ...data, ...values });
        setStage(stage + 1);
    }

    useEffect(() => {
        if (selected) {
            form.setValue('categoryId', selected);
        }
    }, [selected, form])

    const customCategories = categories.filter((item) => item.userId !== null);

    if (loading) return (
        <div className="space-y-6">
            <Label>Select category</Label>
            <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>
            <div className="h-10">

            </div>
        </div>
    )

    return (
        <Form {...form}>

            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >

                <ScrollArea className="space-y-2 h-96">
                    <Label>Select category</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {categories.filter((item) => item.userId === null).map((item) => (
                            <NewHabitCategoryFormItem key={item.id} item={item} selected={selected} setSelected={setSelected} />
                        ))}
                    </div>
                    {customCategories.length > 0 && <Separator className="my-2" />}
                    <div className="grid grid-cols-2 gap-2">
                        {customCategories.map((item) => (
                            <NewHabitCategoryFormItem key={item.id} item={item} selected={selected} setSelected={setSelected} />
                        ))}
                    </div>
                </ScrollArea >

                <div className="flex justify-end">
                    <Button type="submit">Continue</Button>
                </div>

            </form>

        </Form>
    )
}