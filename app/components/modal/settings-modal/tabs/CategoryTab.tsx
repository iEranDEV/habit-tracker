import { Bike, Briefcase, GraduationCap, HeartPulse, Home, Leaf, MailQuestion, MessagesSquare, Plus, Ticket, Wallet } from "lucide-react";
import CategoryTabItem from "./CategoryTabItem";
import IconButton from "@/app/components/utils/IconButton";

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
                <form className="flex gap-2 items-center">
                    <div className="rounded-lg flex divide-x divide-neutral-200 border border-neutral-200">
                        <div className="h-8 w-8 flex justify-center items-center">
                            <MailQuestion size={16} />
                        </div>
                        <input type="text" className="rounded-r-lg bg-neutral-50 px-2 placeholder-neutral-200" placeholder="Enter habit name" />
                    </div>

                    <IconButton icon={<Plus size={16} />} />
                </form>

            

            </div>
        </div>
    )
}