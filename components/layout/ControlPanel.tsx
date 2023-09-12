import { CalendarIcon, ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { useContext } from 'react';
import { CalendarContext } from "@/context/CalendarContext";
import { formatShortDate, getWeek } from "@/lib/date";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import NewHabitDialog from "../dialog/habit/NewHabit";
import { UserContext } from "@/context/UserContext";

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
    const calendarContext = useContext(CalendarContext);

    const { user } = useContext(UserContext);
    const { selectedDate, setSelectedDate } = calendarContext;

    return (
        <div className="w-full py-2 px-2 lg:px-0 flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center">

            {/* Date & control buttons */}
            <div className="flex items-center w-full lg:w-auto gap-2">
                <div className="flex gap-2">

                    {/* Previous day / week */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon">
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
                                <Button variant="outline" size="icon">
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
                                        required
                                        selected={selectedDate}
                                        weekStartsOn={user?.settings.firstDayOfWeek as 0 | 1}
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
                    {calendarContext.viewMode === 'week' ? (
                        <>
                            {(() => {
                                const { weekStart, weekEnd } = getWeek(selectedDate);

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
                    ) : (
                        <motion.span
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                        >
                            {formatShortDate(selectedDate)}
                        </motion.span>
                    )}
                </div>
            </div>

            {/* View mode, new habit button */}
            <div className="w-full md:w-auto flex items-center gap-2">
                <Select onValueChange={(value: 'day' | 'week' | 'month') => calendarContext.setViewMode(value)} defaultValue={calendarContext.viewMode}>
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