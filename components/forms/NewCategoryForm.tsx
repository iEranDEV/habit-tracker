'use client';

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import ColorPicker from "./utils/ColorPicker";
import IconPicker from "./utils/IconPicker";
import { useRouter } from "next/navigation";

interface NewCategoryFormProps {
    setOpen?: Function
}

export default function NewCategoryForm({ setOpen }: NewCategoryFormProps) {

    const router = useRouter();

    const formSchema = z.object({
        name: z.string().trim().min(1, { message: 'This field is required' }),
        color: z.string(),
        icon: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            color: "#ef4444",
            icon: "shapes"
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await fetch('http://localhost:3000/api/category', {
            method: 'POST',
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
                <ColorPicker />

                {/* Icon picker */}
                <IconPicker />

                {/* Footer */}
                <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter>

            </form>

        </Form>
    )
}