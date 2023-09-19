import { getServerSession } from "next-auth";
import { getCategoryByID } from "@/lib/category";
import { NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOption);
    const id = session?.user.id;

    const category = await getCategoryByID(id);

    if (category?.userId !== id) return NextResponse.json({ message: 'error' });

    return NextResponse.json(category);
}