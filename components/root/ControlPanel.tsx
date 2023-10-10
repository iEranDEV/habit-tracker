'use client';

import { CalendarIcon, ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { useContext } from 'react';
import { CalendarContext } from "@/context/CalendarContext";
import { formatShortDate } from "@/lib/date";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import NewHabitDialog from "../shared/NewHabit/NewHabitDialog";
import { useUserSettings } from "@/context/UserContext";
import { addDays, addMonths, addWeeks, endOfWeek, startOfWeek, subDays, subMonths, subWeeks } from "date-fns";
import Link from "next/link";

const viewOptions = [
    {
        title: 'Day',
        id: 'day'
    }, {
        title: 'Week',
        id: 'week'
    }, {
        title: 'Month',
        id: 'month'
    }
]

export default function ControlPanel() {

    const { settings } = useUserSettings();
    const { viewMode, setViewMode, selectedDate, setSelectedDate } = useContext(CalendarContext);

    const nextSelectedDate = () => {
        switch (viewMode) {
            case 'day':
                return setSelectedDate(addDays(selectedDate, 1));
            case 'week':
                return setSelectedDate(addWeeks(selectedDate, 1));
            case 'month':
                return setSelectedDate(addMonths(selectedDate, 1));
        }
    }

    const previousSelectedDate = () => {
        switch (viewMode) {
            case 'day':
                return setSelectedDate(subDays(selectedDate, 1));
            case 'week':
                return setSelectedDate(subWeeks(selectedDate, 1));
            case 'month':
                return setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    return (
        <div className="bg-background z-50 w-full py-2 px-2 lg:px-0 flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center">

            {/* Date & control buttons */}
            <div className="flex items-center w-full lg:w-auto gap-2">
                <div className="flex gap-2">

                    {/* Previous day / week */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={previousSelectedDate} >
                                    <ChevronLeft size={20} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Previous</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* Next day / week */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={nextSelectedDate}>
                                    <ChevronRight size={20} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Next</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* Date picker */}
                        <Popover>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} size={'icon'}>
                                            <CalendarIcon size={20} />
                                        </Button>
                                    </PopoverTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Calendar</p>
                                </TooltipContent>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        defaultMonth={selectedDate}
                                        required
                                        selected={selectedDate}
                                        weekStartsOn={settings?.firstDayOfWeek as 0 | 1 | undefined}
                                        onSelect={(date: Date | undefined) => date && setSelectedDate(date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Tooltip>
                        </Popover>
                    </TooltipProvider>
                </div>

                {/* Selected date / week */}
                <div className="flex text-lg font-semibold gap-2 items-center">
                    {{
                        'day': (
                            <p>
                                {formatShortDate(selectedDate)}
                            </p>
                        ),
                        'week': (
                            <>
                                {(() => {
                                    const weekStart = startOfWeek(selectedDate, { weekStartsOn: settings?.firstDayOfWeek as 0 | 1 | undefined });
                                    const weekEnd = endOfWeek(selectedDate, { weekStartsOn: settings?.firstDayOfWeek as 0 | 1 | undefined });

                                    return (
                                        <motion.p
                                            initial={{ y: -20 }}
                                            animate={{ y: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <span>{formatShortDate(weekStart)}</span>
                                            <MoveRight />
                                            <span>{formatShortDate(weekEnd)}</span>
                                        </motion.p>
                                    )
                                })()}
                            </>
                        ),
                        'month': <p>month</p>
                    }[viewMode]}
                </div>
            </div>

            {/* View mode, new habit button */}
            <div className="w-full md:w-auto flex items-center gap-2">
                <Select onValueChange={(value: 'day' | 'week' | 'month') => setViewMode(value)} defaultValue={viewMode}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select view mode" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select view mode</SelectLabel>
                            {viewOptions.map((item) => (
                                <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <NewHabitDialog />
            </div>

        </div >
    )
}