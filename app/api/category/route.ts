import { getServerSession } from "next-auth";
import { createCategory, getCategoriesByUser } from "@/lib/category";
import { NextResponse } from "next/server";
import { authOption } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
    const session = await getServerSession(authOption);
    const userId = session?.user.id;
    const { name, color, icon } = await request.json()

    const category = await createCategory(name, color, icon, userId);

    return NextResponse.json(category);
}

export async function GET() {
    const session = await getServerSession(authOption);
    const id = session?.user.id;

    const categories = await getCategoriesByUser(id);

    return NextResponse.json(categories);
}