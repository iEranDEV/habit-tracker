import { getServerSession } from "next-auth";
import { createCategory } from "@/lib/category";
import { NextResponse } from "next/server";
import { authOption } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
    const session = await getServerSession(authOption);
    const id = session?.user.id;
    const { name, color, icon } = await request.json()

    const category = await createCategory(name, color, icon, id);

    return NextResponse.json(category);
}