import CategoryBadge from "@/app/components/utils/CategoryBadge"
import { UserContext } from "@/context/UserContext"
import { deleteCategory } from "@/firebase/db/category"
import { Trash2 } from "lucide-react"
import { useContext } from "react"

type CategoryTabItemProps = {
    id?: string,
    name: string,
    icon: JSX.Element,
    color: string,
    custom?: boolean
}

export default function CategoryTabItem({ id, name, icon, color, custom }: CategoryTabItemProps) {

    const { categories, setCategories } = useContext(UserContext);

    const removeItem = async () => {
        if(custom && id) {
            const result = await deleteCategory(id);

            if('id' in result) {
                // Deleted category
                setCategories([...categories.filter((item) => item.id !== id)]);
            }
        }
    }

    return (
        <div className="group w-full p-1 flex gap-2 items-center rounded-lg relative truncate bg-neutral-50 hover:brightness-95">
            <CategoryBadge icon={icon} color={color} />
            <p>{name}</p>
            {custom && (
                <div onClick={() => removeItem()} className="group-hover:flex hidden hover:brightness-90 rounded-lg justify-center items-center text-neutral-400 cursor-pointer absolute h-full aspect-square p-1 bg-neutral-50 right-0 top-1/2 -translate-y-1/2">
                    <Trash2 size={20} />
                </div>
            )}
        </div>
    )
}