'use client';

import { MoreHorizontal, PenLine, Trash2 } from "lucide-react"
import EditCategoryDialog from "./EditCategoryDialog"
import type { Category } from "@prisma/client"
import DeleteCategoryDialog from "@/components/settings/categories/DeleteCategoryDialog";
import { useState } from "react";
import Dropdown from "@/components/shared/Dropdown";
import CategoryItem from "@/components/shared/category/CategoryItem";

interface CategorySettingsItemProps {
    item: Category,
    custom?: boolean
}

export default function CategorySettingsItem({ item, custom }: CategorySettingsItemProps) {
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    return (
        <div className="flex group justify-between items-center hover:bg-accent p-1 rounded-lg">
            <CategoryItem category={item} />

            {custom && (
                <div className="h-full flex justify-center items-center mr-2">

                    <Dropdown
                        type="Category"
                        header={<CategoryItem category={item} />}
                        toggler={<div className="text-muted-foreground focus:outline-none">
                            <MoreHorizontal size={20} />
                        </div>}
                        options={[
                            <div className="flex items-center" onClick={() => setEditDialog(true)}>
                                <PenLine size={16} className="mr-2" />
                                Edit
                            </div>,
                            <div className="flex items-center" onClick={() => setDeleteDialog(true)}>
                                <Trash2 size={16} className="mr-2" />
                                Delete
                            </div>
                        ]} />

                    <EditCategoryDialog item={item} open={editDialog} setOpen={setEditDialog} />
                    <DeleteCategoryDialog item={item} open={deleteDialog} setOpen={setDeleteDialog} />
                </div>
            )}
        </div>
    )
}