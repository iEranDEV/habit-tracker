import HabitItem from "@/components/shared/habit/HabitItem";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HabitWithData } from "@/types";
import StatsGraph from "./StatsGraph";
import { Separator } from "@/components/ui/separator";

interface HabitStatsDialogProps {
    item: HabitWithData,
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function HabitStatsDialog({ item, open, setOpen }: HabitStatsDialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <HabitItem habit={item} />
                    <DialogDescription>
                        Check your habit statistics
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2">
                    <Separator />

                    <Separator />
                    <StatsGraph item={item} />
                </div>
            </DialogContent>
        </Dialog>
    )
}