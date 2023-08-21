import { motion } from "framer-motion"
import CounterTypeDetails from "./CounterTypeDetails"
import ChecklistTypeDetails from "./ChecklistTypeDetails"

type TypeSelectorProps = {
    type: string,
    setType: Function
}

export default function TypeSelector({ type, setType }: TypeSelectorProps) {

    return (
        <div className="w-full flex flex-col gap-1">
            <p className="text-neutral-700 font-semibold text-sm">
                Select habit's type
            </p>

            <div className="grid grid-cols-3 gap-2">
                <div onClick={() => setType('default')} className="w-full cursor-pointer h-32 border relative border-neutral-200 rounded-lg">

                    {type === 'default' && (
                        <motion.div layoutId="habit_type" className="absolute w-full h-full border-2 border-purple-500 rounded-lg left-0 bottom-0"></motion.div>
                    )}
                </div>
                <div onClick={() => setType('counter')} className="w-full cursor-pointer h-32 border relative border-neutral-200 rounded-lg">

                    {type === 'counter' && (
                        <motion.div layoutId="habit_type" className="absolute w-full h-full border-2 border-purple-500 rounded-lg left-0 bottom-0"></motion.div>
                    )}
                </div>
                <div onClick={() => setType('checklist')} className="w-full cursor-pointer h-32 border relative border-neutral-200 rounded-lg">

                    {type === 'checklist' && (
                        <motion.div layoutId="habit_type" className="absolute w-full h-full border-2 border-purple-500 rounded-lg left-0 bottom-0"></motion.div>
                    )}
                </div>
            </div>

            {type === 'counter' && <CounterTypeDetails />}
            {type === 'checklist' && <ChecklistTypeDetails />}
        </div>
    )
}