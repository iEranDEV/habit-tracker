import CategoryBadge from "@/app/components/utils/CategoryBadge"

type CategoryTabItemProps = {
    name: string,
    icon: JSX.Element,
    color: string
}

export default function CategoryTabItem({ name, icon, color }: CategoryTabItemProps) {

    return (
        <div className="w-full flex gap-2 items-center rounded-lg bg-neutral-50 hover:brightness-95">
            <CategoryBadge icon={icon} color={color} />
            <p>{name}</p>
        </div>
    )
}