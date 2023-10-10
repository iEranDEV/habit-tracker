'use client';

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "../../ui/dialog";
import { Button } from "../../ui/button";
import ColorPicker from "../../shared/inputs/ColorPicker";
import IconPicker from "../../shared/inputs/IconPicker";
import { Category } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface EditCategoryFormProps {
    setOpen: Function,
    category: Category
}

export default function EditCategoryForm({ setOpen, category }: EditCategoryFormProps) {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

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
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/category/${category.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: values.name,
                color: values.color,
                icon: values.icon
            })
        });
        const data = await response.json();

        if (data) {
            setOpen && setOpen(false);
            router.refresh();
        }
        setLoading(false);
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
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <span>Submit</span>
                        )}
                    </Button>
                </DialogFooter>

            </form>

        </Form>
    )
}