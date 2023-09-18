import { getServerSession } from "next-auth";
import { getCategoriesByUser } from "@/lib/category";
import { NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOption);
    const id = session?.user.id;
    const categories = await getCategoriesByUser(id);

    return NextResponse.json(categories);
}