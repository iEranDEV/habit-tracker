import { icons } from "lucide-react";

type IconPickerProps = {
    icon: keyof typeof icons,
    setIcon: Function,
    setPicker: Function
}

export default async function IconPicker({ icon, setIcon, setPicker }: IconPickerProps) {

    const keys = Object.keys(icons) as Array<keyof typeof icons>;

    return (
        <div className="bg-neutral-50 border rounded-lg border-neutral-200 shadow p-2 top-4 -translate-y-full left-0 gap-2 absolute w-72">
            <div className="w-full h-12 flex gap-2 border-b border-neutral-200">
                search bar  
            </div>
            <div className="grid grid-cols-7 gap-1 h-60 w-full overflow-y-auto pt-2">
                {keys.map((key) => {
                    const LucideIcon = icons[key];
                    return (
                        <div onClick={() => {
                            setIcon(key);
                            setPicker(false);
                        }} key={key} className={`bg-neutral-50 p-1 rounded-lg hover:brightness-95 ${icon === key && 'text-green-500'}`}>
                            <LucideIcon />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}