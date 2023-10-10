import { Separator } from "@/components/ui/separator";
import { Shapes } from "lucide-react";
import CategorySettingsItem from "@/components/settings/categories/CategorySettingsItem";
import { Category } from "@prisma/client";
import { getCategoriesByUser } from "@/lib/category";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import NewCategoryDialog from "@/components/settings/categories/NewCategoryDialog";

export default async function SettingsCategories() {

    const session = await getServerSession(authOption);
    const categories = await getCategoriesByUser(session?.user.id);

    const customCategories = categories.filter((item) => item.userId !== null);

    return (
        <div className="space-y-6" >
            <div>
                <h3 className="text-lg font-medium">Built-in categories</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your categories.
                </p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
                {categories.filter((item) => item.userId === null).map((item: Category) => (
                    <CategorySettingsItem key={item.id} item={item} />
                ))}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {customCategories.length > 0 ? customCategories.map((item: Category) => (
                    <CategorySettingsItem key={item.id} item={item} custom />
                )) : (
                    <div className="w-full col-span-2 flex items-center flex-col text-sm text-muted-foreground">
                        <Shapes size={20} />
                        <span>There are no custom categories</span>
                    </div>
                )}
            </div>
        </div >
    )
}