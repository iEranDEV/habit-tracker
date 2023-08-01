
type CategoryTabItemProps = {
    name: string,
    icon: JSX.Element,
    color?: string
}

export default function CategoryTabItem({ name, icon, color }: CategoryTabItemProps) {

    return (
        <div className="w-full flex gap-2 items-center">
            <div className="p-2 h-8 w-8 rounded-lg bg-green-100 text-green-500">
                {icon}
            </div>
            <p>{name}</p>
        </div>
    )
}