'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NewCategoryForm from "@/components/forms/NewCategoryForm";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewCategoryDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2" />
                    Create new category
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