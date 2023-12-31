import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FrequencyPicker from "@/components/shared/inputs/FrequencyPicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { useUserSettings } from "@/context/UserContext";
import { HabitFormContext } from "@/components/shared/habit/form/HabitForm";

export default function NewHabitTimeForm({ setOpen, edit }: { setOpen: Function, edit: boolean | undefined }) {

    const [loading, setLoading] = useState(false);

    const ctx = useContext(HabitFormContext);
    const { data, setData, stage, setStage } = ctx;

    const router = useRouter();
    const { settings } = useUserSettings();

    const formSchema = z.object({
        frequency: z.array(z.number()),
        startDate: z.date(),
        endDate: z.date().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            frequency: data.frequency || [0, 1, 2, 3, 4, 5, 6],
            startDate: data.startDate || new Date(),
            endDate: data.endDate || undefined
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        const habit = { ...data, ...values }
        const response = edit ? (
            await fetch(`/api/habit/${habit.id}`, {
                method: 'PUT',
                body: JSON.stringify({ habit })
            })
        ) : (
            await fetch('/api/habit', {
                method: 'POST',
                body: JSON.stringify(habit)
            })
        )
        const responseData = await response.json();

        if (data) {
            responseData && setOpen(false);
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

                <FrequencyPicker />

                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            onSelect={field.onChange}
                                            weekStartsOn={settings?.firstDayOfWeek as 0 | 1 | undefined}
                                            initialFocus
                                            required
                                            selected={field.value}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            weekStartsOn={settings?.firstDayOfWeek as 0 | 1 | undefined}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-between">
                    <Button variant={'secondary'} type="button" onClick={(e) => {
                        e.preventDefault();
                        setStage(stage - 1);
                    }}>
                        Go back
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <>
                                {edit ? (
                                    <span>Edit habit</span>
                                ) : (
                                    <span>Create habit</span>
                                )}
                            </>
                        )}
                    </Button>
                </div>

            </form>

        </Form >
    )
}