import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import NewHabitForm from "@/components/forms/new_habit/NewHabitForm";

export default function NewHabitDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus size={20} className="mr-2" /> Add new habit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new habit</DialogTitle>
                    <DialogDescription>Submit form below to create new habit</DialogDescription>
                </DialogHeader>

                <NewHabitForm />

            </DialogContent>
        </Dialog>
    )
}