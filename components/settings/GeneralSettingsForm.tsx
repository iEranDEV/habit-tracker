'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { useUserSettings } from "@/context/UserContext";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function GeneralSettingsForm() {

    const [loading, setLoading] = useState(false);
    const { settings, updateSettings } = useUserSettings();

    const formSchema = z.object({
        firstDayOfWeek: z.number(),
        language: z.string(),
        modifyDaysPast: z.boolean(),
        modifyDaysFuture: z.boolean()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstDayOfWeek: settings?.firstDayOfWeek,
            language: settings?.language,
            modifyDaysPast: settings?.modifyDaysPast,
            modifyDaysFuture: settings?.modifyDaysFuture
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        const result = await updateSettings(values);

        if (result) {
            toast({
                title: "Updated settings",
                description: "Successfully updated settings",
            })
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