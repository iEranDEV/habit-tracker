import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { getUserSettings } from "@/lib/settings";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOption);
    const id = session?.user.id;

    const settings = await getUserSettings(id);

    return NextResponse.json(settings);
}