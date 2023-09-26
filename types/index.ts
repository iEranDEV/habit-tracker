import { Prisma } from "@prisma/client";
import React from "react";

export interface NavItem {
    title: string,
    href: string,
    icon: React.ReactNode,
}

export type HabitWithData = Prisma.HabitGetPayload<{
    include: {
        category: true,
        checkIns: true
    }
}>