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
        orderBy: {
            createdAt: 'asc'
        },
        where: {
            OR: [
                {
                    userId: null
                },
                {
                    userId: id
                }
            ]
        }
    })

    return categories;
}

export const createCategory = async (name: string, color: string, icon: string, userID: string) => {
    const category = await prisma.category.create({
        data: {
            name: name,
            color: color,
            icon: icon,
            userId: userID
        }
    });

    return category;
}

export const deleteCategory = async (id: string) => {
    const category = await prisma.category.delete({
        where: {
            id: id
        }
    })

    return category;
}