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
    await prisma.habit.updateMany({
        where: {
            categoryId: id
        },
        data: {
            categoryId: '65095e1364a380fd978471f4'
        }
    })

    const category = await prisma.category.delete({
        where: {
            id: id
        }
    })


    return category;
}

export const updateCategory = async (id: string, data: any) => {
    const category = await prisma.category.update({
        where: {
            id: id
        },
        data: { ...data }
    });

    return category;
}