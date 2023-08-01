import { Bike, Briefcase, GraduationCap, HeartPulse, Home, Leaf, MessagesSquare, Ticket, Wallet } from "lucide-react";
import CategoryTabItem from "./CategoryTabItem";
import NewCategoryForm from "./NewCategoryForm";

export default function CategoryTab() {

    return (
        <div className="w-full h-full flex flex-col gap-4">

            {/* Built-in categories */}
            <div className="flex flex-col gap-2">
                <p className="text-neutral-400 text-sm">Built-in categories</p>

                <div className="w-full h-full grid grid-cols-3 gap-2">

                    <CategoryTabItem name={'Nature'} icon={<Leaf size={16} />} />
                    <CategoryTabItem name={'Sport'} icon={<Bike size={16} />} />
                    <CategoryTabItem name={'Home'} icon={<Home size={16} />} />
                    <CategoryTabItem name={'Study'} icon={<GraduationCap size={16} />} />
                    <CategoryTabItem name={'Finance'} icon={<Wallet size={16} />} />
                    <CategoryTabItem name={'Work'} icon={<Briefcase size={16} />} />
                    <CategoryTabItem name={'Health'} icon={<HeartPulse size={16} />} />
                    <CategoryTabItem name={'Social'} icon={<MessagesSquare size={16} />} />
                    <CategoryTabItem name={'Entertainment'} icon={<Ticket size={16} />} />

                </div>
            </div>

            {/* Custom categories */}
            <div className="flex flex-col gap-2 relative">
                <p className="text-neutral-400 text-sm">Custom categories</p>

                {/* New category form */}
                <NewCategoryForm />

            </div>
        </div>
    )
}