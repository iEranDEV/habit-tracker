import Values from "values.js"
import { Button } from "./ui/button"
import { Pencil, Trash } from "lucide-react"

interface CategoryItemProps {
    item: Category,
    custom?: boolean,
    icon: JSX.Element
}

export default function CategoryItem({ item, custom, icon }: CategoryItemProps) {

    return (
        <div className="flex group justify-between items-center hover:bg-accent p-1 rounded-lg">
            <div className="flex gap-4 items-center">
                <div className="rounded-md p-1.5" style={{ color: item.color, background: new Values(item.color).tints(10)[7].hexString() }}>
                    {icon}
                </div>
                <p>{item.name}</p>
            </div>

            {custom && (
                <div className="hidden group-hover:flex">
                    <Button variant="ghost" size={'icon'} className="h-8 w-8 hover:text-primary">
                        <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size={'icon'} className="h-8 w-8 hover:text-primary">
                        <Trash size={16} />
                    </Button>
                </div>
            )}
        </div>
    )
}