import { Habit } from "@prisma/client";
import prisma from "./db";

export const createHabit = async (habit: Habit, userId: string) => {
    const response = await prisma.habit.create({
        data: {
            name: habit.name,
            type: habit.type,
            description: habit.description,
            categoryId: habit.categoryId,
            userId: userId,
            frequency: habit.frequency,
            startDate: habit.startDate,
            endDate: habit.endDate,
            details: habit.details
        }
    });

    return response;
}