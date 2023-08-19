import { Bike, Briefcase, Folder, GraduationCap, HeartPulse, Home, Leaf, MessagesSquare, Plus, Ticket, Wallet, icons } from "lucide-react";
import CategoryTabItem from "./CategoryTabItem";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import Button from "@/app/components/utils/general/Button";

export default function CategoryTab() {

    const modalContext = useContext(ModalContext);
    const { categories, setCategories } = useContext(UserContext);

    return (
        <div className="w-full h-full flex flex-col gap-4">

            {/* Built-in categories */}
            <div className="flex flex-col gap-2">
                <p className="text-neutral-400 text-sm">Built-in categories</p>

                <div className="w-full h-full grid grid-cols-3 gap-1">

                    {categories.filter((item) => item.id.includes('default_')).map((category) => {
                        const LucideIcon = icons[category.icon as keyof typeof icons];

                        return <CategoryTabItem key={category.id} id={category.id} name={category.name} icon={<LucideIcon size={16} />} color={category.color} />
                    })}

                </div>
            </div>

            {/* Custom categories */}
            <div className="flex flex-col gap-2 relative">
                <p className="text-neutral-400 text-sm">Custom categories</p>

                {categories.length > 0 ? (
                    <div className="w-full grid grid-cols-3 gap-1">
                        {categories.filter((item) => !item.id.includes('default_')).map((category) => {
                            const LucideIcon = icons[category.icon as keyof typeof icons];

                            return <CategoryTabItem key={category.id} id={category.id} name={category.name} icon={<LucideIcon size={16} />} color={category.color} custom />
                        })}
                    </div>
                ): (
                    <div className="w-full flex flex-col justify-center text-neutral-400 text-sm items-center h-32">
                        <Folder />
                        <p>There are no custom categories</p>
                    </div>
                )}

                <div className="w-full flex justify-end">
                    <Button name="Add category" icon={<Plus />} onClick={() => modalContext.setModal('new_category')} />
                </div>
            </div>
        </div>
    )
}