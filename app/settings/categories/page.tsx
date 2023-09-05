'use client';

import CategoryItem from "@/components/CategoryItem";
import NewCategoryDialog from "@/components/dialog/NewCategory";
import { Separator } from "@/components/ui/separator";
import { UserContext } from "@/context/UserContext";
import { icons } from "lucide-react";
import { useContext } from "react";

export default function SettingsCategories() {

    const { categories } = useContext(UserContext);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Built-in categories</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your categories.
                </p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
                {categories.filter((item) => item.createdBy === '').map((item) => {
                    const Icon = icons[item.icon as keyof typeof icons];

                    return (
                        <CategoryItem key={item.id} item={item} icon={<Icon size={20} />} />
                    )
                })}
            </div>

            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-lg font-medium">Custom categories</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your categories.
                    </p>
                </div>
                <NewCategoryDialog />
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
                {categories.filter((item) => item.createdBy !== '').sort((a, b) => a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime()).map((item) => {
                    const Icon = icons[item.icon as keyof typeof icons];

                    return (
                        <CategoryItem key={item.id} item={item} custom icon={<Icon size={20} />} />
                    )
                })}
            </div>
        </div >
    )
}