import { ChevronLeft, ChevronRight, MoveRight, Plus } from "lucide-react";
import ViewModeToggler from "./ViewModeToggler";
import IconButton from "../utils/IconButton";
import { ModalContext } from "@/context/ModalContext";
import { useContext } from 'react';
import DatePicker from "../utils/DatePicker";

export default function ControlPanel() {

    const modalContext = useContext(ModalContext);

    return (
        <div className="w-full py-2 bg-neutral-50 flex justify-between items-center">
							
            {/* Date & control buttons */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <IconButton icon={<ChevronLeft />} />
                    <IconButton icon={<ChevronRight />} />
                    <DatePicker />
                </div>
                <div className="text-lg font-semibold flex gap-2 items-center">
                    <span>31 July</span> <MoveRight /> <span>6 August</span>
                </div>
            </div>

            {/* View mode, new habit button */}
            <div className="flex items-center gap-2">
                <ViewModeToggler />
                <div 
                    onClick={() => modalContext.setModal('new_habit')}
                    className="flex cursor-pointer hover:brightness-95 transition-all justify-center gap-2 text-purple-500 items-center px-4 py-2 bg-purple-200 rounded-lg"
                >
                    <Plus />
                    <div>Add habit</div>
                </div>
            </div>
        
        </div>
    )
}