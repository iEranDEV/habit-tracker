import { Label } from "@/components/ui/label";
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

interface ColorPickerProps {
    defaultColor?: string
}

export default function ColorPicker({ defaultColor }: ColorPickerProps) {
    const [color, setColor] = useState(defaultColor || '#ef4444');

    const methods = useFormContext();

    useEffect(() => {
        methods.setValue('color', color);
    }, [color, methods]);

    return (
        <div className="space-y-2">
            <Label>Select color</Label>
            <div className='grid grid-cols-10 gap-2'>
                {colors.map((item) => (
                    <div onClick={() => setColor(item)} key={item} style={{ background: item }} className='h-full cursor-pointer transition-all text-background w-full aspect-square rounded-md flex justify-center items-center'>
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
        </div>
    )
}