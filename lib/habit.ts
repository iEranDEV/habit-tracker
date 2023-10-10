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

export const getHabitsByUser = async (userId: string) => {
    if (!userId) return [];

    const habits = await prisma.habit.findMany({
        where: {
            userId: userId
        },
        include: {
            category: true,
            checkIns: true,
        }
    });

    return habits;
}

export const getHabitById = async (id: string, include?: boolean) => {
    const habit = await prisma.habit.findUnique({
        where: {
            id: id
        },
        include: {
            category: include,
            checkIns: include,
        }
    });

    return habit;
}

export const updateHabit = async (id: string, data: any) => {
    const habit = await prisma.habit.update({
        where: {
            id: id
        },
        data: { ...data }
    });

    return habit;
}