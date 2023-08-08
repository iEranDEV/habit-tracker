import Values from "values.js"

type CategoryBadgeProps = {
    icon: JSX.Element,
    color: string
}

export default function CategoryBadge({ icon, color }: CategoryBadgeProps) {

    return (
        <div 
            className="p-2 h-8 w-8 rounded-lg" 
            style={{ color: color, background: new Values(color).tints(10)[7].hexString() }}
        >
            {icon}
        </div>
    )
}