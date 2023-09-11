import { useEffect, useState } from "react";
import { Label } from "../../ui/label";
import { useFormContext } from "react-hook-form";
import { Toggle } from "../../ui/toggle";
import { WEEKDAYS_SHORT } from "@/lib/date";

export default function FrequencyPicker() {

    const [frequency, setFrequency] = useState([0, 1, 2, 3, 4, 5, 6]);

    const methods = useFormContext();

    useEffect(() => {
        methods.setValue('frequency', frequency);
    }, [frequency]);

    const checkWeekdays = () => {
        const weekdays = [0, 1, 2, 3, 4];
        return weekdays.every((item) => frequency.includes(item)) && frequency.length === weekdays.length;
    }


    return (
        <div className="space-y-2">
            <Label>Select habit frequency</Label>
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                    <Toggle
                        pressed={frequency.includes(i)}
                        key={i}
                        variant={'outline'}
                        onClick={() => {
                            if (frequency.includes(i)) {
                                setFrequency([...frequency.filter((item) => item !== i)]);
                            } else {
                                setFrequency([...frequency, i]);
                            }
                        }}
                    >
                        {WEEKDAYS_SHORT[i]}
                    </Toggle>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
                <Toggle
                    variant={'outline'}
                    pressed={checkWeekdays()}
                    onClick={() => {
                        setFrequency([0, 1, 2, 3, 4]);
                    }}
                >
                    Week days
                </Toggle>
                <Toggle
                    variant={'outline'}
                    pressed={frequency.length === 7}
                    onClick={() => {
                        setFrequency([0, 1, 2, 3, 4, 5, 6])
                    }}
                >
                    Every day
                </Toggle>
            </div>
        </div>
    )
}