import { ChevronLeft, ChevronRight, MoveRight, Plus } from "lucide-react";
import ViewModeToggler from "./ViewModeToggler";
import IconButton from "../utils/general/IconButton";
import { ModalContext } from "@/context/ModalContext";
import { useContext } from 'react';
import DatePicker from "./DatePicker";
import { CalendarContext } from "@/context/CalendarContext";
import { formatShortDate, getWeek } from "@/lib/date";
import Button from "../utils/general/Button";
import { AnimatePresence, motion } from "framer-motion";

export default function ControlPanel() {

    const modalContext = useContext(ModalContext);
    const calendarContext = useContext(CalendarContext);

    return (
        <div className="w-full py-2 px-2 lg:px-0 bg-neutral-50 flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center">
							
            {/* Date & control buttons */}
            <div className="flex items-center w-full lg:w-auto gap-2">
                <div className="flex items-center gap-2">
                    <IconButton icon={<ChevronLeft />} />
                    <IconButton icon={<ChevronRight />} />

                    {/* Date picker */}
                    <DatePicker />
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
                <ViewModeToggler />
                <Button name="Add habit" icon={<Plus />} onClick={() => modalContext.setModal('new_habit')} />
            </div>
        
        </div>
    )
}