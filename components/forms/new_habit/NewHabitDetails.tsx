import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { NewHabitFormContext } from "./NewHabitForm";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function NewHabitDetailsForm() {

    const { data, setData, stage, setStage } = useContext(NewHabitFormContext);

    const formSchema = z.object({
        name: z.string(),
        description: z.string(),
        details: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name || '',
            description: data.description || '',
            details: data.type || 'blank'
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setData({ ...data, ...values });
        setStage(stage + 1);
    }

    return (
        <Form {...form}>

            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >

                <p>{form.getValues('details')}</p>

                <div className="flex justify-between">
                    <Button variant={'secondary'} type="button" onClick={(e) => {
                        e.preventDefault();
                        setStage(stage - 1);
                    }}>
                        Go back
                    </Button>
                    <Button type="submit">Continue</Button>
                </div>

            </form>

        </Form>
    )
}