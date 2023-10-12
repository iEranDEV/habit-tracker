import HabitItem from "@/components/shared/habit/HabitItem";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HabitWithData } from "@/types";
import StatsGraph from "./StatsGraph";
import { Separator } from "@/components/ui/separator";
import { CopyCheck, Flame } from "lucide-react";
import { useMemo } from "react";
import { CheckIn } from "@prisma/client";
import { getMonth, getWeek, getYear } from "date-fns";

interface HabitStatsDialogProps {
    item: HabitWithData,
    open: boolean,
    setOpen: (open: boolean) => void
}

const checkDone = (habit: HabitWithData, checkIn: CheckIn) => {
    switch (habit.type) {
        case 'DEFAULT':
            if (checkIn.details?.value) return true;
        case 'COUNTER':
            if (!habit.details.amount || !checkIn.details?.amount) return false;
            switch (habit.details.counterType) {
                case 'AT_LEAST':
                    if (checkIn.details?.amount >= habit.details.amount) return true;
                case 'EXACTLY':
                    if (checkIn.details?.amount === habit.details.amount) return true;
                case 'LESS_THAN':
                    if (checkIn.details?.amount < habit.details.amount) return true;
            }
    }
    return false;
}

export default function HabitStatsDialog({ item, open, setOpen }: HabitStatsDialogProps) {

    const stats = {
        week: item.checkIns.filter((checkIn) => checkDone(item, checkIn) && getWeek(checkIn.date) === getWeek(new Date())).length,
        month: item.checkIns.filter((checkIn) => checkDone(item, checkIn) && getMonth(checkIn.date) === getMonth(new Date())).length,
        year: item.checkIns.filter((checkIn) => checkDone(item, checkIn) && getYear(checkIn.date) === getYear(new Date())).length,
        all: item.checkIns.filter((checkIn) => checkDone(item, checkIn)).length,
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <HabitItem habit={item} />
                    <DialogDescription>
                        Check your habit statistics
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2 border-border">
                    <Separator />

                    {/* Statistics */}
                    <div className="space-y-2 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-xs uppercase font-bold bg-accent rounded-lg p-2">
                            <Flame size={16} />
                            Streak
                        </div>
                        <div className="w-full grid grid-cols-2 divide-x divide-border">
                            <div className="flex flex-col gap-2 items-center py-2">
                                <p className="text-sm">Current</p>
                                <span className="text-primary font-bold text-sm uppercase">0 days</span>
                            </div>
                            <div className="flex flex-col gap-2 items-center py-2">
                                <p className="text-sm">Best</p>
                                <span className="text-primary font-bold text-sm uppercase">0 days</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-xs uppercase font-bold bg-accent rounded-lg p-2">
                            <CopyCheck size={16} />
                            Times completed
                        </div>
                        <div className="px-8 w-full flex justify-between items-center">
                            <p>This week</p>
                            <span className="font-bold">{stats.week}</span>
                        </div>
                        <div className="px-8 w-full flex justify-between items-center">
                            <p>This month</p>
                            <span className="font-bold">{stats.month}</span>
                        </div>
                        <div className="px-8 w-full flex justify-between items-center">
                            <p>This year</p>
                            <span className="font-bold">{stats.year}</span>
                        </div>
                        <div className="px-8 w-full flex justify-between items-center">
                            <p>All time</p>
                            <span className="font-bold">{stats.all}</span>
                        </div>
                    </div>

                    <Separator />

                    <StatsGraph item={item} />
                </div>
            </DialogContent>
        </Dialog>
    )
}