import { Calendar, ChevronLeft, ChevronRight, MoveRight, Plus } from "lucide-react";
import { ModalContext } from "@/context/ModalContext";
import { useContext } from 'react';
import { CalendarContext } from "@/context/CalendarContext";
import { formatShortDate, getWeek } from "@/lib/date";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function ControlPanel() {

    const modalContext = useContext(ModalContext);
    const calendarContext = useContext(CalendarContext);

    return (
        <div className="w-full py-2 px-2 lg:px-0 flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center">
							
            {/* Date & control buttons */}
            <div className="flex items-center w-full lg:w-auto gap-2">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                        <ChevronLeft size={20} />
                    </Button>
                    <Button variant="outline" size="icon">
                        <ChevronRight size={20} />
                    </Button>

                    {/* Date picker */}
                    {/*<DatePicker />*/}
                    <Button variant="outline" size="icon">
                        <Calendar size={20} />
                    </Button>
                </div>
                <div className="flex text-lg font-semibold gap-2 items-center">
                    {calendarContext.viewMode === 'week' ? (
                        <>
                            {(() => {
                                const { weekStart, weekEnd } = getWeek(calendarContext.selectedDate);

                                return (
                                    <motion.p
                                        initial={{ y: -20 }}
                                        animate={{ y: 0}}
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
                            animate={{ y: 0}}
                        >
                            {formatShortDate(calendarContext.selectedDate)}
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