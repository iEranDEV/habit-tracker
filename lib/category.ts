import prisma from "./db"

export const getCategoryByID = async (id: string) => {
    const category = await prisma.category.findUnique({
        where: {
            id: id
        }
    })

    return category;
}

export const getCategoriesByUser = async (id: string) => {
    const categories = await prisma.category.findMany({
        where: {
            userId: id
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    return categories;
}