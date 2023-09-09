import Values from "values.js"
import { Trash } from "lucide-react"
import { Category } from "@/types"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { deleteCategory } from "@/firebase/db/category"
import { useContext, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { useToast } from "./ui/use-toast"
import EditCategoryDialog from "./dialog/category/EditCategory"

interface CategoryItemProps {
    item: Category,
    custom?: boolean,
    icon: JSX.Element,
}

export default function CategoryItem({ item, custom, icon }: CategoryItemProps) {

    const [open, setOpen] = useState(false);

    const { categories, setCategories } = useContext(UserContext);

    const { toast } = useToast()

    const deleteItem = async () => {
        const { result, error } = await deleteCategory(item.id);

        if (result) {
            setOpen(false);
            setCategories([...categories.filter((a) => a.id !== item.id)]);
            toast({
                title: 'Success!',
                description: `You have successfully removed category ${item.name}!`
            })

        } else if (error) {
            toast({
                variant: 'destructive',
                title: 'An error occured!',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Qui nisi suscipit recusandae quos placeat ipsam.'
            })
        }


    }

    return (
        <div className="flex group justify-between items-center hover:bg-accent p-1 rounded-lg">
            <div className="flex gap-4 items-center">
                <div className="rounded-md p-1.5" style={{ color: item.color, background: new Values(item.color).tints(10)[7].hexString() }}>
                    {icon}
                </div>
                <p>{item.name}</p>
            </div>

            {custom && (
                <div className="hidden group-hover:flex items-center gap-1">
                    <EditCategoryDialog category={item} />
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogTrigger>
                            <div className="hover:bg-background rounded-md h-8 w-8 hover:text-primary p-2 cursor-pointer">
                                <Trash size={16} />
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this category and the category of all related habits will be changed to <b>Other</b>.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button onClick={deleteItem}>
                                    Continue
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </div>
    )
}