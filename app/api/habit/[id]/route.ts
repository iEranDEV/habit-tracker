import { getServerSession } from "next-auth";
import { authOption } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { deleteHabit, getHabitById, updateHabit } from "@/lib/habit";

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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOption);
    const userId = session?.user.id;
    const id = params.id;

    const habit = await getHabitById(id);

    if (habit?.userId === userId) {
        const response = await deleteHabit(id);
        if (response) {
            return NextResponse.json(true)
        }
    }

    return NextResponse.json(false);
}