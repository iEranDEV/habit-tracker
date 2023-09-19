import CategoryIcon from "@/components/layout/settings/CategoryIcon";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const iconPickerIcons = [
    'ban',
    'shapes',
    'wallet',
    'heart-pulse',
    'home',
    'leaf',
    'messages-square',
    'bike',
    'graduation-cap',
    'briefcase',
    'person-standing',
    'dumbbell',
    'cross',
    'droplet',
    'smile',
    'cigarette-off',
    'utensils-crossed',
    'book-marked',

]

interface IconPickerProps {
    defaultIcon?: string
}


export default function IconPicker({ defaultIcon }: IconPickerProps) {
    const [icon, setIcon] = useState(defaultIcon || 'shapes');

    const methods = useFormContext();

    useEffect(() => {
        methods.setValue('icon', icon);
    }, [icon]);

    return (
        <div className="space-y-2">
            <Label>Select icon</Label>
            <div className="grid grid-cols-12 gap-2 text-muted-foreground">
                {iconPickerIcons.map((item) => (
                    <div
                        onClick={() => setIcon(item)}
                        key={item}
                        className={`p-1 h-7 w-7 flex justify-center items-center cursor-pointer transition-all rounded-md ${icon === item ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
                    >
                        <CategoryIcon name={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}