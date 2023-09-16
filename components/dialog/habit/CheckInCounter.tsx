import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";

type CheckInCounterDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function CheckInCounterDialog({ open, setOpen }: CheckInCounterDialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new habit</DialogTitle>
                    <DialogDescription>Submit form below to create new habit</DialogDescription>
                </DialogHeader>
                <p>test</p>

            </DialogContent>
        </Dialog>
    )
}