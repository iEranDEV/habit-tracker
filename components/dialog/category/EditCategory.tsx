import { PenLine } from "lucide-react";
import { useState } from "react";
import EditCategoryForm from "@/components/forms/EditCategoryForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Category } from "@prisma/client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

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