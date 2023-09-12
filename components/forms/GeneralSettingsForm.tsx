'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";

export default function GeneralSettingsForm() {

    const formSchema = z.object({
        firstDayOfWeek: z.number(),
        language: z.string(),
        modifyDaysPast: z.boolean(),
        modifyDaysFuture: z.boolean()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstDayOfWeek: 1,
            language: 'en',
            modifyDaysPast: true,
            modifyDaysFuture: true
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
                className="space-y-6"
            >

                {/* First day of the week */}
                <div className="w-full flex justify-between items-center">
                    <div className="space-y-2 flex flex-col">
                        <Label>First day of the week</Label>
                        <span className="text-sm text-muted-foreground">Choose a day on which a week starts in the app.</span>
                    </div>

                    <FormField
                        control={form.control}
                        name="firstDayOfWeek"
                        render={({ field }) => (
                            <FormItem>
                                <Select defaultValue={field.value.toString()} onValueChange={(value) => field.onChange(+value)}>
                                    <FormControl>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={'0'}>Sunday</SelectItem>
                                        <SelectItem value={'1'}>Monday</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Language */}
                <div className="w-full flex justify-between items-center">
                    <div className="space-y-2 flex flex-col">
                        <Label>Language</Label>
                        <span className="text-sm text-muted-foreground">Select your preferred app language.</span>
                    </div>

                    <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                            <FormItem>
                                <Select defaultValue={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={'en'}>English</SelectItem>
                                        <SelectItem value={'pl'}>Polish</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Modify past days */}
                <div className="w-full flex justify-between items-center">
                    <div className="space-y-2 flex flex-col">
                        <Label>Modify past days</Label>
                        <span className="text-sm text-muted-foreground">Select your preferred app language.</span>
                    </div>

                    <FormField
                        control={form.control}
                        name="modifyDaysPast"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Modify future days */}
                <div className="w-full flex justify-between items-center">
                    <div className="space-y-2 flex flex-col">
                        <Label>Modify future days</Label>
                        <span className="text-sm text-muted-foreground">Select your preferred app language.</span>
                    </div>

                    <FormField
                        control={form.control}
                        name="modifyDaysFuture"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Footer */}
                <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter>

            </form>

        </Form>
    )
}