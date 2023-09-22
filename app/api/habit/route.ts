import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { createHabit } from "@/lib/habit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getServerSession(authOption);
    const userId = session?.user.id;
    const data = await request.json();

    const habit = await createHabit(data, userId);

    return NextResponse.json(habit);
}