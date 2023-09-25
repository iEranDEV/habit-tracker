import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { getUserSettings } from "@/lib/settings";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    const session = await getServerSession(authOption);
    const id = session?.user.id;

    const settings = await getUserSettings(id);

    return NextResponse.json(settings);
}

export async function PUT(request: Request) {
    const session = await getServerSession(authOption);
    const userId = session?.user.id;
    const data = await request.json();

    const settings = await prisma.userSettings.update({
        where: {
            userId: userId
        },
        data: {
            ...data
        }
    })

    return NextResponse.json(settings);
}