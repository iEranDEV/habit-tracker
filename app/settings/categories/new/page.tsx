import { Separator } from "@/components/ui/separator";
import { getCategoriesByUser } from "@/lib/category";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import NewCategoryForm from "@/components/forms/NewCategoryForm";

export default async function SettingsCategoriesNew() {

    const session = await getServerSession(authOption);
    const categories = await getCategoriesByUser(session?.user.id);

    const customCategories = categories.filter((item) => item.userId !== null);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Create new category</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your categories.
                </p>
            </div>
            <Separator />
            <NewCategoryForm />
        </div >
    )
}