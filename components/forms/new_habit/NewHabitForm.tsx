import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface NewHabitFormProps {
    children: JSX.Element
}

export default function NewHabitForm({ children }: NewHabitFormProps) {

    const formSchema = z.object({
        category: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: 'default_other'
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <Form {...form}>

            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
            >

                {children}

            </form>

        </Form>
    )
}