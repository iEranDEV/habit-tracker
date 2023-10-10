'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NewCategoryForm from "@/components/settings/category/NewCategoryForm";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewCategoryDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="max-md:!h-10 max-md:!w-10 max-md:!p-0">
                    <Plus size={20} />
                    <span className="ml-2 max-md:hidden">
                        Create new category
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new category</DialogTitle>
                    <DialogDescription>Submit form below to create new category</DialogDescription>
                </DialogHeader>

                <NewCategoryForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}