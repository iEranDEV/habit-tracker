import prisma from "./db"

export const getUserSettings = async (id: string) => {
    const settings = await prisma.userSettings.findUnique({
        where: {
            userId: id
        }
    })

    return settings;
}