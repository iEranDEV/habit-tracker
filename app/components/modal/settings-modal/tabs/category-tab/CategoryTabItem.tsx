import Values from "values.js"

type CategoryTabItemProps = {
    name: string,
    icon: JSX.Element,
    color?: string
}

export default function CategoryTabItem({ name, icon, color }: CategoryTabItemProps) {

    return (
        <div className="w-full flex gap-2 items-center">
            <div 
                className="p-2 h-8 w-8 rounded-lg" 
                style={{ color: color, background: new Values(color).tints(10)[7].hexString() }}
            >
                {icon}
            </div>
            <p>{name}</p>
        </div>
    )
}