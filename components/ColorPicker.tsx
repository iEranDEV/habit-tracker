import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const colors = [
    '#ef4444', // Red
    '#ea580c', // Orange
    '#f59e0b', // Amber
    '#facc15', // Yellow
    '#84cc16', // Lime
    '#16a34a', // Green
    '#10b981', // Emerald
    '#14b8a6', // Teal
    '#0891b2', // Cyan
    '#0ea5e9', // Sky
    '#3b82f6', // Blue
    '#4f46e5', // Indigo
    '#8b5cf6', // Violet
    '#a855f7', // Purple
    '#d946ef', // Fuchsia
    '#f472b6', // Pink
]

export default function ColorPicker() {
    const [color, setColor] = useState('#ef4444');

    const methods = useFormContext();

    useEffect(() => {
        methods.setValue('color', color);
    }, [color]);

    return (
        <div className='flex gap-2 w-full flex-wrap'>
            {colors.map((item) => (
                <div onClick={() => setColor(item)} key={item} style={{ background: item }} className='h-10 cursor-pointer transition-all text-background w-10 rounded-md flex justify-center items-center'>
                    <AnimatePresence>
                        {color === item && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                            >
                                <Check strokeWidth={4} size={20} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}