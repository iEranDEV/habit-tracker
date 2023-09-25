import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return new NextResponse('Missing value', { status: 400 })
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (exist) {
        return new NextResponse('User already exists', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            userSettings: {
                create: {
                    firstDayOfWeek: 1,
                    language: 'en',
                    modifyDaysPast: true,
                    modifyDaysFuture: true,
                }
            }
        }
    })

    return NextResponse.json(user);
}