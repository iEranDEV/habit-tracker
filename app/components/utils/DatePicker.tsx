import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function DatePicker() {
    const [opened, setOpened] = useState(false);

    const togglerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(togglerRef.current) {
            if(opened) togglerRef.current.focus();
            else togglerRef.current.blur();
        }
    }, [opened]);

    return (
        <div className="relative">
            {/* Toggler */}
            <div 
                ref={togglerRef} 
                tabIndex={0} 
                onBlur={() => setOpened(false)}
                onClick={() => setOpened(!opened)}
                className="focus:outline-none outline-none select-none p-2 flex justify-center cursor-pointer text-neutral-400 transition-all bg-neutral-200 hover:bg-purple-100 hover:text-purple-400 focus:bg-purple-100 focus:text-purple-400 items-center rounded-lg"
            >
                <CalendarDays />
            </div>

            {/* Picker */}
            {opened && (
                <motion.div 
                    initial={{ transform: 'translateY(100%) scale(0)' }}
                    animate={{ transform: 'translateY(100%) scale(1)'}}
                    transition={{ duration: 0.1 }}
                    className="absolute focus:outline-none origin-top-left -bottom-2 rounded-lg left-0 translate-y-full bg-neutral-50 border border-neutral-200 shadow h-60 w-60"
                >
                    test
                </motion.div>
            )}
        </div>
    )
}