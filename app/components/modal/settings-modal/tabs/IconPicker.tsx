import { icons } from "lucide-react";

export default async function IconPicker() {

    const keys = Object.keys(icons) as Array<keyof typeof icons>;

    return (
        <>
            {keys.map((key) => {
                const LucideIcon = icons[key];
                return <LucideIcon key={key} />
            })}
        </>
    )
}