import EditCategoryForm from "@/components/forms/EditCategoryForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Category } from "@prisma/client";

interface EditCategoryDialogProps {
    item: Category,
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function EditCategoryDialog({ item, open, setOpen }: EditCategoryDialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new category</DialogTitle>
                    <DialogDescription>Submit form below to create new category</DialogDescription>
                </DialogHeader>

                <EditCategoryForm setOpen={setOpen} category={item} />
            </DialogContent>
        </Dialog>
    )
}