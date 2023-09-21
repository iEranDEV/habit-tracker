import { getServerSession } from "next-auth";
import { deleteCategory, getCategoryByID } from "@/lib/category";
import { NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOption);
    const id = session?.user.id;

    const category = await getCategoryByID(id);

    if (category?.userId !== id) return NextResponse.json({ message: 'error' });

    return NextResponse.json(category);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOption);
    const userId = session?.user.id;
    const id = params.id;

    const category = await getCategoryByID(id);
    if (category?.userId === userId) {
        const response = await deleteCategory(id);
        if (response) {
            return NextResponse.json(true)
        }
    }

    return NextResponse.json(false);
}