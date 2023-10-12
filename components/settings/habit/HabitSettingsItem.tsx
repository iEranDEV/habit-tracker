'use client';

import { AreaChart, MoreHorizontal, PenLine, Trash2 } from "lucide-react"
import { useState } from "react";
import Dropdown from "@/components/shared/Dropdown";
import { HabitWithData } from "@/types";
import HabitItem from "@/components/shared/habit/HabitItem";
import DeleteHabitDialog from "./DeleteHabitDialog";
import EditHabitDialog from "@/components/shared/habit/EditHabitDialog";
import HabitStatsDialog from "./stats/HabitStatsDialog";

interface HabitSettingsItemProps {
    item: HabitWithData
}

export default function HabitSettingsItem({ item }: HabitSettingsItemProps) {
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [statsDialog, setStatsDialog] = useState(false);

    return (
        <div className="flex group justify-between items-center hover:bg-accent p-1 rounded-lg">
            <HabitItem habit={item} />

            <div className="h-full flex justify-center items-center mr-2">

                <Dropdown
                    type="Habit"
                    header={<HabitItem habit={item} />}
                    toggler={<div className="text-muted-foreground focus:outline-none">
                        <MoreHorizontal size={20} />
                    </div>}
                    options={[
                        <div className="flex items-center" onClick={() => setStatsDialog(true)}>
                            <AreaChart size={16} className="mr-2" />
                            Statistics
                        </div>,
                        <div className="flex items-center" onClick={() => setEditDialog(true)}>
                            <PenLine size={16} className="mr-2" />
                            Edit
                        </div>,
                        <div className="flex items-center" onClick={() => setDeleteDialog(true)}>
                            <Trash2 size={16} className="mr-2" />
                            Delete
                        </div>
                    ]} />

                <EditHabitDialog item={item} open={editDialog} setOpen={setEditDialog} />
                <DeleteHabitDialog item={item} open={deleteDialog} setOpen={setDeleteDialog} />
                <HabitStatsDialog item={item} open={statsDialog} setOpen={setStatsDialog} />
            </div>
        </div>
    )
}