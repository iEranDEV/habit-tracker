import { motion } from "framer-motion"
import CounterTypeDetails from "./CounterTypeDetails"
import ChecklistTypeDetails from "./ChecklistTypeDetails"
import { Calculator, Check, CopyCheck, ListTodo } from "lucide-react"

type TypeSelectorProps = {
    type: string,
    setType: Function
}

export default function TypeSelector({ type, setType }: TypeSelectorProps) {

    const options = [{
        id: 'default',
        name: 'With a yes or no',
        icon: <CopyCheck size={20} />
    },
    {
        id: 'counter',
        name: 'With a numeric value',
        icon: <Calculator size={20} />
    },
    {
        id: 'checklist',
        name: 'With a checklist',
        icon: <ListTodo size={20} />
    }]

    return (
        <div className="w-full flex flex-col gap-1">
            <p className="text-neutral-700 font-semibold text-sm">
                Select habit's type
            </p>

            <div className="flex flex-col gap-2">
                {options.map((item) => (
                    <div key={item.id} onClick={() => setType(item.id)} className="h-12 px-4 py-2 relative cursor-pointer w-full rounded-lg flex gap-4 items-center border border-neutral-200">
                
                        {item.icon}
                        <p className="text-sm">{item.name}</p>

                        {type === item.id && (
                            <motion.div layoutId="habit_type" className="absolute w-full h-full border-2 border-purple-400 rounded-lg left-0 bottom-0"></motion.div>
                        )}
                    </div>
                ))}
            </div>

            {type === 'counter' && <CounterTypeDetails />}
            {type === 'checklist' && <ChecklistTypeDetails />}
        </div>
    )
}