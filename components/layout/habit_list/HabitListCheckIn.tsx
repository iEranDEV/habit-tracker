import { CalendarContext } from "@/context/CalendarContext"
import { UserContext } from "@/context/UserContext"
import { addCheckInDB, deleteCheckInDB, updateCheckInDB } from "@/firebase/db/checkin"
import { isSameDate, weekdays } from "@/lib/date"
import { CheckIn, Habit } from "@/types"
import { startOfDay } from "date-fns"
import { Timestamp } from "firebase/firestore"
import { useContext, useState } from "react"
import { Check, Lock, MoreHorizontal, X } from 'lucide-react';
import { motion } from "framer-motion"
import CheckInCounterDialog from "@/components/dialog/habit/CheckInCounter"

const variants = {
    'util': 'w-10 h-10 flex justify-center items-center rounded-md transition-bg',
    'available': 'bg-muted cursor-pointer',
    'noAvailable': 'bg-border text-neutral-400',
    'inProgress': 'bg-orange-200 text-orange-400 cursor-pointer',
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
    const isPast = startOfDay(new Date()) > date;
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
                        if (isPast) updateCheckIn(checkIn, true);
                        else deleteCheckIn(checkIn);
                    } else {
                        updateCheckIn(checkIn, false);
                    }
                } else {
                    addCheckIn(true, date);
                }
                break;
            case 'counter':
                setDialogOpen(true);
                break;
        }
    }

    // Get style variant for checkIn
    const getVariant = (): 'noAvailable' | 'available' | 'completed' | 'failed' | 'inProgress' => {
        if (!isAvailable() && !checkIn) return 'noAvailable';
        if (!checkIn && !isPast) return 'available';

        switch (habit.type) {
            case 'default':
                if (checkIn?.value) {
                    return 'completed';
                } else {
                    return 'failed';
                }
            case 'counter':
                if (typeof checkIn?.value === 'number')
                    switch (habit.details?.counterType) {
                        case 'AtLeast':
                            if (checkIn?.value >= habit?.details.amount) {
                                return 'completed'
                            } else if (checkIn.value > 0) {
                                if (isPast) return 'failed';
                                else return 'inProgress';
                            } else return 'failed';
                        case 'LessThan':
                        case 'Exactly':
                    }
                else return 'failed';
        }

        return 'noAvailable';
    }


    // Get inside content icon for checkIn
    const content = (): JSX.Element => {
        switch (getVariant()) {
            case 'completed':
                return <Check strokeWidth={4} size={20} />
            case 'failed':
                return <X strokeWidth={4} size={20} />
            case 'noAvailable':
                return <Lock size={16} />
            case 'inProgress':
                return <MoreHorizontal strokeWidth={2} size={20} />
        }

        return <></>;
    }

    return (
        <div className="w-full flex justify-center">
            <div
                onClick={() => isAvailable() && handleClick(date)}
                className={`${variants.util} ${variants[getVariant()]}`}
            >
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    {content()}
                </motion.div>
            </div>
            {habit.type === 'counter' && (
                <CheckInCounterDialog
                    key={checkIn?.id || 'counterDialog'}
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    date={date}
                    checkIn={checkIn}
                    habit={habit}
                    addCheckIn={addCheckIn}
                    deleteCheckIn={deleteCheckIn}
                    updateCheckIn={updateCheckIn}
                />
            )}
        </div>
    )
}