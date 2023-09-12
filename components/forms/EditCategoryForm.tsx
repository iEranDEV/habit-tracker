'use client';

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { updateCategory } from "@/firebase/db/category";
import { Category } from "@/types";
import ColorPicker from "./utils/ColorPicker";
import IconPicker from "./utils/IconPicker";

interface EditCategoryFormProps {
    setOpen: Function,
    category: Category
}

export default function EditCategoryForm({ setOpen, category }: EditCategoryFormProps) {

    const { categories, setCategories } = useContext(UserContext);

    const formSchema = z.object({
        name: z.string().trim().min(1, { message: 'This field is required' }),
        color: z.string(),
        icon: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: category.name,
            color: category.color,
            icon: category.icon
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { result, error } = await updateCategory(category.id, {
            id: category.id,
            createdBy: category.createdBy,
            name: values.name,
            color: values.color,
            icon: values.icon,
            createdAt: category.createdAt
        });

        if (result) {
            setOpen(false);
            setCategories([...categories.filter((item) => item.id !== category.id), result]);
        }
    }

    return (
        <Form {...form}>

            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >

                {/* Category name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category name</FormLabel>
                            <FormControl>
                                <Input placeholder="Example category" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Color picker */}
                <ColorPicker defaultColor={category.color} />

                {/* Icon picker */}
                <IconPicker defaultIcon={category.icon} />

                {/* Footer */}
                <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter>

            </form>

        </Form>
    )
}