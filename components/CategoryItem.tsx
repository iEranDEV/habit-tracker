import Values from "values.js"
import { Trash } from "lucide-react"
import EditCategoryDialog from "./dialog/EditCategory"
import { Category } from "@/types"

interface CategoryItemProps {
    item: Category,
    custom?: boolean,
    icon: JSX.Element
}

export default function CategoryItem({ item, custom, icon }: CategoryItemProps) {

    const deleteItem = async () => {

    }

    return (
        <div className="flex group justify-between items-center hover:bg-accent p-1 rounded-lg">
            <div className="flex gap-4 items-center">
                <div className="rounded-md p-1.5" style={{ color: item.color, background: new Values(item.color).tints(10)[7].hexString() }}>
                    {icon}
                </div>
                <p>{item.name}</p>
            </div>

            {custom && (
                <div className="hidden group-hover:flex items-center gap-1">
                    <EditCategoryDialog category={item} />
                    <div onClick={() => deleteItem()} className="bg-background rounded-md h-8 w-8 hover:text-primary p-2 cursor-pointer">
                        <Trash size={16} />
                    </div>
                </div>
            )}
        </div>
    )
}