import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import HabitForm from "@/components/shared/habit/form/HabitForm";
import { HabitWithData } from "@/types";

interface EdiHabitDialogProps {
    item: HabitWithData,
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function EditHabitDialog({ item, open, setOpen }: EdiHabitDialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit habit</DialogTitle>
                    <DialogDescription>Submit form below to save changes</DialogDescription>
                </DialogHeader>

                <HabitForm habit={item} edit setOpen={setOpen} />

            </DialogContent>
        </Dialog>
    )
}