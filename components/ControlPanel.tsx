import { CalendarIcon, ChevronLeft, ChevronRight, MoveRight, Plus } from "lucide-react";
import { useContext } from 'react';
import { CalendarContext } from "@/context/CalendarContext";
import { formatShortDate, getWeek } from "@/lib/date";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { TooltipProvider } from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

export default function ControlPanel() {
    const calendarContext = useContext(CalendarContext);

    const { selectedDate, setSelectedDate } = calendarContext;

    return (
        <div className="w-full py-2 px-2 lg:px-0 flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center">

            {/* Date & control buttons */}
            <div className="flex items-center w-full lg:w-auto gap-2">
                <div className="space-x-2">
                    <TooltipProvider>

                        {/* Previous day / week */}
                        <Button variant="outline" size="icon" tooltip="Previous">
                            <ChevronLeft size={20} />
                        </Button>

                        {/* Next day / week */}
                        <Button variant="outline" size="icon" tooltip="Next">
                            <ChevronRight size={20} />
                        </Button>

                        {/* Date picker */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={"outline"} size={'icon'} tooltip="Calendar">
                                    <CalendarIcon size={20} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    required
                                    selected={selectedDate}
                                    onSelect={(date: Date | undefined) => date && setSelectedDate(date)}
                                    initialFocus
                                />
                            </PopoverContent>
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
                {/*<ViewModeToggler />
                <Button name="Add habit" icon={<Plus />} onClick={() => modalContext.setModal('new_habit')} />*/}
                <Button>
                    <Plus size={20} className="mr-2" /> Add new habit
                </Button>
            </div>

        </div>
    )
}