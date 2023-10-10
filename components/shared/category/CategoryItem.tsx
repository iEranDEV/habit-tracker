import { Category } from "@prisma/client"
import CategoryIcon from "./CategoryIcon"
import Values from "values.js"

interface CategoryItemProps {
    category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {

    return (
        <div className="flex gap-4 items-center">
            <div className="rounded-md p-1.5" style={{ color: category.color, background: new Values(category.color).tints(10)[7].hexString() }}>
                <CategoryIcon name={category.icon} size={20} />
            </div>
            <p>{category.name}</p>
        </div>
    )
}