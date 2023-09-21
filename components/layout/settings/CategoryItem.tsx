'use client';

import Values from "values.js"
import { MoreHorizontal, PenLine, Trash2 } from "lucide-react"
import EditCategoryDialog from "../../dialog/category/EditCategory"
import type { Category } from "@prisma/client"
import CategoryIcon from "./CategoryIcon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DeleteCategoryDialog from "@/components/dialog/category/DeleteCategory";
import { useState } from "react";

interface CategoryItemProps {
    item: Category,
    custom?: boolean
}

export default function CategoryItem({ item, custom }: CategoryItemProps) {
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

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
                                <DropdownMenuItem onClick={() => setEditDialog(true)}>
                                    <PenLine size={16} className="mr-2" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDeleteDialog(true)}>
                                    <Trash2 size={16} className="mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <EditCategoryDialog item={item} open={editDialog} setOpen={setEditDialog} />
                    <DeleteCategoryDialog item={item} open={deleteDialog} setOpen={setDeleteDialog} />
                </div>
            )}
        </div>
    )
}