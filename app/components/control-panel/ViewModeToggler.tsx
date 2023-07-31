import { motion } from "framer-motion";
import { useState } from "react"

export default function ViewModeToggler() {

    const [viewMode, setViewMode] = useState('day');

    const options = ['day', 'week'];

    return (
        <div className="select-none rounded-lg h-10 flex justify-between bg-neutral-200 p-1">
            {options.map((option) => (
                <div key={option} className="relative w-20 cursor-pointer" onClick={() => setViewMode(option)}>
                    {viewMode === option && (
                        <motion.div layoutId="view" className="z-10 absolute rounded-lg top-0 left-0 h-full w-full bg-neutral-50"></motion.div>
                    )}

                    <span className="capitalize relative z-50 w-20 flex justify-center items-center py-1">{option}</span>
                </div>
            ))}
        </div>
    )
}