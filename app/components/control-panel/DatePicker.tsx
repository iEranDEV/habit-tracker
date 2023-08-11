import { motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import IconButton from "../utils/IconButton";
import { getMonthName, isSameDate } from "@/lib/date";
import { CalendarContext } from "@/context/CalendarContext";

export default function DatePicker() {
    const [opened, setOpened] = useState(false);
    const [viewDate, setViewDate] = useState({ month: new Date().getMonth(), year: new Date().getFullYear()});

    const togglerRef = useRef<HTMLDivElement>(null);

    const calendarContext = useContext(CalendarContext);

    useEffect(() => {
        if(togglerRef.current) {
            if(opened) togglerRef.current.focus();
            else togglerRef.current.blur();
        }
    }, [opened]);

    const fixDay = (val: number) => {
        if(val < 0) return 6;
        return val;
    }

    const getYear = (year: number, month: number) => {
        if(month < 0) return year - 1;
        else if(month > 11) return year + 1;
        return year;
    }

    // Generate grid of days
    const getCalendar = () => {
        const year = viewDate.year;
        const month = viewDate.month;

        const dayone = new Date(year, month, 1).getDay();
        const lastdate = new Date(year, month + 1, 0).getDate();
        const dayend = new Date(year, month, lastdate).getDay();
        const monthlastdate = new Date(year, month, 0).getDate();
        
        let days = [];

        for(let i = fixDay(dayone - 1); i > 0; i--) {
            days.push(new Date(getYear(year, month - 1), month - 1, monthlastdate - i + 1));
        }
        for(let i = 1; i <= lastdate; i++) {
            days.push(new Date(year, month, i));
        }
        for(let i = dayend; i < 7; i++) {
            days.push(new Date(getYear(year, month + 1), month + 1, i - dayend + 1));
        }

        return (
            <div className="w-full grid grid-cols-7 mt-2">
                {days.map((item) => (
                    <div 
                        onClick={() => calendarContext.setSelectedDate(item)}
                        key={item.toDateString()} 
                        className={`${isSameDate(item, calendarContext.selectedDate) && 'border-2 border-purple-400'} w-full aspect-square flex justify-center bg-neutral-50 cursor-pointer items-center text-sm rounded-lg hover:brightness-95`}
                    >
                        <p className={`${item.getMonth() !== month ? 'text-neutral-300' : (isSameDate(item, new Date()) ? 'text-purple-400 font-semibold' : 'text-neutral-700')}`}>
                            {item.getDate()}
                        </p>
                    </div>
                ))}
            </div>
        )
    }

    const setMonth = (value: number) => {
        if(value > 11) {
            setViewDate({
                month: 0,
                year: viewDate.year + 1
            })
        } else if(value < 0) {
            setViewDate({
                month: 11,
                year: viewDate.year - 1
            })
        } else {
            setViewDate({
                month: value,
                year: viewDate.year
            })
        }
    }

    return (
        <div className="relative">
            {/* Toggler */}
            <div 
                ref={togglerRef} 
                tabIndex={0} 
                onBlur={(e) => {e.relatedTarget?.id !== 'date_dropdown' ? setOpened(false) : e.target.focus()}}
                onClick={() => setOpened(!opened)}
                className={`${opened && 'bg-purple-100 text-purple-400'} focus:outline-none outline-none select-none p-2 flex justify-center cursor-pointer text-neutral-400 transition-all bg-neutral-200 hover:bg-purple-100 hover:text-purple-400 items-center rounded-lg`}
            >
                <CalendarDays />
            </div>

            {/* Picker */}
            {opened && (
                <motion.div 
                    id="date_dropdown"
                    initial={{ transform: 'translateY(100%) scale(0)' }}
                    animate={{ transform: 'translateY(100%) scale(1)'}}
                    transition={{ duration: 0.1 }}
                    tabIndex={-1}
                    className="absolute focus:outline-none origin-top-left -bottom-2 rounded-lg left-0 translate-y-full bg-neutral-50 border border-neutral-200 shadow w-60 p-2"
                >

                    {/* Month control panel */}
                    <div className="border-b border-neutral-200 flex pb-2 justify-between items-center">

                        {/* Previous month */}
                        <IconButton onClick={() => setMonth(viewDate.month - 1)} icon={<ChevronLeft />} />

                        <div className="flex flex-col justify-center items-center">
                            <span className="text-sm">{viewDate.year}</span>
                            <p className="font-semibold">{getMonthName(viewDate.month)}</p>
                        </div>

                        {/* Next month */}
                        <IconButton onClick={() => setMonth(viewDate.month + 1)} icon={<ChevronRight />} />
                    </div>

                    {/* Calendar */}
                    {getCalendar()}

                </motion.div>
            )}
        </div>
    )
}