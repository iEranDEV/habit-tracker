import { icons } from "lucide-react";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "./ui/label";

const iconPickerIcons = [
    'Ban',
    'Shapes',
    'Wallet',
    'HeartPulse',
    'Home',
    'Leaf',
    'MessagesSquare',
    'Bike',
    'GraduationCap',
    'Briefcase',
    'PersonStanding',
    'Dumbbell',
    'Cross',
    'Droplet',
    'Smile',
    'CigaretteOff',
    'UtensilsCrossed',
    'BookMarked',

]

interface IconPickerProps {
    defaultIcon?: string
}


export default function IconPicker({ defaultIcon }: IconPickerProps) {
    const [icon, setIcon] = useState(defaultIcon || 'Shapes');

    const methods = useFormContext();

    useEffect(() => {
        methods.setValue('icon', icon);
    }, [icon]);

    return (
        <div className="space-y-2">
            <Label>Select icon</Label>
            <div className="grid grid-cols-12 gap-2 text-muted-foreground">
                {iconPickerIcons.map((item) => {
                    const Icon = icons[item as keyof typeof icons];

                    return (
                        <div
                            onClick={() => setIcon(item)}
                            key={item}
                            className={`p-1 cursor-pointer transition-all rounded-md ${icon === item ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}
                        >
                            <Icon />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}