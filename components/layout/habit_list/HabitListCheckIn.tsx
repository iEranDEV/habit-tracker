import { CalendarContext } from "@/context/CalendarContext"
import { UserContext } from "@/context/UserContext"
import { addCheckInDB, deleteCheckInDB, updateCheckInDB } from "@/firebase/db/checkin"
import { isSameDate, weekdays } from "@/lib/date"
import { CheckIn, Habit } from "@/types"
import { startOfDay } from "date-fns"
import { Timestamp } from "firebase/firestore"
import { useContext, useState } from "react"
import { Check, Lock, X } from 'lucide-react';
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import CheckInCounterDialog from "@/components/dialog/habit/CheckInCounter"

const variants = {
    'util': 'w-10 h-10 flex justify-center items-center rounded-md transition-bg',
    'available': 'bg-muted cursor-pointer',
    'noAvailable': 'bg-border text-neutral-400',
    'inProgress': 'bg-red-500 cursor-pointer',
    'completed': 'bg-green-200 text-green-400 cursor-pointer',
    'failed': 'bg-red-200 text-red-400 cursor-pointer'
}

type HabitListCheckInProps = {
    date: Date,
    habit: Habit,
    checkIns: CheckIn[] | CheckIn | undefined,
    setCheckIns: Function
}

export default function HabitListCheckIn({ date, habit, checkIns, setCheckIns }: HabitListCheckInProps) {

    const checkIn = Array.isArray(checkIns) ? checkIns.find((item) => isSameDate(item.date.toDate(), date)) : undefined;
    const [dialogOpen, setDialogOpen] = useState(false);

    const { viewMode, selectedDate } = useContext(CalendarContext);
    const { user, categories } = useContext(UserContext);

    // Check if user can change checkIn value this day
    const isAvailable = () => {
        return (
            habit.frequency.includes(weekdays.indexOf(date.getDay())) &&
            (habit.endDate ? habit.endDate?.toDate() >= date : true) &&
            habit.startDate.toDate() <= date &&
            (user?.settings.modifyDaysPast ? true : (startOfDay(new Date()) > date ? false : true)) &&
            (user?.settings.modifyDaysFuture ? true : (startOfDay(new Date()) < date ? false : true))
        )
    }

    // Create new checkIn
    const addCheckIn = async (val: boolean | number, date: Date) => {
        const { result, error } = await addCheckInDB({
            id: '',
            date: Timestamp.fromDate(startOfDay(date)),
            habit: habit.id,
            value: val
        });

        if (result) {
            if (viewMode === 'day') setCheckIns(result);
            else if (Array.isArray(checkIns)) setCheckIns([...checkIns, result]);
        }
    }

    // Remove existing checkIn
    const deleteCheckIn = async (checkIn: CheckIn) => {
        const { result, error } = await deleteCheckInDB(checkIn);
        if (result && checkIns) {
            if (Array.isArray(checkIns)) setCheckIns([...checkIns.filter((item) => item.id !== checkIn.id)]);
            else setCheckIns(undefined);
        }
    }

    // Update existing checkIn
    const updateCheckIn = async (checkIn: CheckIn, val: boolean | number) => {
        const { result, error } = await updateCheckInDB(checkIn, val);
        if (result && checkIns) {
            if (Array.isArray(checkIns)) setCheckIns([...checkIns.filter((item) => item.id !== checkIn.id), result]);
            else setCheckIns(result);
        }
    }

    // Handle user click event
    const handleClick = (date: Date) => {

        switch (habit.type) {
            case 'default':
                if (checkIn) {
                    if (checkIn.value === false) {
                        // Delete checkIn
                        deleteCheckIn(checkIn);
                    } else if (checkIn.value === true) {
                        // Change checkIn value to false
                        updateCheckIn(checkIn, false);
                    }
                } else {
                    // Change checkIn value to true
                    addCheckIn(true, date);
                }
                break;
            case 'counter':
                if (checkIn) {

                } else {
                    setDialogOpen(true);
                }
                break;
        }
    }

    // Get style variant for checkIn
    const getVariant = () => {
        if (!isAvailable() && !checkIn) return variants.noAvailable;
        if (!checkIn) return variants.available;

        switch (habit.type) {
            case 'default':
                if (checkIn.value) {
                    return variants.completed;
                } else {
                    return variants.failed;
                }
        }
    }


    // Get inside content icon for checkIn
    const content = (): JSX.Element => {
        if (checkIn) {
            switch (habit.type) {
                case 'default':
                    if (checkIn?.value) {
                        return <Check strokeWidth={4} size={20} />
                    } else {
                        return <X strokeWidth={4} size={20} />
                    }
            }
        }

        return <></>;
    }

    return (
        <div className="w-full flex justify-center">
            <div
                onClick={() => isAvailable() && handleClick(date)}
                className={`${variants.util} ${getVariant()}`}
            >
                {(!isAvailable() && !checkIn) && <Lock size={16} />}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    {content()}
                </motion.div>
            </div>
            {habit.type === 'counter' && (
                <CheckInCounterDialog open={dialogOpen} setOpen={setDialogOpen} />
            )}
        </div>
    )
}