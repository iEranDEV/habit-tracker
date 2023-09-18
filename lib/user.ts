import prisma from "./db"

export const getUserByID = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    return user;
}