import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calculator, CopyCheck, ListTodo, Timer } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NewHabitFormContext } from "./NewHabitForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { HabitType } from "@/types";

type HabitTypeItem = {
    id: HabitType,
    icon: JSX.Element,
    name: string,
}

const types = [
    {
        id: 'default',
        icon: <CopyCheck size={20} />,
        name: 'Yes or no'
    }, {
        id: 'counter',
        icon: <Calculator size={20} />,
        name: 'Counter'
    }, {
        id: 'timer',
        icon: <Timer size={20} />,
        name: 'Timer',
    }, {
        id: 'checklist',
        icon: <ListTodo size={20} />,
        name: 'Checklist',
    }
] as Array<HabitTypeItem>

export default function NewHabitTypeForm() {

    const { data, setData, stage, setStage } = useContext(NewHabitFormContext);

    const formSchema = z.object({
        type: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: data.type || 'default'
        }
    });

    const [selected, setSelected] = useState(data.type || 'default');

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setData({ ...data, ...values })
        setStage(stage + 1);
    }

    useEffect(() => {
        if (selected) {
            form.setValue('type', selected);
        }
    }, [selected, form])

    return (
        <Form {...form}>

            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >

                <div className="space-y-2" >
                    <Label>Select habit type</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {types.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelected(item.id)}
                                className={'cursor-pointer gap-2 ' + buttonVariants({ variant: selected === item.id ? 'default' : 'outline' })}
                            >
                                {item.icon}
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div >

                <div className="flex justify-between">
                    <Button variant={'secondary'} type="button" onClick={(e) => {
                        e.preventDefault();
                        setStage(stage - 1);
                    }}>
                        Go back
                    </Button>
                    <Button type="submit">Continue</Button>
                </div >

            </form>

        </Form>
    )
}