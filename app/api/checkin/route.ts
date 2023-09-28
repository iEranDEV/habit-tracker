import { getServerSession } from "next-auth";
import { getHabitById } from "@/lib/habit";
import { NextResponse } from "next/server";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { createCheckIn, deleteCheckIn, getCheckIn, updateCheckIn } from "@/lib/checkin";

export async function POST(request: Request) {
    const session = await getServerSession(authOption);
    const userId = session?.user.id;
    const data = await request.json();
    const { habitId, date, details } = data;

    const habit = await getHabitById(habitId);

    if (!habit) return NextResponse.json('habit doesnt exists', { status: 400 });
    if (habit.userId !== userId) return NextResponse.json('wrong', { status: 400 });

    const checkIn = await getCheckIn(habitId, date);

    if (checkIn) {
        // Check in exists
        if (Object.keys(details).length === 0) {
            // Delete checkIn
            const response = await deleteCheckIn(checkIn.id);
            return NextResponse.json({
                type: 'DELETE',
                data: response
            });
        } else {
            // Update checkIn
            const response = await updateCheckIn(checkIn.id, details);
            return NextResponse.json({
                type: 'UPDATE',
                data: response
            });
        }
    } else {
        // Create checkIn
        const response = await createCheckIn(habitId, date, details);
        return NextResponse.json({
            type: 'CREATE',
            data: response
        });
    }
}