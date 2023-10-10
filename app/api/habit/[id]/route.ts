import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { updateHabit } from "@/lib/habit";

export async function PUT(request: Request) {
    const session = await getServerSession(authOption);
    const userId = session?.user.id;
    const { habit } = await request.json();

    if (habit?.userId === userId) {
        const response = await updateHabit(habit.id, habit);

        if (response) return NextResponse.json(true);
    }

    return NextResponse.json(false);
}