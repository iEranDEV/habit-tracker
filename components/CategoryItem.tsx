import Values from "values.js"

interface CategoryItemProps {
    item: Category,
    custom?: boolean,
    icon: JSX.Element
}

export default function CategoryItem({ item, custom, icon }: CategoryItemProps) {

    return (
        <div className="flex group justify-between items-center">
            <div className="flex gap-4 items-center">
                <div className="rounded-md p-1.5" style={{ color: item.color, background: new Values(item.color).tints(10)[7].hexString() }}>
                    {icon}
                </div>
                <p>{item.name}</p>
            </div>

            {custom && (
                <div className="hidden group-hover:flex">
                    test
                </div>
            )}
        </div>
    )
}