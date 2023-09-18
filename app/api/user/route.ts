import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOption } from "../auth/[...nextauth]/route";
import { getUserByID } from "@/lib/user";

export async function GET() {
    const session = await getServerSession(authOption);
    const id = session?.user.id;

    const user = await getUserByID(id);

    return NextResponse.json(user);
}

/*export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    let json = await request.json();

    const updated_user = await prisma.user.update({
        where: { id },
        data: json,
    });

    if (!updated_user) {
        return new NextResponse("No user with ID found", { status: 404 });
    }

    return NextResponse.json(updated_user);
}*/

/*export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        await prisma.user.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse("No user with ID found", { status: 404 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}*/
