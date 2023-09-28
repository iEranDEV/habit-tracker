import { CheckInDetails } from "@prisma/client";
import prisma from "./db";

export const createCheckIn = async (habitId: string, date: Date, details: CheckInDetails) => {
    const response = await prisma.checkIn.create({
        data: {
            habitId: habitId,
            date: date,
            details: details
        }
    });

    return response;
}

export const getCheckIn = async (habitId: string, date: Date) => {
    const response = await prisma.checkIn.findFirst({
        where: {
            date: date,
            habitId: habitId
        }
    })

    return response;
}

export const deleteCheckIn = async (id: string) => {
    const checkIn = await prisma.checkIn.delete({
        where: {
            id: id
        }
    })

    return checkIn;
}

export const updateCheckIn = async (id: string, details: CheckInDetails) => {
    const checkIn = await prisma.checkIn.update({
        where: {
            id: id
        },
        data: {
            details: details
        }
    });

    return checkIn;
}