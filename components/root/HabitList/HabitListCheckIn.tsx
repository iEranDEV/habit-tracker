import { weekdays } from "@/lib/date"
import { parseISO, startOfDay } from "date-fns"
import { useContext, useState } from "react"
import { Check, Loader2, Lock, MoreHorizontal, X } from 'lucide-react';
import { motion } from "framer-motion"
import CheckInCounterDialog from "@/components/root/HabitList/CheckInCounter"
import { HabitWithData } from "@/types"
import { CheckIn, CheckInDetails } from "@prisma/client"
import { useUserSettings } from "@/context/UserContext";
import { CalendarContext } from "@/context/CalendarContext";

const variants = {
    'util': 'w-10 h-10 flex justify-center items-center rounded-md transition-bg hover:scale-110 transition-transform',
    'available': 'bg-muted cursor-pointer',
    'noAvailable': 'bg-border text-neutral-400',
    'inProgress': 'bg-orange-200 text-orange-400 cursor-pointer',
    'completed': 'bg-green-200 text-green-400 cursor-pointer',
    'failed': 'bg-red-200 text-red-400 cursor-pointer'
}

type HabitListCheckInProps = {
    date: Date,
    habit: HabitWithData,
    updateCheckIns: Function,
    checkIn: CheckIn | undefined,
}

export default function HabitListCheckIn({ date, habit, updateCheckIns, checkIn }: HabitListCheckInProps) {

    const details = checkIn?.details;

    const [loading, setLoading] = useState(false);
    const isPast = startOfDay(new Date()) > date;
    const [dialogOpen, setDialogOpen] = useState(false);

    const { settings } = useUserSettings();

    const { viewMode } = useContext(CalendarContext);

    // Check if user can change checkIn value this day
    const isAvailable = () => {
        return (
            habit.frequency.includes(weekdays.indexOf(date.getDay())) &&
            (habit.endDate ? habit.endDate >= date : true) &&
            startOfDay(habit.startDate) <= startOfDay(date) &&
            (settings?.modifyDaysPast ? true : (startOfDay(new Date()) > date ? false : true)) &&
            (settings?.modifyDaysFuture ? true : (startOfDay(new Date()) < date ? false : true))
        )
    }

    const fetchCheckIn = async (details: Partial<CheckInDetails>) => {
        setLoading(true);
        const response = await fetch(`/api/checkin`, {
            method: 'POST',
            body: JSON.stringify({
                habitId: habit.id,
                date: date,
                details: details
            })
        })

        if (!response.ok) return;
        const json = await response.json();

        const type = json.type;
        const data = { ...json.data, date: parseISO(json.data.date) };

        updateCheckIns(data, type);

        setLoading(false);
    }

    // Handle user click event
    const handleClick = async () => {
        if (!isAvailable()) return;
        if (loading) return;

        switch (habit.type) {
            case 'DEFAULT':
                if (details) {
                    if (details?.value === false) {
                        if (isPast) fetchCheckIn({ value: true });
                        else fetchCheckIn({});
                    } else {
                        fetchCheckIn({ value: false });
                    }
                } else fetchCheckIn({ value: true });
                break;
            case 'COUNTER':
                setDialogOpen(true);
                break;
        }
    }

    // Get style variant for checkIn
    const getVariant = (): 'noAvailable' | 'available' | 'completed' | 'failed' | 'inProgress' => {
        if (!isAvailable() && !checkIn) {
            if (isPast && startOfDay(habit.startDate) <= startOfDay(date)) return 'failed';
            return 'noAvailable';
        }
        if (!checkIn && !isPast) return 'available';

        switch (habit.type) {
            case 'DEFAULT':
                if (details?.value) {
                    return 'completed';
                } else {
                    return 'failed';
                }
            case 'COUNTER':
                if (details?.amount) {
                    switch (habit.details?.counterType) {
                        case 'AT_LEAST':
                            if (details?.amount >= habit?.details.amount!) {
                                return 'completed'
                            } else if (details?.amount > 0) {
                                if (isPast) return 'failed';
                                else return 'inProgress';
                            } else return 'failed';
                        case 'LESS_THAN':
                            if (details?.amount < habit?.details.amount!) {
                                return 'completed'
                            } else if (details?.amount > 0) {
                                if (isPast) return 'failed';
                                else return 'inProgress';
                            } else return 'failed';
                        case 'EXACTLY':
                            if (details?.amount === habit?.details.amount!) {
                                return 'completed'
                            } else if (details?.amount > 0) {
                                if (isPast) return 'failed';
                                else return 'inProgress';
                            } else return 'failed';
                    }
                } else {
                    return 'failed';
                }
        }

        return 'noAvailable';
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div
                onClick={handleClick}
                className={`${variants.util} ${variants[getVariant()]} ${viewMode === 'month' && '!h-5 !w-5 aspect-square'}`}
            >
                {viewMode !== 'month' && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        {loading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (<>
                            {{
                                'completed': <Check strokeWidth={4} size={20} />,
                                'failed': <X strokeWidth={4} size={20} />,
                                'noAvailable': <Lock size={16} />,
                                'inProgress': <MoreHorizontal strokeWidth={2} size={20} />,
                                'available': null
                            }[getVariant()]}
                        </>)}
                    </motion.div>
                )}
            </div>
            {
                habit.type === 'COUNTER' && (
                    <CheckInCounterDialog
                        key={checkIn?.id || 'counterDialog'}
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        date={date}
                        checkIn={checkIn}
                        loading={loading}
                        habit={habit}
                        fetchCheckIn={fetchCheckIn}
                    />
                )
            }
        </div >
    )
}