import { useState } from "react";
import EditCategoryForm from "@/components/forms/EditCategoryForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Category } from "@prisma/client";

interface EditCategoryDialogProps {
    category: Category,
}

export default function EditCategoryDialog({ category }: EditCategoryDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new category</DialogTitle>
                    <DialogDescription>Submit form below to create new category</DialogDescription>
                </DialogHeader>

                <EditCategoryForm setOpen={setOpen} category={category} />
            </DialogContent>
        </Dialog>
    )
}