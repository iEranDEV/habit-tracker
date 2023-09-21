'use client';

import Values from "values.js"
import { MoreHorizontal, PenLine, Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/alert-dialog"
import { Button } from "../../ui/button"
import { useState } from "react"
import { useToast } from "../../ui/use-toast"
import EditCategoryDialog from "../../dialog/category/EditCategory"
import type { Category } from "@prisma/client"
import CategoryIcon from "./CategoryIcon";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CategoryItemProps {
    item: Category,
    custom?: boolean
}

export default function CategoryItem({ item, custom }: CategoryItemProps) {

    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const { toast } = useToast()
    const router = useRouter();

    const deleteItem = async () => {
        /*const { result, error } = await deleteCategory(item.id);

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
        }*/
    }

    return (
        <div className="flex group justify-between items-center hover:bg-accent p-1 rounded-lg">
            <div className="flex gap-4 items-center">
                <div className="rounded-md p-1.5" style={{ color: item.color, background: new Values(item.color).tints(10)[7].hexString() }}>
                    <CategoryIcon name={item.icon} size={20} />
                </div>
                <p>{item.name}</p>
            </div>

            {custom && (
                <div className="h-full flex justify-center items-center mr-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-muted-foreground focus:outline-none">
                            <MoreHorizontal size={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => setEditModal(!editModal)}>
                                    <PenLine size={16} className="mr-2" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDeleteModal(!deleteModal)}>
                                    <Trash2 size={16} className="mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Edit category */}
                    <EditCategoryDialog category={item} />

                    {/* Delete category */}
                    <AlertDialog open={deleteModal} onOpenChange={setDeleteModal}>
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