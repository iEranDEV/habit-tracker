import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import EditCategoryForm from "../forms/EditCategoryForm";
import { Category } from "@/types";

interface EditCategoryDialogProps {
    category: Category,
}

export default function EditCategoryDialog({ category }: EditCategoryDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="bg-background rounded-md h-8 w-8 hover:text-primary p-2 cursor-pointer">
                    <Pencil size={16} />
                </div>
            </DialogTrigger>
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