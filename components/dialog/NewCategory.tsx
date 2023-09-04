import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import NewCategoryForm from "../forms/NewCategoryForm";

export default function NewCategoryDialog() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus size={20} className="mr-2" /> Add new category
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new category</DialogTitle>
                    <DialogDescription>Submit form below to create new category</DialogDescription>
                </DialogHeader>

                <NewCategoryForm />
            </DialogContent>
        </Dialog>
    )
}