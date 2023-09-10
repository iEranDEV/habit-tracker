import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { NewHabitFormContext } from "./NewHabitForm";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function NewHabitTimeForm() {

    const { data, setData, stage, setStage } = useContext(NewHabitFormContext);

    const formSchema = z.object({

    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setData({ ...data, ...values });
    }

    return (
        <Form {...form}>

            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >


                <div className="flex justify-between">
                    <Button variant={'secondary'} type="button" onClick={(e) => {
                        e.preventDefault();
                        setStage(stage - 1);
                    }}>
                        Go back
                    </Button>
                    <Button type="submit">Create habit</Button>
                </div>

            </form>

        </Form>
    )
}