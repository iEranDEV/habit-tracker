import { icons } from "lucide-react";

export default async function IconPicker() {

    const keys = Object.keys(icons) as Array<keyof typeof icons>;

    return (
        <>
            {keys.map((key) => {
                const LucideIcon = icons[key];
                return (
                    <div key={key} className="bg-neutral-50 p-1 rounded-lg hover:brightness-95">
                        <LucideIcon />
                    </div>
                )
            })}
        </>
    )
}