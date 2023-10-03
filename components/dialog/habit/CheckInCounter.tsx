import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { formatISO } from "date-fns";
import { useState } from "react";
import { CheckIn } from "@prisma/client";
import { HabitWithData } from "@/types";

type CheckInCounterDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    date: Date,
    checkIn: CheckIn | undefined,
    habit: HabitWithData,
    loading: boolean,
    fetchCheckIn: Function,
}

export default function CheckInCounterDialog({ open, setOpen, date, checkIn, habit, loading, fetchCheckIn }: CheckInCounterDialogProps) {

    const [value, setValue] = useState(checkIn?.details?.amount || 0);

    const handleChange = (val: number) => {
        if (val >= 0) setValue(val);
    }

    const handleSubmit = async () => {
        await fetchCheckIn({ amount: value });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{habit.name}</DialogTitle>
                    <DialogDescription>{formatISO(date, { representation: 'date' })}</DialogDescription>
                </DialogHeader>

                <div className="flex justify-center">
                    <div className="w-1/2 my-8 flex justify-between">
                        <Button onClick={() => handleChange(value - 1)} variant={'outline'} size={'icon'}>
                            <Minus size={20} />
                        </Button>
                        <input
                            className="w-[100px] text-4xl truncate text-center"
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(Number(e.target.value))}
                        />
                        <Button onClick={() => handleChange(value + 1)} variant={'outline'} size={'icon'}>
                            <Plus size={20} />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <Button onClick={async () => {
                        await fetchCheckIn({});
                        setOpen(false);
                    }} variant={'outline'} size={'icon'} disabled={loading}>
                        <Trash2 size={20} />
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <span>Submit</span>
                        )}
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}