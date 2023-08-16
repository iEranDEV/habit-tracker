import { ChevronLeft, ChevronRight, MoveRight, Plus } from "lucide-react";
import ViewModeToggler from "./ViewModeToggler";
import IconButton from "../utils/IconButton";
import { ModalContext } from "@/context/ModalContext";
import { useContext } from 'react';
import DatePicker from "./DatePicker";
import { CalendarContext } from "@/context/CalendarContext";
import { formatShortDate, getWeek } from "@/lib/date";
import Button from "../utils/Button";

export default function ControlPanel() {

    const modalContext = useContext(ModalContext);
    const calendarContext = useContext(CalendarContext);

    return (
        <div className="w-full py-2 bg-neutral-50 flex justify-between items-center">
							
            {/* Date & control buttons */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <IconButton icon={<ChevronLeft />} />
                    <IconButton icon={<ChevronRight />} />

                    {/* Date picker */}
                    <DatePicker />
                </div>
                <div className="text-lg font-semibold flex gap-2 items-center">
                    {calendarContext.viewMode === 'week' ? (
                        <>
                            {(() => {
                                const { weekStart, weekEnd } = getWeek(calendarContext.selectedDate);

                                return (
                                    <p className="flex items-center gap-2">
                                        <span>{formatShortDate(weekStart)}</span>
                                        <MoveRight />
                                        <span>{formatShortDate(weekEnd)}</span>
                                    </p>
                                )
                            })()}
                        </>
                    ) : (
                        <span>{formatShortDate(calendarContext.selectedDate)}</span>
                    )}
                </div>
            </div>

            {/* View mode, new habit button */}
            <div className="flex items-center gap-2">
                <ViewModeToggler />
                <Button name="Add habit" icon={<Plus />} onClick={() => modalContext.setModal('new_habit')} />
            </div>
        
        </div>
    )
}