import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { NewHabitFormContext } from "./NewHabitFormWrapper";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewHabitDetailsForm() {

    const ctx = useContext(NewHabitFormContext);
    if (!ctx) return null;
    const { data, setData, stage, setStage } = ctx;

    const formSchema = z.object({
        name: z.string(),
        description: z.string(),
        details: z.object({
            'DEFAULT': {},
            'COUNTER': {
                amount: z.number(),
                counterType: z.string(),
                unit: z.string().optional()
            },
            'TIMER': {},
            'CHECKLIST': {}
        }[data.type!]).optional()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name || '',
            description: data.description || '',
            details: {
                'DEFAULT': {},
                'COUNTER': {
                    amount: data.details?.amount || '',
                    counterType: data.details?.counterType || 'AT_LEAST',
                    unit: data.details?.unit || ''
                },
                'TIMER': {},
                'CHECKLIST': {}
            }[data.type!]
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setData({ ...data, ...values } as any);
        setStage(stage + 1);
    }

    return (
        <Form {...form}>

            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >

                {/* Habit name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Habit name</FormLabel>
                            <FormControl>
                                <Input placeholder="Example habit" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Habit description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write some more details about this habit"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Counter type */}
                {data.type === 'COUNTER' && (
                    <div className="space-y-2">
                        <Label>Enter habit details</Label>
                        <div className="grid grid-cols-4 gap-2">
                            <FormField
                                control={form.control}
                                name="details.type"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={'AtLeast'}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='AtLeast'>At least</SelectItem>
                                                <SelectItem value='LessThan'>Less than</SelectItem>
                                                <SelectItem value='Exactly'>Exactly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="details.amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="number" placeholder="Goal" {...field} onChange={event => field.onChange(+event.target.value)} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="details.unit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Unit (optional)" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="h-10 flex items-center">
                                <p>a day</p>
                            </div>
                        </div>
                    </div>
                )}

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