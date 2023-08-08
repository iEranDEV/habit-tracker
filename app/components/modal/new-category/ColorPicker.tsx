import { Check, Hash } from "lucide-react"

type ColorPickerProps = {
    color: string,
    setColor: Function
}

export default function ColorPicker({ color, setColor }: ColorPickerProps) {

    const colors = [
        '#ef4444',
        '#f97316',
        '#f59e0b',
        '#84cc16',
        '#22c55e',
        '#10b981',
        '#14b8a6',
        '#06b6d4',
        '#3b82f6',
        '#6366f1',
        '#a855f7',
        '#d946ef',
        '#ec4899'
    ]

    return (
        <div className="w-full grid grid-cols-8 gap-2">
            {colors.map((item) => {
                console.log(item)
                return (
                    <div 
                        key={item} 
                        onClick={() => setColor(item)} 
                        className="w-full rounded-lg aspect-square cursor-pointer hover:brightness-95 flex justify-center items-center text-neutral-50" 
                        style={{ background: item }}
                    >
                        {color === item && <Check />}
                    </div>
                )
            })}
            <div className="col-span-3 rounded-lg border overflow-hidden border-neutral-200 grid grid-cols-3 gap-2 w-full h-full">
                <div style={{ background: color }} className="w-full h-full flex justify-center text-neutral-50 items-center">
                    <Hash size={20} />
                </div>
                <input value={color} onChange={(e) => setColor(e.target.value)} className="w-full bg-neutral-50 h-full col-span-2 focus:outline-none" type="text" />
            </div>
        </div>
    )
}