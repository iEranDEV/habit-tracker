import { Bike, Briefcase, Folder, GraduationCap, HeartPulse, Home, Leaf, MessagesSquare, Plus, Ticket, Wallet, icons } from "lucide-react";
import CategoryTabItem from "./CategoryTabItem";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";

export default function CategoryTab() {

    const modalContext = useContext(ModalContext);
    const { categories, setCategories } = useContext(UserContext);

    return (
        <div className="w-full h-full flex flex-col gap-4">

            {/* Built-in categories */}
            <div className="flex flex-col gap-2">
                <p className="text-neutral-400 text-sm">Built-in categories</p>

                <div className="w-full h-full grid grid-cols-3 gap-2">

                    <CategoryTabItem color="#22c55e" name={'Nature'} icon={<Leaf size={16} />} />
                    <CategoryTabItem color="#ef4444" name={'Sport'} icon={<Bike size={16} />} />
                    <CategoryTabItem color="#0891b2" name={'Home'} icon={<Home size={16} />} />
                    <CategoryTabItem color="#ec4899" name={'Study'} icon={<GraduationCap size={16} />} />
                    <CategoryTabItem color="#10b981" name={'Finance'} icon={<Wallet size={16} />} />
                    <CategoryTabItem color="#f97316" name={'Work'} icon={<Briefcase size={16} />} />
                    <CategoryTabItem color="#f43f5e" name={'Health'} icon={<HeartPulse size={16} />} />
                    <CategoryTabItem color="#9333ea" name={'Social'} icon={<MessagesSquare size={16} />} />
                    <CategoryTabItem color="#84cc16" name={'Entertainment'} icon={<Ticket size={16} />} />

                </div>
            </div>

            {/* Custom categories */}
            <div className="flex flex-col gap-2 relative">
                <p className="text-neutral-400 text-sm">Custom categories</p>

                {categories.length > 0 ? (
                    <div className="w-full grid grid-cols-3 gap-2">
                        {categories.map((category) => {
                            const LucideIcon = icons[category.icon as keyof typeof icons];
                            console.log(category.id)

                            return <CategoryTabItem key={category.id} name={category.name} icon={<LucideIcon size={16} />} color={category.color} />
                        })}
                    </div>
                ): (
                    <div className="w-full flex flex-col justify-center text-neutral-400 text-sm items-center h-32">
                        <Folder />
                        <p>There are no custom categories</p>
                    </div>
                )}

                <div className="w-full flex justify-end">
                    <div 
                        onClick={() => modalContext.setModal('new_category')}
                        className="flex cursor-pointer hover:brightness-95 transition-all justify-center gap-2 text-purple-500 items-center px-4 py-2 bg-purple-200 rounded-lg"
                    >
                        <Plus />
                        <div>Add category</div>
                    </div>
                </div>
            </div>
        </div>
    )
}