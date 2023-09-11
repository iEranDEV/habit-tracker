'use client';

import CategoryItem from "@/components/layout/settings/CategoryItem";
import NewCategoryDialog from "@/components/dialog/category/NewCategory";
import { Separator } from "@/components/ui/separator";
import { UserContext } from "@/context/UserContext";
import { Shapes, icons } from "lucide-react";
import { useContext } from "react";

export default function SettingsCategories() {

    const { categories } = useContext(UserContext);

    const customCategories = categories.filter((item) => item.createdBy !== '').sort((a, b) => a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime());

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
                {customCategories.length > 0 ? customCategories.map((item) => {
                    const Icon = icons[item.icon as keyof typeof icons];

                    return (
                        <CategoryItem key={item.id} item={item} custom icon={<Icon size={20} />} />
                    )
                }) : (
                    <div className="w-full col-span-2 flex items-center flex-col text-sm text-muted-foreground">
                        <Shapes size={20} />
                        <span>There are no custom categories</span>
                    </div>
                )}
            </div>
        </div >
    )
}