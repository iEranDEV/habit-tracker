import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatISO } from "date-fns";
import { useState } from "react";
import { HabitWithCategory } from "@/types";
import { CheckIn } from "@prisma/client";

type CheckInCounterDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    date: Date,
    checkIn: CheckIn | undefined,
    habit: HabitWithCategory,
    addCheckIn: Function,
    deleteCheckIn: Function,
    updateCheckIn: Function
}

export default function CheckInCounterDialog({ open, setOpen, date, checkIn, habit, addCheckIn, deleteCheckIn, updateCheckIn }: CheckInCounterDialogProps) {

    const [value, setValue] = useState<number>(typeof checkIn?.value === "number" ? checkIn?.value : 0);

    const handleSubmit = () => {
        if (checkIn) {
            updateCheckIn(checkIn, value);
        } else {
            addCheckIn(value, date);
        }

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
                        <Button onClick={() => setValue(value - 1)} variant={'outline'} size={'icon'}>
                            <Minus size={20} />
                        </Button>
                        <input
                            className="w-[100px] text-4xl truncate text-center"
                            type="text"
                            value={value}
                            onChange={(e) => setValue(Number(e.target.value))}
                        />
                        <Button onClick={() => setValue(value + 1)} variant={'outline'} size={'icon'}>
                            <Plus size={20} />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <Button onClick={() => {
                        setOpen(false);
                        deleteCheckIn(checkIn);
                    }} variant={'outline'} size={'icon'}>
                        <Trash2 size={20} />
                    </Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}